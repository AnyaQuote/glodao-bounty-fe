/* eslint-disable @typescript-eslint/no-var-requires */
import { bnHelper } from '@/helpers/bignumber-helper'
import { walletStore } from '@/stores/wallet-store'
import { FixedNumber } from '@ethersproject/bignumber'
import { toNumber } from 'lodash-es'
import Web3 from 'web3'
import { blockchainHandler } from '.'
import { Erc20Contract } from './erc20-contract'
import { IIdoContract, RedeemConfig, UserConstraints } from './ido-contract-interface'

export class EVMIdoContract implements IIdoContract {
  contract: any
  tradeErc20Contract!: Erc20Contract
  web3: any
  erc20Decimals = 18

  _userFee = FixedNumber.from('0')
  _tokensForSale = FixedNumber.from('0')
  _tokensAllocated = FixedNumber.from('0')
  _tokensLeft = FixedNumber.from('0')
  _tokensFund = FixedNumber.from('0')
  _unsoldTokensReedemed = false
  _tradeValue = FixedNumber.from('0')
  _hasWhitelisting = true
  _paused = false
  _participants = 0
  _sellerTax = FixedNumber.from('5')

  _startDate
  _endDate
  _redeemConfigsLength

  constructor(public address: string, web3: Web3) {
    this.web3 = web3
    try {
      this.contract = new web3.eth.Contract(require('./abis/ido-evm.abi.json'), address)
    } catch (error) {
      console.error(error)
    }
  }

  async getUserTradeTokenAmount(account: string) {
    const balance = await (this.tradeErc20Contract as any)?.getTokenAmount(account)
    return balance
  }

  async fetchUserConstraints(account: string) {
    const methods = this.contract.methods
    const [boughtAmounts, isBuyer, redeemedAmounts] = await blockchainHandler.etherBatchRequest(this.web3, [
      methods.getBoughtAmount(account),
      methods.isBuyer(account),
      methods.redeemedAmounts(account),
    ])
    return {
      boughtAmounts: bnHelper.fromDecimals(boughtAmounts, this.erc20Decimals),
      redeemedAmounts: bnHelper.fromDecimals(redeemedAmounts, this.erc20Decimals),
      isBuyer,
    } as UserConstraints
  }

  injectProvider(address) {
    const web3 = walletStore.web3 as any
    this.web3 = web3
    this.contract = new this.web3.eth.Contract(require('./abis/ido-evm.abi.json'), address)
  }

  async init(): Promise<void> {
    const methods = this.contract.methods
    const [tradeErc20, startDate, endDate, redeemConfigsLength, tokensForSale, tokensAllocated, tokensLeft] =
      await blockchainHandler.etherBatchRequest(this.web3, [
        methods.tradeErc20(),
        methods.startDate(),
        methods.endDate(),
        methods.getRedeemConfigLength(),
        methods.tokensForSale(),
        methods.tokensAllocated(),
        methods.tokensLeft(),
      ])
    this._tokensForSale = bnHelper.fromDecimals(tokensForSale, this.erc20Decimals)
    this._tokensAllocated = bnHelper.fromDecimals(tokensAllocated, this.erc20Decimals)
    this._tokensLeft = bnHelper.fromDecimals(tokensLeft, this.erc20Decimals)

    this.tradeErc20Contract = new Erc20Contract(tradeErc20 + '', this.web3, this.erc20Decimals)
    this._redeemConfigsLength = redeemConfigsLength
  }

  swap(amount: FixedNumber, account: string): Promise<any> {
    return sendRequest(this.contract.methods.contribute(bnHelper.toDecimalString(amount, this.erc20Decimals)), account)
  }

  async getBuyerLength() {
    const methods = this.contract.methods
    const buyerLength = await methods.getBuyerLength().call()
    return buyerLength
  }

  get poolInfo() {
    return {
      tokenDecimals: this.erc20Decimals,
      tokensForSale: this._tokensForSale,
      tradeValue: this._tradeValue,
      tokensAllocated: this._tokensAllocated,
      tokensLeft: this._tokensLeft,
      tokensFund: this._tokensFund,
      userFee: this._userFee,
      sellerTax: this._sellerTax,
      participants: this._participants,
      paused: this._paused,
    }
  }

  async fetchPoolInfo(): Promise<any> {
    const methods = this.contract.methods
    const [tokensAllocated, tokensLeft, getBuyerLength, tokensFund]: any[] = await blockchainHandler.etherBatchRequest(
      this.web3,
      [methods.tokensAllocated(), methods.tokensLeft(), methods.getBuyerLength(), methods.tokensFund()]
    )

    this._tokensAllocated = bnHelper.fromDecimals(tokensAllocated, this.erc20Decimals)
    this._participants = toNumber(getBuyerLength)
    this._tokensFund = bnHelper.fromDecimals(tokensFund, this.erc20Decimals)
    this._tokensLeft = bnHelper.fromDecimals(tokensLeft, this.erc20Decimals)
  }

  async getRedeemConfig() {
    const methods = this.contract.methods
    const redeemConfigs = [] as RedeemConfig[]
    for (let i = 0; i < (this._redeemConfigsLength as number); i++) {
      const config = await methods.redeemConfigs(i).call()
      const percentage = bnHelper.fromDecimals(config.percentage, 18)
      const finalized = await methods.redeemFinalizeds(walletStore.account, i).call()
      redeemConfigs.push({ ...config, percentage, finalized })
    }
    return redeemConfigs
  }

  async getUserBought() {
    const methods = this.contract.methods
    const userBought = await methods.boughtAmounts(walletStore.account)
    return userBought
  }

  async redeemTokens(purchaseId: number): Promise<void> {
    const methods = this.contract.methods
    return sendRequest(methods.redeemTokens(purchaseId), walletStore.account)
  }
}

function sendRequest(fx, from): Promise<any> {
  return new Promise((resolve, reject) => {
    fx.send({ from })
      .on('receipt', () => resolve(''))
      .on('error', (error) => reject(error))
  })
}

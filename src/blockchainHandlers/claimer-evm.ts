import { bnHelper } from '@/helpers/bignumber-helper'
import { BountyClaimerInfo } from '@/stores/bounty-claimer-stores'
import Web3 from 'web3'
import { blockchainHandler } from '.'
import claimerAbi from './abis/claimer.abi.json'
import { Erc20Contract } from './erc20-contract'

export class ClaimerEvmContract {
  contract: any
  tokenContract!: Erc20Contract
  tokenDecimals!: number
  web3: Web3

  constructor(public info: BountyClaimerInfo) {
    this.web3 = blockchainHandler.getWeb3(info.chainId)!
    this.contract = new this.web3.eth.Contract(claimerAbi as any, info.contract)
    this.tokenContract = new Erc20Contract(info.token, this.web3)
  }

  _initTask: any
  _inited = false
  async initAsync() {
    if (this._inited) return
    if (this._initTask) {
      await this._initTask
    } else {
      this._initTask = this._initAsync()
      try {
        await this._initTask
        this._inited = true
      } catch (error) {
        this._initTask = undefined
      }
    }
  }
  private async _initAsync() {
    this.tokenDecimals = await this.tokenContract.decimals()
  }

  injectProvider(web3: Web3) {
    if (+(web3 as any).chainId === +this.info.chainId) {
      this.web3 = web3
      this.contract = new web3.eth.Contract(claimerAbi as any, this.info.contract)
      this.tokenContract.injectProvider(web3)
    }
  }

  async getUserInfo(address: string) {
    const methods = this.contract.methods
    const { amount, claimedAmount } = await methods.userInfos(address).call()
    return {
      amount: bnHelper.fromDecimals(amount, this.tokenDecimals),
      claimedAmount: bnHelper.fromDecimals(claimedAmount, this.tokenDecimals),
    }
  }

  claim(address: string) {
    const methods = this.contract.methods
    return sendRequest(methods.claim(), address)
  }
}

function sendRequest(fx, from): Promise<any> {
  return new Promise((resolve, reject) => {
    fx.send({ from })
      .on('receipt', (receipt) => resolve(receipt))
      .on('error', (error) => reject(error))
  })
}

import { bnHelper } from '@/helpers/bignumber-helper'
import { walletStore } from '@/stores/wallet-store'
import { FixedNumber } from '@ethersproject/bignumber'
import { chunk, flatten, keyBy } from 'lodash-es'
import { reaction } from 'mobx'
import Web3 from 'web3'
import { blockchainHandler } from '.'
import claimerMasterAbi from './abis/claimer-master.abi.json'
import claimerAbi from './abis/claimer.abi.json'
import { IClaimerEvm } from './claimer-evm'
import { Erc20Contract, tokenHelper } from './erc20-contract'
import { RouterContract } from './router-contract-solidity'

export class ClaimerEvm2Contract implements IClaimerEvm {
  contract: any
  web3: Web3
  router: RouterContract
  tokenDecimals!: number
  tokenContract!: Erc20Contract
  cachedUserInfos: {
    [wallet: string]: {
      amount: FixedNumber
      claimedAmount: FixedNumber
    }
  } = {}

  constructor(
    public readonly token: string,
    public readonly contractAddress: string,
    web3 = blockchainHandler.getWeb3(process.env.VUE_APP_CHAIN_ID)
  ) {
    this.web3 = web3!
    this.router = RouterContract.getInstance((web3 as any).chainId)
    this.contract = new this.web3.eth.Contract(claimerAbi as any, contractAddress)
    this.tokenContract = tokenHelper.getContract(token, +(web3 as any).chainId)
  }

  initAsync() {
    return Promise.resolve()
  }

  injectProvider(web3: Web3): void {
    if (web3 && `${(web3 as any).chainId}` === `${(this.web3 as any).chainId}`) {
      this.web3 = web3
      this.contract = new this.web3.eth.Contract(claimerAbi as any, this.contractAddress)
    }
  }

  async getUserInfo(account: string, force = false) {
    account = Web3.utils.toChecksumAddress(account)
    if (this.cachedUserInfos[account] && !force) {
      return this.cachedUserInfos[account]
    } else {
      const methods = this.contract.methods
      const { amount, claimedAmount } = await methods.userInfos(account).call()
      return {
        amount: bnHelper.fromDecimals(amount, this.tokenDecimals),
        claimedAmount: bnHelper.fromDecimals(claimedAmount, this.tokenDecimals),
      }
    }
  }

  claim(address: string) {
    const methods = this.contract.methods
    return sendRequest(methods.claim(), address)
  }
}

export class ClaimerMasterEvmContract {
  contract: any
  web3: Web3
  claimers: { [tokenAddress: string]: ClaimerEvm2Contract } = {}

  constructor() {
    this.web3 = blockchainHandler.getWeb3(process.env.VUE_APP_CHAIN_ID)!
    this.contract = new this.web3.eth.Contract(claimerMasterAbi as any, process.env.VUE_APP_MASTER_ADDRESS)
    reaction(
      () => walletStore.web3,
      () => {
        this.injectProvider(walletStore.web3 as any)
      },
      { fireImmediately: true }
    )
  }

  _initTask: any
  _inited = false
  async initAsync(account = '') {
    if (this._inited) return
    if (this._initTask) {
      await this._initTask
    } else {
      this._initTask = this._initAsync(account)
      try {
        await this._initTask
        this._inited = true
      } catch (error) {
        console.error('init', error)
        this._initTask = undefined
      }
    }
  }

  private async _initAsync(account = '') {
    account = account ? Web3.utils.toChecksumAddress(account) : account
    console.log('_initAsync')
    const methods = this.contract.methods
    const availableTokens = await methods.getAvailableTokens().call()
    const claimerAddresses: string[] = await methods.getClaimerFromTokens(availableTokens).call()
    this.claimers = keyBy(
      claimerAddresses.map((x, index) => new ClaimerEvm2Contract(availableTokens[index], x, this.web3)),
      (x) => x.token
    )
    const claimerContracts = Object.values(this.claimers)
    const results = await blockchainHandler.etherBatchRequest(
      this.web3,
      flatten(
        claimerContracts.map((claimer) => {
          const requests = [
            claimer.tokenContract.contract.methods.decimals(),
            claimer.tokenContract.contract.methods.name(),
          ]
          if (account) {
            requests.push(claimer.contract.methods.userInfos(account))
          }
          return requests
        })
      )
    )
    chunk(results, results.length / claimerContracts.length).forEach((resultArr, index) => {
      const claimerContract = claimerContracts[index]
      claimerContract.tokenDecimals = claimerContract.tokenContract._decimals = resultArr[0]
      claimerContract.tokenContract.name = resultArr[1]
      if (account) {
        const { amount, claimedAmount } = resultArr[2]
        claimerContract.cachedUserInfos[account] = {
          amount: bnHelper.fromDecimals(amount, claimerContract.tokenDecimals),
          claimedAmount: bnHelper.fromDecimals(claimedAmount, claimerContract.tokenDecimals),
        }
      }
    })
  }

  injectProvider(web3?: Web3) {
    if (web3 && `${(web3 as any).chainId}` === `${(this.web3 as any).chainId}`) {
      this.web3 = web3
      this.contract = new this.web3.eth.Contract(claimerMasterAbi as any, process.env.VUE_APP_MASTER_ADDRESS)
      Object.values(this.claimers).forEach((x) => x.injectProvider(web3))
    }
  }

  async createClaimer(token: string, from: string) {
    const methods = this.contract.methods
    await sendRequest(methods.createClaimer(token), from)
    const claimer = await methods.claimerContracts(token)
    this.claimers[token] = new ClaimerEvm2Contract(token, claimer, this.web3)
    return this.claimers[token]
  }

  async getClaimer(token: string, force = false) {
    await this.initAsync()
    token = Web3.utils.toChecksumAddress(token)
    if (this.claimers[token]) return this.claimers[token]
    if (force) await this._initAsync()
    return this.claimers[token]
  }

  async isCreatedClaimer(token: string) {
    token = Web3.utils.toChecksumAddress(token)
    await this.initAsync()
    return !!this.claimers[token]
  }
}

function sendRequest(fx, from): Promise<any> {
  return new Promise((resolve, reject) => {
    fx.send({ from })
      .on('receipt', (receipt) => resolve(receipt))
      .on('error', (error) => reject(error))
  })
}

export const claimerMasterEvm = new ClaimerMasterEvmContract()

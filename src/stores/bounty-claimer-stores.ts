import { ClaimerEvmContract, IClaimerEvm } from '@/blockchainHandlers/claimer-evm'
import { claimerMasterEvm } from '@/blockchainHandlers/claimer-evm2-solidity'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { FixedNumber } from '@ethersproject/bignumber'
import { computed, observable } from 'mobx'
import { asyncAction } from 'mobx-utils'
import { walletStore } from './wallet-store'

const claimers: BountyClaimerInfo[] = require('@/blockchainHandlers/claimers.json')

export interface BountyClaimerInfo {
  chainId: 56 | 97
  poolName?: string
  name: string
  contract: string
  token: string
  contractInstance?: IClaimerEvm
}

export class BountyClaimerStore {
  claimerInfo: BountyClaimerInfo
  contract!: IClaimerEvm
  @observable userAmount = FixedNumber.from('0')
  @observable userClaimedAmount = FixedNumber.from('0')
  @observable claiming = false

  constructor(info) {
    this.claimerInfo = info
    this.contract = info.contractInstance ?? new ClaimerEvmContract(info)
  }

  @asyncAction *loadUserInfo(address: string, force = false) {
    const { amount, claimedAmount } = yield this.contract.getUserInfo(address, force)
    this.userAmount = amount
    this.userClaimedAmount = claimedAmount
  }

  @asyncAction *claim(address: string) {
    this.claiming = true
    try {
      yield this.contract.claim(address)
      this.loadUserInfo(address, true)
    } catch (error) {
      snackController.blockchainError(error)
    } finally {
      this.claiming = false
    }
  }

  @computed get userClaimableAmount() {
    return this.userAmount.subUnsafe(this.userClaimedAmount)
  }

  @computed get canClaim() {
    return !this.userClaimableAmount.isZero()
  }
}

const bountyStores = claimers
  .filter((x) => `${x.chainId}` === process.env.VUE_APP_CHAIN_ID)
  .map((x) => new BountyClaimerStore(x))

const claimerv2s: { [token: string]: BountyClaimerStore } = {}

export async function getClaimerStores() {
  await claimerMasterEvm.initAsync(walletStore.account)
  Object.entries(claimerMasterEvm.claimers).forEach(([token, contract]) => {
    if (!claimerv2s[token]) {
      claimerv2s[token] = new BountyClaimerStore({
        chainId: +(contract.web3 as any).chainId,
        name: contract.tokenContract.name,
        poolName: contract.tokenContract.name,
        contract: contract.contractAddress,
        token: contract.token,
        contractInstance: contract,
      })
    }
  })
  return [...bountyStores, ...Object.values(claimerv2s)]
}

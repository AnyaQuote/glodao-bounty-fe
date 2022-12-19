import { ClaimerEvmContract } from '@/blockchainHandlers/claimer-evm'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { FixedNumber } from '@ethersproject/bignumber'
import { computed, observable } from 'mobx'
import { asyncAction } from 'mobx-utils'

const claimers: BountyClaimerInfo[] = require('@/blockchainHandlers/claimers.json')

export interface BountyClaimerInfo {
  chainId: 56 | 97
  name: string
  contract: string
  token: string
}

export class BountyClaimerStore {
  claimerInfo: BountyClaimerInfo
  contract!: ClaimerEvmContract
  @observable userAmount = FixedNumber.from('0')
  @observable userClaimedAmount = FixedNumber.from('0')
  @observable claiming = false

  constructor(info) {
    this.claimerInfo = info
    this.contract = new ClaimerEvmContract(info)
  }

  @asyncAction *loadUserInfo(address: string) {
    const { amount, claimedAmount } = yield this.contract.getUserInfo(address)
    this.userAmount = amount
    this.userClaimedAmount = claimedAmount
  }

  @asyncAction *claim(address: string) {
    this.claiming = true
    try {
      yield this.contract.claim(address)
      this.loadUserInfo(address)
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
  .filter((x) => `${x.chainId}` === process.env.VUE_APP_DONATION_CHAIN_ID)
  .map((x) => new BountyClaimerStore(x))

export function getClaimerStores() {
  return [...bountyStores]
}

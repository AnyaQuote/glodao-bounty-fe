import { loadingController } from '@/components/global-loading/global-loading-controller'
import { Zero } from '@/constants'
import { bigNumberHelper } from '@/helpers/bignumber-helper'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { BountyClaimerStore, getClaimerStores } from '@/stores/bounty-claimer-stores'
import { walletStore } from '@/stores/wallet-store'
import { FixedNumber } from '@ethersproject/bignumber'
import { get } from 'lodash-es'
import { computed, IReactionDisposer, observable, reaction } from 'mobx'
import { asyncAction } from 'mobx-utils'
// decimals
// :
// "18"
// rewardAmount
// :
// "3000.0"
// token
// :
// "GLD"
// tokenAddress
// :
// "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D51"
// tokenBasePrice
// :
// "0.018"

export class BountyRewardV2ViewModel {
  _disposers: IReactionDisposer[] = []
  @observable currentBounty = Zero
  @observable bountyRewarded = Zero
  @observable slicedRewardHistories = []
  @observable rewards: any = []

  @observable claimers: BountyClaimerStore[] = []

  constructor() {
    this.firstInit()
    this._disposers.push(
      reaction(
        () => authStore.registeredWallet,
        () => {
          if (authStore.registeredWallet) this.loadData()
        }
      ),
      reaction(
        () => walletStore.account,
        () => this.loadClaimerUserInfos(),
        { fireImmediately: true }
      )
    )
  }

  @asyncAction *firstInit() {
    loadingController.increaseRequest()
    yield Promise.all([this.loadClaimerUserInfos(), this.loadData()])
    loadingController.decreaseRequest()
  }

  destroy() {
    this._disposers.forEach((d) => d())
  }

  @asyncAction *loadClaimerUserInfos() {
    const address = walletStore.account
    if (address) {
      this.claimers = yield getClaimerStores()
      yield Promise.all(
        this.claimers.map((x) => {
          x.contract.injectProvider(walletStore.web3!)
          return x.contract.initAsync()
        })
      )
      this.claimers.forEach((x) => x.loadUserInfo(address))
    }
  }

  @asyncAction *claim(claimer: BountyClaimerStore) {
    yield claimer.claim(walletStore.account!)
  }

  @asyncAction *loadData() {
    if (!authStore.registeredWallet) return
    const res = yield apiService.bountyRewards.find(
      {
        walletAddress: authStore.registeredWallet,
      },
      { _limit: 1 }
    )
    if (res && res.length) {
      const bountyReward = res[0]
      this.rewards = get(bountyReward, 'rewards', [])
      let currentBounty = Zero
      for (const reward of this.rewards) {
        const rewardAmount = FixedNumber.from(get(reward, 'rewardAmount', '0'))
        const tokenBasePrice = FixedNumber.from(get(reward, 'tokenBasePrice', '1'))
        currentBounty = currentBounty.addUnsafe(rewardAmount.mulUnsafe(tokenBasePrice))
      }
      this.currentBounty = currentBounty

      const withdrawHistory = get(bountyReward, 'withdrawHistory', [])
      const bountyRewarded = withdrawHistory.reduce((prev, cur) => {
        return (prev as FixedNumber).addUnsafe(
          FixedNumber.from(cur.rewardAmount).mulUnsafe(FixedNumber.from(cur.tokenBasePrice))
        )
      }, Zero)
      this.bountyRewarded = bountyRewarded
      this.slicedRewardHistories = withdrawHistory
        .reverse()
        .slice(0, 5)
        .map((reward) => ({
          ...reward,
          rewardAmount: FixedNumber.from(reward.rewardAmount).mulUnsafe(FixedNumber.from(reward.tokenBasePrice)),
        }))
    }
  }

  @computed get balances() {
    return this.rewards.filter((reward) => bigNumberHelper.gt(FixedNumber.from(`${reward.rewardAmount}`), Zero))
  }
}

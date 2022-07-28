import { Zero } from '@/constants'
import { apiService } from '@/services/api-service'
import { walletStore } from '@/stores/wallet-store'
import { FixedNumber } from '@ethersproject/bignumber'
import { get } from 'lodash-es'
import { computed, IReactionDisposer, observable, reaction } from 'mobx'
import { asyncAction } from 'mobx-utils'
import { bigNumberHelper } from '@/helpers/bignumber-helper'

export class BountyRewardViewModel {
  _disposers: IReactionDisposer[] = []
  @observable currentBounty = Zero
  @observable bountyRewarded = Zero
  @observable slicedRewardHistories = []
  @observable rewards: any = []

  constructor() {
    if (walletStore.account) this.loadData()
    this._disposers.push(
      reaction(
        () => walletStore.account,
        () => {
          if (walletStore.account) this.loadData()
        }
      )
    )
  }

  destroy() {
    this._disposers.forEach((d) => d())
  }

  @asyncAction *loadData() {
    const res = yield apiService.bountyRewards.find(
      {
        walletAddress: walletStore.account,
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
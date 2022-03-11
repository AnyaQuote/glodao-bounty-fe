import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { keys } from 'lodash-es'
import { computed, observable } from 'mobx'
import { asyncAction } from 'mobx-utils'

const PAGE_LIMIT = 6
export class BountyHunterViewModel {
  @observable bountyList: any[] = []
  @observable bountyCount = 0
  @observable page = 1

  constructor() {
    //
    this.getBountyListByPage()
    this.getTotalBountyCount()
  }

  @asyncAction *getAllTask() {
    const task = yield apiService.tasks.find('', { _limit: PAGE_LIMIT, _start: 0 })
    console.log(task)
  }

  @asyncAction *getBountyListByPage(page?: number) {
    try {
      if (page) this.page = page
      const _start = ((this.page ?? 1) - 1) * PAGE_LIMIT
      const res = yield apiService.tasks.find('', { _limit: PAGE_LIMIT, _start: _start })
      if (this.page === 1) this.bountyList = res
      else this.bountyList = [...this.bountyList, ...res]
      this.page += 1
    } catch (error) {
      this.bountyList = []
      snackController.error(error as string)
    }
  }

  @asyncAction *getTotalBountyCount() {
    this.bountyCount = yield apiService.tasks.count()
  }

  @computed get remainingBounty() {
    return this.bountyCount - this.bountyList.length
  }

  @computed get convertedBountyList() {
    return this.bountyList.map((bounty) => {
      return {
        name: bounty.name,
        id: bounty.id,
        startTime: bounty.startTime,
        rewardAmount: bounty.rewardAmount,
        chainId: bounty.chainId,
        metadata: bounty.metadata,
        types: keys(bounty.data),
      }
    })
  }
}

import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { keys } from 'lodash-es'
import { action, computed, observable, reaction, _getAdministration } from 'mobx'
import { asyncAction, IDisposer } from 'mobx-utils'

const PAGE_LIMIT = 6
export class BountyHunterViewModel {
  @observable bountyList: any[] = []
  @observable bountyCount = 0
  @observable page = 1
  @observable currentApplies: any[] = []
  sortList = ['Recently added', 'Total reward ascending', 'Total reward descending']
  @observable sortValue = ''
  _disposers: IDisposer[] = []

  constructor() {
    //
    this.getBountyListByPage()
    this.getTotalBountyCount()
    this.getCurrentTask()
  }

  initReaction() {
    this._disposers = [
      reaction(
        () => authStore.jwt,
        () => {
          if (authStore.jwt) this.getCurrentTask()
        }
      ),
      reaction(
        () => this.sortValue,
        () => {
          this.getBountyListByPage(1)
        }
      ),
    ]
  }

  destroyReaction() {
    this._disposers.forEach((d) => d())
  }

  @asyncAction *getAllTask() {
    const task = yield apiService.tasks.find('', { _limit: PAGE_LIMIT, _start: 0 })
  }

  @asyncAction *getBountyListByPage(page?: number) {
    try {
      if (page) this.page = page
      const _start = ((this.page ?? 1) - 1) * PAGE_LIMIT
      const res = yield apiService.tasks.find('', { _limit: PAGE_LIMIT, _start: _start, _sort: this.sortParam })
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

  @asyncAction *getCurrentTask() {
    try {
      if (!authStore.jwt) return
      const res = yield apiService.applies.find({ 'hunter.id': authStore.user.hunter.id }, { _limit: 4 })
      this.currentApplies = res
    } catch (error) {
      this.currentApplies = []
      snackController.error(error as string)
    }
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
        maxParticipant: bounty.maxParticipant,
      }
    })
  }

  @computed get currentTaskList() {
    return this.currentApplies.map((apply) => {
      const task = apply.task
      const types = keys(task.data)
      const firstTask = apply.data[types[0]]
      return {
        id: apply.id,
        status: apply.status,
        name: task.name,
        shortDescription: task.metadata?.shortDescription,
        chainId: task.chainId,
        type: types[0],
        currentStep: firstTask.filter((step) => step.finished === true).length,
        totalStep: firstTask.length,
      }
    })
  }

  @computed get sortParam() {
    switch (this.sortValue) {
      case 'Recently added':
        return 'createdAt:DESC'
      case 'Total reward ascending':
        return 'rewardAmount:ASC'
      case 'Total reward descending':
        return 'rewardAmount:DESC'
      default:
        return 'createdAt:DESC'
    }
  }
}

import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { ceil, keys } from 'lodash-es'
import { action, computed, observable, reaction } from 'mobx'
import { asyncAction, IDisposer } from 'mobx-utils'

const PAGE_LIMIT = 6
const params = { 'hunter.id': authStore.user.hunter.id }
export class HuntingHistoryViewModel {
  @observable huntingList: any[] = []
  @observable huntingCount = 0
  @observable page = 1
  @observable currentApplies: any[] = []
  @observable completedTaskCount = 0
  @observable processingTaskCount = 0
  _disposers: IDisposer[] = []

  constructor() {
    //
    this.fetchData()
  }

  initReaction() {
    this._disposers = [
      reaction(
        () => authStore.jwt,
        () => {
          if (authStore.jwt) this.fetchData()
        }
      ),
      reaction(
        () => this.page,
        () => {
          this.getHuntingListByPage(this.page)
        }
      ),
    ]
  }

  destroyReaction() {
    this._disposers.forEach((d) => d())
  }

  @action fetchData() {
    this.getHuntingListByPage()
    this.getTotalHuntingCount()
    this.getProcessingAndCompletedTaskCount()
  }

  @asyncAction *getHuntingListByPage(page?: number) {
    try {
      if (!authStore.jwt) return
      if (page) this.page = page
      const _start = ((this.page ?? 1) - 1) * PAGE_LIMIT
      const res = yield apiService.applies.find(params, { _limit: PAGE_LIMIT, _start: _start })
      this.huntingList = res
    } catch (error) {
      this.huntingList = []
      snackController.error(error as string)
    }
  }

  @asyncAction *getTotalHuntingCount() {
    try {
      if (!authStore.jwt) return
      const res = yield apiService.applies.count(params)
      this.huntingCount = res
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @asyncAction *getProcessingAndCompletedTaskCount() {
    try {
      if (!authStore.jwt) return
      const completedTaskCountParams = {
        _where: [
          { ...params },
          {
            _or: [{ status: 'completed' }, { status: 'awarded' }],
          },
        ],
      }
      const processingTaskCountParams = {
        _where: [{ ...params, status: 'processing' }],
      }
      this.completedTaskCount = yield apiService.applies.count(completedTaskCountParams)
      this.processingTaskCount = yield apiService.applies.count(processingTaskCountParams)
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @computed get remainingBounty() {
    return this.huntingCount - this.huntingList.length
  }

  @computed get convertedHuntingHistoryList() {
    return this.huntingList.map((apply) => {
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
        coverImage: task.metadata?.coverImage,
        startTime: apply.createdAt,
        bountyEarn: apply.bounty ?? 0,
        rewardToken: task.metadata?.rewardToken,
      }
    })
  }

  @computed get totalPageCount() {
    return ceil(this.huntingCount / PAGE_LIMIT)
  }
}

import { snackController } from '@/components/snack-bar/snack-bar-controller'
import router from '@/router'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { ceil, keys, lowerCase, isEmpty, get } from 'lodash-es'
import { action, computed, observable, reaction } from 'mobx'
import { asyncAction, IDisposer } from 'mobx-utils'
import moment from 'moment'

const PAGE_LIMIT = 6
const params = { 'hunter.id': get(authStore, 'user.hunter.id', '') }
export class HuntingHistoryViewModel {
  @observable huntingList: any[] = []
  @observable huntingCount = 0
  @observable page = 1
  @observable currentApplies: any[] = []
  @observable completedTaskCount = 0
  @observable processingTaskCount = 0
  _disposers: IDisposer[] = []

  @observable sortParams = 'createdAt:DESC'
  sortList = [
    {
      text: 'Recently added',
      value: 'createdAt:DESC',
    },
    {
      text: 'Total reward ascending',
      value: 'task.rewardAmount:ASC',
    },
    {
      text: 'Total reward descending',
      value: 'task.rewardAmount:DESC',
    },
  ]

  @observable status = ['Processing', 'Awarded', 'Completed', 'Rejected']
  @observable statusModel = []

  @observable dateRanges = []
  @observable dateRangeDialog = false

  @observable referralCode = get(authStore, 'user.hunter.referralCode', '')
  @observable referralList: any[] = []
  @observable referralCount = 0
  @observable referralPage = 1
  @observable referralSortParams = 'createdAt:DESC'
  @observable referralSortList = [
    {
      text: 'Recently join',
      value: 'createdAt:DESC',
    },
    {
      text: 'Name ascending',
      value: 'name:ASC',
    },
  ]

  constructor() {
    if (isEmpty(authStore.jwt))
      router.push('/bounty').catch(() => {
        //
      })
    else this.fetchData()
  }

  initReaction() {
    this._disposers = [
      reaction(
        () => authStore.jwt,
        () => {
          if (authStore.jwt) {
            this.referralCode = get(authStore, 'user.hunter.referralCode', '')
            this.fetchData()
          }
        }
      ),
      reaction(
        () => this.page,
        () => {
          this.getHuntingListByPage(this.page)
        }
      ),
      reaction(
        () => this.sortParams,
        () => {
          this.getHuntingListByPage(1)
        }
      ),
      reaction(
        () => this.filterParams,
        () => {
          this.getHuntingListByPage(1)
        }
      ),
      reaction(
        () => this.referralPage,
        () => {
          this.getReferralList(this.referralPage)
        }
      ),
      reaction(
        () => this.referralSortParams,
        () => {
          if (this.referralPage !== 1) this.referralPage = 1
          else this.getReferralList(1)
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
    this.getReferralList()
    this.getTotalReferralCount()
  }

  @action onShouldGetHuntingList() {
    if (this.page !== 1) this.page = 1
    else this.getHuntingListByPage(1)
  }

  @action.bound onSortConditionChange(value: string) {
    this.sortParams = value
  }

  @action.bound onStatusFilterChange(value: string) {
    console.log(value)
  }

  @action.bound changeDateRangeDialog(value: boolean) {
    this.dateRangeDialog = value
  }

  @action.bound changeDateRange(value) {
    this.dateRanges = value
  }

  @action.bound onReferralSortConditionChange(value: string) {
    this.referralSortParams = value
  }

  @asyncAction *getReferralList(page?: number) {
    try {
      if (page) this.referralPage = page
      const _start = ((this.referralPage ?? 1) - 1) * PAGE_LIMIT
      const res = yield apiService.hunters.find(
        { referrerCode: this.referralCode },
        {
          _limit: PAGE_LIMIT,
          _start: _start,
          _sort: this.referralSortParams,
        }
      )
      this.referralList = res
    } catch (error) {
      this.referralList = []
      snackController.error(('Cant get referral list:' + error) as string)
    }
  }

  @asyncAction *getTotalReferralCount() {
    try {
      if (!authStore.jwt) return
      const res = yield apiService.hunters.count({ referrerCode: this.referralCode })
      this.referralCount = res
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @asyncAction *getHuntingListByPage(page?: number) {
    try {
      if (!authStore.jwt) return
      if (page) this.page = page
      const _start = ((this.page ?? 1) - 1) * PAGE_LIMIT
      const res = yield apiService.applies.find(this.filterParams, {
        _limit: PAGE_LIMIT,
        _start: _start,
        _sort: this.sortParams,
      })
      this.huntingList = res
    } catch (error) {
      this.huntingList = []
      snackController.error(error as string)
    }
  }

  @asyncAction *getTotalHuntingCount() {
    try {
      if (!authStore.jwt) return
      const res = yield apiService.applies.count(this.filterParams)
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

  @computed get statusFilterParams() {
    const _or: any[] = []
    this.statusModel.forEach((statusString) => {
      _or.push({ status: lowerCase(statusString) })
    })
    return _or
  }

  @computed get dateRangeFilterParams() {
    const sortedDateRanges = this.dateRanges.slice().sort()
    let result: any = []
    if (this.dateRanges.length > 0)
      result = [...result, { createdAt_gte: moment.utc(sortedDateRanges[0]).toISOString() }]
    if (this.dateRanges.length > 1) {
      result = [...result, { createdAt_lte: moment.utc(sortedDateRanges[1]).add(1, 'd').toISOString() }]
    }
    return result
  }

  @computed get filterParams() {
    return {
      _where: [
        { 'hunter.id': get(authStore, 'user.hunter.id', '') },
        ...this.dateRangeFilterParams,
        { _or: [...this.statusFilterParams] },
      ],
    }
  }

  @computed get totalReferralPageCount() {
    return ceil(this.referralCount / PAGE_LIMIT)
  }

  @computed get convertedReferralList() {
    return this.referralList.map(({ id, name, createdAt, metadata }) => {
      return {
        id,
        name,
        joinTime: createdAt,
        avatar: get(metadata, 'avatar', ''),
      }
    })
  }
}

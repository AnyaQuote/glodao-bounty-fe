import { snackController } from '@/components/snack-bar/snack-bar-controller'
import router from '@/router'
import { apiService } from '@/services/api-service'
import { ceil, get } from 'lodash-es'
import { action, computed, observable, reaction } from 'mobx'
import { asyncAction, IDisposer } from 'mobx-utils'
import moment from 'moment'

const PAGE_LIMIT = 6
export class BountyHistoryViewModel {
  @observable liveBountyList: any[] = []
  @observable upcomingBountyList: any[] = []

  @observable bountyListLoading = false
  @observable bountyList: any[] = []
  @observable bountyCount = 0
  @observable page = 1
  @observable totalPageCount = 1
  @observable currentApplies: any[] = []

  @observable totalProjectCount = 0
  @observable endedProjectCount = 0
  @observable userCount = 0
  @observable uniqueParticipantCount = 0

  @observable taskNameInputLoading = false
  @observable suggestedList: any[] = []

  @observable sortParams = 'endTime:DESC'
  sortList = [
    {
      text: 'Recently added',
      value: 'createdAt:DESC',
    },
    {
      text: 'Total reward ascending',
      value: 'rewardAmount:ASC',
    },
    {
      text: 'Total reward descending',
      value: 'rewardAmount:DESC',
    },
  ]

  // @observable dateRanges = []
  @observable dateRangeDialog = false
  @observable dateRangeFilter = this.dateRangeFilterParams

  @observable startDate = ''
  @observable startDateDialog = false
  @observable endDate = ''
  @observable endDateDialog = false

  _disposers: IDisposer[] = []

  constructor() {
    //
    this.getBountyListByPage()
    this.getSuggestedList('')
    this.getTotalProjectCount()
  }

  initReaction() {
    this._disposers = [
      reaction(
        () => this.sortParams,
        () => {
          this.getBountyListByPage(1)
        }
      ),
      reaction(
        () => this.dateRangeFilter,
        () => {
          this.shouldUpdateList()
        }
      ),
      reaction(
        () => this.page,
        () => {
          this.getBountyListByPage(this.page)
        }
      ),
    ]
  }

  destroyReaction() {
    this._disposers.forEach((d) => d())
  }

  @action.bound shouldUpdateList() {
    if (this.page === 1) this.getBountyListByPage(1)
    else this.page = 1
  }

  @asyncAction *getBountyListByPage(page?: number) {
    try {
      this.bountyListLoading = true
      const _start = ((this.page ?? 1) - 1) * PAGE_LIMIT
      const res = yield apiService.tasks.find(
        { status: 'ended', ...this.dateRangeFilterParams },
        {
          _limit: PAGE_LIMIT,
          _start: _start,
          _sort: this.sortParams,
        }
      )
      this.bountyList = res
      this.getTotalBountyCount()
    } catch (error) {
      this.bountyList = []
      snackController.error(get(error, 'response.data.message', '') || (error as string))
    } finally {
      this.bountyListLoading = false
    }
  }

  @asyncAction *getTotalBountyCount() {
    this.bountyCount = yield apiService.tasks.count({ status: 'ended', ...this.dateRangeFilterParams })
    this.totalPageCount = ceil(this.bountyCount / PAGE_LIMIT)
  }

  @asyncAction *getTotalProjectCount() {
    try {
      this.totalProjectCount = yield apiService.tasks.count()
      this.endedProjectCount = yield apiService.tasks.count({ status: 'ended' })
      this.userCount = yield apiService.hunters.count()
      this.uniqueParticipantCount = yield apiService.hunters.count({
        participationStatus_ne: 'guest',
      })
    } catch (error) {
      snackController.error(get(error, 'response.data.message', '') || (error as string))
    }
  }

  @action.bound changeDateRangeDialog(value: boolean) {
    this.dateRangeDialog = value
  }

  @action.bound changeDateRangeFilter() {
    this.dateRangeFilter = this.dateRangeFilterParams
  }

  @action.bound onSortConditionChange(value: string) {
    this.sortParams = value
  }

  @action.bound getSuggestedList(search) {
    this.taskNameInputLoading = true
    apiService.tasks
      .find(
        {
          name_contains: search,
          status: 'ended',
        },
        { _limit: 5 }
      )
      .then((res) => {
        this.suggestedList = res
      })
      .catch((err) => {
        snackController.error(err)
      })
      .finally(() => {
        this.taskNameInputLoading = false
      })
  }

  @action.bound goToTaskDetailScreen(id) {
    router.push(`/bounty-history/${id}`).catch(() => {
      //
    })
  }

  @action.bound changeStartDateDialog(val: boolean) {
    this.startDateDialog = val
  }

  @action.bound changeStartDateValue(val) {
    this.startDate = val
  }
  @action.bound changeEndDateDialog(val: boolean) {
    this.endDateDialog = val
  }

  @action.bound changeEndDateValue(val) {
    this.endDate = val
  }

  @computed get liveProjectCount() {
    return this.totalProjectCount - this.endedProjectCount
  }

  @computed get remainingBounty() {
    return this.bountyCount - this.bountyList.length
  }

  @computed get convertedBountyList() {
    return this.bountyList.map((bounty) => {
      return {
        name: bounty.name,
        id: bounty.id,
        endTime: bounty.endTime,
        rewardAmount: bounty.rewardAmount,
        chainId: bounty.chainId,
        totalParticipants: bounty.totalParticipants,
        coverImage: get(
          bounty,
          'metadata.coverImage',
          'https://diversity-api.contracts.dev/uploads/download_cff108eb0b.png'
        ),
        rewardToken: get(bounty, 'metadata.rewardToken', 'GLD'),
      }
    })
  }

  @computed get dateRanges() {
    const result: string[] = []
    if (this.startDate) result.push(this.startDate)
    if (this.endDate) result.push(this.endDate)
    return result
  }

  @computed get dateRangeFilterParams() {
    const sortedDateRanges = this.dateRanges.slice().sort()
    let result: any = {
      _where: [],
    }
    if (this.dateRanges.length > 0)
      result = {
        _where: [
          ...result._where,
          {
            startTime_gte: moment.utc(sortedDateRanges[0]).toISOString(),
          },
        ],
      }
    if (this.dateRanges.length > 1) {
      result = {
        _where: [
          ...result._where,
          {
            startTime_lte: moment.utc(sortedDateRanges[1]).add(1, 'd').toISOString(),
          },
        ],
      }
    }
    return result
  }
}

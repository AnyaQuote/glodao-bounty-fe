import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import * as _ from 'lodash-es'
import { action, computed, IReactionDisposer, observable, reaction } from 'mobx'
import { asyncAction } from 'mobx-utils'
import moment from 'moment'

const DEFAULT_BREADCRUMBS = [
  {
    text: 'Bounty history',
    disabled: false,
    href: '/bounty-history',
  },
]
const PAGE_LIMIT = 10

export class BountyHistoryDetailViewModel {
  @observable breadcrumbsItems = DEFAULT_BREADCRUMBS

  @observable taskId = ''
  @observable task: any = {}
  @observable page = 1
  @observable totalPageCount = 1
  @observable poolType = 'priority'

  @observable relatedApplies: any[] = []

  @observable nameInputModel = null

  @observable startDate = ''
  @observable startDateDialog = false
  @observable endDate = ''
  @observable endDateDialog = false

  disposes: IReactionDisposer[] = []

  constructor() {
    this.disposes = [
      reaction(
        () => this.taskId,
        () => {
          this.fetchData()
        }
      ),
      reaction(
        () => this.dateRangeFilterParams,
        () => {
          this.shouldUpdateList()
        }
      ),
      reaction(
        () => this.poolType,
        () => {
          this.shouldUpdateList()
        }
      ),
      reaction(
        () => this.page,
        () => {
          this.getRelatedApplies()
        }
      ),
    ]
  }

  destroyReaction() {
    this.disposes.forEach((d) => d())
  }

  @action shouldUpdateList() {
    if (this.page === 1) this.getRelatedApplies()
    else this.page = 1
  }

  @action taskIdChange(taskId: string) {
    this.taskId = taskId
  }

  @action.bound onNameFilterChange(val) {
    this.nameInputModel = val
  }

  @asyncAction *fetchData() {
    yield this.getTaskData()
    this.getRelatedApplies()
  }

  @asyncAction *getTaskData() {
    try {
      const res = yield apiService.tasks.findOne(this.taskId)
      this.task = res
      this.generateBreadcrumbsItems()
    } catch (error) {
      snackController.error(_.get(error, 'response.data.message', '') || (error as string))
    }
  }

  @asyncAction *getRelatedApplies() {
    try {
      if (_.isEmpty(this.task)) return
      const _start = ((this.page ?? 1) - 1) * PAGE_LIMIT
      const res = yield apiService.applies.find(
        {
          task: this.taskId,
          status: 'completed',
          poolType: this.poolType,
          ...this.dateRangeFilterParams,
        },
        {
          _limit: PAGE_LIMIT,
          _start: _start,
        }
      )
      this.relatedApplies = res
      this.getTotalRelatedAppliesCount()
    } catch (error) {
      snackController.error(_.get(error, 'response.data.message', '') || (error as string))
    }
  }

  @asyncAction *getTotalRelatedAppliesCount() {
    try {
      const res = yield apiService.applies.count({
        task: this.taskId,
        status: 'completed',
        poolType: this.poolType,
        ...this.dateRangeFilterParams,
      })
      this.totalPageCount = _.ceil(res / PAGE_LIMIT)
    } catch (error) {
      snackController.error(_.get(error, 'response.data.message', '') || (error as string))
    }
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

  @action.bound generateBreadcrumbsItems() {
    this.breadcrumbsItems = [
      ...DEFAULT_BREADCRUMBS,
      {
        text: this.task.name,
        disabled: true,
        href: '#',
      },
    ]
  }

  @computed get taskName() {
    return _.get(this.task, 'name', 'TBA')
  }

  @computed get coverImage() {
    return _.get(
      this.task,
      'metadata.coverImage',
      'https://diversity-api.contracts.dev/uploads/download_cff108eb0b.png'
    )
  }

  @computed get taskStartTime() {
    return _.get(this.task, 'startTime', '')
  }

  @computed get taskEndTime() {
    return _.get(this.task, 'endTime', '')
  }

  @computed get website() {
    return _.get(this.task, 'metadata.website', 'TBA')
  }

  @computed get totalParticipants(): number {
    return this.relatedApplies.length || _.get(this.task, 'totalParticipants', 0)
  }

  @computed get totalPriorityParticipants(): number {
    return _.get(_.countBy(this.relatedApplies, 'poolType'), 'priority', 0)
  }

  @computed get totalCommunityParticipants(): number {
    return _.isNumber(this.totalParticipants) ? this.totalParticipants - this.totalPriorityParticipants : 0
  }

  @computed get totalAwarded() {
    return _.get(this.task, 'rewardAmount', 0)
  }

  @computed get rewardToken() {
    return _.get(this.task, 'metadata.rewardToken', 'GLD')
  }

  @computed get twitterSharedLinkList() {
    const flatRelatedAppliesTwitterData = this.relatedApplies.map((apply) => {
      if (apply.data?.twitter?.length > 0)
        return {
          hunterName: apply.hunter.name,
          hunterAvatar: apply.hunter.metadata.avatar,
          data: apply.data.twitter,
        }
    })
    const result: any[] = []
    flatRelatedAppliesTwitterData.forEach((applyData) => {
      const stepData = applyData?.data
      for (let index = 0; index < stepData.length; index++) {
        const task = stepData[index]
        if (task.type === 'follow') continue
        if (task.finished && task.link && task.shareTime) {
          result.push({
            hunterName: applyData?.hunterName,
            hunterAvatar: applyData?.hunterAvatar,
            shareTime: task.shareTime,
            link: task.link,
          })
        }
      }
    })
    result.push({
      hunterAvatar: 'http://pbs.twimg.com/profile_images/1395204286376660996/JZSHbAWa_normal.jpg',
      hunterName: 'zyta1820001',
      link: 'https://twitter.com/zyta182000/status/1511533871040323586',
      shareTime: 1649216261000,
    })
    result.push({
      hunterAvatar: 'http://pbs.twimg.com/profile_images/1395204286376660996/JZSHbAWa_normal.jpg',
      hunterName: 'zyta1820002',
      link: 'https://twitter.com/zyta182000/status/1511533871040323586',
      shareTime: 1648984050872,
    })
    return result
  }

  @computed get displayedTwitterSharedLinkList() {
    let result = this.twitterSharedLinkList
    if (!_.isEmpty(this.nameInputModel)) result = result.filter((item) => item.hunterName === this.nameInputModel)
    return result
  }

  @computed get totalTwitterShare() {
    return this.twitterSharedLinkList.length || 0
  }

  @computed get uniqueHunterNameList() {
    return _.uniqBy(this.twitterSharedLinkList, 'hunterName')
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
            completeTime_gte: moment.utc(sortedDateRanges[0]).toISOString(),
          },
        ],
      }
    if (this.dateRanges.length > 1) {
      result = {
        _where: [
          ...result._where,
          {
            completeTime_lte: moment.utc(sortedDateRanges[1]).add(1, 'd').toISOString(),
          },
        ],
      }
    }
    return result
  }

  @computed get projectLogo() {
    return _.get(this.task, 'metadata.projectLogo', '')
  }
}

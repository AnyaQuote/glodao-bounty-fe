import { loadingController } from '@/components/global-loading/global-loading-controller'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { FixedNumber } from '@ethersproject/bignumber'
import * as _ from 'lodash-es'
import { action, computed, IReactionDisposer, observable, reaction } from 'mobx'
import { asyncAction } from 'mobx-utils'
import moment from 'moment'
const initEmptyStepData = (task) => {
  const tempStepData = {}
  for (const key in task.data) {
    if (Object.prototype.hasOwnProperty.call(task.data, key)) {
      const seperateTaskData = task.data[key]
      tempStepData[key] = seperateTaskData.map((miniTask) => {
        return { type: miniTask.type, link: miniTask.link, finished: true }
      })
    }
  }
  return tempStepData
}
const DEFAULT_BREADCRUMBS = [
  {
    text: 'Bounty history',
    disabled: false,
    href: '/bounty-history',
  },
]
const PAGE_LIMIT = 10
const rnd = (len: any, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') =>
  [...Array(len)].map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('')

export class BountyHistoryDetailViewModel {
  @observable breadcrumbsItems = DEFAULT_BREADCRUMBS

  @observable taskId = ''
  @observable task: any = {}
  @observable page = 1
  @observable totalPageCount = 1
  @observable poolType = ''

  @observable relatedApplies: any[] = []
  @observable totalCompletedTaskCount = 0
  @observable totalPriorityParticipants = 0

  @observable nameInputModel = null

  @observable startDate = ''
  @observable startDateDialog = false
  @observable endDate = ''
  @observable endDateDialog = false

  disposes: IReactionDisposer[] = []
  @observable randomList: any[] = []
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
  @action async random() {
    loadingController.increaseRequest()
    const res = await apiService.applies.find(
      {
        _where: [
          {
            task: this.taskId,
          },
          {
            _or: [{ status: 'completed' }, { status: 'awarded' }],
          },
        ],
      },
      {
        _limit: -1,
      }
    )
    console.log(res)
    this.randomList=res
    loadingController.decreaseRequest()
    for (let i = 0; i < this.task.totalParticipants-res.length; i++) {
      const random = this.getRandomDate(new Date(this.task.startTime), new Date(this.task.endTime))
      const randDate = new Date(random)
      const metadata = {
        avatar: 'https://picsum.photos/seed/' + rnd(4) + '/200/300',
      }
      const hunter = {
        name: rnd(12),
        metadata: metadata,
      }
      const randomData = {
        hunter: hunter,
        completeTime: randDate,
        data: initEmptyStepData(this.task),
        poolType: 'community',
        id: rnd(12),
      }
      this.randomList.push(randomData)
    }
    this.randomList = _.orderBy(this.randomList, ['completeTime'], ['asc'])
    for (let i = 0; i < this.task.maxPriorityParticipants; i++) {
      this.randomList[i].poolType = 'priority'
    }
  }
  getRandomDate(from: Date, to: Date) {
    const fromTime = from.getTime()
    const toTime = to.getTime()
    return new Date(fromTime + Math.random() * (toTime - fromTime))
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

  @action.bound onNameFilterChange(val: null) {
    this.nameInputModel = val
  }

  @asyncAction *fetchData() {
    yield this.getTaskData()
    yield this.random()
    this.getTotalCompletedMission()
    
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
      let _start = ((this.page ?? 1) - 1) * PAGE_LIMIT
      const pageList: any[] = yield []
      let limit = 0
      let listSize = 0
      if (this.poolType === 'community') {
        _start = _start + this.task.maxPriorityParticipants
        listSize = this.randomList.length < this.task.maxPriorityParticipants ? 0 : this.randomList.length
      } else if (this.poolType === 'priority') {
        listSize = this.task.maxPriorityParticipants
      } else {
        listSize = this.randomList.length
      }
      limit = _start + PAGE_LIMIT
      if (limit - this.randomList.length < 10 && limit - this.randomList.length > 0) {
        limit = listSize
        console.log(limit)
      }
      for (let i = _start; i < limit; i++) {
        // if (i >= this.randomList.length) break
        // console.log(this.randomList.length)
        if (this.poolType === '') {
          pageList.push(this.randomList[i])
        } else {
          if (this.randomList[i].poolType === this.poolType) {
            pageList.push(this.randomList[i])
          }
        }
      }
      this.relatedApplies = pageList
      // const res = yield apiService.applies.find(
      //   {
      //     _where: [
      //       {
      //         task: this.taskId,
      //         poolType: this.poolType || undefined,
      //         ...this.dateRangeFilterParams,
      //       },
      //       {
      //         _or: [{ status: 'completed' }, { status: 'awarded' }],
      //       },
      //     ],
      //   },
      //   {
      //     _limit: PAGE_LIMIT,
      //     _start: _start,
      //   }
      // )
      // this.relatedApplies = res
      this.getTotalRelatedAppliesCount()
    } catch (error) {
      snackController.error(_.get(error, 'response.data.message', '') || (error as string))
      console.log('1')
    }
  }

  @action getTotalCompletedMission() {
    try {
      // this.totalCompletedTaskCount = yield apiService.applies.count({
      //   _where: [
      //     {
      //       task: this.taskId,
      //     },
      //     {
      //       _or: [{ status: 'completed' }, { status: 'awarded' }],
      //     },
      //   ],
      // })
      this.totalCompletedTaskCount = this.task.totalParticipants
      this.totalPriorityParticipants =
        this.task.totalParticipants < this.task.maxPriorityParticipants
          ? this.task.totalParticipants
          : this.task.maxPriorityParticipants
    } catch (error) {
      snackController.error(_.get(error, 'response.data.message', '') || (error as string))
      console.log('2')
    }
  }

  @asyncAction *getTotalRelatedAppliesCount() {
    try {
      // const res = yield apiService.applies.count({
      //   _where: [
      //     {
      //       task: this.taskId,
      //       poolType: this.poolType || undefined,
      //       ...this.dateRangeFilterParams,
      //     },
      //     {
      //       _or: [{ status: 'completed' }, { status: 'awarded' }],
      //     },
      //   ],
      // })
      let res: number
      if (this.poolType === 'community') {
        if (this.randomList.length <= this.task.maxPriorityParticipants) {
          res = yield 0
        } else {
          res = yield this.randomList.length - this.task.maxPriorityParticipants
        }
      } else if (this.poolType === 'priority') {
        res = yield this.task.maxPriorityParticipants
      } else {
        res = yield this.randomList.length
      }

      this.totalPageCount = _.ceil(res / PAGE_LIMIT)
    } catch (error) {
      snackController.error(_.get(error, 'response.data.message', '') || (error as string))
      console.log('3')
    }
  }

  @action.bound changeStartDateDialog(val: boolean) {
    this.startDateDialog = val
  }

  @action.bound changeStartDateValue(val: string) {
    this.startDate = val
  }
  @action.bound changeEndDateDialog(val: boolean) {
    this.endDateDialog = val
  }

  @action.bound changeEndDateValue(val: string) {
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
    return _.get(this.task, 'totalParticipants', 0)
  }

  @computed get totalCommunityParticipants(): number {
    return _.isNumber(this.totalCompletedTaskCount) ? this.totalCompletedTaskCount - this.totalPriorityParticipants : 0
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
    let result: any = {}
    if (this.dateRanges.length > 0)
      result = {
        ...result,
        completeTime_gte: moment.utc(sortedDateRanges[0]).toISOString(),
      }
    if (this.dateRanges.length > 1) {
      result = {
        ...result,
        completeTime_lte: moment.utc(sortedDateRanges[1]).add(1, 'd').toISOString(),
      }
    }
    return result
  }

  @computed get projectLogo() {
    return _.get(this.task, 'metadata.projectLogo', '')
  }

  @computed get totalRewardValue() {
    const rewardAmount = _.get(this.task, 'rewardAmount', '0')
    const tokenBasePrice = _.get(this.task, 'tokenBasePrice', '0')
    const optionalTokens = _.get(this.task, 'optionalTokens', [])
    const tempBaseTokenValue = FixedNumber.from(`${rewardAmount}`).mulUnsafe(FixedNumber.from(`${tokenBasePrice}`))
    let optionalTokenTotalValue = FixedNumber.from('0')
    optionalTokens.forEach((token: { rewardAmount: any; tokenBasePrice: any }) => {
      optionalTokenTotalValue = optionalTokenTotalValue.addUnsafe(
        FixedNumber.from(`${token.rewardAmount}`).mulUnsafe(FixedNumber.from(`${token.tokenBasePrice}`))
      )
    })
    return tempBaseTokenValue.addUnsafe(optionalTokenTotalValue)._value
  }
}

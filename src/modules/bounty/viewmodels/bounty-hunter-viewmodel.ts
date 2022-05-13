import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { get, keys } from 'lodash-es'
import * as _ from 'lodash-es'

import { action, computed, observable, reaction } from 'mobx'
import { asyncAction, IDisposer } from 'mobx-utils'
import moment from 'moment'

const PAGE_LIMIT = 6
export class BountyHunterViewModel {
  @observable activeBountyList: any[] = []

  @observable bountyList: any[] = []
  @observable bountyCount = 0
  @observable page = 1
  @observable currentApplies: any[] = []

  @observable sortParams = 'createdAt:DESC'
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

  @observable dateRanges = []
  @observable dateRangeDialog = false
  _disposers: IDisposer[] = []

  constructor() {
    //
    this.getAllActiveBounty()
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
        () => this.sortParams,
        () => {
          this.getBountyListByPage(1)
        }
      ),
      reaction(
        () => this.dateRanges,
        () => {
          this.getBountyListByPage(1)
          this.getTotalBountyCount()
        }
      ),
    ]
  }

  destroyReaction() {
    this._disposers.forEach((d) => d())
  }

  @asyncAction *getAllActiveBounty() {
    try {
      this.activeBountyList = yield apiService.tasks.find({ endTime_gt: moment().toISOString() })
    } catch (error) {
      this.activeBountyList = []
      snackController.error(error as string)
    }
  }

  @computed get liveBountyList() {
    return _.filter(
      this.activeBountyList,
      (bounty) => moment().isBefore(moment(bounty.endTime)) && moment().isAfter(moment(bounty.startTime))
    )
  }

  @computed get upcomingBountyList() {
    return _.orderBy(
      _.filter(this.activeBountyList, (bounty) => moment().isBefore(moment(bounty.startTime))),
      ['startTime'],
      ['asc']
    ).slice(0, 5)
  }

  @asyncAction *getBountyListByPage(page?: number) {
    try {
      if (page) this.page = page
      const _start = ((this.page ?? 1) - 1) * PAGE_LIMIT
      const res = yield apiService.tasks.find(
        { status: 'ended', ...this.dateRangeFilterParams },
        {
          _limit: PAGE_LIMIT,
          _start: _start,
          _sort: this.sortParams,
        }
      )
      if (this.page === 1) this.bountyList = res
      else this.bountyList = [...this.bountyList, ...res]
      this.page += 1
    } catch (error) {
      this.bountyList = []
      snackController.error(error as string)
    }
  }

  @asyncAction *getTotalBountyCount() {
    this.bountyCount = yield apiService.tasks.count({ status: 'ended', ...this.dateRangeFilterParams })
  }

  @asyncAction *getCurrentTask() {
    try {
      if (!authStore.jwt) return
      const res = yield apiService.applies.find({ hunter: authStore.user.hunter.id }, { _limit: 4 })
      this.currentApplies = res
    } catch (error) {
      this.currentApplies = []
      snackController.error(error as string)
    }
  }

  @action.bound changeDateRangeDialog(value: boolean) {
    this.dateRangeDialog = value
  }

  @action.bound changeDateRange(value) {
    this.dateRanges = value
  }

  @action.bound onSortConditionChange(value: string) {
    this.sortParams = value
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
        endTime: bounty.endTime,
        rewardAmount: bounty.rewardAmount,
        chainId: bounty.chainId,
        metadata: bounty.metadata,
        types: keys(bounty.data),
        maxParticipant: bounty.maxParticipant,
        totalParticipants: bounty.totalParticipants,
        missionIndex: get(bounty, 'missionIndex', 0),
      }
    })
  }
  @computed get convertedLiveBountyList() {
    return this.liveBountyList.map((bounty) => {
      return {
        name: bounty.name,
        id: bounty.id,
        startTime: bounty.startTime,
        endTime: bounty.endTime,
        rewardAmount: bounty.rewardAmount,
        tokenName: get(bounty, 'metadata.rewardToken', ''),
        chainId: bounty.chainId,
        metadata: get(bounty, 'metadata', {}),
        coverImage: get(
          bounty,
          'metadata.coverImage',
          'https://diversity-api.contracts.dev/uploads/download_cff108eb0b.png'
        ),
        projectLogo: bounty.metadata.projectLogo,
        types: keys(bounty.data),
        maxParticipant: bounty.maxParticipant,
        participant: bounty.totalParticipants,
        tokenBasePrice: bounty.tokenBasePrice,
        shortDescription: get(bounty, 'metadata.shortDescription', 'TBA'),
        missionIndex: get(bounty, 'missionIndex', 0),
      }
    })
  }
  @computed get convertedUpcomingBountyList() {
    return this.upcomingBountyList.map((bounty) => {
      return {
        name: bounty.name,
        id: bounty.id,
        startTime: bounty.startTime,
        endTime: bounty.endTime,
        rewardAmount: bounty.rewardAmount,
        chainId: bounty.chainId,
        metadata: bounty.metadata,
        types: keys(bounty.data),
        maxParticipant: bounty.maxParticipant,
        missionIndex: get(bounty, 'missionIndex', 0),
      }
    })
  }

  @computed get currentTaskList() {
    return this.currentApplies.map((apply) => {
      const task = apply.task
      const types = keys(task.data)
      let currentStepCount = 0
      let totalStepCount = 0
      types.forEach((type) => {
        currentStepCount += apply.data[type].filter((step) => step.finished).length
        totalStepCount += apply.data[type].length
      })
      return {
        id: apply.id,
        status: apply.status,
        name: task.name,
        shortDescription: task.metadata?.shortDescription,
        chainId: task.chainId,
        type: types[0],
        // currentStep: firstTask.filter((step) => step.finished === true).length,
        currentStep: currentStepCount,
        totalStep: totalStepCount,
        taskId: task.id,
        types,
        task: task,
        projectLogo: get(task, 'metadata.projectLogo', ''),
      }
    })
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

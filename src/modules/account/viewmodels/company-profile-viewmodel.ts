import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { Zero } from '@/constants'
import { generateRandomString } from '@/helpers'
import { bigNumberHelper } from '@/helpers/bignumber-helper'
import router from '@/router'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { walletStore } from '@/stores/wallet-store'
import { FixedNumber } from '@ethersproject/bignumber'
import { ceil, get, isEmpty, isEqual, keys, lowerCase, orderBy } from 'lodash-es'
import { action, computed, observable, reaction } from 'mobx'
import { asyncAction, IDisposer } from 'mobx-utils'
import moment from 'moment'

const PAGE_LIMIT = 6
const params = { hunter: get(authStore, 'user.hunter.id', '') }
export class CompanyProfileViewModel {
  @observable newCampaignDialog = false
  @observable newCampaignDialogInput = ''
  @observable randomCampaignCode = ''
  @observable newCampaignDialogLoading = false
  @observable campaignList: any[] = []

  @observable huntingList: any[] = []
  @observable huntingCount = 0
  @observable page = 1
  @observable completedTaskCount = 0
  @observable processingTaskCount = 0

  @observable stakeAmount = 0
  @observable tokenBasePrice = 2

  @observable stakeStatus = false

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

  @observable loading = false

  @observable completedHuntingList: any[] = []

  constructor() {
    if (isEmpty(authStore.jwt))
      router.push('/bounty').catch(() => {
        //
      })
    else {
      this.fetchData()
    }
  }

  initReaction() {
    this._disposers = [
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
    ]
  }

  destroyReaction() {
    this._disposers.forEach((d) => d())
  }

  @action fetchData() {
    this.loading = true
    Promise.allSettled([
      this.getHuntingListByPage(),
      this.getTotalHuntingCount(),
      this.getProcessingAndCompletedTaskCount(),
      this.getCompletedHuntingBounty(),
      this.getAllCampaigns(),
    ]).finally(() => {
      this.loading = false
    })
  }

  @asyncAction *getCompletedHuntingBounty() {
    try {
      const huntingListParams = {
        _limit: -1,
        ...params,
        status: 'awarded',
      }
      const res = yield apiService.applies.find(huntingListParams)
      this.completedHuntingList = res
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @asyncAction *getAllCampaigns() {
    try {
      this.campaignList = yield apiService.campaigns.find({ owner: authStore.hunterId }, { _limit: -1 })
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @action onShouldGetHuntingList() {
    if (this.page !== 1) this.page = 1
    else this.getHuntingListByPage(1)
  }

  @action.bound onSortConditionChange(value: string) {
    this.sortParams = value
  }

  @action.bound changeDateRangeDialog(value: boolean) {
    this.dateRangeDialog = value
  }

  @action.bound changeDateRange(value) {
    this.dateRanges = value
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

  @asyncAction *getStakeStatus() {
    try {
      if (isEmpty(walletStore.account) || isEmpty(authStore.jwt)) {
        this.stakeStatus = false
        // this.isValidStakeAmount = false
      } else {
        const res = yield apiService.checkStakeStatus(walletStore.account, get(authStore, 'user.hunter.id', ''))
        // if (
        //   bigNumberHelper.gte(
        //     FixedNumber.from(`${(res as any)._value}`).mulUnsafe(this.tokenBasePrice),
        //     MIN_STAKE_VALUE
        //   )
        // )
        //   this.isValidStakeAmount = true
        if (bigNumberHelper.gt(FixedNumber.from(`${(res as any)._value}`), Zero)) this.stakeStatus = true
        this.stakeAmount = res._value
      }
    } catch (error: any) {
      snackController.error('Error: Cant get stake status - ' + error)
    }
  }

  @action.bound changeNewCampaignDialog(value: boolean) {
    this.newCampaignDialog = value
    this.resetNewCampaignDialog()
  }

  @action resetNewCampaignDialog() {
    //
    this.randomCampaignCode = generateRandomString()
    this.newCampaignDialogInput = ''
  }

  @action.bound changeNewCampaignDialogInput(value: string) {
    this.newCampaignDialogInput = value
  }

  @asyncAction *submitNewCampaignForm() {
    if (!this.newCampaignDialogInput || !this.randomCampaignCode || !authStore.hunterId) {
      snackController.error('Can not create new campaign: missing data')
      return
    }
    try {
      this.newCampaignDialogLoading = true
      const res = yield apiService.campaigns.create({
        name: this.newCampaignDialogInput,
        code: this.randomCampaignCode,
        owner: authStore.hunterId,
      })
      this.campaignList = [...this.campaignList, res]
      this.changeNewCampaignDialog(false)
      snackController.success('Create new campaign successfully')
    } catch (error) {
      snackController.error(error as string)
    } finally {
      this.newCampaignDialogLoading = false
    }
  }

  @computed get isStaked() {
    return bigNumberHelper.gt(FixedNumber.from(this.stakeAmount), Zero)
  }

  @computed get stakeValue() {
    return FixedNumber.from(this.stakeAmount).mulUnsafe(FixedNumber.from(this.tokenBasePrice))._value
  }

  @computed get connectedWalletAddress() {
    return get(walletStore, 'account', '')
  }

  @computed get registedWalletAddress() {
    return get(authStore, 'user.hunter.address', '')
  }

  @computed get isWalletConnected() {
    return !isEmpty(this.connectedWalletAddress)
  }

  @computed get isWalletMatched() {
    return this.isWalletConnected && isEqual(this.connectedWalletAddress, this.registedWalletAddress)
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
        projectLogo: task.metadata?.projectLogo,
        missionIndex: get(task, 'missionIndex', 0),
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
        { hunter: get(authStore, 'user.hunter.id', '') },
        ...this.dateRangeFilterParams,
        { _or: [...this.statusFilterParams] },
      ],
    }
  }
  @computed get totalHuntingListBounty() {
    return this.completedHuntingList.reduce(
      (acc, current) => acc.addUnsafe(FixedNumber.from(current.bounty)),
      FixedNumber.from('0')
    )._value
  }

  @computed get todayHuntingListBounty() {
    return this.completedHuntingList.reduce(
      (acc, current) =>
        acc.addUnsafe(FixedNumber.from(moment().diff(moment(current.updatedAt), 'hours') <= 24 ? current.bounty : '0')),
      FixedNumber.from('0')
    )._value
  }

  @computed get totalEarning() {
    return FixedNumber.from('0').addUnsafe(FixedNumber.from(this.totalHuntingListBounty))._value
  }

  @computed get totalEarningToday() {
    return FixedNumber.from('0').addUnsafe(FixedNumber.from(this.todayHuntingListBounty))._value
  }

  @computed get totalCampaignCount() {
    return this.campaignList.length || 'TBA'
  }
}

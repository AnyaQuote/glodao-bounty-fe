import { loadingController } from '@/components/global-loading/global-loading-controller'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { Zero } from '@/constants'
import { bigNumberHelper } from '@/helpers/bignumber-helper'
import { promiseHelper } from '@/helpers/promise-helper'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { walletStore } from '@/stores/wallet-store'
import { FixedNumber } from '@ethersproject/bignumber'
import { divide, get, gte, isEmpty, isEqual, keys, merge, subtract, sumBy, uniqBy } from 'lodash-es'
import { action, computed, IReactionDisposer, observable, reaction } from 'mobx'
import { asyncAction } from 'mobx-utils'
import moment from 'moment'

export enum HUNTING {
  start,
  hunting,
  finish,
}

const APPLY_STATUS = {
  PROCESSING: 'processing',
  COMPLETED: 'completed',
}

const POOL_TYPES = {
  PRIORITY: 'priority',
  COMMUNITY: 'community',
}

const ACCOUNT_MIN_AGE_IN_DAYS = 90

const MIN_STAKE_VALUE = FixedNumber.from(1000)

const DEFAULT_BREADCRUMBS = [
  {
    text: 'Bounty hunter',
    disabled: false,
    href: '/bounty',
  },
]

export interface SharePerson {
  avatar: string
  name: string
  time: string
  link: string
}

export class BountyDetailViewModel {
  @observable breadcrumbsItems = DEFAULT_BREADCRUMBS
  @observable taskId = ''
  @observable status: HUNTING = HUNTING.start
  @observable hunters: any = []

  @observable task: any = {}
  @observable relatedApplies: any[] = []
  @observable hunterId = authStore.user?.hunter?.id ?? ''

  @observable apply: any = {}
  @observable applyStepData: any = {}

  @observable reCaptchaDialog = false
  @observable confirmCaptcha = false

  @observable earnDialog = false
  @observable earnDialogWalletInput = authStore.user?.hunter?.address ?? ''

  @observable currentTime = Date.now()
  currentTimeInterval: NodeJS.Timer

  @observable stakeStatus = false
  @observable isValidStakeAmount = false

  @observable statistical = {
    total: 100,
    daily: 10000,
    twitter: 100000,
  }

  @observable isStartingProcess = false
  @observable isApplyPrioritying = false
  @observable isTaskUpdating = false
  @observable isTaskSubmiting = false

  @observable currentType = 'twitter'

  @observable topCompletedApplies: any[] = []

  @observable hCaptchaToken = ''

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
        () => this.task,
        () => {
          this.generateBreadcrumbsItems()
        }
      ),
      reaction(
        () => authStore.user.hunter?.address,
        () => {
          this.changeEarnDialogWalletInput(authStore.user.hunter.address)
        }
      ),
      reaction(
        () => walletStore.account,
        () => {
          this.getStakeStatus()
        }
      ),
    ]
    this.currentTimeInterval = setInterval(() => this.setCurrentTime(), 1000)
  }

  destroyReaction() {
    this.disposes.forEach((d) => d())
    if (this.currentTimeInterval) clearInterval(this.currentTimeInterval)
  }

  @asyncAction *getStakeStatus() {
    try {
      if (isEmpty(walletStore.account) || isEmpty(authStore.jwt)) {
        this.stakeStatus = false
        this.isValidStakeAmount = false
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
      }
    } catch (error: any) {
      snackController.error('Error: Cant get stake status - ' + error)
    }
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

  @action.bound changeEarnDialog(value: boolean) {
    this.earnDialog = value
  }

  @action.bound changeEarnDialogWalletInput(value: string) {
    this.earnDialogWalletInput = value
  }

  @action setCurrentTime() {
    this.currentTime = Date.now()
  }

  @action reset() {
    this.taskId = ''
    this.task = {}
    this.apply = {}
    this.applyStepData = {}
  }

  @action taskIdChange(taskId: string) {
    this.taskId = taskId
  }

  @action.bound startHunting() {
    if (!authStore.jwt) {
      authStore.changeTwitterLoginDialog(true)
      return
    }
    if (!this.isTaskStarted) {
      snackController.error('The pool has not started yet!')
      return
    }
    try {
      apiService.applies
        .count({
          task: this.taskId,
          hunter: this.hunterId,
        })
        .then((res) => {
          if (res === 0) {
            this.changeRecaptchaDialog(true)
          }
        })
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @asyncAction *createApply() {
    try {
      this.changeIsStartingProcess(true)
      const res = yield apiService.applies.create({
        data: this.applyStepData,
        ID: `${this.taskId}_${authStore.user.hunter.id}`,
        hunter: authStore.user.hunter.id,
        task: this.taskId,
        status: APPLY_STATUS.PROCESSING,
      })

      if (res) {
        this.apply = res
        this.status = HUNTING.hunting
        this.fetchData()
      }
      snackController.success('Apply for bounty hunting successfully')
    } catch (error) {
      snackController.error(get(error, 'response.data.message', '') || (error as string))
    } finally {
      this.changeIsStartingProcess(false)
    }
  }

  @asyncAction *fetchData() {
    loadingController.increaseRequest()
    yield this.getTaskData()
    this.initEmptyStepData()
    yield this.getApplyData()
    yield this.getParticipantCount()
    yield this.getStakeStatus()
    loadingController.decreaseRequest()
  }

  @asyncAction *getTaskData() {
    try {
      const res = yield apiService.tasks.findOne(this.taskId)
      this.task = res
    } catch (error) {
      snackController.error(get(error, 'response.data.message', '') || (error as string))
    }
  }

  @asyncAction *getParticipantCount() {
    try {
      if (this.maxPriorityParticipants === 0) return
      this.topCompletedApplies = yield apiService.applies.find(
        { task: this.taskId, status_ne: 'processing' },
        { _limit: this.maxPriorityParticipants, _sort: 'completeTime:ASC' }
      )
    } catch (error) {
      snackController.error('Can not get pool statistics! Please try again later')
    }
  }

  @action initEmptyStepData() {
    const tempStepData: any = {}
    for (const key in this.task?.data) {
      if (Object.prototype.hasOwnProperty.call(this.task?.data, key)) {
        const seperateTaskData = this.task?.data[key]
        tempStepData[key] = seperateTaskData.map((miniTask) => {
          return { type: miniTask.type, link: '', finished: false }
        })
      }
    }
    this.applyStepData = tempStepData
  }

  @asyncAction *getApplyData() {
    try {
      if (!authStore.jwt || !this.taskId) return
      const res = yield apiService.applies.find({
        task: this.taskId,
        hunter: this.hunterId,
      })
      if (res.length > 0 && res[0].data) {
        const apply = res[0]
        this.applyStepData = merge(this.applyStepData, res[0].data)
        if (apply.status === APPLY_STATUS.PROCESSING) this.status = HUNTING.hunting
        else this.status = HUNTING.finish
        this.apply = apply
      }
      if (!this.isTaskStarted) this.status = HUNTING.start
      else if (this.isTaskEnded) this.status = HUNTING.finish
    } catch (error) {
      snackController.error(get(error, 'response.data.message', '') || (error as string))
    }
  }

  @action.bound submitQuizRevalidation(quizId) {
    //
    this.changeTaskUpdating(true)
    promiseHelper.delay(2000).then(() => {
      apiService
        .updateTaskProcess(this.apply.id, 'quizRevalidate', {}, { walletAddress: walletStore.account, quizId })
        .then((res) => {
          this.applyStepData = res.data
          this.apply = res
          this.getTaskData()
          const foundIndex = this.relatedApplies.findIndex((apply) => isEqual(apply.id, get(this.apply, 'id', '')))
          this.relatedApplies[foundIndex] = this.apply
          snackController.updateSuccess()
        })
        .catch((error) => {
          const updatedApply = get(error, 'response.data.data', {})
          if (!isEmpty(updatedApply)) {
            this.apply = updatedApply
            this.applyStepData = updatedApply.data
            const foundIndex = this.relatedApplies.findIndex((apply) => isEqual(apply.id, get(this.apply, 'id', '')))
            this.relatedApplies[foundIndex] = this.apply
          }
          snackController.error(get(error, 'response.data.message', '') || (error as string))
        })
        .finally(() => {
          this.changeTaskUpdating(false)
        })
    })
  }

  @action.bound submitLink(type: string, link: string, stepIndex: number, optional = {}) {
    this.changeTaskUpdating(true)
    const temp = JSON.parse(JSON.stringify(this.applyStepData))
    temp[type][stepIndex].link = link
    temp[type][stepIndex].finished = true
    temp[type][stepIndex].shareTime = Date.now()
    promiseHelper.delay(2000).then(() => {
      apiService
        .updateTaskProcess(this.apply.id, type, temp, { walletAddress: walletStore.account, ...optional })
        .then((res) => {
          this.applyStepData = res.data
          this.apply = res
          this.getTaskData()
          const foundIndex = this.relatedApplies.findIndex((apply) => isEqual(apply.id, get(this.apply, 'id', '')))
          this.relatedApplies[foundIndex] = this.apply
          snackController.updateSuccess()
        })
        .catch((error) => {
          const updatedApply = get(error, 'response.data.data', {})
          if (!isEmpty(updatedApply)) {
            this.apply = updatedApply
            this.applyStepData = updatedApply.data
            const foundIndex = this.relatedApplies.findIndex((apply) => isEqual(apply.id, get(this.apply, 'id', '')))
            this.relatedApplies[foundIndex] = this.apply
          }
          snackController.error(get(error, 'response.data.message', '') || (error as string))
        })
        .finally(() => {
          this.changeTaskUpdating(false)
        })
    })
  }

  @action.bound submitQuizRecordShareLink(type: string, link: string, stepIndex: number, optional = {}) {
    this.changeTaskUpdating(true)
    const temp = JSON.parse(JSON.stringify(this.applyStepData))

    temp['quiz'][stepIndex].link = link
    temp['quiz'][stepIndex].finished = true
    temp['quiz'][stepIndex].shareTime = Date.now()
    promiseHelper.delay(2000).then(() => {
      apiService
        .updateTaskProcess(this.apply.id, type, temp, { walletAddress: walletStore.account, ...optional })
        .then((res) => {
          this.applyStepData = res.data
          this.apply = res
          this.getTaskData()
          const foundIndex = this.relatedApplies.findIndex((apply) => isEqual(apply.id, get(this.apply, 'id', '')))
          this.relatedApplies[foundIndex] = this.apply
          snackController.updateSuccess()
        })
        .catch((error) => {
          const updatedApply = get(error, 'response.data.data', {})
          if (!isEmpty(updatedApply)) {
            this.apply = updatedApply
            this.applyStepData = updatedApply.data
            const foundIndex = this.relatedApplies.findIndex((apply) => isEqual(apply.id, get(this.apply, 'id', '')))
            this.relatedApplies[foundIndex] = this.apply
          }
          snackController.error(get(error, 'response.data.message', '') || (error as string))
        })
        .finally(() => {
          this.changeTaskUpdating(false)
        })
    })
  }

  @action.bound submitTaskConfirmation(type: string) {
    this.changeTaskSubmiting(true)
    apiService
      .updateTaskProcess(this.apply.id, 'finish', null, { walletAddress: walletStore.account })
      .then((res) => {
        this.apply = res
        this.status = HUNTING.finish
        this.changeEarnDialog(false)
        snackController.success('Submit successfully')
        this.fetchData()
      })
      .catch((error) => {
        snackController.error(get(error, 'response.data.message', '') || (error as string))
      })
      .finally(() => {
        this.changeTaskSubmiting(false)
      })
  }

  @action.bound changeRecaptchaDialog(value: boolean) {
    this.reCaptchaDialog = value
  }

  @action.bound changeRecaptchaConfirm(value: boolean) {
    this.confirmCaptcha = value
    if (value) {
      setTimeout(() => {
        this.changeRecaptchaDialog(false)
        this.createApply()
      }, 500)
    }
  }

  @action.bound changeIsStartingProcess(value: boolean) {
    this.isStartingProcess = value
  }
  @action.bound changeApplyPrioritying(value: boolean) {
    this.isApplyPrioritying = value
  }

  @action.bound changeTaskUpdating(value: boolean) {
    this.isTaskUpdating = value
  }

  @action.bound changeTaskSubmiting(value: boolean) {
    this.isTaskSubmiting = value
  }

  @action resetHCaptchaToken() {
    this.hCaptchaToken = ''
  }

  @asyncAction *applyForPriorityPool() {
    try {
      this.changeApplyPrioritying(true)
      if (this.isPriorityPoolFull) {
        snackController.error('There are not any priority pool slot left!')
      } else if (!this.isStaker) {
        snackController.error('Only GloDAO stacker can apply for priority pool')
      } else {
        // const signature = yield authStore.signMessage(
        //   walletStore.account,
        //   'bsc',
        //   get(authStore.user, 'hunter.nonce', 0)
        // )
        const res = yield apiService.applyForPriorityPool(
          walletStore.account,
          'signature',
          'bsc',
          get(this.apply, 'id', ''),
          get(authStore.user, 'hunter.id', ''),
          get(this.task, 'id', ''),
          0
        )
        this.apply = res
        // this.currentPriorityParticipants += 1
        // this.topCompletedApplies.push(this.apply)
        snackController.success('Apply for priority pool successfully')
        // authStore.getUserData()
      }
    } catch (error: any) {
      snackController.error('Fail to enter priority pool: ' + error.response.data.message)
    } finally {
      this.changeApplyPrioritying(false)
    }
  }

  @computed get displayedData() {
    const stepTypes = keys(this.applyStepData)
    const tempStepData: any = {}

    stepTypes.forEach((type) => {
      tempStepData[type] = this.applyStepData[type].map((step) => {
        const result = { ...step, stepLink: step.link }
        if (Object.prototype.hasOwnProperty.call(result, 'link')) delete result.link
        return result
      })
    })
    const res = merge(tempStepData, this.task.data)

    return res
  }

  @computed get displayedTwitterData() {
    const result = get(this.displayedData, 'twitter', []).map((task) => {
      return { ...task, activeStep: false }
    })
    if (isEmpty(result)) return []

    result[0].activeStep = true
    for (let index = 1; index < result.length; index++) {
      if (result[index - 1].finished) {
        result[index].activeStep = true
        result[index - 1].activeStep = false
      }
    }

    return result
  }

  @computed get displayedTelegramData() {
    const result = get(this.displayedData, 'telegram', []).map((task) => {
      return { ...task, activeStep: false }
    })
    if (isEmpty(result)) return []

    result[0].activeStep = true
    for (let index = 1; index < result.length; index++) {
      if (result[index - 1].finished) {
        result[index].activeStep = true
        result[index - 1].activeStep = false
      }
    }

    return result
  }

  @computed get displayedQuizTaskData() {
    const result = get(this.displayedData, 'quiz', []).map((task) => {
      return { ...task, activeStep: false }
    })
    if (isEmpty(result)) return []

    result[0].activeStep = true
    for (let index = 1; index < result.length; index++) {
      if (result[index - 1].finished) {
        result[index].activeStep = true
        result[index - 1].activeStep = false
      }
    }

    return result
  }

  @computed get remainingSlot() {
    if (this.task?.maxParticipant) return this.task.maxParticipant - this.relatedApplies.length
    return 'Unlimited'
  }

  @computed get remainingReward() {
    if (!this.task?.rewardAmount) return 0
    const totalSpentReward = sumBy(this.relatedApplies, (apply) => {
      if (apply.bounty) return apply.bounty
      else return 0
    })

    return this.task.rewardAmount - totalSpentReward
  }

  @computed get remainingRewardExchanged() {
    return FixedNumber.from(this.remainingReward.toString()).mulUnsafe(this.tokenBasePrice)._value || 'TBA'
  }

  @computed get taskProgressPercentage() {
    return (this.relatedApplies.length / this.task.maxParticipant) * 100
  }

  @computed get currentParticipant() {
    return this.relatedApplies.length
  }

  @computed get isTaskStarted() {
    return moment(this.currentTime).isAfter(this.task.startTime)
  }

  @computed get isTaskEnded() {
    return moment(this.currentTime).isAfter(this.task.endTime)
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
    return result
  }

  @computed get totalTwitterShare() {
    return this.twitterSharedLinkList.length ?? 0
  }

  @computed get uniqueTwitterAccountCount() {
    const uniqByName = uniqBy(this.twitterSharedLinkList, 'hunterName')
    return uniqByName.length
  }

  @computed get dailyTwitterShareCount() {
    let count = 0
    this.twitterSharedLinkList.forEach((data) => {
      const momentObj = moment(data.shareTime)
      const currentDate = Date.now()
      if (
        momentObj.isSame(currentDate, 'day') &&
        momentObj.isSame(currentDate, 'month') &&
        momentObj.isSame(currentDate, 'year')
      )
        count++
    })
    return count
  }

  @computed get percent() {
    if (!this.task?.maxParticipant) {
      return 0
    }
    return (900 / this.task?.maxParticipant) * 100
  }

  @computed get isAccountAgeQualify() {
    return authStore.accountAge > ACCOUNT_MIN_AGE_IN_DAYS
  }

  @computed get projectLogo() {
    return get(this.task, 'metadata.projectLogo', '')
  }

  @computed get coverVideo() {
    return get(this.task, 'metadata.coverVideo', '')
  }

  @computed get rewardToken() {
    return get(this.task, 'metadata.rewardToken', 'USDT')
  }

  @computed get rewardAmount() {
    return get(this.task, 'rewardAmount', 0)
  }

  @computed get rewardAmountExchanged() {
    return FixedNumber.from(this.rewardAmount.toString()).mulUnsafe(this.tokenBasePrice)._value || 'TBA'
  }

  @computed get maxPriorityParticipants() {
    return this.task.maxPriorityParticipants ?? 0
  }

  @computed get totalPriorityReward() {
    return this.task.priorityRewardAmount ?? 0
  }

  @computed get singlePriorityReward() {
    return divide(this.totalPriorityReward, this.maxPriorityParticipants || 1)
  }

  @computed get totalCommunityReward() {
    return subtract(this.rewardAmount, this.totalPriorityReward)
  }

  @computed get totalPriorityRewardExchanged() {
    return FixedNumber.from(`${this.totalPriorityReward}`).mulUnsafe(this.tokenBasePrice) || 'TBA'
  }

  @computed get totalCommunityRewardExchanged() {
    return FixedNumber.from(`${this.totalCommunityReward}`).mulUnsafe(this.tokenBasePrice)._value || 'TBA'
  }

  @computed get singlePriorityRewardAsToken() {
    if (isNaN(this.singlePriorityReward)) return 'TBA'
    return FixedNumber.from(`${this.singlePriorityReward}`).divUnsafe(this.tokenBasePrice)._value || 'TBA'
  }

  @computed get singlePriorityRewardExchanged() {
    return FixedNumber.from(`${this.singlePriorityReward}`).mulUnsafe(this.tokenBasePrice)._value || 'TBA'
  }

  @computed get currentCommunityParticipants() {
    return subtract(this.totalParticipants, this.currentPriorityParticipants) ?? 0
  }

  @computed get currentPriorityParticipants() {
    return get(this.topCompletedApplies, 'length', 0)
  }

  @computed get totalParticipants() {
    return get(this.task, 'totalParticipants', 0)
  }

  @computed get isCurrentWalletMatchRegistered() {
    if (!walletStore.account || !authStore.registeredWallet) return false
    return isEqual(walletStore.account, authStore.registeredWallet)
  }

  @computed get currentWallet() {
    return walletStore.account
  }

  @computed get isPriorityPoolFull() {
    return gte(this.currentPriorityParticipants, this.maxPriorityParticipants)
  }

  @computed get currentPoolType() {
    return get(this.apply, 'poolType', '')
  }

  @computed get completeTime() {
    return get(this.task, 'completeTime', '')
  }

  @computed get isInPriorityPool() {
    return (
      isEqual(this.currentPoolType, POOL_TYPES.PRIORITY) ||
      this.topCompletedApplies.findIndex((apply) => apply.id === get(this.apply, 'id', '')) > -1
    )
  }

  @computed get isStaker() {
    return this.stakeStatus
  }

  @computed get shouldShowStakeSuggestion() {
    return !this.isInPriorityPool && !this.isStaker && !this.isPriorityPoolFull
  }

  @computed get isPriorityPoolAvailable() {
    return (
      this.isCurrentWalletMatchRegistered &&
      !this.isInPriorityPool &&
      !this.isPriorityPoolFull &&
      this.isStaker &&
      this.isTaskStarted &&
      this.isHuntingProcessStarted
    )
  }

  @computed get isUserTaskCompleted() {
    return isEqual(get(this.apply, 'status', 'processing'), APPLY_STATUS.COMPLETED)
  }

  @computed get isHuntingProcessStarted() {
    const status = get(this.apply, 'status', 'processing')
    return (
      !isEmpty(get(this.apply, 'id', '')) &&
      (isEqual(status, APPLY_STATUS.PROCESSING) || isEqual(status, APPLY_STATUS.COMPLETED))
    )
  }

  @computed get isHuntingProcessEnded() {
    return this.isTaskEnded || this.isUserTaskCompleted
  }

  @computed get earnedReward() {
    return get(this.apply, 'bounty', 0)
  }

  @computed get shouldDisableTaskProcessing() {
    return (
      this.isTaskEnded ||
      !this.isTaskStarted ||
      !this.isCurrentWalletMatchRegistered ||
      this.isHuntingProcessEnded ||
      !this.isHuntingProcessStarted ||
      !this.isTaskLimitAvailable
    )
  }

  @computed get isTaskProcessFinish(): boolean {
    return (
      get(this.apply, ['data', 'twitter'], []).filter((step) => !step.finished).length === 0 &&
      get(this.apply, ['data', 'telegram'], []).filter((step) => !step.finished).length === 0 &&
      get(this.apply, ['data', 'quiz'], []).filter((step) => !step.finished).length === 0
    )
  }

  @computed get taskSocialLinks() {
    return get(this.task, 'metadata.socialLinks', {})
  }

  @computed get tokenBasePrice(): FixedNumber {
    return FixedNumber.from(get(this.task, 'tokenBasePrice', 1))
  }

  @computed get tokenLogo() {
    return get(this.task, 'metadata.tokenLogo', '')
  }

  @computed get shouldGlowPriorityPool() {
    if (!this.isHuntingProcessStarted && !this.isPriorityPoolFull) return true
    if (this.isHuntingProcessStarted && this.isInPriorityPool) return true
    return false
  }

  @computed get shouldGlowCommunityPool() {
    if (!this.isHuntingProcessStarted && this.isPriorityPoolFull) return true
    if (this.isHuntingProcessStarted && !this.isInPriorityPool) return true
    return false
  }

  @computed get registeredWalletAdress() {
    return authStore.registeredWallet
  }

  @computed get missionType() {
    return get(this.task, 'type')
  }

  @computed get completedParticipants() {
    return get(this.task, 'completedParticipants', 0)
  }

  @computed get maxParticipants() {
    return get(this.task, 'maxParticipants', 0)
  }

  @computed get completedPercentage(): number {
    if (this.maxParticipants <= 0) return 0
    return (this.completedParticipants / this.maxParticipants) * 100
  }

  @computed get isTaskLimitAvailable() {
    const limit = get(this.task, 'maxParticipants', 0)
    if (limit < 1) return true
    return this.completedParticipants < limit
  }
}

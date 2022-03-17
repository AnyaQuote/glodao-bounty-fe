import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { keys, merge, sumBy, uniqBy } from 'lodash-es'
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
  @observable earnDialogWalletInput = ''

  @observable currentTime = Date.now()
  currentTimeInterval: NodeJS.Timer

  @observable statistical = {
    total: 100,
    daily: 10000,
    twitter: 100000,
  }

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
    ]
    this.currentTimeInterval = setInterval(() => this.setCurrentTime(), 1000)
  }

  destroyReaction() {
    this.disposes.forEach((d) => d())
    if (this.currentTimeInterval) clearInterval(this.currentTimeInterval)
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
          'task.id': this.taskId,
          'hunter.id': this.hunterId,
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
      }
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @asyncAction *fetchData() {
    yield this.getTaskData()
    yield this.getApplyData()
  }

  @asyncAction *getTaskData() {
    try {
      const res = yield apiService.tasks.findOne(this.taskId)
      this.task = res
      this.initEmptyStepData()
      apiService.applies
        .find({
          'task.id': this.taskId,
        })
        .then((res) => (this.relatedApplies = res))
    } catch (error) {
      snackController.error(error as string)
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
        'task.id': this.taskId,
        'hunter.id': this.hunterId,
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
      snackController.error(error as string)
    }
  }

  @action.bound submitLink(type: string, link: string, stepIndex: number) {
    const temp = JSON.parse(JSON.stringify(this.applyStepData))
    temp[type][stepIndex].link = link
    temp[type][stepIndex].finished = true
    temp[type][stepIndex].shareTime = Date.now()
    const tempApply = JSON.parse(JSON.stringify(this.apply))
    try {
      apiService.applies.update(this.apply.id, { ...tempApply, data: temp }).then((res) => {
        if (res) {
          this.applyStepData = temp
          this.apply = res
        }
      })
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @action.bound submitTaskConfirmation(type: string) {
    try {
      const tempApply = JSON.parse(JSON.stringify(this.apply))
      apiService.applies
        .update(this.apply.id, {
          ...tempApply,
          status: APPLY_STATUS.COMPLETED,
          walletAddress: this.earnDialogWalletInput,
        })
        .then((res) => {
          this.apply = res
          this.status = HUNTING.finish
          this.changeEarnDialog(false)
        })
    } catch (error) {
      snackController.error(error as string)
    }
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
    const result =
      this.displayedData?.twitter?.map((task) => {
        return { ...task, activeStep: false }
      }) ?? []
    result[0].activeStep = true
    for (let index = 1; index < result.length; index++) {
      if (result[index - 1].finished) {
        result[index].activeStep = true
        result[index - 1].activeStep = false
      }
    }

    return result ?? []
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
}

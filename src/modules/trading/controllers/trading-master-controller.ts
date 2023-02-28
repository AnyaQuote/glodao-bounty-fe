import { loadingController } from '@/components/global-loading/global-loading-controller'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { localdata } from '@/helpers/local-data'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { walletStore } from '@/stores/wallet-store'
import { get, isEmpty, keys } from 'lodash-es'
import { action, computed, observable } from 'mobx'
import { asyncAction } from 'mobx-utils'
import { InformationController } from './information-controller'
import { MissionStateController } from './mission-state-controller'
import { TelegramController } from './telegram-controller'
import { TwitterController } from './twitter-controller'

export class TradingMasterController {
  @observable taskId?: string

  @observable task?: any

  @observable apply?: any

  @observable taskLoading = false

  informationController: InformationController
  missionStateController: MissionStateController

  constructor() {
    this.informationController = new InformationController(this)
    this.missionStateController = new MissionStateController(this)
  }

  @action
  setTaskId(taskId: string) {
    this.taskId = taskId
    this.fetchData()
  }

  @asyncAction
  *fetchData() {
    yield Promise.all([this.getTaskData(), this.getApplyData()])
  }

  @asyncAction *getTaskData() {
    try {
      const res = yield apiService.tasks.findOne(this.taskId)
      this.task = res
    } catch (error) {
      snackController.error(get(error, 'response.data.message', '') || (error as string))
    }
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
        this.apply = apply
      }
    } catch (error) {
      snackController.error(get(error, 'response.data.message', '') || (error as string))
    }
  }

  @asyncAction *submitLink(type: string, link: string, stepIndex: number, optional = {}) {
    if (this.taskLoading) return
    this.taskLoading = true
    const temp = JSON.parse(JSON.stringify(this.applyStepData))
    temp[type][stepIndex].link = link
    temp[type][stepIndex].finished = true
    temp[type][stepIndex].shareTime = Date.now()
    yield Promise.all([])
    try {
      const res = yield apiService.updateTaskProcess(this.apply.id, type, temp, {
        walletAddress: walletStore.account,
        ...optional,
      })
      this.apply = res
      if (type === 'telegram') localdata.telegramHandler = link
    } catch (error) {
      const updatedApply = get(error, 'response.data.data', {})
      if (!isEmpty(updatedApply)) {
        this.apply = updatedApply
      }
      snackController.error(get(error, 'response.data.message', '') || (error as string))
    } finally {
      this.taskLoading = false
    }
  }

  @asyncAction *createApply(captchaToken) {
    try {
      const res = yield apiService.startHunting({
        data: this.initEmptyStepData(),
        ID: `${this.taskId}_${this.hunterId}`,
        hunter: this.hunterId,
        task: this.taskId,
        status: 'processing',
        captchaToken,
      })

      if (res) {
        this.apply = res
        this.fetchData()
      }
      snackController.success('Apply for bounty hunting successfully')
    } catch (error) {
      snackController.error(get(error, 'response.data.message', '') || (error as string))
    } finally {
      //
    }
  }

  @action.bound submitTaskConfirmation() {
    loadingController.increaseRequest()
    apiService
      .finishHuntingProcess({
        id: this.apply.id,
        walletAddress: authStore.user.hunter.address,
        // captchaToken: this.hcaptchaSubmitToken,
        captchaToken: '',
      })
      .then((res) => {
        this.apply = res
        snackController.success('Submit successfully')
        this.fetchData()
      })
      .catch((error) => {
        snackController.error(get(error, 'response.data.message', '') || (error as string))
      })
      .finally(() => {
        loadingController.decreaseRequest()
      })
  }

  getSocialTaskController(
    controllerType: string,
    stepIndex: number,
    taskType: string,
    index: number
  ): ISocialTaskController | null {
    let result: ISocialTaskController | null = null
    switch (controllerType) {
      case 'twitter':
        result = new TwitterController(this, index, stepIndex, taskType)
        break
      case 'telegram':
        result = new TelegramController(this, index, stepIndex, taskType)
        break
      default:
        break
    }
    return result
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
    return tempStepData
  }

  @computed get applyStepData(): any {
    const temp = this.initEmptyStepData()
    return this.apply?.data ?? temp
  }

  @computed get hunterId(): string | null {
    return authStore.user?.hunter?.id ?? null
  }

  @computed get socialTaskControllers(): ISocialTaskController[] {
    const result: ISocialTaskController[] = []
    const stepTypes = keys(this.applyStepData)
    let outerIndex = 1
    stepTypes.forEach((stepType, index) => {
      for (let miniIndex = 0; miniIndex < this.applyStepData[stepType].length; miniIndex++) {
        const element = this.applyStepData[stepType][miniIndex]
        const controller = this.getSocialTaskController(stepType, miniIndex, element.type, outerIndex)
        if (controller != null) {
          result.push(controller)
          outerIndex++
        }
      }
    })
    return result
  }
}

export interface ISocialTaskController {
  masterController: TradingMasterController
  stepIndex: number
  controllerType: string
  taskType: string
  index: number

  submit(link: string)
}

import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { localdata } from '@/helpers/local-data'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { walletStore } from '@/stores/wallet-store'
import { get, isEmpty, keys } from 'lodash-es'
import { action, computed, observable } from 'mobx'
import { asyncAction } from 'mobx-utils'
import { InformationController } from './information-controller'
import { TwitterController } from './twitter-controller'

export class TradingMasterController {
  @observable taskId?: string

  @observable task?: any

  @observable apply?: any

  @observable taskLoading = false

  informationController: InformationController

  constructor() {
    console.log('TradingMasterController')
    this.informationController = new InformationController(this)
  }

  @action
  setTaskId(taskId: string) {
    this.taskId = taskId
    this.fetchData()
  }

  @asyncAction
  *fetchData() {
    yield Promise.all([this.getTaskData(), this.getApplyData()])
    console.log(this.applyStepData)
    console.log(this.socialTaskControllers)
  }

  @asyncAction *getTaskData() {
    try {
      const res = yield apiService.tasks.findOne(this.taskId)
      this.task = res
      console.log(res)
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

  getSocialTaskController(
    controllerType: string,
    stepIndex: number,
    taskType: string,
    index: number
  ): ISocialTaskController | null {
    let result: ISocialTaskController | null = null
    switch (controllerType) {
      case 'twitter':
        result = new TwitterController(this, stepIndex, index, taskType)
        break

      default:
        break
    }
    return result
  }

  @computed get applyStepData(): any {
    return this.apply?.data ?? {}
  }

  @computed get hunterId(): string | null {
    return authStore.user?.hunter?.id ?? null
  }

  @computed get socialTaskControllers(): ISocialTaskController[] {
    const result: ISocialTaskController[] = []
    const stepTypes = keys(this.applyStepData)
    let outerIndex = 1
    stepTypes.forEach((stepType, index) => {
      const controller = this.getSocialTaskController(stepType, index, '', outerIndex)
      if (controller != null) {
        result.push(controller)
        outerIndex++
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

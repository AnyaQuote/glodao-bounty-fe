import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { get } from 'lodash-es'
import { action, computed, observable } from 'mobx'
import { asyncAction } from 'mobx-utils'
import moment from 'moment'
import { TradingMasterController } from './trading-master-controller'
import { appProvider } from '@/app-providers'

export class MissionStateController {
  masterController: TradingMasterController
  @observable loading = false

  constructor(masterController: TradingMasterController) {
    this.masterController = masterController
  }

  @action.bound startHunting() {
    if (!authStore.jwt) {
      authStore.changeTwitterLoginDialog(true)
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
            this.createApply()
          }
        })
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @asyncAction *createApply() {
    this.loading = true
    try {
      yield this.masterController.createApply('')
    } catch (error) {
      snackController.error(error as string)
    } finally {
      this.loading = false
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
  }

  @computed get taskId() {
    return this.masterController.taskId
  }

  @computed get hunterId() {
    return this.masterController.hunterId
  }

  @computed get task() {
    return this.masterController.task
  }

  @computed get apply() {
    return this.masterController.apply
  }

  @computed get startTime(): string | null {
    return get(this.task, 'startTime') ?? null
  }

  @computed get endTime(): string | null {
    return get(this.task, 'endTime') ?? null
  }

  @computed get isUserStartMission(): boolean {
    return this.apply != null
  }

  @computed get isMissionRunning(): boolean {
    if (!this.startTime || !this.endTime) return false
    return appProvider.currentTime.isBetween(moment(this.startTime), moment(this.endTime))
  }

  @computed get isMissionProgressAble(): boolean {
    return this.isUserStartMission && this.isMissionRunning
  }

  @computed get isMissionStartable(): boolean {
    return !this.isUserStartMission && this.isMissionRunning
  }
}

import { appProvider } from '@/app-providers'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { get, keys } from 'lodash-es'
import { action, computed, observable } from 'mobx'
import { asyncAction } from 'mobx-utils'
import moment from 'moment'
import { TradingMasterController } from './trading-master-controller'

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

  @computed get taskFinishedCount() {
    const stepTypes = keys(this.masterController.applyStepData)
    let outerIndex = 0
    if (!this.masterController.apply) return 0

    stepTypes.forEach((stepType, index) => {
      for (let miniIndex = 0; miniIndex < this.masterController.apply.data[stepType].length; miniIndex++) {
        const element = this.masterController.apply.data[stepType][miniIndex]
        if (element.finished) outerIndex++
      }
    })
    return outerIndex
  }

  @computed get taskTotalCount() {
    return (
      (this.masterController.socialTaskControllers.length ?? 0) +
      (this.masterController.kyberTaskControllers.length ?? 0)
    )
  }

  @computed get taskCompletePercentage() {
    return (this.taskFinishedCount / (this.taskTotalCount === 0 ? 1 : this.taskTotalCount)) * 100
  }

  @computed get isCompleted() {
    if (this.taskTotalCount === 0 || this.taskFinishedCount === 0) return false
    return this.taskFinishedCount === this.taskTotalCount
  }
}

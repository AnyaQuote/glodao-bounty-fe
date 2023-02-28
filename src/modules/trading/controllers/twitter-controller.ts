import { action, computed, observable } from 'mobx'
import { ISocialTaskController, TradingMasterController } from './trading-master-controller'

export class TwitterController implements ISocialTaskController {
  @observable masterController: TradingMasterController
  stepIndex: number
  controllerType = 'twitter'
  taskType!: string
  index: number

  constructor(masterController: TradingMasterController, index: number, stepIndex: number, taskType: string) {
    this.masterController = masterController
    this.stepIndex = stepIndex
    this.taskType = taskType
    this.index = index
  }

  @action.bound submit(link: string) {
    this.masterController.submitLink(this.controllerType, link, this.stepIndex)
  }

  @computed get taskId(): string | null {
    return this.masterController.taskId ?? null
  }

  @computed get task(): any {
    return this.masterController.task ?? null
  }

  @computed get missionInformation() {
    return this.task.data[this.controllerType][this.stepIndex]
  }

  @computed get currentApplyState() {
    return this.masterController.applyStepData[this.controllerType][this.stepIndex]
  }
}

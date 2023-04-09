import { action, computed, observable } from 'mobx'
import { ISocialTaskController, TradingMasterController } from './trading-master-controller'

export class KyberTaskController {
  @observable masterController: TradingMasterController
  stepIndex: number
  controllerType = 'kyber'
  taskType: string

  constructor(masterController: TradingMasterController, stepIndex: number) {
    this.masterController = masterController
    this.stepIndex = stepIndex
    this.taskType = this.masterController.task.data['kyber'][stepIndex].type
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

  @computed get pairsName(): string {
    if (!this.missionInformation.pairs) return ''
    else return this.missionInformation.pairs.map((e) => e.name.toUpperCase()).join('-')
  }
}

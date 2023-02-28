import { action } from 'mobx'
import { TradingMasterController } from '../controllers/trading-master-controller'

export class TradingViewModel {
  controller: TradingMasterController = new TradingMasterController()

  constructor() {
    // console.log('TradingViewModel')
  }

  @action taskIdChange(taskId: string) {
    this.controller.setTaskId(taskId)
  }
}

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
    return this.masterController.applyStepData[this.taskType][this.stepIndex]
  }
}

// export class TwitterFollowController extends TwitterController {
//   constructor(masterController: TradingMasterController, index: number, stepIndex: number) {
//     super(masterController, index, stepIndex, 'follow')
//   }

//   @action.bound submit(link: string) {
//     super.submit('')
//   }
// }

// export class TwitterLikeController extends TwitterController {
//   constructor(masterController: TradingMasterController, index: number, stepIndex: number) {
//     super(masterController, index, stepIndex, 'like')
//   }

//   @action.bound submit(link: string) {
//     super.submit('')
//   }
// }

// export class TwitterCommentController extends TwitterController {
//   constructor(masterController: TradingMasterController, index: number, stepIndex: number) {
//     super(masterController, index, stepIndex, 'comment')
//   }
//   @action.bound submit(link: string) {
//     super.submit(link)
//   }
// }

// export class TwitterQuoteController extends TwitterController {
//   constructor(masterController: TradingMasterController, index: number, stepIndex: number) {
//     super(masterController, index, stepIndex, 'quote')
//   }

//   @action.bound submit(link: string) {
//     super.submit(link)
//   }
// }

// export class TwitterTweetController extends TwitterController {
//   constructor(masterController: TradingMasterController, index: number, stepIndex: number) {
//     super(masterController, index, stepIndex, 'tweet')
//   }

//   @action.bound submit(link: string) {
//     super.submit(link)
//   }
// }

// export class TwitterRetweetController extends TwitterController {
//   constructor(masterController: TradingMasterController, index: number, stepIndex: number) {
//     super(masterController, index, stepIndex, 'retweet')
//   }

//   @action.bound submit(link: string) {
//     super.submit(link)
//   }
// }

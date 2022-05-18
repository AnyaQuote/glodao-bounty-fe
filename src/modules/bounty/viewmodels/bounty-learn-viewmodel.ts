import * as _ from 'lodash-es'
import { action, observable } from 'mobx'

export class BountyLearnViewModel {
  @observable quizAnswerDialog = false

  constructor() {
    //
  }

  @action.bound changeQuizAnswerDialog(value: boolean) {
    this.quizAnswerDialog = value
  }
}

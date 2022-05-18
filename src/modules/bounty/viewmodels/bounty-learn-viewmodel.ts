import { snackController } from '@/components/snack-bar/snack-bar-controller'
import router from '@/router'
import { apiService } from '@/services/api-service'
import * as _ from 'lodash-es'
import { action, computed, observable, reaction } from 'mobx'

export class BountyLearnViewModel {
  @observable quizAnswerDialog = false
  @observable task: any = {}
  @observable quiz: any = {}
  @observable questionList: any[] = []
  _disposers: any[] = []

  constructor() {
    //
  }

  @action initReaction() {
    this._disposers = [
      reaction(
        () => this.quizData,
        () => {
          this.questionList = this.quizData
        }
      ),
    ]
  }

  @action destroyReaction() {
    this._disposers.forEach((d) => d())
  }

  @action fetchTaskData(taskId: string) {
    apiService.tasks
      .findOne(taskId)
      .then((res) => (this.task = res))
      .catch((err) => {
        snackController.error(err)
        router.back()
      })
  }

  @action fetchQuizData(quizId: string) {
    apiService.quizzes
      .findOne(quizId)
      .then((res) => (this.quiz = res))
      .catch((err) => {
        snackController.error(err)
        router.back()
      })
  }

  @action.bound changeQuizAnswerDialog(value: boolean) {
    this.quizAnswerDialog = value
  }

  @computed get projectLogo() {
    return _.get(this.task, 'metadata.projectLogo', '')
  }

  @computed get quizName() {
    return _.get(this.quiz, 'name', 'TBA')
  }

  @computed get quizDescription() {
    return _.get(this.quiz, 'description', 'TBA')
  }

  @computed get quizTags() {
    return _.get(this.quiz, 'metadata.tags', [])
  }

  @computed get quizLearningInformation() {
    return _.get(this.quiz, 'learningInformation', '')
  }

  @computed get quizData() {
    return _.get(this.quiz, 'data', [])
  }

  @computed get answerCount() {
    return _.size(_.filter(this.questionList, (question) => !_.isNil(question.answer)))
  }
}

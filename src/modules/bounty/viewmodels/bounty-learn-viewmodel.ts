import { snackController } from '@/components/snack-bar/snack-bar-controller'
import router from '@/router'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import * as _ from 'lodash-es'
import { action, computed, observable, reaction } from 'mobx'
import { asyncAction } from 'mobx-utils'

export class BountyLearnViewModel {
  @observable quizAnswerDialog = false
  @observable currentStep = 0
  @observable task: any = {}
  @observable apply: any = {}
  @observable quiz: any = {}
  @observable questionList: any[] = []
  @observable submitAnswerLoading = false
  _disposers: any[] = []

  constructor() {
    //
  }

  @action initReaction() {
    this._disposers = [
      reaction(
        () => this.quizData,
        () => {
          this.questionList = _.sampleSize(this.quizData, 10)
        }
      ),
      reaction(
        () => this.task,
        () => {
          this.fetchApplyData()
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

  @action fetchApplyData() {
    apiService.applies
      .find(
        {
          task: _.get(this.task, 'id', ''),
          hunter: authStore.hunterId,
        },
        {
          _limit: 1,
        }
      )
      .then((res) => (this.apply = res[0]))
      .catch((err) => {
        snackController.error('You can not do this task yet!')
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

  @asyncAction *submitQuizAnswer() {
    try {
      this.submitAnswerLoading = true
      const isAnswerCorrect = yield apiService.verifyQuizAnswer(this.quiz.id, this.answerList)
      if (!isAnswerCorrect) {
        snackController.error('Wrong answer! Please try again')
        this.reset()
        return
      }
      const tempData = JSON.parse(JSON.stringify(this.apply.data))
      const stepIndex = this.task.data.quiz.findIndex((quizItem) => _.isEqual(quizItem.quizId, this.quiz.id))
      tempData['quiz'][stepIndex].finished = true
      const res = yield apiService.updateTaskProcess(this.apply.id, 'quiz', tempData, {
        quizId: this.quiz.id,
        answerList: this.answerList,
      })
      if (res) {
        snackController.success('Task completed successfully')
        router.push(`/bounty/${this.task.id}`)
      }
    } catch (error: any) {
      const statusCode = _.get(error, 'response.status', '')
      if (_.isEqual(statusCode, 429)) snackController.error('Too many attempts! Please try again after a few minutes')
      else if (_.isEqual(statusCode, 400)) snackController.error(_.get(error, 'response.data.message'))
      else snackController.error('Unknown error! Please try again later')
    } finally {
      this.submitAnswerLoading = false
    }
  }

  @action reset() {
    this.currentStep = 0
  }

  @action.bound changeQuizAnswerDialog(value: boolean) {
    this.quizAnswerDialog = value
  }

  @action.bound changeStep(increment: number) {
    this.currentStep += increment
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

  @computed get answerList() {
    return this.questionList.map((question) => {
      if (_.isNil(question.answer)) return { id: question.id, answer: null }
      else return { id: question.id, answer: question.answer }
    })
  }
}

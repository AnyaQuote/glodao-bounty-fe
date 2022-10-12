import { appProvider } from '@/app-providers'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { promiseHelper } from '@/helpers/promise-helper'
import router from '@/router'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import * as _ from 'lodash-es'
import { action, computed, observable, reaction } from 'mobx'
import { asyncAction } from 'mobx-utils'
import moment from 'moment'

const APPLY_STATUS = {
  PROCESSING: 'processing',
  COMPLETED: 'completed',
}

export class BountyLearnViewModel {
  @observable quizAnswerDialog = false
  @observable isAnswerProcessStarted = false
  @observable startProcessLoading = false

  @observable taskId = ''
  @observable quizId = ''
  @observable quizReviewDialog = false
  @observable quizReviewList: any = []
  @observable currentStep = 0
  @observable clickedMap = new Map()
  @observable task: any = {}
  @observable apply: any = {}
  @observable quiz: any = {}
  @observable quizRecord: any = {}
  @observable questionList: any[] = []
  @observable submitAnswerLoading = false
  _disposers: any[] = []

  constructor(taskId, quizId) {
    //
    this.taskId = taskId
    this.quizId = quizId
    console.log(this.taskId)
    this.initialize()
  }

  @asyncAction *initialize() {
    yield this.fetchTaskData(this.taskId)
    yield this.fetchQuizData(this.quizId)
  }

  @action initReaction() {
    this._disposers = [
      reaction(
        () => this.quizData,
        () => {
          this.getRandomQuestion()
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
    apiService
      .getQuiz(quizId, this.taskId)
      .then((res) => {
        this.quiz = res
        this.fetchQuizRecordData(quizId)
        console.log(this.quizSetting)
        console.log(this.quiz)
      })
      .catch((err) => {
        snackController.error(err)
        router.back()
      })
  }

  @action fetchQuizRecordData(quizId) {
    apiService.quizAnswerRecords
      .find({
        ID: `${quizId}_${authStore.hunterId}`,
      })
      .then((res) => {
        if (res.length > 0) {
          this.quizRecord = res[0]
        } else {
          this.quizRecord = {}
        }
      })
  }

  @asyncAction *submitQuizAnswer() {
    try {
      this.submitAnswerLoading = true
      const isAnswerCorrect = yield apiService.verifyQuizAnswer(this.quiz.id, this.answerList, this.taskId)
      const tempAnswerList = JSON.parse(JSON.stringify(this.answerList))
      const tempQuestionList = JSON.parse(JSON.stringify(this.questionList))

      this.quiz.data = isAnswerCorrect.newQuestion

      if (!isAnswerCorrect.status) {
        this.openQuizReviewDialog(tempQuestionList, isAnswerCorrect.wrongAnswerList)

        return
      }
      this.quizRecord = isAnswerCorrect.data
      const tempData = JSON.parse(JSON.stringify(this.apply.data))
      const stepIndex = this.task.data.quiz.findIndex((quizItem) => _.isEqual(quizItem.quizId, this.quiz.id))
      tempData['quiz'][stepIndex].finished = true
      tempData['quiz'][stepIndex].link = this.quizRecord.id
      tempData['quiz'][stepIndex].recordId = this.quizRecord.id

      const res = yield apiService.updateTaskProcess(this.apply.id, 'quiz', tempData, {
        quizId: this.quiz.id,
        answerList: tempAnswerList,
      })
      if (res) {
        snackController.success('Task completed successfully')
        this.openQuizReviewDialog(tempQuestionList, isAnswerCorrect.wrongAnswerList)
      }
    } catch (error: any) {
      const statusCode = _.get(error, 'response.status', '')
      if (_.isEqual(statusCode, 429)) snackController.error('Too many attempts! Please try again after a few minutes')
      else if (_.isEqual(statusCode, 400)) snackController.error(_.get(error, 'response.data.message'))
      else snackController.error('Unknown error! Please try again later')
    } finally {
      this.changeQuizAnswerDialog(false)
      this.reset()
      this.submitAnswerLoading = false
    }
  }

  @action reset() {
    this.currentStep = 0
    this.clickedMap.clear()
    this.isAnswerProcessStarted = false
    this.questionList = []
    this.getRandomQuestion()
  }

  @action getRandomQuestion() {
    this.questionList = JSON.parse(JSON.stringify(_.sampleSize(this.quizData, this.questionsPerQuiz)))
  }

  @action.bound startQuizAnswerProcess() {
    this.startProcessLoading = true
    promiseHelper.delay(1000).finally(() => {
      this.isAnswerProcessStarted = true
      this.startProcessLoading = false
    })
  }

  @action openQuizReviewDialog(questionList, data) {
    const wrongAnswerMap = new Map()
    data.forEach((x) => {
      wrongAnswerMap.set(x.id, x)
    })
    this.quizReviewList = questionList.map((x) => {
      return {
        ...x,
        isCorrect: _.isEmpty(wrongAnswerMap.get(x.id)),
      }
    })

    this.changeQuizReviewDialog(true)
  }

  @action.bound changeQuizAnswerDialog(value: boolean) {
    this.quizAnswerDialog = value
  }

  @action.bound changeQuizReviewDialog(value: boolean) {
    this.quizReviewDialog = value
  }

  @action.bound changeStep(increment: number) {
    this.currentStep += increment
  }

  moveToNext(id) {
    if (!this.clickedMap.get(id)) {
      this.clickedMap.set(id, id)
      if (this.currentStep === this.questionList.length - 1 && this.clickedMap.size === this.questionList.length)
        this.changeStep(1)
      else if (this.currentStep < 9) this.changeStep(1)
    }
  }

  @computed get quizSetting() {
    return _.find(_.get(this.task, 'data.quiz', {}), (x) => _.isEqual(x.quizId, this.quizId))
  }

  @computed get quizPassingCriteria() {
    return _.get(this.quizSetting, 'passingCriteria', 0)
  }

  @computed get questionsPerQuiz() {
    return _.get(this.quizSetting, 'questionsPerQuiz', 0)
  }

  @computed get quizPassingCriteriaByQuestions() {
    return _.ceil(this.quizPassingCriteria * this.questionsPerQuiz)
  }

  @computed get quizCanRepeat() {
    return _.get(this.quizSetting, 'canRepeat', false)
  }

  @computed get quizCoverImage() {
    return _.get(this.quiz, 'metadata.coverImage', '')
  }

  @computed get projectLogo() {
    return _.get(this.task, 'metadata.projectLogo', '')
  }

  @computed get completedParticipants() {
    return _.get(this.task, 'completedParticipants', 0)
  }

  @computed get isTaskLimitAvailable() {
    const limit = _.get(this.task, 'maxParticipants', 0)
    if (limit < 1) return true
    return this.completedParticipants < limit
  }

  @computed get isHuntingProcessStarted() {
    const status = _.get(this.apply, 'status', 'processing')
    return (
      !_.isEmpty(_.get(this.apply, 'id', '')) &&
      (_.isEqual(status, APPLY_STATUS.PROCESSING) || _.isEqual(status, APPLY_STATUS.COMPLETED))
    )
  }

  @computed get isTaskStarted() {
    return moment(appProvider.currentTime).isAfter(this.task.startTime)
  }

  @computed get isTaskEnded() {
    return moment(appProvider.currentTime).isAfter(this.task.endTime)
  }

  @computed get isUserTaskCompleted() {
    return !_.isEqual(_.get(this.apply, 'status', 'processing'), APPLY_STATUS.PROCESSING)
  }

  @computed get isHuntingProcessEnded() {
    return this.isTaskEnded || this.isUserTaskCompleted
  }

  @computed get shouldDisableTaskProcessing() {
    return (
      this.isTaskEnded ||
      !this.isTaskStarted ||
      this.isHuntingProcessEnded ||
      !this.isHuntingProcessStarted ||
      !this.isTaskLimitAvailable
    )
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

  @computed get isQuizCompleted() {
    return !this.quizCanRepeat && !_.isEmpty(this.quizRecord)
  }
}

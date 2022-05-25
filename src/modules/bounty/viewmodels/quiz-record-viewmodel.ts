import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { promiseHelper } from '@/helpers/promise-helper'
import router from '@/router'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import * as _ from 'lodash-es'
import { action, computed, observable, reaction } from 'mobx'
import { asyncAction } from 'mobx-utils'

export class QuizRecordViewModel {
  @observable quizRecord: any = {}
  _disposers: any[] = []

  constructor() {
    //
  }

  @action initReaction() {
    this._disposers = []
  }

  @action destroyReaction() {
    this._disposers.forEach((d) => d())
  }

  @action fetchRecordData(recordId) {
    apiService.quizAnswerRecords
      .findOne(recordId)
      .then((res) => (this.quizRecord = res))
      .catch((err) => {
        snackController.error(err)
        router.push('/bounty')
      })
  }

  @computed get quizReviewList() {
    return _.get(this.quizRecord, 'data', [])
  }

  @computed get quiz() {
    return _.get(this.quizRecord, 'quiz')
  }

  @computed get hunter() {
    return _.get(this.quizRecord, 'hunter')
  }
}

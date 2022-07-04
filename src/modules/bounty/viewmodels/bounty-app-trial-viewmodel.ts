import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { Apply, ApplyStatus } from '@/models/ApplyModel'
import { Task } from '@/models/TaskModel'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { walletStore } from '@/stores/wallet-store'
import { get, isEmpty, merge } from 'lodash-es'
import { action, computed, IReactionDisposer, observable, reaction } from 'mobx'
import { asyncAction } from 'mobx-utils'
import moment from 'moment'

enum Hunting {
  START,
  HUNTING,
  FINISH,
}

export class BountyAppTrialViewModel {
  private _api = apiService
  private _auth = authStore
  private _snackbar = snackController
  private _wallet = walletStore
  private _disposer: IReactionDisposer[] = []

  @observable loading = false
  @observable taskId = ''
  @observable task: Task = {}
  @observable relatedApplies: any[] = []
  @observable hunters: any = []
  @observable hcaptchaSubmitToken = ''

  @observable isStartingProcess = false
  @observable isApplyPrioritying = false
  @observable isTaskUpdating = false
  @observable isTaskSubmiting = false

  @observable applyStepData: any = {}
  @observable status = Hunting.START
  @observable apply: Apply = {}

  @observable reCaptchaDialog = false
  @observable confirmCaptcha = false

  @observable stakeStatus = false
  @observable isValidStakeAmount = false

  @observable earnDialog = false
  @observable earnDialogWalletInput = get(this._auth, 'user.hunter.address', '')

  @observable currentTime = Date.now()

  constructor() {
    this._disposer = [
      reaction(
        () => this.taskId,
        () => this.fetchData()
      ),
      reaction(
        () => this._auth.user.hunter.address,
        (value) => {
          this.changeEarnDialogWalletInput(value)
        }
      ),
    ]
  }

  destoy() {
    this._disposer.forEach((d) => d())
  }

  @asyncAction *fetchData() {
    try {
      this.loading = true
      yield this.getTaskData()
      this.initEmptyStepData()
      yield this.getApplyData()
    } catch (error) {
      this._snackbar.commonError(error)
    } finally {
      this.loading = false
    }
  }

  @asyncAction *getTaskData() {
    const task = yield this._api.tasks.findOne(this.taskId)
    this.task = task
  }

  @asyncAction *getApplyData() {
    if (!this._auth.jwt || !this.taskId) return
    const apply = yield this._api.applies.find({
      task: this.taskId,
      hunter: this.hunterId,
    })
    if (!isEmpty(apply)) {
      this.applyStepData = merge(this.applyStepData, apply[0].data)
      if (apply.status === ApplyStatus.PROCESSING) {
        this.status = Hunting.HUNTING
      } else {
        this.status = Hunting.FINISH
      }
      this.apply = apply
      if (this.isTaskStarted) this.status = Hunting.START
      else if (this.isTaskEnded) this.status = Hunting.FINISH
    }
  }

  @action initEmptyStepData() {
    const tempStepData: any = {}
    for (const key in this.task.data) {
      if (Object.prototype.hasOwnProperty.call(this.task.data, key)) {
        const seperateTaskData = this.task.data[key]
        tempStepData[key] = seperateTaskData.map((miniTask) => ({
          type: miniTask.type,
          link: '',
          finished: false,
        }))
      }
    }
    this.applyStepData = tempStepData
  }

  @observable isTaskSubmitting = false

  @action changeTaskSubmitting(value: boolean) {
    this.isTaskSubmitting = value
  }

  @action.bound async submitTaskConfirmation() {
    try {
      this.changeTaskSubmitting(true)
      const res = await this._api.finishHuntingProcess({
        id: this.apply.id,
        walletStore: this._wallet.account,
        captchaToken: this.hcaptchaSubmitToken,
      })
      if (res) {
        this.apply = res
        this.status = Hunting.FINISH
        this._snackbar.success('Submit successfully')
        this.fetchData()
      }
    } catch (error) {
      this._snackbar.commonError(error)
    } finally {
      this.changeTaskSubmitting(false)
      this.hcaptchaSubmitToken = ''
      this.changeEarnDialog(false)
    }
  }

  @action.bound async startHunting() {
    if (!this._auth.jwt) {
      this._auth.changeTwitterLoginDialog(true)
      return
    }
    if (!this.isTaskStarted) {
      this._snackbar.error('The pool has not started yet!')
    }
    try {
      const res = await this._api.applies.count({
        task: this.taskId,
        hunter: this.hunterId,
      })
      if (res === 0) {
        this.changeRecaptchaDialog(true)
      }
    } catch (error) {
      this._snackbar.commonError(error)
    }
  }

  @asyncAction *createApply(captchaToken: string) {
    try {
      this.changeIsStartingProcess(true)
      const apply = yield this._api.startHunting({
        data: this.applyStepData,
        ID: `${this.taskId}_${this._auth.user.hunter.id}`,
        hunter: this._auth.user.hunter.id,
        status: ApplyStatus.PROCESSING,
        captchaToken,
      })
      if (apply) {
        this.apply = apply
        this.status = Hunting.HUNTING
        this.fetchData()
      }
      this._snackbar.success('Apply for bounty hunting successfully')
    } catch (error) {
      this._snackbar.commonError(error)
    } finally {
      this.changeIsStartingProcess(false)
    }
  }

  @action.bound changeIsStartingProcess(value: boolean) {
    this.isStartingProcess = value
  }

  @action.bound changeEarnDialog(value: boolean, token?: string) {
    this.earnDialog = value
    if (token) this.hcaptchaSubmitToken = token
  }

  @action.bound changeRecaptchaDialog(value: boolean) {
    this.reCaptchaDialog = value
  }

  @action taskIdChange(taskId: string) {
    this.taskId = taskId
  }

  @action setCurrentTime() {
    this.currentTime = Date.now()
  }

  @action.bound changeEarnDialogWalletInput(value: string) {
    this.earnDialogWalletInput = value
  }

  @computed get isTaskStarted() {
    return moment(this.currentTime).isAfter(this.task.startTime)
  }

  @computed get isTaskEnded() {
    return moment(this.currentTime).isAfter(this.task.endTime)
  }

  @computed get hunterId() {
    return get(this._auth, 'user.hunter.id', '')
  }

  @computed get breadcrumdItems() {
    return [
      {
        text: 'Bounty hunter',
        disabled: false,
        href: '/bounty',
      },
      {
        text: get(this.task, 'name', 'Fetching route...'),
        disabled: true,
        href: '#',
      },
    ]
  }
}

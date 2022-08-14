import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { Zero } from '@/constants'
import { Apply, ApplyData, ApplyStatus, DisplayAppTrialData } from '@/models/ApplyModel'
import { Task } from '@/models/TaskModel'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { walletStore } from '@/stores/wallet-store'
import { FixedNumber } from '@ethersproject/bignumber'
import { get, isEmpty, merge, toNumber } from 'lodash-es'
import { action, computed, IReactionDisposer, observable, reaction } from 'mobx'
import { asyncAction } from 'mobx-utils'
import moment from 'moment'

export class BountyAppTrialViewModel {
  private _api = apiService
  private _auth = authStore
  private _snackbar = snackController
  private _wallet = walletStore
  private _disposer: IReactionDisposer[] = []

  @observable taskId = ''
  @observable task: Task = {}

  @observable earnDialog = false
  @observable hcaptchaSubmitToken = ''
  @observable earnDialogWalletInput = get(this._auth, 'user.hunter.address', '')

  // ========== LOADING FLAG =================
  @observable loading = false
  @observable isStartingProcess = false
  @observable isTaskSubmitting = false
  @observable isHCaptchaLoading = false
  @observable updatingUniqueId = false
  // =========================================

  @observable applyStepData: ApplyData = {}
  @observable apply: Apply = {}

  @observable reCaptchaDialog = false
  @observable hCaptchaToken = ''
  // @observable confirmCaptcha = false

  @observable uniqueId = this.applyUniqueId

  @observable currentTime = Date.now()
  private _currentTimeInterval: NodeJS.Timer
  private _vueHCaptchaCallback: any

  constructor() {
    this._disposer = [
      reaction(
        () => this.taskId,
        () => this.fetchData()
      ),
    ]
    // Refresh current time every 1s to check isTaskStarted and isTaskEnded
    this._currentTimeInterval = setInterval(() => this.setCurrentTime(), 1000)
  }

  destroy() {
    this._disposer.forEach((d) => d())
    if (this._currentTimeInterval) clearInterval(this._currentTimeInterval)
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

  /**
   * Get data from related task by taskId
   */
  @asyncAction *getTaskData() {
    const task = yield this._api.tasks.findOne(this.taskId)
    this.task = task
  }

  /**
   * Get existed apply data by taskId and hunterId (current user)
   * @returns
   */
  @asyncAction *getApplyData() {
    if (!this._auth.jwt || !this.taskId) return
    const applies = yield this._api.applies.find(
      {
        task: this.taskId,
        hunter: this.hunterId,
      },
      { _limit: 1 }
    )
    if (!isEmpty(applies)) {
      const apply = applies[0]
      this.applyStepData = merge(this.applyStepData, apply.data)
      this.apply = apply
    }
  }

  @action initEmptyStepData() {
    const taskData = get(this.task, 'data.iat', [])
    const iat = Array(taskData.length).fill({
      type: 'iat',
      finished: false,
    })
    this.applyStepData = { iat }
  }

  /**
   * For `start hunting` button
   * Check jwt and isStartedTask condition
   * @returns
   */
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
        // This should be place inside the recaptcha dialog
      }
    } catch (error) {
      this._snackbar.commonError(error)
    }
  }

  /**
   * Create new apply to do task
   * @param captchaToken from recaptcha dialog
   */
  @asyncAction *createApply(captchaToken: string) {
    try {
      this.changeIsStartingProcess(true)
      const apply = yield this._api.startHunting({
        data: this.applyStepData,
        ID: `${this.taskId}_${this._auth.user.hunter.id}`,
        hunter: this._auth.user.hunter.id,
        task: this.taskId,
        status: ApplyStatus.PROCESSING,
        captchaToken,
      })
      if (apply) {
        this.apply = apply
        this.fetchData()
      }
      this._snackbar.success('Apply for app trial successfully')
    } catch (error) {
      this._snackbar.commonError(error)
    } finally {
      this.changeIsStartingProcess(false)
    }
  }

  /**
   * For `confirm to complete` task button
   */
  @action.bound async submitTaskConfirmation() {
    try {
      this.changeTaskSubmitting(true)
      const res = await this._api.finishHuntingProcess({
        id: this.apply.id,
        walletAddress: this._wallet.account,
        captchaToken: this.hcaptchaSubmitToken,
      })
      if (res) {
        this.apply = res
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

  @action.bound changeEarnDialogWalletInput(value: string) {
    this.earnDialogWalletInput = value
  }

  @action.bound changeEarnDialog(value: boolean, token?: string) {
    this.earnDialog = value
    if (token) this.hcaptchaSubmitToken = token
  }

  /**
   * Passing true/false to open/close Recaptcha dialog
   * @param value
   */
  @action.bound changeRecaptchaDialog(value: boolean) {
    this.reCaptchaDialog = value
  }

  // =========== VUEHCAPTCHA SECTION START ===========
  @action getHCaptchaCallback(vueHCaptchaCallback: () => void) {
    this._vueHCaptchaCallback = vueHCaptchaCallback
  }

  @action.bound resetHCaptchaToken() {
    this.hCaptchaToken = ''
  }

  @action.bound requestChallenge() {
    this.loading = true
    this._vueHCaptchaCallback()
  }

  @action.bound onHCaptchaOpen() {
    this.isHCaptchaLoading = false
    this.resetHCaptchaToken()
  }

  @action.bound onHCaptchaVerify(token: string) {
    this.changeEarnDialog(true, token)
  }
  // =========== VUEHCAPTCHA SECTION END ============

  /**
   * Confirm captcha and create new apply
   * @param value
   * @param captchaToken
   */
  @action.bound changeRecaptchaConfirm(value: boolean, captchaToken?: string) {
    // this.confirmCaptcha = value
    if (value) {
      setTimeout(() => {
        this.changeRecaptchaDialog(false)
        this.createApply(captchaToken || '')
      }, 500)
    }
  }

  @action changeTaskSubmitting(value: boolean) {
    this.isTaskSubmitting = value
  }

  @action.bound changeIsStartingProcess(value: boolean) {
    this.isStartingProcess = value
  }

  @action taskIdChange(taskId: string) {
    this.taskId = taskId
  }

  @action setCurrentTime() {
    this.currentTime = Date.now()
  }

  @action.bound changeUniqueId(value: string) {
    this.uniqueId = value
  }

  @action.bound async updateUniqueId() {
    try {
      this.updatingUniqueId = true
      const res = await this._api.updateApplyUniqueId({
        uniqueId: this.uniqueId,
        applyId: this.apply.id,
      })
      if (res.code !== 200) {
        throw Error(res.message)
      } else {
        this.apply = res.data
        this._snackbar.success(res.message)
      }
    } catch (error) {
      this._snackbar.commonError(error)
    } finally {
      this.updatingUniqueId = false
    }
  }

  @computed get applyStatus() {
    return get(this.apply, 'status', '')
  }

  @computed get hasHunterStartedTask() {
    return this.applyStatus === ApplyStatus.PROCESSING
  }

  @computed get hasHunterCompletedTask() {
    return this.applyStatus === ApplyStatus.COMPLETED
  }

  @computed get isTaskStarted() {
    return moment(this.currentTime).isAfter(this.task.startTime)
  }

  @computed get isTaskEnded() {
    return moment(this.currentTime).isAfter(this.task.endTime)
  }

  @computed get isTaskProcessFinish(): boolean {
    return get(this.apply, ['data', 'iat'], []).filter((step) => !step.finished).length === 0
  }

  @computed get shouldDisableTaskProcessing() {
    return this.isTaskEnded || !this.isTaskStarted
  }

  @computed get hunterId() {
    return get(this._auth, 'user.hunter.id', '')
  }

  @computed get breadcrumbItems() {
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

  // ========================= DISPLAY TASK COMPUTED DATA ======================
  @computed get taskName() {
    return get(this.task, 'name', '')
  }

  @computed get projectName() {
    return get(this.task, 'votingPool.projectName', '')
  }

  @computed get projectLogo() {
    return get(this.task, 'votingPool.data.projectLogo', '')
  }

  @computed get tokenName() {
    return get(this.task, 'metadata.rewardToken', '')
  }

  @computed get taskReward() {
    return get(this.task, 'rewardAmount', '0')
  }

  @computed get maxParticipants() {
    return get(this.task, 'maxParticipants', '0')
  }

  @computed get personalReward() {
    try {
      const fxTaskReward = FixedNumber.from(this.taskReward)
      const fxMaxparticipants = FixedNumber.from(this.maxParticipants)
      return fxTaskReward.divUnsafe(fxMaxparticipants)._value
    } catch (error) {
      return Zero
    }
  }

  @computed get taskStartTime() {
    return get(this.task, 'startTime', '')
  }

  @computed get taskEndTime() {
    return get(this.task, 'endTime', '')
  }

  @computed get taskAppLogo() {
    return get(this.task, 'metadata.coverImage', '')
  }

  @computed get taskAppStoreUrl() {
    return get(this.task, 'metadata.appStoreUrl', '')
  }

  @computed get taskGooglePlayUrl() {
    return get(this.task, 'metadata.googlePlayUrl', '')
  }

  @computed get taskWebUrl() {
    return get(this.task, 'metadata.webUrl', '')
  }

  @computed get totalParticipants() {
    return get(this.task, 'totalParticipants', 0)
  }

  @computed get taskProgressPercentage() {
    const totalTasks = get(this.applyStepData, 'iat', [])
    const finishedTasks = totalTasks.filter((step) => step.finished)
    return (finishedTasks.length / totalTasks.length) * 100
  }

  @computed get remainingParticipants() {
    const numMaxParticipants = toNumber(this.maxParticipants)
    const numTotalParticipants = toNumber(this.totalParticipants)
    return numMaxParticipants - numTotalParticipants
  }

  @computed get displayAppTrialData() {
    const convertedData = this.applyStepData.iat?.map((task, index) => ({ ...task, step: index + 1 }))
    const merged = merge(convertedData, this.task.data?.iat)
    return merged as DisplayAppTrialData[]
  }

  @computed get shortDescription() {
    return get(this.task, 'metadata.shortDescription', '')
  }

  @computed get taskAppScreenshots() {
    return get(this.task, 'metadata.screenshots', [])
  }

  @computed get taskDescription() {
    console.log(this.apply.id)
    return get(this.task, 'metadata.taskDescription', '')
  }

  @computed get applyUniqueId() {
    return get(this.apply, 'metadata.uniqueId', '')
  }
}

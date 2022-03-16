import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { localdata } from '@/helpers/local-data'
import router from '@/router'
import { apiService } from '@/services/api-service'
import { action, observable } from 'mobx'
import { asyncAction } from 'mobx-utils'

export class AuthStore {
  @observable attachWalletDialog = false
  @observable walletDialogInput = ''
  @observable isWalletUpdating = false
  @observable twitterLoginDialog = false
  @observable isLoggingInTwitter = false
  @observable jwt = ''
  @observable user: any = {}

  constructor() {
    //
    if (localdata.jwt) this.changeJwt(localdata.jwt)
    if (localdata.user) this.changeUser(localdata.user)
  }

  @action.bound changeAttachWalletDialog(value: boolean) {
    this.attachWalletDialog = value
    if (!value) this.changeWalletDialogInput(this.user.hunter.address)
  }
  @action.bound changeWalletDialogInput(value: string) {
    this.walletDialogInput = value
  }
  @action.bound saveAttachWallet() {
    try {
      if (!this.walletDialogInput) return
      this.isWalletUpdating = true
      const hunter = this.user.hunter
      apiService.hunters.update(hunter.id, { ...hunter, address: this.walletDialogInput })
      this.user.hunter = { ...hunter, address: this.walletDialogInput }
      snackController.updateSuccess()
    } catch (error) {
      snackController.error(error as string)
    } finally {
      this.isWalletUpdating = false
    }
  }
  @action.bound resetWalletDialogInput() {
    this.walletDialogInput = ''
  }
  @action.bound changeTwitterLoginDialog(value: boolean) {
    this.twitterLoginDialog = value
  }
  @action.bound changeJwt(value: string) {
    this.jwt = value
    localdata.jwt = value
  }
  @action.bound resetJwt() {
    this.jwt = ''
  }
  @action.bound changeUser(user: any) {
    this.user = user
    localdata.user = user
    this.changeWalletDialogInput(user.hunter?.address ?? '')
  }
  @action.bound resetUser() {
    this.user = {}
  }

  @asyncAction *handleLogin() {
    try {
      const { jwt, user } = yield apiService.users.login('daoqtoan@gmail.com', '12345678')
      this.changeJwt(jwt)
      this.changeUser(user)
      this.changeTwitterLoginDialog(false)
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @asyncAction *fetchUser(access_token: string, access_secret: string) {
    try {
      const res = yield apiService.fetchUser(access_token, access_secret)
      if (!res.user.hunter) {
        const params = {
          name: res.user.username,
          status: 'active',
          user: res.user.id,
          metadata: {
            avatar: res.user.avatar,
          },
        }
        yield apiService.hunters.create(params, res.jwt)
        res.user = yield apiService.users.findOne(res.user.id, res.jwt)
      }
      this.changeJwt(res.jwt)
      this.changeUser(res.user)
      this.changeTwitterLoginDialog(false)
    } catch (error) {
      snackController.error(error as string)
    }
  }

  @asyncAction *logout() {
    try {
      if (router.currentRoute.path !== '/bounty') yield router.push('/bounty')
      this.resetJwt()
      this.resetUser()
      localdata.reset()
    } catch (error) {
      snackController.error(error as string)
    }
  }
}

export const authStore = new AuthStore()

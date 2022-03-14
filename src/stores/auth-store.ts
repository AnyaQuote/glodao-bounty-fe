import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { action, computed, observable } from 'mobx'
import { asyncAction } from 'mobx-utils'
import { localdata } from '@/helpers/local-data'
import router from '@/router'

export class AuthStore {
  @observable attachWalletDialog = false
  @observable walletDialogInput = ''
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
  }
  @action.bound changeWalletDialogInput(value: string) {
    this.walletDialogInput = value
  }
  @action.bound saveAttachWallet() {
    //
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

  @asyncAction *logout() {
    try {
      yield router.push('/bounty')
      this.resetJwt()
      this.resetUser()
      localdata.reset()
    } catch (error) {
      snackController.error(error as string)
    }
  }
}

export const authStore = new AuthStore()
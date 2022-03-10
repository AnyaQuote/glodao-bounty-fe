import { loadingController } from '@/components/global-loading/global-loading-controller'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { action, computed, observable } from 'mobx'
import { asyncAction } from 'mobx-utils'

export class AuthStore {
  @observable twitterLoginDialog = false
  @observable isLoggingInTwitter = false
  @observable jwt = ''

  constructor() {
    //
  }

  @action.bound changeTwitterLoginDialog(value: boolean) {
    this.twitterLoginDialog = value
  }
  @action.bound changeJwt(value: string) {
    this.jwt = value
  }
  @action.bound resetJwt() {
    this.jwt = ''
  }

  @asyncAction *handleLogin() {
    try {
      const { jwt, user } = yield apiService.users.login('daoqtoan@gmail.com', '12345678')
      console.log(jwt, user)
      this.changeJwt(jwt)
      this.changeTwitterLoginDialog(false)
    } catch (error) {
      snackController.error(error as string)
    }
  }
}

export const authStore = new AuthStore()

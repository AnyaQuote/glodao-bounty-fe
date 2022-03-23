import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { localdata } from '@/helpers/local-data'
import router from '@/router'
import { apiService } from '@/services/api-service'
import { action, computed, observable } from 'mobx'
import { asyncAction } from 'mobx-utils'
import moment from 'moment'
import { walletStore } from '@/stores/wallet-store'
import { numberHelper } from '@/helpers/number.hepler'
import { get } from 'lodash-es'

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
    if (!value && !this.user.hunter.address) {
      snackController.error('You need to set your main wallet')
      return
    }
    this.attachWalletDialog = value
  }
  @action.bound changeWalletDialogInput(value: string) {
    this.walletDialogInput = value
  }
  @asyncAction *saveAttachWallet() {
    try {
      this.isWalletUpdating = true
      const signature = yield this.signMessage(walletStore.account, 'bsc', get(this.user, 'hunter.nonce', 0))
      const updatedHunter = yield apiService.updateWalletAddress(
        walletStore.account,
        signature,
        'bsc',
        get(this.user, 'hunter.id', '')
      )
      this.changeUser({ ...this.user, hunter: updatedHunter })
      snackController.updateSuccess()
      this.changeAttachWalletDialog(false)
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
    if (this.user.id && !get(user, 'hunter.address', '')) this.changeAttachWalletDialog(true)
  }
  @action.bound resetUser() {
    this.user = {}
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
          nonce: numberHelper.generateRandomNonce(),
        }
        yield apiService.hunters.create(params, res.jwt)
        res.user = yield apiService.users.findOne(res.user.id, res.jwt)
      }
      this.changeJwt(res.jwt)
      this.changeUser(res.user)
      this.changeTwitterLoginDialog(false)
    } catch (error) {
      snackController.error(error as string)
    } finally {
      router.push('/bounty').catch(() => {
        //
      })
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

  @asyncAction *signMessage(wallet, chainType, nonce, selectedAdapter: any = null) {
    if (!wallet) return ''
    const message = `https://glodao.io/bounty wants to: \n Sign message with account \n ${wallet} - One time nonce: ${nonce}`
    // const data = new TextEncoder().encode(message)
    if (chainType === 'sol') {
      //solana sign message
      // const a = (selectedAdapter || this.selectedAdapter) as any
      // let res
      // if (a.signMessage) {
      //   res = yield a.signMessage(data)
      // } else {
      //   res = yield a._wallet.signMessage(data)
      // }
      // return Object.values(res?.signature || res)
    } else {
      //bsc sign message
      if (typeof window === 'undefined') {
        return ''
      }
      if (window.ethereum) {
        const request = { method: 'personal_sign', params: [message, wallet] }
        return yield window.ethereum.request(request)
      } else {
        throw new Error('Plugin Metamask is not installed!')
      }
    }
  }

  @computed get accountAge() {
    if (!this.user?.twitterCreatedTime) return 0
    else return moment().diff(moment(this.user.twitterCreatedTime), 'days')
  }

  @computed get registeredWallet() {
    return get(this.user, 'hunter.address', '')
  }
}

export const authStore = new AuthStore()

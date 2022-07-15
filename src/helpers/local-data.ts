import { ChainType } from '@/blockchainHandlers'
class LocalData {
  get user(): any {
    return JSON.parse(localStorage.getItem('gloDaoUser') || '{}')
  }
  set user(value: any) {
    localStorage.setItem('gloDaoUser', JSON.stringify(value))
  }

  get jwt(): string {
    if (localStorage.getItem('gloDaoJwt')) return JSON.parse(localStorage.getItem('gloDaoJwt') || '')
    return ''
  }
  set jwt(value: string) {
    localStorage.setItem('gloDaoJwt', JSON.stringify(value))
  }

  get telegramHandler(): string {
    if (localStorage.getItem('gloDaoTelegramHandler'))
      return JSON.parse(localStorage.getItem('gloDaoTelegramHandler') || '')
    return ''
  }
  set telegramHandler(value: string) {
    localStorage.setItem('gloDaoTelegramHandler', JSON.stringify(value))
  }

  get lastChain(): ChainType | null {
    return localStorage.getItem('lastChain') as ChainType
  }
  set lastChain(value: ChainType | null) {
    if (value) localStorage.setItem('lastChain', value)
    else localStorage.removeItem('lastChain')
  }

  get referralCode(): string {
    if (localStorage.getItem('ref')) return JSON.parse(localStorage.getItem('ref') || '')
    return ''
  }

  set referralCode(value: string) {
    if (value) localStorage.setItem('ref', JSON.stringify(value))
    else localStorage.removeItem('ref')
  }

  get callback_url(): string {
    if (localStorage.getItem('callback_url')) return JSON.parse(localStorage.getItem('callback_url') || '')
    return ''
  }

  set callback_url(value: string) {
    if (value) localStorage.setItem('callback_url', JSON.stringify(value))
    else localStorage.removeItem('callback_url')
  }

  resetCallbackUrl() {
    localStorage.removeItem('callback_url')
  }

  resetUser() {
    localStorage.removeItem('gloDaoUser')
    localStorage.removeItem('gloDaoJwt')
  }

  reset() {
    localStorage.clear()
  }
}

export const localdata = new LocalData()

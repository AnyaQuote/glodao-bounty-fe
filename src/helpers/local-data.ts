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

  get lastChain(): ChainType | null {
    return localStorage.getItem('lastChain') as ChainType
  }
  set lastChain(value: ChainType | null) {
    if (value) localStorage.setItem('lastChain', value)
    else localStorage.removeItem('lastChain')
  }

  reset() {
    localStorage.clear()
  }
}

export const localdata = new LocalData()

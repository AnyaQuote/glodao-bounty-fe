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

  reset() {
    localStorage.clear()
  }
}

export const localdata = new LocalData()

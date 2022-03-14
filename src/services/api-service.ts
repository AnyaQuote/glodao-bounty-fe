import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'

import Axios from 'axios'
export type ApiRouteType = 'applies' | 'hunters' | 'logs' | 'pool-regists' | 'pools' | 'tasks' | 'users'

const axios = Axios.create({ baseURL: process.env.VUE_APP_API_STRAPI_ENDPOINT })

export class ApiHandler<T> {
  constructor(private axios, private route: ApiRouteType) {}

  async count(params?: any): Promise<number> {
    const res = await this.axios.get(`${this.route}/count`, { params })
    return res.data
  }

  async create(model: T): Promise<T> {
    const res = await this.axios.post(this.route, model)
    return res.data
  }

  async delete(id: any): Promise<T> {
    const res = await this.axios.delete(`${this.route}/${id}`)
    return res.data
  }

  async find<T>(params?: any, settings: { _sort?: string; _limit?: number; _start?: number } = {}): Promise<T[]> {
    const settingDefault = { _sort: 'createdAt:DESC', _limit: 25, _start: 0 }
    params = { ...settingDefault, ...settings, ...(params ?? {}) }
    const res = await this.axios.get(this.route, { params })
    const lst = res.data
    if (this.route === 'pools') {
      lst.forEach((element) => {
        if (element.data?.chainId) {
          element.chainId = element.data.chainId
        } else if (isNaN(+element.chainId)) {
          element.chainId = +element.chainId
        }
      })
    }
    return lst
  }

  async findOne<T>(id: any): Promise<T> {
    let res: any
    if (id) {
      res = await this.axios.get(`${this.route}/${id}`)
    } else {
      res = await this.axios.get(`${this.route}`)
    }
    const result = res.data
    if (this.route === 'pools') {
      if (result.data?.chainId) {
        result.chainId = result.data.chainId
      } else if (isNaN(+result.chainId)) {
        result.chainId = +result.chainId
      }
    }
    return result
  }

  async update(id: any, model: T): Promise<T> {
    let res: any
    if (id) {
      res = await this.axios.put(`${this.route}/${id}`, model)
    } else {
      res = await this.axios.put(`${this.route}`, model)
    }
    return res.data
  }
}

export class ApiHandlerJWT<T> {
  private headers = {}
  private jwtOptions = {
    count: true,
    create: true,
    delete: true,
    find: true,
    findOne: true,
    update: true,
  }
  constructor(
    private axios,
    private route: ApiRouteType,
    private options: {
      count?: boolean
      create?: boolean
      delete?: boolean
      find?: boolean
      findOne?: boolean
      update?: boolean
    } = {
      count: true,
      create: true,
      delete: true,
      find: true,
      findOne: true,
      update: true,
    }
  ) {
    this.headers = {
      ...axios.defaults.headers,
    }
    this.jwtOptions = { ...this.jwtOptions, ...options }
  }
  async count(params?: any): Promise<number> {
    let headers = this.headers
    if (this.jwtOptions.count) headers = { ...headers, Authorization: `Bearer ${authStore.jwt}` }
    const res = await this.axios.get(`${this.route}/count`, {
      params,
      headers,
    })
    return res.data
  }

  async create(model: T): Promise<T> {
    const res = await this.axios.post(this.route, model, {
      headers: {
        ...axios.defaults.headers,
        Authorization: `Bearer ${authStore.jwt}`,
      },
    })
    return res.data
  }

  async delete(id: any): Promise<T> {
    const res = await this.axios.delete(`${this.route}/${id}`, {
      headers: { Authorization: `Bearer ${authStore.jwt}` },
    })
    return res.data
  }

  async find<T>(params?: any, settings: { _sort?: string; _limit?: number; _start?: number } = {}): Promise<T[]> {
    const settingDefault = { _sort: 'createdAt:DESC', _limit: 25, _start: 0 }
    params = { ...settingDefault, ...settings, ...(params ?? {}) }
    let headers = this.headers
    if (this.jwtOptions.find) headers = { ...headers, Authorization: `Bearer ${authStore.jwt}` }
    const res = await this.axios.get(this.route, {
      params,
      headers,
    })
    const lst = res.data
    return lst
  }

  async findOne<T>(id: any): Promise<T> {
    let res: any
    let headers = this.headers
    if (this.jwtOptions.findOne) headers = { ...headers, Authorization: `Bearer ${authStore.jwt}` }
    if (id) {
      res = await this.axios.get(`${this.route}/${id}`, { headers })
    } else {
      res = await this.axios.get(`${this.route}`, { headers })
    }
    const result = res.data
    return result
  }

  async update(id: any, model?: any): Promise<T> {
    let res: any
    let headers = this.headers
    if (this.jwtOptions.update) headers = { ...headers, Authorization: `Bearer ${authStore.jwt}` }
    if (id) {
      res = await this.axios.put(`${this.route}/${id}`, model, {
        headers,
      })
    } else {
      res = await this.axios.put(`${this.route}`, model, { headers })
    }
    return res.data
  }

  async register(publicAddress: string) {
    const res = await this.axios.post(`auth/local/register`, { publicAddress })
    return res.data
  }

  async login(username: string, password: string) {
    const res = await this.axios.post(`auth/local`, { identifier: username, password })
    return res.data
  }
}

export class ApiService {
  // fixedPool = new ApiHandler<FixedPoolModel>(axios, 'pool')
  applies = new ApiHandlerJWT<any>(axios, 'applies')
  users = new ApiHandlerJWT<any>(axios, 'users')
  hunters = new ApiHandlerJWT<any>(axios, 'hunters')
  tasks = new ApiHandlerJWT<any>(axios, 'tasks', { find: false, count: false })

  async getFile(id: any) {
    const res = await axios.get(`upload/files/${id}`)
    return res.data
  }
}

export const apiService = new ApiService()

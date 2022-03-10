import { observable } from 'mobx'

export class BountyDetailViewModel {
  @observable accounts = [
    {
      id: 1,
      account: 'Tommy_Shelby',
      time: Date.now(),
      link: 'https://fb.com',
    },
    {
      id: 2,
      account: 'Tommy_Shelb',
      time: Date.now(),
      link: 'https://fb.com',
    },
    {
      id: 3,
      account: 'Tommy_Shelb',
      time: Date.now(),
      link: 'https://fb.com',
    },
    {
      id: 4,
      account: 'Tommy_Shelb',
      time: Date.now(),
      link: 'https://fb.com',
    },
    {
      id: 5,
      account: 'Tommy_Shelb',
      time: Date.now(),
      link: 'https://fb.com',
    },
  ]

  @observable statistical = {
    total: 100,
    daily: 10000,
    twitter: 100000,
  }

  constructor() {
    //
  }
}

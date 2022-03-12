import { apiService } from '@/services/api-service'
import { action, computed, IReactionDisposer, observable, reaction } from 'mobx'
import { actionAsync } from 'mobx-utils'

export enum HUNTING {
  start,
  hunting,
  finish,
}
export class BountyDetailViewModel {
  @observable bountyId = ''
  @observable status: HUNTING = HUNTING.start
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

  @observable data: any = {}

  @observable statistical = {
    total: 100,
    daily: 10000,
    twitter: 100000,
  }

  disposes: IReactionDisposer[] = []

  constructor() {
    this.disposes = [
      reaction(
        () => this.bountyId,
        () => this.handleBountyChange()
      ),
    ]
  }

  handleBountyChange = async () => {
    this.data = await apiService.tasks.findOne(this.bountyId)
    console.log(this.data)
  }

  @action setId(bountyId: string) {
    this.bountyId = bountyId
  }

  @action.bound startHunting() {
    if (this.status === HUNTING.start) {
      this.status = HUNTING.hunting
    }
  }

  @action.bound startFlow(type: string) {
    switch (type) {
      case 'follow':
        this.followTwitter()
        break
      case 'like':
        this.likeTwitter()
        break
      default:
        break
    }
  }

  followTwitter() {
    //
  }

  likeTwitter() {
    //
  }

  @computed get statusHunting() {
    switch (this.status) {
      case HUNTING.start:
        return {
          text: 'Start hunting',
          icon: 'power_settings_new',
          color: 'bluePrimary',
        }
      case HUNTING.hunting:
        return {
          text: 'Your hunting process has begun! ',
          icon: 'timelapse',
          color: 'greenSenamatic',
        }
      case HUNTING.finish:
        return {
          text: 'Your hunting process has finished! ',
          icon: 'error_outline',
          color: 'redSenamatic',
        }
    }
  }

  @computed get radioColor() {
    if (!this.data) {
      return ''
    }
    return this.data.status === 'live' ? 'green' : 'red'
  }
}

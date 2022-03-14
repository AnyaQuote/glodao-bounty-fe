import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { action, computed, IReactionDisposer, observable, reaction } from 'mobx'

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
  completed = 900

  @computed get percent() {
    if (!this.data?.maxParticipant) {
      return 0
    }
    return (this.completed / this.data?.maxParticipant) * 100
  }

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

  @action bountyIdChange(bountyId: string) {
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

  @computed get twitterTasks() {
    return !this.data.data ? [] : this.data.data.twitter
  }

  @observable applies: any

  handleBountyChange = async () => {
    this.data = await apiService.tasks.findOne(this.bountyId)
  }
}

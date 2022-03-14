import { CountdownHelper } from '@/helpers/countdown-helper'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'
import { action, computed, IReactionDisposer, observable, reaction } from 'mobx'
import moment from 'moment'

export enum HUNTING {
  start,
  hunting,
  finish,
}

export interface SharePerson {
  avatar: string
  name: string
  time: string
  link: string
}

export class BountyDetailViewModel {
  @observable bountyId = ''
  @observable status: HUNTING = HUNTING.start
  @observable hunters: any = []
  completed = 900

  @observable tasks: any = {}

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
      this.hunting()
    }
  }

  async hunting() {
    const params = {
      hunter: authStore.user.hunter,
      task: this.tasks,
      status: 'processing',
      ID: authStore.user.hunter.id + '_' + this.tasks._id,
      data: this.tasks.data,
    }
    const dataTask = thit
    const res = await apiService.applies.create(params)
    console.log(res)
  }

  @action.bound startFlow(type: string) {
    switch (type) {
      case 'follow':
        break
      case 'like':
        this.likeTwitter()
        break
      default:
        break
    }
  }

  likeTwitter() {
    //
  }

  followTwitter() {
    //
  }

  @computed get percent() {
    if (!this.tasks?.maxParticipant) {
      return 0
    }
    return (this.completed / this.tasks?.maxParticipant) * 100
  }

  @computed get twitterTasks() {
    return !this.tasks.data ? [] : this.tasks.data.twitter
  }

  @computed get hunterList() {
    return this.hunters.map((hunter) => {
      const info = hunter.hunter
      return {
        avatar: info.metadata.avatar,
        name: info.name,
        time: moment(info.createdAt),
        link: '',
      }
    })
  }

  handleBountyChange = async () => {
    this.tasks = await apiService.tasks.findOne(this.bountyId)
    this.hunters = await apiService.applies.find({ task: this.bountyId })
  }
}

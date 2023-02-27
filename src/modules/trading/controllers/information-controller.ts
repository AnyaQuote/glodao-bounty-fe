import { appProvider } from '@/app-providers'
import { get } from 'lodash-es'
import { IReactionDisposer, action, computed, observable } from 'mobx'
import { TradingMasterController } from './trading-master-controller'

export class InformationController {
  masterController: TradingMasterController
  currentTimeInterval: NodeJS.Timer
  disposes: IReactionDisposer[] = []
  @observable currentTime = Date.now()

  constructor(masterController: TradingMasterController) {
    this.masterController = masterController
    this.currentTimeInterval = setInterval(() => this.setCurrentTime(), 1000)
  }

  destroyReaction() {
    this.disposes.forEach((d) => d())
    if (this.currentTimeInterval) clearInterval(this.currentTimeInterval)
  }

  @action setCurrentTime() {
    this.currentTime = Date.now()
  }

  @computed get coverImage() {
    return get(this.task, 'metadata.coverImage') ?? null
  }

  @computed get name() {
    return get(this.task, 'name') ?? null
  }

  @computed get shortDescription() {
    return get(this.task, 'metadata.shortDescription') ?? null
  }

  @computed get task() {
    return this.masterController.task
  }

  @computed get maxParticipants(): number {
    return get(this.task, 'maxParticipants') ?? 0
  }

  @computed get rewardAmount(): number {
    return get(this.task, 'rewardAmount') ?? 0
  }

  @computed get totalParticipants(): number {
    return get(this.task, 'totalParticipants') ?? 0
  }

  @computed get rewardToken(): string {
    return get(this.task, 'metadata.rewardToken') ?? ''
  }

  @computed get personalReward(): number {
    return this.rewardAmount / (this.maxParticipants === 0 ? 1 : this.maxParticipants)
  }

  @computed get currentProgress(): number {
    return (this.totalParticipants / (this.maxParticipants === 0 ? 1 : this.maxParticipants)) * 100
  }

  @computed get endTime() {
    return get(this.task, 'endTime') ?? appProvider.currentTime.toISOString()
  }

  @computed get completedParticipants(): number {
    return get(this.task, 'completedParticipants') ?? 0
  }
}

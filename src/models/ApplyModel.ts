import { Task } from './TaskModel'

export enum ApplyStatus {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
}

export interface Apply {
  id?: string
  ID?: string
  walletAddress?: string
  status?: string
  data?: ApplyData
  metadata?: ApplyMetadata
  bounty?: string
  task?: Task
  rejectedReason?: any
  poolType?: string
  referrerCode?: string
  commissionRate?: string
  completeTime?: string
  root?: string
  campaignCode?: string
  rewardTime?: string
  hunter?: any
  optionalTokenReward?: string
}

export interface ApplyData {
  twitter?: ApplyDetail[]
  iat?: ApplyDetail[]
}

export interface ApplyMetadata {
  uniqueId?: string
}

export interface ApplyDetail {
  type?: string
  link?: string
  finished?: boolean
  shareTime?: string
}

export interface DisplayAppTrialData extends ApplyDetail {
  step?: number
  code?: string
  context?: string
  required?: boolean
}

export interface Task {
  id?: string
  ownerAddress?: string
  poolId?: string
  name?: string
  status?: string
  chainId?: string
  startTime?: string
  endTime?: string
  maxParticipants?: number
  totalParticipants?: number
  maxPriorityParticipants?: number
  completedParticipants?: number
  tokenBasePrice?: string
  rewardAmount?: string
  priorityRewardAmount?: string
  data?: Data
  metadata?: MetaData
  type?: MissionType
  missionIndex?: number
  votingPool?: any
}

export interface MetaData {
  shortDescription?: string
  decimals?: number
  projectLogo?: string
  tokenLogo?: string
  coverImage?: string
  caption?: string
  rewardToken?: string
  socialLinks?: any
  website?: string
  screenshots?: string[]
  appStoreUrl?: string
  googlePlayUrl?: string
}

export interface Setting {
  type?: string
  content?: string
  page?: string
  required?: boolean
  link?: string
  hashtag?: string
  embedLink?: string
}

export interface IatSetting {
  code?: string
  context?: string
  required?: boolean
}

export interface QuizSetting {
  type?: string
  quizId?: string
}

export interface Data {
  twitter?: Setting[]
  telegram?: Setting[]
  quiz?: QuizSetting[]
  iat?: IatSetting[]
}

export enum MissionType {
  BOUNTY = 'bounty',
  LEARN = 'learn',
  APP_TRIAL = 'iat',
  LUCKY = 'lucky',
  ACTIVE = 'active',
  MIX = 'mix',
}

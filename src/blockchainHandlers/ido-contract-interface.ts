import { FixedNumber } from '@ethersproject/bignumber'

export class PoolInfo {
  tokenDecimals?: number
  tokensForSale?: FixedNumber
  tokensAllocated?: FixedNumber
  tokensLeft?: FixedNumber
  tokensFund?: FixedNumber
  userFee?: FixedNumber
  participants?: number
  sellerTax?: FixedNumber
  unsoldTokenReedemed?: boolean
  paused?: boolean
}

export interface RedeemConfig {
  id: number
  date: string
  percentage: FixedNumber
  finalized: boolean
}

export interface UserConstraints {
  boughtAmounts?: FixedNumber
  redeemedAmounts?: FixedNumber
  isBuyer?: boolean
  paidFee?: boolean
}

export interface IIdoContract {
  address: string
  poolInfo?: PoolInfo
  init(): Promise<void>
  injectProvider(address): void
  getBuyerLength(): Promise<number>
  fetchPoolInfo(): Promise<any>
  getRedeemConfig(): Promise<RedeemConfig[]>
  getUserTradeTokenAmount(account: string): Promise<FixedNumber>
  fetchUserConstraints(account: string, force?: boolean): Promise<UserConstraints>
  redeemTokens(purchaseId: number): Promise<void>
  swap(amount: FixedNumber, account: string): Promise<any>
}

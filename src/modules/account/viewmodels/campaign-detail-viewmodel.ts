import { apiService } from '@/services/api-service'
import { action, computed, IReactionDisposer, observable, reaction } from 'mobx'
import * as _ from 'lodash-es'
import moment from 'moment'
import { FixedNumber } from '@ethersproject/bignumber'
import { HUNDRED, Zero } from '@/constants'
import { authStore } from '@/stores/auth-store'

const PAGE_LIMIT = 10
export class CampaignDetailViewModel {
  @observable campaignDetail: any = {}
  @observable campaignReferralDialog = false
  @observable subReferrerName = ''
  @observable subReferralCode = ''
  @observable referralSortParams = ['joinTime', 'asc']
  @observable referralSortList = [
    {
      text: 'Recently join',
      value: ['joinTime', 'desc'],
    },
    {
      text: 'Name ascending',
      value: ['name', 'asc'],
    },
  ]
  @observable referralList: any[] = []
  @observable referralPage = 1
  @observable loading = false
  @observable relatedApplies: any[] = []
  @observable _disposers: IReactionDisposer[] = []

  constructor() {
    //
  }

  @action initReaction() {
    //
    this._disposers = [
      reaction(
        () => this.campaignCode,
        () => {
          this.fetchRelatedData()
        }
      ),
    ]
  }

  @action destroyReaction() {
    //
    this._disposers.forEach((d) => d())
  }

  @action fetchData(campaignId) {
    //
    Promise.allSettled([apiService.campaigns.findOne(campaignId)]).then((res) => {
      if (res[0].status === 'fulfilled') this.campaignDetail = res[0].value
    })
  }

  @action fetchRelatedData() {
    //
    Promise.allSettled([
      apiService.applies.find({ campaignCode: this.campaignCode }, { _limit: -1 }),
      apiService.hunters.find({ campaignCode: this.campaignCode }, { _limit: -1 }),
    ]).then((res) => {
      if (res[0].status === 'fulfilled') this.relatedApplies = res[0].value
      if (res[1].status === 'fulfilled') this.referralList = res[1].value
    })
  }

  @action.bound onReferralSortConditionChange(value: string[]) {
    this.referralSortParams = value
  }

  @action.bound changeCampaignReferralDialog(value: boolean) {
    this.campaignReferralDialog = value
  }

  @action changeSubReferralCode(code: string) {
    this.subReferralCode = code
  }
  @action changeSubReferrerName(name: string) {
    this.subReferrerName = name
  }

  @computed get campaignCode() {
    return _.get(this.campaignDetail, 'code', 'TBA')
  }

  @computed get pastDayApplies() {
    return _.filter(this.relatedApplies, (apply) => moment().diff(moment(apply.createdAt), 'hours') <= 24)
  }

  @computed get rewardCalculatedArr() {
    const awardedApplies = _.filter(this.relatedApplies, (apply) => apply.status === 'awarded')
    const referralRewardMap = new Map()
    const referralMap = new Map(this.referralList.map((hunter) => [hunter.id, hunter.referrerCode]))
    const referralCode = _.get(authStore.user, 'hunter.referralCode', '')
    const groupByHunterId = _.groupBy(awardedApplies, 'hunter.id')
    for (const key in groupByHunterId) {
      if (Object.hasOwnProperty.call(groupByHunterId, key)) {
        const element = groupByHunterId[key]
        const commissionRate = referralMap.get(key) === referralCode ? 5 : 2
        const sumWithInitial = element.reduce(
          (prev, current) => ({
            totalEarn: prev.totalEarn.addUnsafe(
              FixedNumber.from(current.bounty).mulUnsafe(FixedNumber.from(current.task.tokenBasePrice))
            ),
            commission: prev.commission.addUnsafe(
              FixedNumber.from(current.bounty)
                .mulUnsafe(FixedNumber.from(`${commissionRate}`))
                .divUnsafe(HUNDRED)
                .mulUnsafe(FixedNumber.from(current.task.tokenBasePrice))
            ),
            commissionToday:
              moment().diff(moment(current.updatedAt), 'hours') <= 24
                ? prev.commissionToday.addUnsafe(
                    FixedNumber.from(current.bounty)
                      .mulUnsafe(FixedNumber.from(`${commissionRate}`))
                      .divUnsafe(HUNDRED)
                      .mulUnsafe(FixedNumber.from(current.task.tokenBasePrice))
                  )
                : prev.commissionToday,
          }),
          {
            totalEarn: Zero,
            commission: Zero,
            commissionToday: Zero,
          }
        )
        referralRewardMap.set(key, sumWithInitial)
      }
    }

    return this.referralList.map((r) => {
      const val = referralRewardMap.get(r.id)
      return {
        ...r,
        totalEarn: _.get(val, 'totalEarn._value', '0'),
        commission: _.get(val, 'commission._value', '0'),
        commissionToday: _.get(val, 'commissionToday._value', '0'),
      }
    })
  }

  @computed get referrerFilteredList() {
    return this.rewardCalculatedArr.filter((hunter) => hunter.referrerCode === authStore.hunterReferralCode)
  }

  @computed get referralMap() {
    const groupByReferralCode = _.groupBy(this.rewardCalculatedArr, 'referrerCode')
    const result = new Map()
    for (const key in groupByReferralCode) {
      if (Object.prototype.hasOwnProperty.call(groupByReferralCode, key)) {
        const element = groupByReferralCode[key]
        result.set(key, element)
      }
    }
    return result
  }

  @computed get subReferralList() {
    return this.referralMap.get(this.subReferralCode)
  }

  @computed get displayedReferralList() {
    return _.orderBy(
      this.referrerFilteredList,
      [this.referralSortParams[0]],
      [this.referralSortParams[1] as 'asc' | 'desc']
    ).slice((this.referralPage - 1) * PAGE_LIMIT, this.referralPage * PAGE_LIMIT)
  }

  @computed get totalCommissionObj() {
    return this.rewardCalculatedArr.reduce(
      (prev, current) => ({
        totalCommission: prev.totalCommission.addUnsafe(FixedNumber.from(current.commission)),
        pastDayCommission: prev.pastDayCommission.addUnsafe(FixedNumber.from(current.commissionToday)),
      }),
      { totalCommission: Zero, pastDayCommission: Zero }
    )
  }

  @computed get totalReferralPage() {
    return _.ceil(this.rewardCalculatedArr.length / PAGE_LIMIT)
  }
}

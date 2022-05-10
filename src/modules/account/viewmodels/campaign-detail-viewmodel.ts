import { apiService } from '@/services/api-service'
import { action, observable } from 'mobx'

export class CampaignDetailViewModel {
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
  @observable referralPage = 0
  @observable loading = false

  constructor() {
    //
    apiService.hunters.find().then((res) => {
      console.log(res)

      this.referralList = res
    })
  }

  @action initReaction() {
    //
  }

  @action destroyReaction() {
    //
  }

  @action.bound onReferralSortConditionChange(value: string[]) {
    this.referralSortParams = value
  }
}

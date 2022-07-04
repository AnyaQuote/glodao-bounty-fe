import { observable } from 'mobx'

const DEFAULT_BREADCRUMBS = [
  {
    text: 'Bounty hunter',
    disabled: false,
    href: '/bounty',
  },
  {
    text: 'In app trial',
    disabled: true,
    href: '',
  },
]

export class BountyAppTrialViewModel {
  @observable breadcrumbsItems = DEFAULT_BREADCRUMBS
  @observable loading = false
  @observable task = {}
}

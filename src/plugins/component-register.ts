import Vue from 'vue'

export const componentRegister = () => {
  Vue.component('company-footer', () => import('@/components/company-footer.vue'))
  Vue.component('card-hover', () => import('@/components/card-hover.vue'))
  Vue.component('pool-logo', () => import('@/components/images/pool-logo.vue'))
  Vue.component('app-tooltip', () => import('@/components/app-tooltip.vue'))
  Vue.component('connect-metamask', () => import('@/components/connect-metamask.vue'))
  Vue.component('embed-tweet', () => import('@/components/embed-tweet.vue'))
  // Vue.component('connect-wallet', () => import('@/components/connect-wallet.vue'))
  // Vue.component('chain-logo', () => import('@/components/chain-logo.vue'))
}

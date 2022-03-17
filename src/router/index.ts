import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', redirect: '/bounty' },

  {
    path: '/bounty',
    name: 'Bounty',
    component: () => import('@/modules/bounty/pages/bounty.vue'),
  },
  {
    path: '/reward',
    name: 'Reward',
    component: () => import('@/modules/reward/pages/reward.vue'),
  },
  {
    path: '/twitter-auth',
    name: 'TwitterAuthentication',
    component: () => import('@/modules/auth/pages/twitter-auth.vue'),
  },
  {
    path: '/hunting-history',
    name: 'Hunting history',
    component: () => import('@/modules/account/pages/hunting-history.vue'),
  },
  {
    path: '/bounty/:bountyId',
    name: 'BountyDetail',
    component: () => import('@/modules/bounty/pages/bounty-detail.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

// router.beforeEach(async (to, from, next) => {
//   await when(() => walletStore.loaded)
//   next()
// })

export default router

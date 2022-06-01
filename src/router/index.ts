import { authStore } from '@/stores/auth-store'
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
    name: 'HuntingHistory',
    component: () => import('@/modules/account/pages/hunting-history.vue'),
  },
  {
    path: '/company-profile',
    name: 'CompanyProfile',
    component: () => import('@/modules/account/pages/company-profile.vue'),
  },
  {
    path: '/my-referral',
    name: 'MyReferral',
    component: () => import('@/modules/account/pages/my-referral.vue'),
  },
  {
    path: '/campaign-detail/:id',
    name: 'CampaignDetail',
    component: () => import('@/modules/account/pages/campaign-detail.vue'),
  },
  {
    path: '/bounty/:taskId',
    name: 'BountyDetail',
    component: () => import('@/modules/bounty/pages/bounty-detail.vue'),
  },
  {
    path: '/learn/:id',
    name: 'Learn',
    component: () => import('@/modules/bounty/pages/bounty-learn.vue'),
  },
  {
    path: '/quiz-record/:id',
    name: 'QuizRecord',
    component: () => import('@/modules/bounty/pages/quiz-record.vue'),
  },
  {
    path: '/bounty-history',
    name: 'BountyHistory',
    component: () => import('@/modules/bounty-history/pages/bounty-history.vue'),
  },
  {
    path: '/bounty-history/:taskId',
    name: 'BountyHistoryDetail',
    component: () => import('@/modules/bounty-history/pages/bounty-history-detail.vue'),
  },
  {
    path: '/bounty-reward',
    name: 'BountyRewardDashboard',
    component: () => import('@/modules/bounty-reward/pages/bounty-reward-page.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/modules/error/pages/coming-soon.vue'),
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

router.beforeEach(async (to, from, next) => {
  if (to.name === 'HuntingHistory') {
    if (authStore.userRole === 'company') next('/company-profile')
  }
  if (to.name === 'CompanyProfile') {
    if (authStore.userRole !== 'company') next('/hunting-history')
  }
  next()
})

export default router

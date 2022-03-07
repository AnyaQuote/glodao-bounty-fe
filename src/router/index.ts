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

<template>
  <v-app-bar height="80px" class="navigation-bar" app flat>
    <div class="nav-container mx-auto" style="width: 100%">
      <v-row class="d-flex align-center justify-space-between">
        <v-col col="12" sm="12" md="2"> </v-col>
        <v-col col="12" sm="12" md="7" class="d-flex align-center justify-space-between">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-btn-text cursor-pointer px-4" v-bind="attrs" v-on="on">Launch Pad</div>
            </template>
            <span>Coming Soon!</span>
          </v-tooltip>
          <router-link to="/bounty" class="text-decoration-none px-4" active-class="active">
            <div class="text-none nav-btn-text">Bounty Hunter</div>
          </router-link>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-btn-text cursor-pointer px-4" v-bind="attrs" v-on="on">Staking</div>
            </template>
            <span>Coming Soon!</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-btn-text cursor-pointer px-4" v-bind="attrs" v-on="on">Farm</div>
            </template>
            <span>Coming Soon!</span>
          </v-tooltip>
        </v-col>
        <v-col col="12" sm="12" md="2">
          <div class="d-flex align-center justify-end">
            <!-- <connect-metamask :requiredChainId="chainId">
              <v-menu open-on-hover offset-y v-if="wallet.connected">
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="d-flex align-center connect-wallet border-radius-8 text-none py-2 px-5 transparent-bg"
                    v-bind="attrs"
                    v-on="on"
                    large
                  >
                    <div class="accent--text font-weight-bold">
                      {{ wallet.shortAccount }}
                    </div>
                  </div>
                </template>
              </v-menu>
            </connect-metamask> -->
          </div>
        </v-col>
      </v-row>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { Observer } from 'mobx-vue'

@Observer
@Component({
  components: {
    'connect-metamask': () => import('@/components/connect-metamask.vue'),
  },
})
export default class Staking extends Vue {
  wallet = walletStore
  chainId = process.env.VUE_APP_CHAIN_ID
  openLink(url) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
.navigation-bar {
  background: var(--v-background-base) !important;
}
.nav-container {
  max-width: 1280px;
}
.connect-wallet {
  border: 1px solid #ffffff;
  box-sizing: border-box;
}
.nav-btn-text {
  font-style: normal;
  font-weight: 600;
  font-size: 16px !important;
  line-height: 24px;
  letter-spacing: 0.02em !important;
}
.active {
  color: var(--v-twitter-base) !important;
}
</style>

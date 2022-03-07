<template>
  <v-navigation-drawer
    v-model="wallet.navigationDrawer"
    style="background: var(--v-cardBackground-base); min-width: 320px"
    temporary
    absolute
  >
    <div class="px-4 py-1"></div>
    <v-divider></v-divider>
    <div class="d-flex flex-column" style="height: calc(100vh - 124px)">
      <v-list class="px-4 mt-4" dense nav>
        <v-list-item class="py-2">
          <v-list-item-title class="nav-btn-text text-uppercase">Summon</v-list-item-title>
        </v-list-item>
        <v-list-item active-class="primary--text" class="py-2">
          <v-list-item-title class="nav-btn-text text-uppercase">Marketplace</v-list-item-title>
        </v-list-item>
        <v-list-item active-class="primary--text" to="/stake" class="py-2">
          <v-list-item-title class="nav-btn-text text-uppercase">Staking</v-list-item-title>
        </v-list-item>
        <v-list-item active-class="primary--text" to="/egg-hatch" class="py-2">
          <v-list-item-title class="nav-btn-text text-uppercase">Egg hatch</v-list-item-title>
        </v-list-item>
        <v-list-item active-class="primary--text" to="/training-ground" class="py-2">
          <v-list-item-title class="nav-btn-text text-uppercase">Training Ground</v-list-item-title>
        </v-list-item>
        <v-list-item active-class="primary--text" class="py-2">
          <v-list-item-title class="nav-btn-text text-uppercase">Our team</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <div class="mx-auto" v-if="wallet.isMetamask">
        <ConnectMetamask :requiredChainId="chainId">
          <v-btn class="d-flex align-center connect-wallet border-radius-8 text-none px-3 transparent-bg" large>
            <div class="accent--text font-weight-bold">
              {{ wallet.shortAccount }}
            </div>
            <!-- <v-img class="ml-3" :src="require('@/assets/wallet.svg')" max-width="18px" contain></v-img> -->
          </v-btn>
        </ConnectMetamask>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { Observer } from 'mobx-vue'

@Observer
@Component({
  components: {
    ConnectMetamask: () => import('@/components/connect-metamask.vue'),
  },
})
export default class Staking extends Vue {
  wallet = walletStore
  chainId = process.env.VUE_APP_CHAIN_ID

  openLink(url) {
    window.open(url, '_blank')
  }
  backToHome() {
    this.$router.push('/')
  }
}
</script>

<style scoped>
.btn-theme {
  position: absolute;
  bottom: 24px;
  left: 24px;
}
</style>

<template>
  <v-app-bar app class="neutral100" fixed hide-on-scroll>
    <div class="d-flex align-center full-width">
      <v-app-bar-nav-icon
        @click="wallet.setNavigationDrawer(true)"
        style="z-index: 10; height: 46px; width: 46px"
      ></v-app-bar-nav-icon>
      <v-img
        :src="
          $vuetify.theme.dark
            ? require(`@/assets/images/glodao-logo-dark.svg`)
            : require(`@/assets/images/glodao-logo.svg`)
        "
        max-height="46"
        max-width="70"
      ></v-img>
      <div class="full-width d-flex justify-center"></div>
      <v-btn icon @click="changeTheme" class="rounded-circle change-theme-btn" width="40" height="40" outlined>
        <v-icon color="bluePrimary">
          {{ !$vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}
        </v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { Observer } from 'mobx-vue'
import { AppProvider } from '@/app-providers'

@Observer
@Component({
  components: {},
})
export default class MobileNavigationBar extends Vue {
  @Inject() providers!: AppProvider

  wallet = walletStore
  openLink(url) {
    window.open(url, '_blank')
  }
  changeTheme() {
    this.providers.toggleLightMode(this.$vuetify)
  }
  backToHome() {
    this.$router.push('/')
  }
}
</script>

<style scoped>
.change-theme-btn {
  border-color: var(--v-bluePrimary-base) !important;
  background: var(--v-bluePrimary-lighten1) !important;
}
.navigation-bar {
  background: #234973 !important;
}
.connect-wallet {
  border: 1px solid #ffffff;
  box-sizing: border-box;
}
</style>

<template>
  <v-navigation-drawer
    v-model="wallet.navigationDrawer"
    style="min-width: 320px"
    class="fill-height neutral100"
    temporary
    fixed
  >
    <div class="px-4 py-1"></div>
    <v-divider></v-divider>
    <v-btn
      depressed
      class="rounded-0 blue-diversity--text neutral15"
      height="40"
      block
      v-if="!authStore.jwt"
      @click="authStore.changeTwitterLoginDialog(true)"
    >
      <v-icon class="mr-2">mdi-twitter</v-icon> Log in
    </v-btn>
    <v-sheet class="fill-width neutral100" v-else>
      <v-sheet class="d-flex align-center pa-4 neutral100">
        <v-avatar size="32">
          <img :src="authStore.user.avatar" alt="Avatar" />
        </v-avatar>
        <div class="ml-3 font-weight-600">{{ authStore.user.hunter.name }}</div>
      </v-sheet>
      <v-divider></v-divider>
      <v-sheet class="neutral100">
        <v-btn plain block class="menu-btn" height="40" depressed @click="authStore.changeAttachWalletDialog(true)">
          <v-icon class="mr-3 ml-0" left size="24">mdi-wallet-outline</v-icon> Attached wallet
        </v-btn>
        <v-btn plain block class="menu-btn" height="40" depressed @click="goToHuntingHistoryScreen()">
          <v-img
            :src="require('@/assets/icons/crown-mini.svg')"
            max-height="22"
            max-width="22"
            class="mr-2 ml-0"
          ></v-img>

          Hunting history
        </v-btn>
        <v-btn plain block class="menu-btn" height="40" depressed @click="authStore.logout()"> Log out </v-btn>
      </v-sheet>
    </v-sheet>
    <v-divider></v-divider>
    <div class="d-flex flex-column">
      <v-list class="px-4 mt-4" dense nav>
        <v-list-item class="py-2" @click="openLink('https://dev.glodao.io/launchpad')">
          <v-list-item-title class="nav-btn-text text-capitalize neutral10--text">Launch pad</v-list-item-title>
        </v-list-item>
        <v-list-item active-class="blue--text" to="/bounty" class="py-2">
          <v-list-item-title class="nav-btn-text text-capitalize">Bounty hunter</v-list-item-title>
        </v-list-item>
        <v-list-item active-class="primary--text" class="py-2" @click="openLink('https://dev.glodao.io/staking')">
          <v-list-item-title class="nav-btn-text text-capitalize neutral10--text">$Staking</v-list-item-title>
        </v-list-item>
        <v-list-item active-class="primary--text" class="py-2" @click="openLink('https://dev.glodao.io/farm')">
          <v-list-item-title class="nav-btn-text text-capitalize neutral10--text">Farm</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
    <v-divider></v-divider>
    <div>
      <connect-wallet btnClass="rounded-0 fill-width"></connect-wallet>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { Observer } from 'mobx-vue'

@Observer
@Component({
  components: {
    'connect-wallet': () => import('@/components/connect-wallet.vue'),
  },
})
export default class Staking extends Vue {
  wallet = walletStore
  authStore = authStore
  chainId = process.env.VUE_APP_CHAIN_ID

  openLink(url) {
    window.open(url, '_blank')
  }
  backToHome() {
    this.$router.push('/')
  }
  goToHuntingHistoryScreen() {
    this.$router.push('/hunting-history').catch(() => {
      //
    })
  }
}
</script>

<style scoped>
.btn-theme {
  position: absolute;
  bottom: 24px;
  left: 24px;
}
.menu-btn {
  border-radius: 0 !important;
  display: flex;
  justify-content: flex-start;
  text-transform: unset;
  font-size: 14px;
  line-height: 20px;
  margin-top: 4px;
  margin-bottom: 4px;
  color: var(--v-neutral10-base);
}
.position-sticky {
  position: sticky;
}
</style>

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
        <!-- <v-btn
          plain
          block
          class="menu-btn neutral10--text"
          height="40"
          depressed
          @click="authStore.changeAttachWalletDialog(true)"
        >
          <v-icon class="mr-3 ml-0" left size="24">mdi-wallet-outline</v-icon> Attached wallet
        </v-btn> -->
        <v-btn plain block class="menu-btn neutral10--text" height="40" depressed @click="goToBountyRewardScreen()">
          <!-- <v-img
            :src="require('@/assets/icons/crown-mini.svg')"
            max-height="22"
            max-width="22"
            class="mr-2 ml-0"
          ></v-img> -->
          <v-icon width="28" height="28" class="mr-2 ml-0" color="neutral10"> mdi-star-circle </v-icon>
          My reward
        </v-btn>
        <v-btn plain block class="menu-btn neutral10--text" height="40" depressed @click="goToHuntingHistoryScreen()">
          <v-img
            :src="require('@/assets/icons/crown-mini.svg')"
            max-height="22"
            max-width="22"
            class="mr-2 ml-0"
          ></v-img>

          My account
        </v-btn>
        <!-- <v-btn plain block class="menu-btn neutral10--text" height="40" depressed @click="openKYCPage()">
          <v-icon width="28" height="28" class="mr-2 ml-0" color="neutral10"> mdi-fingerprint </v-icon>
          My KYC
        </v-btn> -->
        <v-btn plain block class="menu-btn" height="40" depressed @click="authStore.logout()"> Log out </v-btn>
      </v-sheet>
    </v-sheet>
    <v-divider></v-divider>
    <div class="d-flex flex-column">
      <v-list class="px-4 mt-1" dense nav>
        <v-list-item class="neutral10--text">
          <v-list-item-title class="nav-btn-text text-capitalize neutral10--text">
            Launchpad (Coming soon)
          </v-list-item-title>
        </v-list-item>

        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item class="ml-0 pl-0">
              <v-list-item-title class="nav-btn-text text-none bluePrimary--text">Bounty hunter</v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:appendIcon>
            <v-icon color="bluePrimary">mdi-chevron-down</v-icon>
          </template>
          <v-list-item active-class="filter-bluePrimary black--text" to="/bounty">
            <v-list-item-icon class="mr-2">
              <v-img :src="require('@/assets/icons/nav-bar/bounty.svg')" class="filter-neutral10 fill-height"></v-img>
            </v-list-item-icon>
            <v-list-item-title class="text-none">Bounty hunter</v-list-item-title>
          </v-list-item>
          <v-list-item active-class="filter-bluePrimary black--text" to="/bounty-history">
            <v-list-item-icon class="mr-2">
              <v-img
                :src="require('@/assets/icons/nav-bar/launchpad.svg')"
                class="filter-neutral10 fill-height"
              ></v-img>
            </v-list-item-icon>
            <v-list-item-title class="text-none">Bounty history</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon class="mr-2">
              <v-icon color="neutral10">mdi-check</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-none neutral10--text">Apply project (Coming soon)</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- <v-list-item active-class="neutral10--text" @click="openLink('https://dev.glodao.io/staking')">
          <v-list-item-icon class="mr-2">
            <v-img :src="require('@/assets/icons/nav-bar/staking.svg')" class="filter-neutral10 fill-height"></v-img>
          </v-list-item-icon>
          <v-list-item-title class="nav-btn-text text-capitalize neutral10--text">$Staking</v-list-item-title>
        </v-list-item>

        <v-list-item active-class="neutral10--text" @click="openLink('https://dev.glodao.io/farm')">
          <v-list-item-icon class="mr-2">
            <v-img :src="require('@/assets/icons/nav-bar/farm.svg')" class="filter-neutral10 fill-height"></v-img>
          </v-list-item-icon>
          <v-list-item-title class="nav-btn-text text-capitalize neutral10--text">Farming</v-list-item-title>
        </v-list-item> -->
        <v-list-group no-action class="">
          <template v-slot:activator>
            <v-list-item class="ml-0 pl-0">
              <v-list-item-title class="nav-btn-text text-none neutral10--text">Staking</v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:appendIcon>
            <v-icon color="neutral10">mdi-chevron-down</v-icon>
          </template>
          <v-list-item active-class="filter-bluePrimary">
            <!-- <v-list-item-icon>
              <img :src="require('@/assets/icons/nav-bar/staking.svg')" class="filter-neutral10" />
            </v-list-item-icon> -->
            <v-list-item-title>
              <div class="neutral10--text">$Staking (Coming soon)</div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item active-class="filter-bluePrimary">
            <!-- <v-list-item-icon>
              <img :src="require('@/assets/icons/nav-bar/farm.svg')" class="filter-neutral10" />
            </v-list-item-icon> -->
            <v-list-item-title>
              <div class="neutral10--text">Farming (Coming soon)</div>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item class="ml-0 pl-0">
              <v-list-item-title class="nav-btn-text text-none neutral10--text">DAO Voting</v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:appendIcon>
            <v-icon color="neutral10">mdi-chevron-down</v-icon>
          </template>
          <v-list-item active-class="black--text" href="#">
            <!-- <v-list-item-icon class="mr-2">
                <v-img :src="require('@/assets/icons/nav-bar/bounty.svg')" class="filter-neutral10 fill-height"></v-img>
              </v-list-item-icon> -->
            <v-list-item-title class="text-none">Voting</v-list-item-title>
          </v-list-item>
          <v-list-item active-class="black--text" href="#">
            <!-- <v-list-item-icon class="mr-2"> -->
            <!-- <v-img
                  :src="require('@/assets/icons/nav-bar/launchpad.svg')"
                  class="filter-neutral10 fill-height"
                ></v-img> -->
            <!-- </v-list-item-icon> -->
            <v-list-item-title class="text-none">Your projects</v-list-item-title>
          </v-list-item>
          <!-- <v-list-item> -->
          <!-- <v-list-item-icon class="mr-2"> -->
          <!-- <v-icon color="neutral10">mdi-check</v-icon> -->
          <!-- </v-list-item-icon> -->
          <!-- </v-list-item> -->
        </v-list-group>

        <!-- <v-list-item class="my-2"> -->
        <!-- <v-list-item-title
            class="nav-btn-text neutral10--text"
            block
            depressed
            large
            rounded
            color="primary"
            outlined
          >
            DAO voting (Coming soon)
          </v-list-item-title> -->
        <!-- </v-list-item> -->
        <v-list-group no-action>
          <template v-slot:activator>
            <v-list-item class="ml-0 pl-0">
              <v-list-item-title class="nav-btn-text text-none neutral10--text">Utilities</v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:appendIcon>
            <v-icon color="neutral10">mdi-chevron-down</v-icon>
          </template>
          <v-list-item active-class="filter-bluePrimary">
            <v-list-item-title>
              <div class="d-flex align-center neutral10--text">
                <v-icon class="mr-2" size="20">mdi-lock-outline</v-icon>
                <div><a href="https://tools.glodao.io/locker" target="_blank">Locker</a></div>
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item active-class="filter-bluePrimary">
            <v-list-item-title>
              <div class="d-flex align-center neutral10--text">
                <v-icon class="mr-2" size="20">mdi-cached</v-icon>
                <div><a href="https://tools.glodao.io/bulksend" target="_blank">Bulksend</a></div>
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item active-class="filter-bluePrimary">
            <v-list-item-title>
              <div class="d-flex align-center neutral10--text">
                <v-icon class="mr-2" size="20">mdi-flare</v-icon>
                <div><a href="https://tools.glodao.io/claim/pools" target="_blank">MultiClaim</a></div>
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item active-class="filter-bluePrimary">
            <v-list-item-title>
              <div class="d-flex align-center neutral10--text">
                <v-icon class="mr-2" size="20">mdi-alert-circle-outline</v-icon>
                <div>Unapprove (Coming soon)</div>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
    <div class="d-flex align-center justify-center px-10">
      <connect-wallet btnClass="rounded fill-width"></connect-wallet>
      <!-- <v-btn icon @click="changeTheme" class="rounded-circle change-theme-btn" width="40" height="40" outlined>
        <v-icon color="bluePrimary">
          {{ !$vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}
        </v-icon>
      </v-btn> -->
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { Observer } from 'mobx-vue'
import { AppProvider } from '@/app-providers'
import { apiService } from '@/services/api-service'
import { loadingController } from './global-loading/global-loading-controller'
import { snackController } from './snack-bar/snack-bar-controller'

@Observer
@Component({
  components: {
    'connect-wallet': () => import('@/components/connect-wallet.vue'),
  },
})
export default class NavigationDrawer extends Vue {
  @Inject() providers!: AppProvider
  wallet = walletStore
  authStore = authStore
  chainId = process.env.VUE_APP_CHAIN_ID
  KYC_WEB_HOST = process.env.VUE_APP_KYC_WEB_HOST
  daoVotingUrl = process.env.VUE_APP_VOTING_HOST

  openLink(url) {
    window.open(url, '_blank')
  }
  backToHome() {
    this.$router.push('/')
  }
  changeTheme() {
    this.providers.toggleLightMode(this.$vuetify)
  }
  goToHuntingHistoryScreen() {
    this.$router.push('/hunting-history').catch(() => {
      //
    })
  }
  goToBountyRewardScreen() {
    this.$router.push('/bounty-reward').catch(() => {
      //
    })
  }

  async openKYCPage() {
    if (!authStore.kycSessionId) {
      loadingController.increaseRequest()
      try {
        const { sessionId } = await apiService.createSessionId(authStore.jwt)
        const updatedUser = await apiService.updateUserSessionId(sessionId)
        authStore.changeUser(updatedUser.data)
        window.open(`${this.KYC_WEB_HOST}/kyc/${sessionId}`, '_blank')
      } catch (error) {
        snackController.error(error as string)
      } finally {
        loadingController.decreaseRequest()
      }
    } else {
      window.open(`${this.KYC_WEB_HOST}/kyc/${authStore.kycSessionId}`, '_blank')
    }
  }
}
</script>

<style scoped>
.change-theme-btn {
  border-color: var(--v-bluePrimary-base) !important;
  background: var(--v-bluePrimary-lighten1) !important;
}
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
.nav-btn-text {
  font-size: 14px !important;
}
</style>

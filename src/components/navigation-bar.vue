<template>
  <v-app-bar height="80px" class="navigation-bar" app flat>
    <div class="nav-container mx-auto" style="width: 100%">
      <v-row class="d-flex align-center justify-space-between">
        <v-col col="12" sm="12" md="3">
          <div class="pl-4">
            <v-img :src="require('@/assets/images/glodao-logo.svg')" max-height="50" max-width="75"></v-img>
          </div>
        </v-col>
        <v-col col="12" sm="12" md="6" class="d-flex align-center justify-space-between">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div class="nav-btn-text cursor-pointer px-4" v-bind="attrs" v-on="on">Launch Pad</div>
            </template>
            <span>Coming Soon!</span>
          </v-tooltip>
          <router-link to="/bounty" class="text-decoration-none px-4" active-class="blue-diversity--text">
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
        <v-col col="12" sm="12" md="3">
          <div class="d-flex align-center justify-end pr-6">
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
            <v-btn
              depressed
              outlined
              class="rounded-0 blue-diversity--text"
              height="40"
              width="110"
              v-if="!authStore.jwt"
              @click="authStore.changeTwitterLoginDialog(true)"
            >
              <v-icon class="mr-2">mdi-twitter</v-icon> Log in
            </v-btn>
            <v-menu offset-y v-else>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar size="40" v-bind="attrs" v-on="on">
                  <img src="https://picsum.photos/200" alt="Avatar" />
                </v-avatar>
              </template>
              <v-sheet width="240" outlined>
                <v-sheet class="d-flex align-center pa-4">
                  <v-avatar size="32" v-bind="attrs" v-on="on">
                    <img src="https://picsum.photos/200" alt="Avatar" />
                  </v-avatar>
                  <div class="ml-3 font-weight-600">Tommy_Shelby</div>
                </v-sheet>
                <v-divider></v-divider>
                <v-sheet>
                  <v-btn
                    plain
                    block
                    class="menu-btn"
                    height="40"
                    depressed
                    @click="authStore.changeAttachWalletDialog(true)"
                  >
                    <v-icon class="mr-3 ml-0" left size="24">mdi-wallet-outline</v-icon> Attached wallet
                  </v-btn>
                  <v-btn plain block class="menu-btn" height="40" depressed>
                    <!-- <v-icon class="mr-2">mdi-wallet-outline</v-icon> -->
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
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'

import { Observer } from 'mobx-vue'

@Observer
@Component({
  components: {
    'connect-metamask': () => import('@/components/connect-metamask.vue'),
  },
})
export default class Staking extends Vue {
  wallet = walletStore
  authStore = authStore
  chainId = process.env.VUE_APP_CHAIN_ID
  openLink(url) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
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
.blue-diversity--text {
  color: var(--v-bluePrimary-base);
}
</style>

<template>
  <v-sheet class="neutral100 d-flex flex-column rounded-lg pa-6" height="100%">
    <v-sheet class="neutral15 d-flex justify-center rounded-lg pa-6 py-8" width="100%">
      <v-sheet
        class="twitter position-relative rounded-circle"
        style="border-width: 2px"
        outlined
        width="fit-content"
        height="fit-content"
      >
        <v-avatar size="80">
          <img :src="authStore.user.avatar" alt="Avatar" />
        </v-avatar>
        <v-sheet
          class="twitter position-absolute d-flex justify-center align-center rounded-circle"
          style="right: 0; bottom: 0"
          width="20"
          height="20"
        >
          <v-icon color="white" size="12">mdi-twitter</v-icon>
        </v-sheet>
      </v-sheet>
      <v-sheet class="transparent d-flex flex-column justify-space-between ml-3">
        <v-sheet class="transparent font-weight-bold username-lg-text">
          {{ authStore.user | _get('hunter.name', '') }}
        </v-sheet>
        <div class="d-flex">
          <v-sheet
            class="red lighten-1 d-flex justify-center align-center white--text caption-text text-uppercase rounded-lg px-2 py-1"
            v-if="!vm.isWalletConnected"
          >
            Not connected
          </v-sheet>
          <v-sheet
            class="red lighten-1 d-flex justify-center align-center white--text caption-text text-uppercase rounded-lg px-2 py-1"
            v-else-if="!vm.isWalletMatched"
          >
            Wrong wallet
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon right small color="white" v-bind="attrs" v-on="on"> mdi-help-circle-outline </v-icon>
              </template>
              <span>Connect to your wallet {{ authStore.registeredWallet | shortAddress(4, 4) }} </span>
            </v-tooltip>
          </v-sheet>
          <v-sheet
            class="blue lighten-1 d-flex justify-center align-center blue--text caption-text text-uppercase rounded-lg px-2 py-1"
            v-else-if="vm.isStaked"
          >
            <v-icon class="pr-2" color="blue" size="18">mdi-star</v-icon>
            GLD staker
          </v-sheet>
          <v-sheet
            class="neutral20 neutral10--text d-flex justify-center align-center caption-text text-uppercase rounded-lg px-2 py-1"
            v-else
          >
            Non staker
          </v-sheet>
        </div>
      </v-sheet>
    </v-sheet>
    <v-sheet class="transparent d-flex justify-space-between align-center px-6 mt-6">
      <v-sheet class="transparent font-weight-600">Total earning:</v-sheet>
      <v-sheet class="transparent font-weight-bold number-count-text">{{ vm.totalEarning | usdCustom(2, 2) }}</v-sheet>
    </v-sheet>
    <v-sheet class="transparent d-flex justify-space-between align-center px-6 mt-5">
      <v-sheet class="transparent font-weight-600">Today earning:</v-sheet>
      <v-sheet class="transparent font-weight-bold number-count-text">{{
        vm.totalEarningToday | usdCustom(2, 2)
      }}</v-sheet>
    </v-sheet>
  </v-sheet>
</template>
<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'
import { Observer } from 'mobx-vue'
import { HuntingHistoryViewModel } from '../viewmodels/hunting-history-viewmodel'
import { authStore } from '@/stores/auth-store'
import { walletStore } from '@/stores/wallet-store'

@Observer
@Component
export default class extends Vue {
  @Inject() vm!: HuntingHistoryViewModel
  authStore = authStore
  walletStore = walletStore
}
</script>
<style scoped>
.hunter-info-container {
  background-image: url('~@/assets/images/blue-bg.svg');
  background-size: cover;
  padding-bottom: 0;
}
.username-lg-text {
  font-size: 28px;
  line-height: 36px;
}
.number-count-text {
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
}
.caption-text {
  font-size: 14px;
  line-height: 20px;
}
.font-weight-600 {
  font-weight: 600 !important;
}
</style>

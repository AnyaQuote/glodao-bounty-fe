<template>
  <v-sheet class="pa-6 mb-6 rounded-lg neutral100--bg pb-4" elevation="3">
    <v-sheet class="neutral100--bg">Your connected wallet:</v-sheet>
    <v-sheet
      class="font-weight-bold text-caption text-md-body-2 overflow-hidden text-overflow-ellipsis align-center neutral100--bg"
      :class="{
        'd-flex': $vuetify.breakpoint.smAndUp,
      }"
    >
      <v-sheet
        width="20"
        height="20"
        class="mr-2 background-transparent"
        min-height="20"
        min-width="20"
        :class="{
          'd-none': $vuetify.breakpoint.xsOnly,
        }"
      >
        <chain-logo :chain="chainId" class="fill-width fill-height" />
      </v-sheet>
      {{ vm.currentWallet }}
      <v-sheet
        class="neutral100--bg"
        :class="{
          'fill-width': $vuetify.breakpoint.smAndDown,
        }"
      >
        <v-chip
          class="ma-2 text-uppercase font-weight-regular text-caption"
          :class="{
            'ml-0': $vuetify.breakpoint.xsOnly,
          }"
          v-if="!vm.isCurrentWalletMatchRegistered"
          color="error"
          outlined
        >
          <span class="mr-1" v-if="!isLoggedIn">Not logged in</span>
          <span class="mr-1" v-else>Wrong wallet</span>
          <v-tooltip bottom v-if="!isLoggedIn">
            <template v-slot:activator="{ on, attrs }">
              <v-icon right small v-bind="attrs" v-on="on"> mdi-help-circle-outline </v-icon>
            </template>
            <span> You need to login first </span>
          </v-tooltip>
          <v-tooltip bottom v-else>
            <template v-slot:activator="{ on, attrs }">
              <v-icon right small v-bind="attrs" v-on="on"> mdi-help-circle-outline </v-icon>
            </template>
            <span v-if="vm.chain === 'bsc'"
              >Connect to your BSC wallet {{ vm.registeredWalletAddress | shortAddress(4, 4) }}
            </span>
            <span v-if="vm.chain === 'sol'"
              >Connect to your SOLANA wallet {{ vm.registeredSolanaWalletAddress | shortAddress(4, 4) }}
            </span>
          </v-tooltip>
        </v-chip>
        <v-chip
          class="ma-2 text-uppercase font-weight-regular text-caption blue--text blue lighten-1 font-weight-bold"
          :class="{
            'ml-0': $vuetify.breakpoint.xsOnly,
          }"
          v-else-if="vm.isStaker"
        >
          <v-icon size="12" class="mr-1 blue--text">mdi-star</v-icon> GLD STAKER
        </v-chip>
        <v-chip
          class="ma-2 text-uppercase font-weight-regular text-caption neutral10--text neutral20 font-weight-bold"
          :class="{
            'ml-0': $vuetify.breakpoint.xsOnly,
          }"
          v-else
        >
          Non staker
        </v-chip>
      </v-sheet>
    </v-sheet>
    <v-sheet v-if="vm.shouldShowStakeSuggestion" class="neutral100--bg">
      <v-divider></v-divider>
      <v-sheet class="mt-2 text-body-2 neutral10--text neutral100--bg">
        Priority pool is not full yet. Stake GLD to enter!
        <a href="#" class="bluePrimary--text ml-2">
          Stake now
          <v-icon size="18" class="bluePrimary--text">mdi-arrow-top-right</v-icon>
        </a>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'
import { localdata } from '@/helpers/local-data'
import { authStore } from '@/stores/auth-store'
import { BountyMixViewModel } from '../../viewmodels/bounty-mix-viewmodel'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
  },
})
export default class WalletSheet extends Vue {
  @Inject() vm!: BountyDetailViewModel | BountyMixViewModel
  chainId = localdata.lastChain
  authStore = authStore

  get isLoggedIn() {
    return this.authStore.isLoggedIn
  }
}
</script>
<style scoped lang="scss"></style>

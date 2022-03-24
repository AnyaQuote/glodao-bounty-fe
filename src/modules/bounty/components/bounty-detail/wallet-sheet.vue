<template>
  <v-sheet class="pa-6 mb-6 rounded-lg neutral100--bg" elevation="3">
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
        class="mr-2"
        :class="{
          'd-none': $vuetify.breakpoint.xsOnly,
        }"
      >
        <v-img :src="require('@/assets/icons/chain-wallet.svg')" max-height="20" max-width="20"></v-img>
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
            'mb-0': !vm.shouldShowStakeSuggestion,
          }"
          v-if="!vm.isCurrentWalletMatchRegistered"
          color="error"
          outlined
        >
          The wallet isn't matched
        </v-chip>
        <v-chip
          class="ma-2 text-uppercase font-weight-regular text-caption bluePrimary--text bluePrimary lighten-1 font-weight-bold"
          :class="{
            'ml-0': $vuetify.breakpoint.xsOnly,
            'mb-0': !vm.shouldShowStakeSuggestion,
          }"
          v-else-if="vm.isStaker"
        >
          <v-icon size="12" class="mr-1 bluePrimary--text">mdi-star</v-icon> GLO STAKER
        </v-chip>
        <v-chip
          class="ma-2 text-uppercase font-weight-regular text-caption neutral10--text neutral20 font-weight-bold"
          :class="{
            'ml-0': $vuetify.breakpoint.xsOnly,
            'mb-0': !vm.shouldShowStakeSuggestion,
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
        Priority pool is not full yet. Stake GDAO to enter!
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

@Observer
@Component({
  components: {},
})
export default class WalletSheet extends Vue {
  @Inject() vm!: BountyDetailViewModel
}
</script>
<style scoped lang="scss"></style>

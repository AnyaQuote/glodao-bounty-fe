<template>
  <v-sheet outlined width="626" class="mt-10 pa-8 position-relative">
    <div class="d-flex justify-center congratulation-title-text">Congratulation, You have just the reward!</div>
    <v-sheet class="mt-5 pa-4" outlined>
      <v-row>
        <v-col cols="12" sm="8" md="9" lg="9">
          <div class="small-text">At your wallet address</div>
          <div
            class="font-weight-600 overflow-hidden"
            :class="{
              'small-text': $vuetify.breakpoint.smAndDown,
              'medium-text': $vuetify.breakpoint.mdAndUp,
            }"
          >
            GxmhrPKccNjjfv898RSXXPZqrCM7LkdcMRfYNA65ywQT
          </div>
        </v-col>
        <v-col cols="12" sm="4" md="3" lg="3">
          <div class="small-text">Amount</div>
          <div class="medium-text font-weight-600">1,000.000 TVN</div>
        </v-col>
      </v-row>
    </v-sheet>
    <div class="mt-7 d-flex justify-center">
      <v-btn class="background-blue-diversity white--text rounded-0 text-capitalize" depressed>
        Sell on Diversity
      </v-btn>
    </div>
    <v-sheet
      outlined
      class="close-icon"
      :class="{
        'close-icon-sm': $vuetify.breakpoint.smAndDown,
      }"
    >
      <v-icon> mdi-window-close </v-icon>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Ref, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { BountyHunterViewModel } from '@/modules/bounty/viewmodels/bounty-hunter-viewmodel'

@Observer
@Component({
  components: {},
})
export default class Farming extends Vue {
  @Provide() vm = new BountyHunterViewModel()
  walletStore = walletStore
  items = ['Foo', 'Bar', 'Fizz', 'Buzz']
}
</script>

<style scoped lang="scss">
@import url('~@/modules/reward/styles/index.scss');
.congratulation-title-text {
  font-size: 20px;
  line-height: 20px;
}
.small-text {
  font-size: 14px;
  line-height: 20px;
}
.medium-text {
  font-size: 16px;
  line-height: 20px;
}
.close-icon {
  position: absolute;
  top: 0;
  right: -30px;
}
.close-icon-sm {
  top: 1px !important;
  right: 1px !important;
}
</style>

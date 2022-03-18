<template>
  <v-dialog persistent width="534" v-model="vm.earnDialog">
    <v-sheet class="position-relative overflow-hidden pb-4" outlined>
      <div class="d-flex justify-center align-center py-5 card-title-text font-weight-600 text-uppercase">
        confirm and earn reward
      </div>
      <div class="custom-blue-divider fill-width"></div>
      <div class="mt-7 px-8">
        <div>
          <ul class="card-title-text">
            <li>You have done successfully the Twitter task!</li>
            <!-- <li>Your total reward: <span class="card-title-text font-weight-600">1000 DVT</span></li> -->
          </ul>
        </div>
        <!-- <div class="mt-8 small-label">Please enter your reward address and perform KYC to reward</div> -->
        <div class="mt-8 small-label">Please enter your reward address to earn reward</div>
        <v-sheet class="mt-4 py-1 px-2 d-flex align-center" rounded outlined>
          <v-text-field
            hide-details
            dense
            placeholder="Your wallet address"
            flat
            solo
            class="ma-0 pa-0 rounded-lg"
            :value="vm.earnDialogWalletInput"
            @input="vm.changeEarnDialogWalletInput"
          ></v-text-field>
          <v-icon>mdi-wallet-outline</v-icon>
        </v-sheet>
        <!-- <v-sheet class="mt-6 py-1 px-2 d-flex align-center" outlined>
          <v-text-field
            hide-details
            dense
            placeholder="Perform KYC to complete"
            flat
            solo
            class="ma-0 pa-0"
            readonly
          ></v-text-field>
          <v-btn depressed class="background-blue-diversity white--text rounded-0 text-capitalize"> Submit KYC </v-btn>
        </v-sheet> -->
        <div class="mt-6 d-flex justify-center">
          <v-btn
            depressed
            class="line-height-6 px-4 py-2 linear-background-blue-main"
            height="40"
            :disabled="!vm.earnDialogWalletInput.trim()"
            @click="vm.submitTaskConfirmation('twitter')"
          >
            <span class="btn-span text-capitalize">Reward</span>
          </v-btn>
        </div>
      </div>
      <v-icon class="close-icon" @click="vm.changeEarnDialog(false)">mdi-window-close</v-icon>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Inject } from 'vue-property-decorator'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'

@Observer
@Component({
  components: {},
})
export default class Farming extends Vue {
  @Inject() vm!: BountyDetailViewModel
}
</script>

<style scoped lang="scss">
.v-btn--disabled {
  background-image: none !important;
}
.close-icon {
  position: absolute;
  top: 0;
  right: 0;
}
.small-label {
  font-size: 14px;
  line-height: 18px;
}
.custom-blue-divider {
  border-top: 3px solid var(--v-bluePrimary-base);
}
.btn-span {
  line-height: 24px;
  color: white;
  font-size: 14px;
}
</style>

<template>
  <v-dialog persistent width="534" v-model="vm.earnDialog" class="overflow-hidden">
    <v-sheet class="position-relative overflow-hidden pb-4 rounded neutral100--bg" outlined>
      <div class="d-flex justify-center align-center py-4 card-title-text font-weight-600 text-uppercase">
        confirm to complete
      </div>
      <div class="custom-blue-divider fill-width"></div>
      <div class="mt-7 px-8">
        <div class="text-body-2 text-center font-weight-bold">
          Congratulations, You have done successfully the {{ vm.task.name }} task!
          <!-- <span class="text-capitalize">{{ vm.currentPoolType }}</span> pool! -->
        </div>
        <div
          v-if="vm.confirmContent"
          class="text-body-1 text-center mt-1 red--text text-decoration-underline font-italic"
        >
          {{ vm.confirmContent }}
        </div>
        <div v-else>
          <div class="text-body-2 text-center font-weight-bold" v-if="vm.isInPriorityPool">
            Your total reward: {{ vm.singlePriorityRewardAsToken | formatNumber(2, 2) }} {{ vm.rewardToken }}
          </div>
          <div class="text-caption text-center mt-1" v-if="!vm.isInPriorityPool">
            Your reward will be calculated exactly when the hunting pool ends. Please wait until then, we will
            distribute it to the reward wallet address you provided!
          </div>
          <div class="text-caption text-center mt-1" v-else>
            Please wait until when the hunting pool ends, we will distribute it to the reward wallet address you
            provided!
          </div>
        </div>
        <!-- <div class="mt-8 small-label">Please enter your reward address and perform KYC to reward</div> -->
        <div class="mt-5 text-body-2">Please enter your reward address</div>
        <v-sheet class="mt-2 py-1 px-2 d-flex align-center neutral100--bg" rounded outlined>
          <v-icon>mdi-wallet-outline</v-icon>

          <v-text-field
            hide-details
            dense
            placeholder="Your wallet address"
            flat
            solo
            class="ma-0 pa-0 rounded-lg text-caption neutral100--bg link-submit-custom-input"
            :value="vm.earnDialogWalletInput"
            @input="vm.changeEarnDialogWalletInput"
            readonly
          ></v-text-field>
          <v-btn
            depressed
            class="line-height-6 px-4 py-2 linear-background-blue-main"
            height="40"
            :disabled="!vm.earnDialogWalletInput.trim()"
            @click="vm.submitTaskConfirmation('twitter')"
            :loading="vm.isTaskSubmiting"
          >
            <span class="btn-span text-capitalize">submit</span>
          </v-btn>
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
        <!-- <div class="mt-6 d-flex justify-center">
          <v-btn
            depressed
            class="line-height-6 px-4 py-2 linear-background-blue-main"
            height="40"
            :disabled="!vm.earnDialogWalletInput.trim()"
            @click="vm.submitTaskConfirmation('twitter')"
          >
            <span class="btn-span text-capitalize">submit</span>
          </v-btn>
        </div> -->
      </div>
      <v-icon class="close-icon" @click="vm.changeEarnDialog(false)" :disabled="vm.isTaskSubmiting">
        mdi-window-close
      </v-icon>
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
  border-top: 2px solid var(--v-bluePrimary-base);
}
.btn-span {
  line-height: 24px;
  color: white;
  font-size: 14px;
}
</style>

<template>
  <div class="d-flex flex-wrap neutral100 rounded-xl pa-6">
    <!-- =================== BOUNTY INFORMATION START =================== -->
    <v-sheet
      width="160"
      height="160"
      class="d-block d-sm-none pa-4 fill-height neutral100--bg"
      rounded="xl"
      elevation="1"
      outlined
    >
      <v-img width="100%" height="100%" src="@/assets/images/mock-app-trial-logo.png" />
    </v-sheet>
    <div class="flex-grow-1 d-flex flex-column mt-4 mt-sm-0">
      <div class="text-h3 font-weight-bold">Moverse: Move to Earn</div>
      <div class="d-flex flex-column flex-sm-row align-sm-center neutral10--text font-weight-bold text-h5 mt-sm-4">
        <div>Triap app mission</div>
        <v-sheet width="8" height="8" rounded="circle" class="d-none d-sm-block neutral10 mx-4" />
        <div>The peaky blinder</div>
      </div>
      <div class="d-flex flex-column flex-sm-row mt-4 mt-sm-8">
        <div class="d-flex flex-sm-column align-sm-center justify-space-between">
          <span class="order-sm-last text-subtitle-1">Total mission reward</span>
          <span class="order-sm-first text-h5 font-weight-bold">300 $HWD</span>
        </div>
        <v-divider vertical class="d-none d-sm-block mx-6" />
        <div class="d-flex flex-sm-column align-sm-center justify-space-between">
          <span class="order-sm-last text-subtitle-1">Max participant</span>
          <span class="order-sm-first text-h5 font-weight-bold">1000</span>
        </div>
        <v-divider vertical class="d-none d-sm-block mx-6" />
        <div class="d-flex flex-sm-column align-sm-center justify-space-between">
          <span class="order-sm-last text-subtitle-1">Personal reward</span>
          <span class="order-sm-first text-h5 font-weight-bold">3 $HWD</span>
        </div>
      </div>
      <div class="d-flex flex-column flex-sm-row align-sm-center mt-4 mt-sm-8 font-weight-bold">
        <i class="order-sm-last ml-sm-4">(Local time)</i>
        <span>From: Jan 21st 2022, 10:00 am</span>
        <v-sheet width="8" height="8" rounded="circle" class="d-none d-sm-block neutral10 mx-4" />
        <span>To: Feb 26th 2022, 10:00 am </span>
      </div>
    </div>
    <!-- =================== BOUNTY INFORMATION END =================== -->
    <!-- =================== APP LOGO START =========================== -->
    <v-sheet class="d-none d-sm-block pa-4 fill-height neutral100--bg" rounded="xl" elevation="1" outlined>
      <v-img width="100%" height="100%" src="@/assets/images/mock-app-trial-logo.png" />
    </v-sheet>
    <!-- =================== APP LOGO END ============================= -->
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'

@Observer
@Component
export default class AppTrialBountyInfo extends Vue {
  @Inject() vm!: BountyAppTrialViewModel
}
</script>

<style scoped></style>

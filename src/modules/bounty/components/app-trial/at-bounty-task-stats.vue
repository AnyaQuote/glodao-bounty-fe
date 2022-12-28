<template>
  <div class="mt-10 d-flex flex-column flex-sm-row">
    <!-- ======================= TASK STATS START ======================= -->
    <div
      class="order-last order-sm-first d-flex flex-column bluePrimary flex-grow-1 pa-sm-7 pa-4 rounded-xl"
      :class="{ 'lighten-3': $vuetify.theme.dark }"
    >
      <div class="d-flex flex-column flex-sm-row align-center align-sm-end white--text">
        <span class="font-weight-bold text-h5">Pool task</span>
        <span class="px-2" />
        <span class="font-weight-bold text-subtitle-1">Do all task to join this event!</span>
      </div>
      <at-bounty-task-detail class="flex-grow-1" />
    </div>
    <!-- ======================= TASK STATS END ========================= -->
    <div class="mx-0 mx-sm-3 my-2 my-sm-0" />
    <!-- ======================= POOL STATS START ======================= -->
    <v-sheet class="order-first order-sm-last neutral100--bg align-self-sm-start" rounded="xl" outlined>
      <div class="pa-4 pa-sm-6 rounded-t-xl">
        <div class="text-h5 font-weight-bold bluePrimary--text mb-6">Pool update</div>
        <div class="d-flex align-center text-h6 justify-space-between">
          <span class="font-weight-regular">Participants</span>
          <span class="font-weight-bold">{{ vm.totalParticipants }}</span>
        </div>
        <div class="d-flex align-center text-h6 justify-space-between mt-3">
          <span class="font-weight-regular">Remaining</span>
          <span class="font-weight-bold">{{ vm.remainingParticipants }}</span>
        </div>
        <div class="d-flex align-center text-h6 justify-space-between mt-3">
          <span class="font-weight-regular">Status</span>
          <span class="font-weight-bold">{{ vm.taskProgressPercentage | formatNumber(1) }}%</span>
        </div>
        <v-progress-linear
          :value="vm.taskProgressPercentage"
          class="rounded-pill mt-6"
          color="bluePrimary"
          height="30"
        />
      </div>
      <div class="pa-4 pa-sm-6 bluePrimary lighten-3 rounded-xl">
        <div class="bluePrimary--text text-uppercase font-weight-bold text-center mb-4">Pool ends in</div>
        <countdown :targetDate="vm.taskEndTime" />
      </div>
    </v-sheet>
    <!-- ======================= POOL STATS END ========================= -->
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'
import { IBaseDetailViewModel } from '../../viewmodels/bounty-detail-viewmodel'

@Observer
@Component({
  components: {
    countdown: () => import('../countdown.vue'),
    'at-bounty-task-detail': () => import('./at-bounty-task-detail.vue'),
  },
})
export default class AppTrialBountyTask extends Vue {
  @Inject() vm!: IBaseDetailViewModel
}
</script>

<style scoped>
.dashed-border {
  border-style: dashed;
}
</style>

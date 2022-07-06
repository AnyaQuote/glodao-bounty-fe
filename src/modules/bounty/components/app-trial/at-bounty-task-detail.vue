<template>
  <div class="d-flex flex-column">
    <div
      v-if="vm.hasHunterStartedTask && !vm.hasHunterCompletedTask"
      class="neutral100--bg pa-2 font-weight-medium rounded-lg mt-4 align-self-start"
    >
      <v-icon class="mr-1">mdi-timelapse</v-icon>
      Your hunting process has begun!
    </div>
    <div class="rounded-xl mt-5 neutral100--bg flex-grow-1 pa-6">
      <!-- --------------------- START HUNTING BUTTON START ----------------- -->
      <v-btn
        v-if="!vm.hasHunterStartedTask && !vm.hasHunterCompletedTask"
        class="linear-background-blue-main text-none white--text"
        :loading="vm.isStartingProcesss"
        @click="vm.startHunting"
        depressed
        >Start hunting</v-btn
      >
      <span
        v-if="vm.hasHunterCompletedTask"
        class="neutral100--bg py-2 font-weight-medium rounded-lg d-block d-sm-flex align-sm-end"
      >
        <v-icon class="mr-sm-1">mdi-check-circle-outline</v-icon>
        You have completed all your tasks!
      </span>
      <!-- --------------------- START HUNTING BUTTON END ------------------- -->

      <div class="mt-6 flex-grow-1 fill-height">
        <!-- --------------------- TASK STATUS LIST START --------------------- -->
        <div v-for="(task, index) in vm.displayAppTrialData" :key="index">
          <at-task-status :task="task" />
          <v-divider class="my-4 dashed-border" />
        </div>
        <!-- --------------------- TASK STATUS LIST END ----------------------- -->

        <!-- --------------------- CONFIRM COMPLETE BUTTON START -------------- -->
        <v-btn
          v-if="vm.hasHunterStartedTask && !vm.hasHunterCompletedTask"
          class="mt-2 text-none"
          :class="{
            'linear-background-blue-main white--text': !vm.shouldDisableTaskProcessing && vm.isTaskProcessFinish,
          }"
          :disabled="vm.shouldDisableTaskProcessing || !vm.isTaskProcessFinish"
          @click="vm.requestChallenge"
          :loading="vm.isTaskSubmitting"
          depressed
          >Confirm to complete</v-btn
        >
        <!-- --------------------- CONFIRM COMPLETE BUTTON END ---------------- -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'

@Observer
@Component({
  components: {
    'at-task-status': () => import('./at-task-status.vue'),
  },
})
export default class AppTrialBountyTaskDetail extends Vue {
  @Inject() vm!: BountyAppTrialViewModel
}
</script>

<style scoped>
.debug {
  border: 1px solid red;
}
</style>

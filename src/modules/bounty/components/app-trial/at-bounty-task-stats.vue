<template>
  <div class="mt-10 d-flex flex-column flex-sm-row">
    <!-- ======================= TASK STATS START ======================= -->
    <div
      class="order-last order-sm-first d-flex flex-column bluePrimary flex-grow-1 pa-7 rounded-xl"
      :class="{ 'lighten-3': $vuetify.theme.dark }"
    >
      <div class="d-flex flex-column flex-sm-row align-center align-sm-start white--text">
        <span class="font-weight-bold text-h5">Pool task</span>
        <span class="px-2" />
        <span class="font-weight-bold text-subtitle-1">Do all task to join this event!</span>
      </div>
      <div v-show="hasStarted" class="neutral100--bg pa-2 font-weight-medium rounded-lg mt-4 align-self-start">
        <v-icon class="mr-1">mdi-timelapse</v-icon>
        Your hunting process has begun!
      </div>
      <div class="rounded-xl mt-5 neutral100--bg flex-grow-1 pa-6">
        <!-- --------------------- START HUNTING BUTTON START ----------------- -->
        <v-btn
          v-show="!hasStarted"
          class="linear-background-blue-main text-none white--text"
          depressed
          @click="startHunting"
          >Start hunting</v-btn
        >
        <!-- --------------------- START HUNTING BUTTON END ------------------- -->

        <div class="mt-6">
          <!-- --------------------- TASK STATUS LIST START --------------------- -->
          <div v-for="(task, index) in tasks" :key="index">
            <at-task-status :task="{ ...task, step: index + 1 }" />
            <v-divider class="my-4 dashed-border" />
          </div>
          <!-- --------------------- TASK STATUS LIST END ----------------------- -->

          <!-- --------------------- CONFIRM COMPLETE BUTTON START -------------- -->
          <v-btn v-if="hasStarted" class="mt-2 linear-background-blue-main white--text text-none" depressed
            >Confirm to complete</v-btn
          >
          <!-- --------------------- CONFIRM COMPLETE BUTTON END ---------------- -->
        </div>
      </div>
    </div>
    <!-- ======================= TASK STATS END ========================= -->
    <div class="mx-0 mx-sm-3 my-2 my-sm-0" />
    <!-- ======================= POOL STATS START ======================= -->
    <v-sheet class="order-first order-sm-last neutral100--bg align-self-sm-start" rounded="xl" outlined>
      <div class="pa-6 rounded-t-xl">
        <div class="text-h5 font-weight-bold bluePrimary--text mb-6">Pool update</div>
        <div class="d-flex align-center text-h6 justify-space-between">
          <span class="font-weight-regular">Participants</span>
          <span class="font-weight-bold">900</span>
        </div>
        <div class="d-flex align-center text-h6 justify-space-between mt-3">
          <span class="font-weight-regular">Remaining</span>
          <span class="font-weight-bold">100</span>
        </div>
        <div class="d-flex align-center text-h6 justify-space-between mt-3">
          <span class="font-weight-regular">Status</span>
          <span class="font-weight-bold">70%</span>
        </div>
        <v-progress-linear class="rounded-pill mt-6" color="bluePrimary" value="70" height="30" />
      </div>
      <div class="pa-6 bluePrimary lighten-3 rounded-xl">
        <div class="bluePrimary--text text-uppercase font-weight-bold text-center mb-4">Pool ends in</div>
        <countdown />
      </div>
    </v-sheet>
    <!-- ======================= POOL STATS END ========================= -->
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'

@Observer
@Component({
  components: {
    countdown: () => import('../countdown.vue'),
    'at-task-status': () => import('./at-task-status.vue'),
  },
})
export default class AppTrialBountyTask extends Vue {
  @Inject() vm!: BountyAppTrialViewModel

  hasStarted = false

  startHunting() {
    this.hasStarted = !this.hasStarted
  }

  tasks = [
    {
      name: 'Log in app',
      isCompleted: true,
    },
    {
      name: 'Start running 3km',
      isCompleted: true,
    },
    {
      name: 'Share an activity',
      isCompleted: false,
    },
    {
      name: 'Referral a friend',
      isCompleted: false,
    },
    {
      name: 'Referral a friend',
      isCompleted: false,
    },
  ]
}
</script>

<style scoped>
.dashed-border {
  border-style: dashed;
}
</style>

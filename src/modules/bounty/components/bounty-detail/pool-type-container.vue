<template>
  <!-- COUNTDOWN -->
  <v-sheet class="pa-6 mb-4 pool-type-container border-radius-8" elevation="3">
    <v-row>
      <v-col v-if="!vm.isTaskEnded">
        <v-sheet class="d-flex flex-column justify-space-between transparent" height="100%">
          <v-sheet class="title-2 white--text text-uppercase transparent mb-3">POOL ENDS IN</v-sheet>
          <countdown :targetDate="vm.task.endTime" />
        </v-sheet>
      </v-col>
      <v-col v-else>
        <v-sheet
          class="d-flex justify-center align-center white text-uppercase rounded-lg bluePrimary--text"
          width="100%"
          height="100%"
        >
          <v-icon color="bluePrimary" size="32">mdi-camera-control</v-icon>
          <div class="title-1 ml-1">the hunting has ended</div>
        </v-sheet>
      </v-col>
      <v-col
        :class="{
          'col-12': !$vuetify.breakpoint.smAndUp,
        }"
      >
        <v-sheet
          class="d-flex flex-column justify-space-between white--text font-family-proxima transparent"
          height="100%"
        >
          <div class="text-uppercase title-2">
            {{ !vm.isTaskEnded ? 'time for mission' : 'time to hunting' }}
          </div>
          <ul class="li-text">
            <li>From: {{ vm.task.startTime | MMMddYYYYhhmm }}</li>
            <li>To: {{ vm.task.endTime | MMMddYYYYhhmm }}</li>
          </ul>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet
          class="d-flex flex-column justify-space-between align-center rounded-lg pa-5 neutral100--bg"
          width="100%"
          height="100%"
        >
          <v-sheet class="d-flex mb-3 neutral100--bg" width="100%">
            <v-sheet class="text-uppercase primary--text mr-3 neutral100--bg" height="100%"> priority pool </v-sheet>
            <v-chip class="blue lighten-1 blue--text font-italic" small>
              For GDAO stakers
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon right color="blue" size="12" v-bind="attrs" v-on="on"> mdi-help-circle-outline </v-icon>
                </template>
                <span>GDAO stakers who have staked more than 1000$ can participate in priority pool</span>
              </v-tooltip>
            </v-chip>
          </v-sheet>
          <v-sheet class="d-flex flex-column neutral100--bg" width="100%">
            <v-sheet class="d-flex justify-space-between neutral100--bg">
              <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Pool reward:</v-sheet>
              <v-sheet class="primary--text number-font neutral100--bg">
                {{ vm.totalPriorityRewardAsToken | formatNumber }} {{ vm.rewardToken }}
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex justify-space-between neutral100--bg">
              <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Participants:</v-sheet>
              <v-sheet class="primary--text number-font neutral100--bg">
                {{ vm.currentPriorityParticipants }}/{{ vm.maxPriorityParticipants }}
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex justify-space-between neutral100--bg">
              <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Personal reward:</v-sheet>
              <v-sheet class="primary--text number-font neutral100--bg">
                {{ vm.singlePriorityRewardAsToken | formatNumber }} {{ vm.rewardToken }}
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet
          class="d-flex flex-column justify-space-between align-center neutral100--bg rounded-lg pa-5"
          width="100%"
          height="100%"
        >
          <v-sheet class="d-flex mb-3 neutral100--bg" width="100%">
            <v-sheet class="text-uppercase neutral100--bg primary--text mr-3" height="100%"> community pool </v-sheet>
            <v-chip class="blue lighten-1 blue--text font-italic" small>For community</v-chip>
          </v-sheet>
          <v-sheet class="d-flex flex-column neutral100--bg" width="100%">
            <v-sheet class="d-flex justify-space-between neutral100--bg">
              <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Pool reward:</v-sheet>
              <v-sheet class="primary--text number-font neutral100--bg">
                {{ vm.totalCommunityRewardAsToken | formatNumber }} {{ vm.rewardToken }}
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex justify-space-between neutral100--bg">
              <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Participants:</v-sheet>
              <v-sheet class="primary--text number-font neutral100--bg">
                {{ vm.currentCommunityParticipants }}
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex justify-space-between neutral100--bg">
              <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Personal reward:</v-sheet>
              <v-sheet class="primary--text number-font neutral100--bg">
                Sharing pool mission
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="primary" size="15" v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
                  </template>
                  <span>Pool rewards will be divided equally among all participants</span>
                </v-tooltip>
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel, HUNTING } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'

@Observer
@Component({
  components: {
    countdown: () => import('@/modules/bounty/components/countdown.vue'),
  },
})
export default class PoolTypeContainer extends Vue {
  @Inject() vm!: BountyDetailViewModel
  HUNTING = HUNTING
}
</script>

<style lang="scss" scoped>
.pool-type-container {
  background: url('~@/assets/images/pool-type-container-bg.png');
  background-size: cover;
}
.theme--light {
  .custom-check-dot {
    border: thin solid var(--v-primary-base);
  }
}
.theme--dark {
  .custom-check-dot {
    border: thin solid var(--v-bluePrimary-base);
  }
}

.mini-task-container-sheet {
  background-color: var(--v-neutral100-base);
  border: 1px solid var(--v-neutral20-base);
}
.neutral15-background {
  background-color: var(--v-neutral15-base);
}
.unqualify-msg {
  color: var(--v-redSenamatic-base);
  font-size: 12px;
}
.v-btn--disabled {
  background-image: none !important;
}
.primary--border-thin {
  border: thin solid var(--v-primary-base);
}
.font-size-8 {
  font-size: 8px;
}
.font-size-12 {
  font-size: 12px;
}
.font-size-12-important {
  font-size: 12px !important;
}
.font-size-14 {
  font-size: 14px;
}
.divider {
  border-left: 1px solid var(--v-neutral20-base);
  height: 100%;
  margin-left: 9px;
  padding-top: 30px;
}

.ba-secondary {
  border: 1px solid var(--v-grey-base);
}

.line-height {
  line-height: 26px;
}

.border-color {
  border: 1px solid var(--v-bluePrimary-base);
}

.ba-dotted {
  border: 1px dashed var(--v-neutral20-base);
}

.logo-chain {
  width: 32px;
  height: 32px;
}

.card-status {
  top: 18px;
  left: 18px;
  background-color: rgba(255, 255, 255, 0.3);
}
.green-border-custom {
  border: thin solid var(--v-green-base);
}
.red-border-custom {
  border: thin solid var(--v-red-base);
}
.green-background-color {
  background-color: var(--v-green-base);
}
.red-background-color {
  background-color: var(--v-red-base);
}
.title-1 {
  font-weight: 700;
  font-size: 18px;
  line-height: 130%;
}
.title-2 {
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
}
.li-text {
  font-weight: 600;
  font-size: 14px;
  line-height: 170%;
}
.number-font {
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
}
</style>

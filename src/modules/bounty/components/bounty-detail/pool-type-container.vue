<template>
  <!-- COUNTDOWN -->
  <v-sheet class="pa-6 mb-4 pool-type-container border-radius-8" elevation="3">
    <v-row>
      <v-col v-if="!vm.isTaskEnded">
        <v-sheet class="d-flex flex-column justify-space-between transparent" height="100%">
          <v-sheet class="title-2 primary--text text-uppercase transparent mb-3">POOL ENDS IN</v-sheet>
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
          class="d-flex flex-column justify-space-between primary--text font-family-proxima transparent"
          height="100%"
        >
          <div class="text-uppercase title-2">
            {{ !vm.isTaskEnded ? 'time for mission' : 'time to hunting' }}<span class="body-2"> (Local Time)</span>
          </div>

          <ul class="li-text">
            <li>From: {{ vm.task.startTime | MMMddYYYYhhmm }}</li>
            <li>To: {{ vm.task.endTime | MMMddYYYYhhmm }}</li>
          </ul>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-if="vm.missionType === 'learn'">
        <v-sheet
          class="pa-6 row ma-0 dense no-gutters rounded bluePrimary--border neutral100--bg"
          elevation="3"
          style="border: 1px solid"
        >
          <div
            class="col"
            :class="{
              'col-6': $vuetify.breakpoint.xsOnly,
            }"
          >
            <div class="text-body-2">Total mission reward</div>
            <div class="text-body-1 font-weight-bold">{{ vm.rewardAmount | formatNumber }} {{ vm.rewardToken }}</div>
          </div>
          <div
            class="col"
            :class="{
              'col-6': $vuetify.breakpoint.xsOnly,
            }"
          >
            <div class="text-body-2">Reward value</div>
            <div class="text-body-1 font-weight-bold">{{ vm.rewardAmountExchanged | usdCustom(2, 2) }}</div>
          </div>
          <div
            class="col"
            :class="{
              'col-6': $vuetify.breakpoint.xsOnly,
            }"
          >
            <div class="text-body-2">Max participants</div>
            <div class="text-body-1 font-weight-bold">{{ vm.maxParticipants }}</div>
          </div>
          <div
            class="col"
            :class="{
              'col-6': $vuetify.breakpoint.xsOnly,
            }"
          >
            <div class="text-body-2">Personal reward</div>
            <div class="text-body-1 font-weight-bold">
              {{ vm.singlePriorityReward | formatNumber }} {{ vm.rewardToken }} ({{
                vm.singlePriorityRewardExchanged | usdCustom
              }})
            </div>
          </div>
        </v-sheet>

        <v-sheet class="mt-6 rounded-pill">
          <v-progress-linear :value="vm.completedPercentage" color="bluePrimary" height="28" class="rounded-pill">
            <template v-slot:default>
              <strong class="white--text"
                >{{ vm.completedParticipants }}/{{ vm.maxParticipants }} ({{ vm.completedPercentage }}%)</strong
              >
            </template>
          </v-progress-linear>
        </v-sheet>
      </v-col>
      <v-col v-if="vm.missionType !== 'learn'">
        <div
          :class="{
            'active-pool': vm.shouldGlowPriorityPool,
          }"
        >
          <div class="active-pool-inner-border">
            <v-sheet
              class="d-flex flex-column justify-space-between align-center rounded-lg pa-5 neutral100--bg"
              width="100%"
              height="100%"
            >
              <v-sheet class="d-flex mb-3 neutral100--bg" width="100%">
                <v-sheet class="text-uppercase primary--text mr-3 neutral100--bg" height="100%">
                  priority pool
                </v-sheet>
                <v-chip class="blue lighten-1 blue--text font-italic" small>
                  For GLD stakers
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon right color="blue" size="12" v-bind="attrs" v-on="on"> mdi-help-circle-outline </v-icon>
                    </template>
                    <span>For the fastest participants completing the task</span>
                  </v-tooltip>
                </v-chip>
              </v-sheet>
              <v-sheet class="d-flex flex-column neutral100--bg" width="100%">
                <v-sheet class="d-flex justify-space-between neutral100--bg">
                  <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Pool reward:</v-sheet>
                  <v-sheet class="primary--text number-font neutral100--bg">
                    {{ vm.totalPriorityReward | formatNumber }} {{ vm.rewardToken }} ({{
                      vm.totalPriorityRewardExchanged | usdCustom
                    }})
                  </v-sheet>
                </v-sheet>
                <v-sheet class="d-flex justify-space-between neutral100--bg">
                  <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Participants:</v-sheet>
                  <v-sheet class="primary--text number-font neutral100--bg">
                    {{ vm.isPriorityPoolFull ? vm.maxPriorityParticipants : vm.currentPriorityParticipants }}/{{
                      vm.maxPriorityParticipants
                    }}
                  </v-sheet>
                </v-sheet>
                <v-sheet class="d-flex justify-space-between neutral100--bg">
                  <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Personal reward:</v-sheet>
                  <v-sheet class="primary--text number-font neutral100--bg">
                    {{ vm.singlePriorityReward | formatNumber }} {{ vm.rewardToken }} ({{
                      vm.singlePriorityRewardExchanged | usdCustom
                    }})
                  </v-sheet>
                </v-sheet>
              </v-sheet>
            </v-sheet>
          </div>
        </div>
      </v-col>
      <v-col v-if="vm.missionType !== 'learn'">
        <div
          :class="{
            'active-pool': vm.shouldGlowCommunityPool,
          }"
        >
          <div class="active-pool-inner-border">
            <v-sheet
              class="d-flex flex-column justify-space-between align-center neutral100--bg rounded-lg pa-5"
              width="100%"
              height="100%"
            >
              <v-sheet class="d-flex mb-3 neutral100--bg" width="100%">
                <v-sheet class="text-uppercase neutral100--bg primary--text mr-3" height="100%">
                  community pool
                </v-sheet>
                <v-chip class="blue lighten-1 blue--text font-italic" small>For community</v-chip>
              </v-sheet>
              <v-sheet class="d-flex flex-column neutral100--bg" width="100%">
                <v-sheet class="d-flex justify-space-between neutral100--bg">
                  <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Pool reward:</v-sheet>
                  <v-sheet class="primary--text number-font neutral100--bg">
                    {{ vm.totalCommunityReward | formatNumber }} {{ vm.rewardToken }} ({{
                      vm.totalCommunityRewardExchanged | usdCustom
                    }})
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
          </div>
        </div>
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
.theme--light {
  .custom-check-dot {
    border: thin solid var(--v-primary-base);
  }
  .pool-type-container {
    background: url('~@/assets/images/pool-type-container-bg.png');
    background-size: cover;
  }
}
.theme--dark {
  .custom-check-dot {
    border: thin solid var(--v-bluePrimary-base);
  }
  .pool-type-container {
    background: url('~@/assets/images/pool-type-container-bg-dark.png');
    background-size: cover;
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

.active-pool {
  background: hsl(0, 0%, 100%);
  position: relative;
  z-index: 2;
  border-radius: 9px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.01);
  .active-pool-inner-border {
    background: hsl(0, 0%, 100%);
    position: relative;
    z-index: 2;
    border-radius: 9px;
    padding: 2px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.01);

    &::before {
      position: absolute;
      content: '';
      top: 0px;
      left: 0;
      right: 0;
      z-index: -1;
      border-radius: 9px;
      height: 100%;
      width: 100%;
      transform: scale(1) translateZ(0);
      background: radial-gradient(
        circle,
        #eeff92,
        #cfffa6,
        #b3ffbd,
        #9cffd4,
        #8fffe8,
        #7cf9f0,
        #6cf3f8,
        #61ecff,
        #55dbff,
        #8fc3ff,
        #d1a3ff,
        #ff80ce
      );
      background-size: 200% 200%;
      animation: animateGlow 3s linear infinite;
      animation-direction: reverse;
    }
  }
  &::before {
    position: absolute;
    content: '';
    top: 0px;
    left: 0;
    right: 0;
    z-index: -1;
    border-radius: 9px;
    height: 100%;
    width: 100%;
    transform: scale(1) translateZ(0);
    filter: blur(8px);
    background: radial-gradient(
      circle,
      #fb58e5,
      #dd61ee,
      #bc69f4,
      #986ff7,
      #6e73f6,
      #5480fc,
      #368cff,
      #0096ff,
      #00acff,
      #00c1ff,
      #00d4ff,
      #00e5ff
    );
    background-size: 200% 200%;
    animation: animateGlow 3s linear infinite;
    animation-direction: reverse;
  }
}

@keyframes animateGlow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

.bluePrimary--border {
  border-color: var(--v-bluePrimary-base);
}
</style>

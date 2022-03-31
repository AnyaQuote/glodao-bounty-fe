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
            <v-chip class="bluePrimary lighten-1 primary--text font-italic" small>
              For GDAO stakers
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon right color="primary" size="12" v-bind="attrs" v-on="on"> mdi-help-circle-outline </v-icon>
                </template>
                <span>GDAO stakers who have staked more than 1000 GLD can participate in priority pool</span>
              </v-tooltip>
            </v-chip>
          </v-sheet>
          <v-sheet class="d-flex flex-column neutral100--bg" width="100%">
            <v-sheet class="d-flex justify-space-between neutral100--bg">
              <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Pool reward:</v-sheet>
              <v-sheet class="primary--text number-font neutral100--bg">
                {{ vm.totalPriorityReward }} {{ vm.rewardToken }}
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
                {{ vm.singlePriorityReward | formatNumber(2, 0) }} {{ vm.rewardToken }}
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
            <v-chip class="bluePrimary lighten-1 primary--text font-italic" small>For community</v-chip>
          </v-sheet>
          <v-sheet class="d-flex flex-column neutral100--bg" width="100%">
            <v-sheet class="d-flex justify-space-between neutral100--bg">
              <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Pool reward:</v-sheet>
              <v-sheet class="primary--text number-font neutral100--bg">
                {{ vm.totalCommunityReward }} {{ vm.rewardToken }}
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
import { Component, Inject, Provide, Vue, Watch } from 'vue-property-decorator'
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

<style></style>

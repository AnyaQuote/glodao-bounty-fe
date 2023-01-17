<template>
  <div>
    <v-sheet class="px-8 py-4 linear-background-blue-main rounded">
      <v-row>
        <v-col cols="12" sm="6" class="text-center flex-center-box">
          <v-sheet
            elevation="0"
            class="rounded-lg text-none text-caption pa-2 background--white redSenamatic--text font-weight-600 redSenamatic--border white--text"
            v-if="vm.isHuntingProcessEnded"
          >
            <v-icon left color="redSenamatic">mdi-motion-play-outline</v-icon>
            Your hunting process has finished!
          </v-sheet>
          <v-sheet
            elevation="0"
            class="rounded-lg text-none text-caption pa-2 background--white white--border font-weight-600 black--text"
            v-else
          >
            <v-icon left color="black">mdi-timelapse</v-icon>
            Your hunting process has begun!
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex align-center justify-space-between white--text">
          <v-sheet class="text-caption text-start background-transparent white--text">
            <v-sheet class="background-transparent white--text">Your pool</v-sheet>
            <v-sheet class="font-weight-bold background-transparent text-uppercase white--text">
              {{ vm.isInPriorityPool ? 'Priority' : 'Community' }} pool
            </v-sheet>
          </v-sheet>
          <!-- <v-sheet class="text-caption text-start background-transparent">
            <v-sheet class="background-transparent white--text">Reward earned</v-sheet>
            <v-sheet class="font-weight-bold background-transparent white--text">
              {{ vm.earnedReward }} {{ vm.rewardToken }}
            </v-sheet>
          </v-sheet> -->
        </v-col>
      </v-row>
    </v-sheet>
    <div class="d-flex align-center text-body-2 mt-2 font-italic font-weight-600" v-if="!vm.isHuntingProcessEnded">
      <v-icon size="18" class="mr-1">mdi-label-variant</v-icon>
      Remember that do task and confirm in hunting time to earn reward!
    </div>
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'
import { BountyMixViewModel } from '../../viewmodels/bounty-mix-viewmodel'

@Observer
@Component({
  components: {},
})
export default class HuntingStatusSheet extends Vue {
  @Inject() vm!: BountyDetailViewModel | BountyMixViewModel
}
</script>
<style scoped lang="scss">
.font-weight-600 {
  font-weight: 600 !important;
}
.white--border {
  border: thin solid white;
}
.linear-background-blue-light {
  background: linear-gradient(90deg, rgba(2, 118, 240, 0.2) 0%, rgba(0, 229, 255, 0.2) 113.65%);
}
.background--white {
  background: white;
}
</style>

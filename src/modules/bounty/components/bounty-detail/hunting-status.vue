<template>
  <v-sheet class="px-8 py-4 linear-background-blue-light">
    <v-row>
      <v-col cols="12" sm="6" class="text-center flex-center-box">
        <v-sheet
          elevation="0"
          rounded
          class="text-none text-caption pa-2 background-transparent redSenamatic--border"
          v-if="vm.isHuntingProcessEnded"
        >
          <v-icon left color="redSenamatic">mdi-alert-circle-outline</v-icon>
          Your hunting process has finished!
        </v-sheet>
        <v-sheet
          elevation="0"
          rounded
          class="text-none text-caption pa-2 background-transparent bluePrimary--border"
          v-else
        >
          <v-icon left color="bluePrimary">mdi-timelapse</v-icon>
          Your hunting process has begun!
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex align-center justify-space-between">
        <v-sheet class="text-caption text-start background-transparent">
          <v-sheet class="background-transparent">Your pool</v-sheet>
          <v-sheet class="font-weight-bold background-transparent text-uppercase">
            {{ vm.currentPoolType }} pool
          </v-sheet>
        </v-sheet>
        <v-sheet class="text-caption text-start background-transparent">
          <v-sheet class="background-transparent">Reward earned</v-sheet>
          <v-sheet class="font-weight-bold background-transparent">{{ vm.earnedReward }} {{ vm.rewardToken }}</v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'

@Observer
@Component({
  components: {},
})
export default class HuntingStatusSheet extends Vue {
  @Inject() vm!: BountyDetailViewModel
}
</script>
<style scoped lang="scss">
.linear-background-blue-light {
  background: linear-gradient(90deg, rgba(2, 118, 240, 0.2) 0%, rgba(0, 229, 255, 0.2) 113.65%);
}
</style>

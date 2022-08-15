<template>
  <v-tabs class="mt-10 outlined rounded-lg neutral100--bg" color="bluePrimary">
    <v-tab>Task description</v-tab>
    <v-tab>About our app</v-tab>
    <v-tab>App Screenshot</v-tab>
    <v-tab-item class="pa-6">
      <p style="white-space: pre-line">{{ vm.taskDescription }}</p>
    </v-tab-item>
    <v-tab-item class="pa-6">
      <p style="white-space: pre-line">{{ vm.shortDescription }}</p>
    </v-tab-item>
    <v-tab-item class="pa-6">
      <v-slide-group
        center-active
        :show-arrows="$vuetify.breakpoint.smAndUp"
        :class="{ 'show-prev': $vuetify.breakpoint.smAndUp }"
      >
        <v-slide-item v-for="(screenshot, index) in vm.taskAppScreenshots" :key="index" class="ma-2">
          <v-sheet rounded="lg" :width="!!vm.taskWebUrl ? 495 : 220" height="330">
            <v-img width="100%" height="100%" contain :src="screenshot" />
          </v-sheet>
        </v-slide-item>
      </v-slide-group>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'

@Observer
@Component
export default class AppTrialAppInfo extends Vue {
  @Inject() vm!: BountyAppTrialViewModel
}
</script>

<style lang="scss" scoped>
.outlined {
  border: 1px solid var(--v-neutral20-base);
}
</style>

<template>
  <v-sheet class="d-flex flex-column flex-sm-row neutral100--bg pa-7 mt-7 mt-sm-10" outlined rounded="lg">
    <div class="d-flex flex-column flex-grow-1 text-h6 font-weight-regular mb-2 mb-sm-0">
      <span>Available on App Store and Google Play</span>
      <span>Download to join mission</span>
    </div>
    <v-img
      class="cursor-pointer"
      max-width="200"
      height="60"
      src="@/assets/images/appstore.png"
      @click="openLink(vm.taskAppStoreUrl)"
    />
    <div class="py-1 py-sm-0 px-sm-3" />
    <v-img
      class="cursor-pointer"
      max-width="200"
      height="60"
      src="@/assets/images/googleplay.png"
      @click="openLink(vm.taskGooglePlayUrl)"
    />
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'

@Observer
@Component
export default class AppTrialAppLink extends Vue {
  @Inject() vm!: BountyAppTrialViewModel

  openLink(url: string) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped></style>

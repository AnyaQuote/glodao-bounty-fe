<template>
  <v-sheet class="d-flex flex-column flex-sm-row neutral100--bg pa-7 mt-7 mt-sm-10" outlined rounded="lg">
    <div v-if="vm.taskWebUrl" class="flex-grow-1 d-flex align-center text-h6 font-weight-regular">
      Access our website now to join and complete mission tasks!
    </div>
    <div v-else class="d-flex flex-column flex-grow-1 text-h6 font-weight-regular mb-2 mb-sm-0">
      <span>Available on App Store and Google Play</span>
      <span>Download to join mission</span>
    </div>
    <v-img
      v-if="!!vm.taskAppStoreUrl"
      class="cursor-pointer"
      max-width="200"
      height="60"
      src="@/assets/images/appstore.png"
      @click="openLink(vm.taskAppStoreUrl)"
    />
    <div class="py-1 py-sm-0 px-sm-3" />
    <v-img
      v-if="!!vm.taskGooglePlayUrl"
      class="cursor-pointer"
      max-width="200"
      height="60"
      src="@/assets/images/googleplay.png"
      @click="openLink(vm.taskGooglePlayUrl)"
    />
    <v-hover v-else v-slot="{ hover }">
      <v-sheet
        rounded
        outlined
        height="60"
        width="220"
        :class="{ 'on-hover': hover }"
        @click="openLink(vm.taskWebUrl)"
        class="pa-4 neutral15 cursor-pointer blue-diversity--text boder-color-blue d-flex align-center justify-center"
      >
        <v-icon color="blue-diversity" size="40">mdi-link-variant</v-icon>
        <div class="mx-2" />
        <span class="text-subtitle-1 font-weight-bold">Open app link</span>
      </v-sheet>
    </v-hover>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'
import { IBaseDetailViewModel } from '../../viewmodels/bounty-detail-viewmodel'

@Observer
@Component
export default class AppTrialAppLink extends Vue {
  @Inject() vm!: IBaseDetailViewModel

  openLink(url: string) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
.on-hover {
  transform: scale(1.05);
  transition: transform 200ms ease-in-out;
}
.boder-color-blue {
  border-color: var(--v-bluePrimary-base) !important;
}
</style>

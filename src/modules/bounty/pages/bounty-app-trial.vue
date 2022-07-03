<template>
  <v-container>
    <v-row>
      <!-- breadcrumbs -->
      <v-col cols="12">
        <breadcrumbs :data="vm.breadcrumbsItems" />
      </v-col>
      <v-col v-if="vm.loading">
        <at-skeleton-loader />
      </v-col>
      <v-col v-else cols="12">
        <at-bounty-info />
        <at-app-link />
        <at-bounty-task />
        <at-app-info />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../viewmodels/bounty-app-trial-viewmodel'

@Observer
@Component({
  components: {
    breadcrumbs: () => import('../components/app-trial/breadcrumbs.vue'),
    'at-skeleton-loader': () => import('../components/app-trial/at-skeleton-loader.vue'),
    'at-bounty-info': () => import('../components/app-trial/at-bounty-info.vue'),
    'at-app-link': () => import('../components/app-trial/at-app-link.vue'),
    'at-bounty-task': () => import('../components/app-trial/at-bounty-task-stats.vue'),
    'at-app-info': () => import('../components/app-trial/at-app-info.vue'),
  },
})
export default class BountyAppTrialPage extends Vue {
  @Provide() vm = new BountyAppTrialViewModel()
}
</script>

<style scoped></style>

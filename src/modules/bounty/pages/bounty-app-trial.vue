<template>
  <v-container>
    <v-row>
      <!-- breadcrumbs -->
      <v-col cols="12">
        <breadcrumbs :data="vm.breadcrumbItems" />
      </v-col>
      <v-col v-if="vm.loading">
        <at-skeleton-loader />
      </v-col>
      <v-col v-else cols="12">
        <at-bounty-info />
        <at-user-form />
        <at-app-link />
        <at-bounty-task :shouldShowInfo="true" />
        <at-app-info />
      </v-col>
    </v-row>
    <re-captcha-dialog />
    <confirm-and-earn-dialog />
    <vue-hcaptcha
      sitekey="e5651f89-7669-4385-89da-90571faf78c0"
      size="invisible"
      ref="vueHcaptcha"
      @opened="vm.onHCaptchaOpen"
      @verify="vm.onHCaptchaVerify"
      @expired="vm.resetHCaptchaToken"
      theme="dark"
    ></vue-hcaptcha>
  </v-container>
</template>

<script lang="ts">
import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
import { Observer } from 'mobx-vue'
import { Component, Provide, Ref, Vue, Watch } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../viewmodels/bounty-app-trial-viewmodel'

@Observer
@Component({
  components: {
    breadcrumbs: () => import('../components/app-trial/breadcrumbs.vue'),
    'at-skeleton-loader': () => import('../components/app-trial/at-skeleton-loader.vue'),
    'at-bounty-info': () => import('../components/app-trial/at-bounty-info.vue'),
    'at-app-link': () => import('../components/app-trial/at-app-link.vue'),
    'at-bounty-task': () => import('../components/app-trial/at-bounty-task-stats.vue'),
    'at-user-form': () => import('../components/app-trial/at-user-form.vue'),
    'at-app-info': () => import('../components/app-trial/at-app-info.vue'),
    're-captcha-dialog': () => import('../../bounty/components/bounty-detail/recaptcha-dialog.vue'),
    'confirm-and-earn-dialog': () => import('../components/app-trial/confirm-and-earn-dialog.vue'),
    VueHcaptcha,
  },
})
export default class BountyAppTrialPage extends Vue {
  @Provide() vm = new BountyAppTrialViewModel()
  @Ref('vueHcaptcha') readonly vueHcaptcha!: VueHcaptcha
  @Watch('$route.params.taskId', { immediate: true })
  onIdChanged(val: string) {
    if (val) {
      this.vm.taskIdChange(val)
    }
  }

  mounted() {
    this.vm.getHCaptchaCallback(this.vueHcaptcha.execute)
  }

  beforeDestroy() {
    this.vm.destroy()
  }
}
</script>

<style scoped></style>

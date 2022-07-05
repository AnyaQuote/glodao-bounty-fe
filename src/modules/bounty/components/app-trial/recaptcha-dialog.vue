<template>
  <v-dialog v-model="vm.reCaptchaDialog" class="rounded overflow-hidden" max-width="400" persistent>
    <v-sheet
      outlined
      class="position-relative pa-6 text-center rounded dialog-normal-text overflow-hidden neutral100--bg"
    >
      <div class="mb-6 font-weight-600 dialog-title-text d-flex align-center">
        <project-logo :src="vm.projectLogo" :size="32"></project-logo>
        <div class="d-flex align-center ml-4">{{ vm.task.name }}</div>
      </div>
      <div class="d-flex justify-center mb-4">
        <vue-hcaptcha
          sitekey="e5651f89-7669-4385-89da-90571faf78c0"
          @rendered="onCaptchaRender"
          @verify="onCaptchaVerify"
          @expired="onCaptchaExpired"
          ref="recaptcha"
        >
        </vue-hcaptcha>
      </div>
      <v-icon class="close-icon" @click="vm.changeRecaptchaDialog(false)">mdi-window-close</v-icon>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import VueHcaptcha from '@hcaptcha/vue-hcaptcha'

import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'

@Observer
@Component({
  components: {
    VueHcaptcha,
    'project-logo': () => import('@/components/project-logo.vue'),
  },
})
export default class RecaptchaDialog extends Vue {
  @Inject() vm!: BountyAppTrialViewModel

  reset() {
    this.vm.changeRecaptchaConfirm(false)
  }
  onCaptchaError(error) {
    snackController.error(error)
  }
  onCaptchaRender() {
    ;(this.$refs.recaptcha as any).reset()
  }
  onCaptchaVerify(response) {
    if (response) {
      this.vm.changeRecaptchaConfirm(true, response)
      setTimeout(() => {
        ;(this.$refs.recaptcha as any).reset()
      }, 1000)
    }
  }
  onCaptchaExpired() {
    ;(this.$refs.recaptcha as any).reset()
  }
}
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  top: 0;
  right: 0;
}
.dialog-title-text {
  //styleName: H4;
  font-family: Proxima Nova;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.01em;
  text-align: left;
}
</style>

<template>
  <v-dialog v-model="vm.reCaptchaDialog" class="rounded-0" max-width="400" persistent>
    <v-sheet outlined class="position-relative pa-6 text-center dialog-normal-text overflow-hidden">
      <div class="mb-6 font-weight-600 dialog-title-text d-flex align-center">
        <v-avatar size="32">
          <chain-logo class="fill-width fill-height" :chain="vm.task.chainId" />
        </v-avatar>
        <div class="d-flex align-center ml-4">{{ vm.task.name }}</div>
      </div>
      <div class="d-flex justify-center mb-4">
        <vue-recaptcha
          sitekey="6LcBtCQfAAAAAAAY0K2ZnOL_ZEUT2W4o-n0W73eQ"
          :loadRecaptchaScript="true"
          @render="onCaptchaRender"
          @verify="onCaptchaVerify"
          @expired="onCaptchaExpired"
          ref="recaptcha"
        >
        </vue-recaptcha>
      </div>
      <v-icon class="close-icon" @click="vm.changeRecaptchaDialog(false)">mdi-window-close</v-icon>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import VueRecaptcha from 'vue-recaptcha'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'

@Observer
@Component({
  components: {
    VueRecaptcha,
    'chain-logo': () => import('@/components/chain-logo.vue'),
  },
})
export default class RecaptchaDialog extends Vue {
  @Inject() vm!: BountyDetailViewModel

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
      this.vm.changeRecaptchaConfirm(true)
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
  font-family: Proxima Nova Alt;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.01em;
  text-align: left;
}
</style>

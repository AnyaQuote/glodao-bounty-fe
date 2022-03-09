<template>
  <v-dialog v-model="dialog" class="rounded-0" max-width="400">
    <v-sheet outlined class="position-relative pa-6 text-center dialog-normal-text overflow-hidden">
      <div class="mb-6 font-weight-600 dialog-title-text d-flex align-center">
        <v-avatar size="32" color="blue"></v-avatar>
        <div class="d-flex align-center ml-4">The Peaky Blinder</div>
      </div>
      <div class="d-flex justify-center mb-4">
        <vue-recaptcha
          sitekey="6LdzodkcAAAAAM_-ulFFxhp1z_z9y4CAl3ciCvoM"
          :loadRecaptchaScript="true"
          @render="onCaptchaRender"
          @verify="onCaptchaVerify"
          @expired="onCaptchaExpired"
          ref="recaptcha"
        >
        </vue-recaptcha>
      </div>
      <v-icon class="close-icon">mdi-window-close</v-icon>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue } from 'vue-property-decorator'
import VueRecaptcha from 'vue-recaptcha'
import { snackController } from './snack-bar/snack-bar-controller'

@Observer
@Component({
  components: {
    VueRecaptcha,
  },
})
export default class RecaptchaDialog extends Vue {
  dialog = true
  agreeTerm = false
  confirmAgreeTerm = false
  confirmCaptcha = false

  reset() {
    this.agreeTerm = false
    this.confirmAgreeTerm = false
    this.confirmCaptcha = false
  }
  onCaptchaError(error) {
    snackController.error(error)
  }
  onCaptchaRender() {
    ;(this.$refs.recaptcha as any).reset()
  }
  onCaptchaVerify(response) {
    if (response) this.confirmCaptcha = true
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

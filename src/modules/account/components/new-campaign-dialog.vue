<template>
  <v-dialog class="rounded overflow-hidden" max-width="475" persistent>
    <v-sheet
      outlined
      class="position-relative pa-6 text-center rounded dialog-normal-text overflow-hidden neutral100--bg"
    >
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="mb-6 font-weight-bold dialog-title-text d-flex align-center justify-space-between">
          <div class="d-flex align-center">Create new campaign</div>
          <v-icon>mdi-window-close</v-icon>
        </div>
        <div class="d-flex align-center mt-7 font-weight-bold dialog-title-text">Campaign name</div>
        <v-sheet class="rounded mt-2">
          <v-text-field
            dense
            placeholder="Your wallet address"
            flat
            solo
            class="neutral100--bg link-submit-custom-input rounded"
            height="44"
            :rules="[$rules.required]"
            outlined
          >
          </v-text-field>
        </v-sheet>
        <div class="d-flex align-center font-weight-bold dialog-title-text">Referral code</div>
        <v-sheet class="rounded mt-2 d-flex align-center justify-space-between px-4 py-3" outlined height="44">
          <div class="text-body-2 mr-6 bluePrimary--text font-weight-600">gh56k9</div>
          <div class="text-caption text-truncate mr-5">https://www.waggle.network/v=gJJzlpw8fG8</div>
          <div>
            <v-tooltip bottom style="display: inline-block !important">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click.stop="copyAddressDesktop" size="16" right color="bluePrimary"
                  >mdi-content-copy</v-icon
                >
              </template>
              <span>{{ isCopied ? 'Copied ' : 'Copy Address' }}</span>
            </v-tooltip>
          </div>
        </v-sheet>
        <div class="text-body-2 font-weight-bold text-start mt-2">
          Use this link to refer your friends to join and get commission.
        </div>

        <v-btn depressed block class="mt-7 border-radius-4 text-none white--text" color="bluePrimary" @click="validate"
          >Create</v-btn
        >
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Ref, Vue } from 'vue-property-decorator'
import { promiseHelper } from '@/helpers/promise-helper'
import { authStore } from '@/stores/auth-store'
import { get } from 'lodash'

@Observer
@Component({
  components: {},
})
export default class NewCampaignDialog extends Vue {
  @Ref('form') form: any
  referralLink = `https://app.glodao.io/bounty?ref=${get(authStore.user, 'hunter.referralCode')}`
  authStore = authStore
  isCopied = false
  valid = true
  mouseoverEvent = new Event('mouseleave')

  async copyAddressDesktop() {
    navigator.clipboard.writeText(this.referralLink)
    this.isCopied = true
    await promiseHelper.delay(3000)
    this.isCopied = false
  }
  onMouseLeave() {
    this.isCopied = false
  }

  validate() {
    console.log(this.form.validate())
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
  font-size: 18px;
  font-style: normal;
  line-height: 28px;
  letter-spacing: -0.01em;
  text-align: left;
}
</style>

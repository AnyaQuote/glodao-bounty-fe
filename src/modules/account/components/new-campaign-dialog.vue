<template>
  <v-dialog v-model="vm.newCampaignDialog" class="rounded overflow-hidden" max-width="475" persistent eager>
    <v-sheet
      outlined
      class="position-relative pa-6 text-center rounded dialog-normal-text overflow-hidden neutral100--bg"
    >
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="mb-6 font-weight-bold dialog-title-text d-flex align-center justify-space-between">
          <div class="d-flex align-center">Create new campaign</div>
          <v-icon :disabled="vm.newCampaignDialogLoading" @click="vm.changeNewCampaignDialog(false)"
            >mdi-window-close</v-icon
          >
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
            :value="vm.newCampaignDialogInput"
            @input="vm.changeNewCampaignDialogInput"
          >
          </v-text-field>
        </v-sheet>
        <div class="d-flex align-center font-weight-bold dialog-title-text">Referral code</div>
        <v-sheet class="rounded mt-2 d-flex align-center justify-space-between px-4 py-3" outlined height="44">
          <div class="text-body-2 mr-6 bluePrimary--text font-weight-600">{{ vm.randomCampaignCode }}</div>
          <div class="text-caption text-truncate mr-5">
            https://app.glodao.io/bounty?ref={{ vm.randomCampaignCode }}
          </div>
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

        <v-btn
          depressed
          block
          class="mt-7 border-radius-4 text-none white--text linear-background-blue-main"
          @click="validate"
          :loading="vm.newCampaignDialogLoading"
          >Create</v-btn
        >
      </v-form>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Ref, Vue } from 'vue-property-decorator'
import { promiseHelper } from '@/helpers/promise-helper'
import { CompanyProfileViewModel } from '../viewmodels/company-profile-viewmodel'
import { IReactionDisposer, reaction } from 'mobx'

@Observer
@Component({
  components: {},
})
export default class NewCampaignDialog extends Vue {
  @Ref('form') form!: any
  @Inject() vm!: CompanyProfileViewModel
  referralLink = `https://app.glodao.io/bounty?ref=${this.vm.randomCampaignCode}`
  isCopied = false
  valid = true
  mouseoverEvent = new Event('mouseleave')
  disposers: IReactionDisposer[] = []

  mounted() {
    this.disposers = [
      reaction(
        () => this.vm.newCampaignDialog,
        () => {
          this.form.reset()
        }
      ),
    ]
  }

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
    if (this.form.validate()) this.vm.submitNewCampaignForm()
  }

  beforeDestroy() {
    this.disposers.forEach((d) => d())
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

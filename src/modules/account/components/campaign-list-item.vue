<template>
  <v-sheet class="text-h5 pa-6 border-radius-8 neutral100--bg" outlined>
    <div class="font-weight-bold">Campaign June 2021</div>
    <div class="mt-6 font-weight-bold d-flex align-center">
      1000 <span class="text-body-1 font-weight-600 neutral10--text ml-2">referrals</span>
    </div>
    <div class="d-flex">
      <v-sheet class="mt-6 blue lighten-1 pa-3 text-body-1 font-weight-600 border-radius-8"
        >Code
        <span class="ml-6 bluePrimary--text font-weight-bold">
          5hna7H
          <v-tooltip bottom style="display: inline-block !important">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" @click.stop="copyAddressDesktop" size="16" right color="bluePrimary"
                >mdi-content-copy</v-icon
              >
            </template>
            <span>{{ isCopied ? 'Copied ' : 'Copy Address' }}</span>
          </v-tooltip>
        </span>
      </v-sheet>
    </div>
  </v-sheet>
</template>
<script lang="ts">
import { promiseHelper } from '@/helpers/promise-helper'
import { Observer } from 'mobx-vue'
import { Component, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {},
})
export default class CampaignListItem extends Vue {
  referralLink = `https://app.glodao.io/bounty?ref=`

  isCopied = false
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
}
</script>

<style scoped lang="scss"></style>

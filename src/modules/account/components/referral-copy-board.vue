<template>
  <div class="d-flex">
    <v-sheet
      class="container-frame d-flex align-center pa-4 neutral10--text text-body-2 neutral100--bg font-weight-600"
      rounded
      outlined
    >
      {{ referralLink }}
      <v-tooltip bottom style="display: inline-block !important">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" @click.stop="copyAddressDesktop" size="16" right>mdi-content-copy</v-icon>
        </template>
        <span>{{ isCopied ? 'Copied ' : 'Copy Address' }}</span>
      </v-tooltip>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'
import { Observer } from 'mobx-vue'
import { promiseHelper } from '@/helpers/promise-helper'
import { HuntingHistoryViewModel } from '../viewmodels/hunting-history-viewmodel'
import { authStore } from '@/stores/auth-store'
import { get } from 'lodash'

@Observer
@Component
export default class extends Vue {
  @Inject() vm!: HuntingHistoryViewModel
  referralLink = `https://cyberk-bounty.netlify.app/bounty?ref=${get(authStore.user, 'hunter.referralCode')}`
  authStore = authStore
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
<style scoped>
.container-frame {
  cursor: pointer;
  word-break: break-all;
}
</style>

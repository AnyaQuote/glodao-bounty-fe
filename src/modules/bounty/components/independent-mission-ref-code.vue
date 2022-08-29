<template>
  <div>
    <div class="title-2 mb-2">Invite your friend now:</div>
    <div class="d-flex">
      <v-sheet
        class="container-frame d-flex align-center pa-4 neutral10--text text-body-2 neutral100--bg font-weight-600"
        rounded
        outlined
      >
        <span class="glow">{{ referralLink }}</span>
        <v-tooltip bottom style="display: inline-block !important">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" @click.stop="copyAddressDesktop" size="16" right>mdi-content-copy</v-icon>
          </template>
          <span>{{ isCopied ? 'Copied ' : 'Copy Address' }}</span>
        </v-tooltip>
      </v-sheet>
    </div>
    <div class="title-2 mt-2">Users start mission with your link: {{ vm.missionRefCount }}</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'
import { Observer } from 'mobx-vue'
import { promiseHelper } from '@/helpers/promise-helper'
import { authStore } from '@/stores/auth-store'
import { get } from 'lodash'
import { BountyDetailViewModel } from '../viewmodels/bounty-detail-viewmodel'

@Observer
@Component
export default class extends Vue {
  @Inject() vm!: BountyDetailViewModel
  webhost = process.env.VUE_APP_WEB_HOST
  referralLink = `${this.webhost}/bounty/${this.vm.taskId}?missionRef=${get(authStore.user, 'hunter.referralCode')}`
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
.title-2 {
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
}
.glow {
  background-image: linear-gradient(-225deg, #231557 0%, #44107a 29%, #dc13ff 67%, #00ff6a 100%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  background-clip: text;
  background-color: #07a4ff;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 5s linear infinite reverse;
  display: inline-block;
}

@keyframes textclip {
  0% {
    background-position: -200%;
  }

  100% {
    background-position: 200%;
  }
}
</style>

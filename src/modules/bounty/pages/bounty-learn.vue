<template>
  <v-container style="max-width: 900px !important" class="pa-4">
    <v-row class="mt-6" dense no-gutters>
      <v-col cols="12">
        <router-link to="/company-profile" class="d-flex align-center">
          <v-icon color="primary">mdi-arrow-left</v-icon>
          <div class="text-h6 bluePrimary--text font-weight-bold ml-7">Back to mission</div>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { CampaignDetailViewModel } from '@/modules/account/viewmodels/campaign-detail-viewmodel'
import { promiseHelper } from '@/helpers/promise-helper'

@Observer
@Component({
  components: {},
})
export default class CampaignDetail extends Vue {
  @Provide() vm = new CampaignDetailViewModel()
  walletStore = walletStore
  authStore = authStore
  isCopied = false
  mouseoverEvent = new Event('mouseleave')

  @Watch('$route.params.id', { immediate: true }) onIdChanged(val: string) {
    if (val) {
      this.vm.fetchData(val)
    }
  }

  async copyAddressDesktop() {
    navigator.clipboard.writeText(`https://app.glodao.io/bounty?ref=${this.vm.campaignCode}`)
    this.isCopied = true
    await promiseHelper.delay(3000)
    this.isCopied = false
  }
  onMouseLeave() {
    this.isCopied = false
  }

  mounted() {
    this.vm.initReaction()
  }

  beforeDestroy() {
    this.vm.destroyReaction()
  }
}
</script>

<style scoped lang="scss">
.font-size-28 {
  font-size: 28px;
}
.font-size-18 {
  font-size: 18px;
}
</style>

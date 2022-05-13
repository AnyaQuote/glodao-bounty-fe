<template>
  <router-link :to="routerLink">
    <v-sheet class="text-h6 pa-6 border-radius-8 neutral100--bg" outlined>
      <div class="font-weight-bold text-truncate">{{ campaign | _get('name', 'My referrals') }}</div>
      <div class="mt-6 font-weight-bold d-flex align-center">
        {{ hunterCount }} <span class="text-body-1 font-weight-600 neutral10--text ml-2">referrals</span>
      </div>
      <div class="d-flex">
        <v-sheet class="mt-6 blue lighten-3 py-2 px-4 text-body-1 font-weight-600 border-radius-8" @click.prevent=""
          >Code
          <span class="ml-6 bluePrimary--text font-weight-bold">
            {{ code }}
            <v-tooltip bottom style="display: inline-block !important">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click.prevent="copyAddressDesktop" size="16" right color="bluePrimary"
                  >mdi-content-copy</v-icon
                >
              </template>
              <span>{{ isCopied ? 'Copied ' : 'Copy Address' }}</span>
            </v-tooltip>
          </span>
        </v-sheet>
      </div>
    </v-sheet>
  </router-link>
</template>
<script lang="ts">
import { promiseHelper } from '@/helpers/promise-helper'
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { get } from 'lodash-es'
import { apiService } from '@/services/api-service'
import { authStore } from '@/stores/auth-store'

@Observer
@Component({
  components: {},
})
export default class CampaignListItem extends Vue {
  @Prop({ required: true }) campaign!: any
  @Prop({ default: 'campaign' }) type!: any
  code = get(this.campaign, 'code', '') || get(authStore.user, 'hunter.referralCode')
  id = get(this.campaign, 'id', '')
  hunterCount: any = 'TBA'
  referralLink = `https://app.glodao.io/bounty?ref=${this.code}`

  routerLink = `/${this.type === 'referral' ? 'my-referral' : 'campaign-detail/' + this.id}`

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

  mounted() {
    //
    if (this.type === 'referral')
      apiService.hunters.count({ referrerCode: this.code }).then((res) => (this.hunterCount = res))
    else apiService.hunters.count({ _campaignCode: this.code }).then((res) => (this.hunterCount = res))
  }
}
</script>

<style scoped lang="scss"></style>

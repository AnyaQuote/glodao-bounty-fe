<template>
  <v-container style="max-width: 900px !important" class="pa-4">
    <v-row class="mt-6" dense no-gutters>
      <v-col cols="12">
        <router-link to="/company-profile">
          <v-icon color="primary">mdi-arrow-left</v-icon>
        </router-link>
      </v-col>
      <v-col cols="12">
        <v-sheet outlined class="pa-6 mt-10 border-radius-8 neutral100--bg">
          <div class="row">
            <div class="col">
              <div class="font-size-28 font-weight-bold text-truncate">
                {{ vm.campaignDetail | _get('name', 'TBA') }}
              </div>
              <div class="neutral10--text mt-2">
                Created time: {{ vm.campaignDetail | _get('createdAt', 'TBA') | datetime }}
              </div>
            </div>
            <div class="d-flex flex-column col-auto">
              <v-sheet class="blue lighten-3 py-2 px-4 text-body-1 font-weight-600 border-radius-8"
                >Code
                <span class="ml-6 bluePrimary--text font-weight-bold">
                  {{ vm.campaignCode }}
                  <v-tooltip bottom style="display: inline-block !important">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        @click.stop="copyAddressDesktop"
                        size="16"
                        right
                        color="bluePrimary"
                        >mdi-content-copy</v-icon
                      >
                    </template>
                    <span>{{ isCopied ? 'Copied ' : 'Copy Address' }}</span>
                  </v-tooltip>
                </span>
              </v-sheet>
              <div style="flex: 1"></div>
            </div>
          </div>
          <v-divider class="my-6"></v-divider>
          <div class="d-flex justify-space-around">
            <div class="text-center">
              <div
                class="font-size-28 font-weight-bold"
                :class="{
                  'text-h5': $vuetify.breakpoint.xsOnly,
                }"
              >
                {{ vm.referralList | _get('length') }}
              </div>
              <div
                class="neutral10--text font-weight-600 font-size-18"
                :class="{
                  'text-caption': $vuetify.breakpoint.xsOnly,
                }"
              >
                Referrals
              </div>
            </div>
            <div class="text-center">
              <div
                class="font-size-28 font-weight-bold"
                :class="{
                  'text-h5': $vuetify.breakpoint.xsOnly,
                }"
              >
                {{ vm.totalCommissionObj | _get('pastDayCommission') | usdCustom(2, 2) }}
              </div>
              <div
                class="neutral10--text font-weight-600 font-size-18"
                :class="{
                  'text-caption': $vuetify.breakpoint.xsOnly,
                }"
              >
                Today commission
              </div>
            </div>
            <div class="text-center">
              <div
                class="font-size-28 font-weight-bold"
                :class="{
                  'text-h6': $vuetify.breakpoint.xsOnly,
                }"
              >
                {{ vm.totalCommissionObj | _get('totalCommission') | usdCustom(2, 2) }}
              </div>
              <div
                class="neutral10--text font-weight-600 font-size-18"
                :class="{
                  'text-caption': $vuetify.breakpoint.xsOnly,
                }"
              >
                Total commission
              </div>
            </div>
          </div>
        </v-sheet>
      </v-col>
      <v-row class="mt-10 mb-6" dense no-gutters>
        <v-col cols="auto">
          <v-sheet class="transparent d-flex align-center" height="100%">
            <span class="transparent font-weight-bold neutral0--text pr-1">{{ vm.referralList | _get('length') }}</span>
            <span class="neutral0--text">Refferals</span>
          </v-sheet>
        </v-col>
        <v-col class="ml-auto" cols="12" sm="3" md="3">
          <v-select
            :items="vm.referralSortList"
            label="Sort"
            outlined
            dense
            height="40"
            hide-details
            :value="vm.referralSortParams"
            @change="vm.onReferralSortConditionChange"
          ></v-select>
        </v-col>
      </v-row>
      <v-col cols="12">
        <loading-component :loading="vm.loading"></loading-component>
        <v-scale-transition v-if="!vm.loading">
          <div v-if="vm.displayedReferralList.length > 0">
            <div v-for="item in vm.displayedReferralList" :key="item.id">
              <referral-card
                :name="item.name"
                :joinTime="item.createdAt"
                :avatar="item.metadata.avatar"
                :commission="item.commission"
                :totalEarn="item.totalEarn"
                :commissionToday="item.commissionToday"
                :id="item.id"
                :totalReferral="getReferralCount(item.referralCode)"
                @openReferralList="openReferralList(item.referralCode, item.name)"
                class="mb-2"
              ></referral-card>
            </div>
          </div>
          <no-referrals v-else />
        </v-scale-transition>
      </v-col>
      <v-col cols="12" class="my-8 mb-0">
        <v-pagination
          v-model="vm.referralPage"
          :length="vm.totalReferralPage"
          :total-visible="7"
          color="blue"
          :value="vm.referralPage"
        ></v-pagination>
      </v-col>
    </v-row>
    <referral-dialog />
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
  components: {
    'no-referrals': () => import('@/modules/account/components/no-referrals.vue'),
    'loading-component': () => import('@/modules/account/components/loading-component.vue'),
    'referral-card': () => import('@/modules/account/components/campaign-referral-card.vue'),
    'referral-dialog': () => import('@/modules/account/components/campaign-referral-list-dialog.vue'),
  },
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

  getReferralCount(code) {
    if (!this.vm.referralMap.get(code)) return 0
    return this.vm.referralMap.get(code).length
  }
  onMouseLeave() {
    this.isCopied = false
  }

  openReferralList(code, referrer) {
    if (!this.vm.referralMap.get(code)) return
    this.vm.changeSubReferrerName(referrer)
    this.vm.changeSubReferralCode(code)
    this.vm.changeCampaignReferralDialog(true)
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

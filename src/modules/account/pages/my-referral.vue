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
              <div class="font-size-28 font-weight-bold text-truncate">My referral</div>
            </div>
            <div class="d-flex flex-column col-auto">
              <v-sheet class="blue lighten-3 py-2 px-4 text-body-1 font-weight-600 border-radius-8"
                >Code
                <span class="ml-6 bluePrimary--text font-weight-bold">
                  {{ referralCode }}
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
          <div class="d-flex justify-space-between">
            <div class="text-center" style="flex: 1">
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
            <div class="text-center" style="flex: 1">
              <div
                class="font-size-28 font-weight-bold"
                :class="{
                  'text-h5': $vuetify.breakpoint.xsOnly,
                }"
              >
                {{ vm.totalCommissionObj | _get('pastDayCommission') | usdCustom(4, 6) }}
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
            <div class="text-center" style="flex: 1">
              <div
                class="font-size-28 font-weight-bold"
                :class="{
                  'text-h5': $vuetify.breakpoint.xsOnly,
                }"
              >
                {{ vm.totalCommissionObj | _get('totalCommission') | usdCustom(4, 6) }}
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
            <referral-card
              v-for="item in vm.displayedReferralList"
              :key="item.id"
              :name="item.name"
              :joinTime="item.createdAt"
              :avatar="item.metadata.avatar"
              :commission="item.commission"
              :totalEarn="item.totalEarn"
              :commissionToday="item.commissionToday"
              :id="item.id"
              class="mb-2"
            ></referral-card>
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
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { MyReferralViewModel } from '@/modules/account/viewmodels/my-referral-viewmodel'
import { promiseHelper } from '@/helpers/promise-helper'
import { get } from 'lodash-es'

@Observer
@Component({
  components: {
    'no-referrals': () => import('@/modules/account/components/no-referrals.vue'),
    'loading-component': () => import('@/modules/account/components/loading-component.vue'),
    'referral-card': () => import('@/modules/account/components/referral-card.vue'),
  },
})
export default class MyReferral extends Vue {
  @Provide() vm = new MyReferralViewModel()
  walletStore = walletStore
  authStore = authStore
  isCopied = false
  mouseoverEvent = new Event('mouseleave')
  referralCode = get(this.authStore, 'user.hunter.referralCode', '')

  async copyAddressDesktop() {
    navigator.clipboard.writeText(`https://app.glodao.io/bounty?ref=${this.referralCode}`)
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

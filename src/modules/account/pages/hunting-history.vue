<template>
  <v-row>
    <v-col cols="12" class="hunter-info-container">
      <v-container class="d-flex justify-center mt-20">
        <v-sheet class="transparent overflow-hidden" width="100%">
          <v-row dense>
            <v-col cols="12" md="6" lg="5">
              <mini-info-container />
            </v-col>
            <v-col cols="12" md="6" lg="7">
              <v-row dense>
                <v-col cols="12">
                  <wallet-sheet-container />
                </v-col>
                <v-col cols="12">
                  <v-sheet class="neutral100--bg d-flex flex-column justify-space-between rounded-lg pa-6">
                    <div class="text-body-1 font-weight-600 pb-1">
                      Your referral link |
                      <span class="neutral10--text text-body-2">Refer friends and earn reward</span>
                    </div>
                    <referral-copy-board class="mt-2" />
                  </v-sheet>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
      <v-divider class="mt-10"></v-divider>
    </v-col>

    <v-col cols="12">
      <v-container>
        <v-row no-gutters>
          <v-tabs v-model="tab" class="pb-4" color="blue">
            <v-tab>
              <div class="section-big-title-text font-weight-bold text-capitalize text-h6">Bounty Hunting History</div>
            </v-tab>
            <v-tab>
              <div class="section-big-title-text font-weight-bold text-capitalize text-h6">Referral List</div>
            </v-tab>
          </v-tabs>
        </v-row>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row class="mt-1" :dense="$vuetify.breakpoint.xsOnly" :no-gutters="$vuetify.breakpoint.xsOnly">
              <v-col cols="12" sm="6" md="3">
                <v-select v-model="vm.statusModel" :items="vm.status" label="Status" outlined dense multiple>
                  <template v-slot:selection="{ item, index }">
                    <span v-if="index === 0">{{ item }}</span>
                    <span v-if="index === 1" class="text-caption"> &nbsp;(+{{ vm.statusModel.length - 1 }}) </span>
                  </template>
                </v-select>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="2">
                <v-btn
                  outlined
                  depressed
                  class="fill-width text-none text-start font-weight-regular d-flex justify-start align-center"
                  height="40"
                  @click="vm.changeDateRangeDialog(true)"
                  style="border: thin solid rgba(0, 0, 0, 0.38) !important"
                >
                  Filter by date
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-select :items="items" label="Project" outlined dense class="rounded-0"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="socialsModel"
                  :items="socials"
                  label="Social task"
                  outlined
                  dense
                  class="rounded-0"
                  multiple
                >
                  <template v-slot:selection="{ item, index }">
                    <span v-if="index === 0">{{ item }}</span>
                    <span v-if="index === 1" class="grey--text text-caption">
                      &nbsp;(+{{ socialsModel.length - 1 }})
                    </span>
                  </template>
                </v-select>
              </v-col> -->
              <v-col cols="12" sm="6" md="3" class="ml-md-auto">
                <v-select
                  :items="vm.sortList"
                  label="Sort"
                  outlined
                  dense
                  height="40"
                  @change="vm.onSortConditionChange"
                ></v-select>
              </v-col>
            </v-row>
            <v-row dense no-gutters>
              <v-col cols="12">
                <loading-component :loading="vm.loading"></loading-component>
                <v-scale-transition v-if="!vm.loading">
                  <div v-if="vm.convertedHuntingHistoryList.length > 0">
                    <div class="mt-2" v-for="task in vm.convertedHuntingHistoryList" :key="task.id">
                      <hunting-history-card
                        :coverImage="task.coverImage"
                        :id="task.id"
                        :chainId="task.chainId"
                        :bountyEarn="task.bountyEarn"
                        :currentStep="task.currentStep"
                        :name="task.name"
                        :startTime="task.startTime"
                        :status="task.status"
                        :totalStep="task.totalStep"
                        :type="task.type"
                        :rewardToken="task.rewardToken"
                        :projectLogo="task.projectLogo"
                        :task="task"
                      />
                    </div>
                  </div>
                  <no-items v-else />
                </v-scale-transition>
              </v-col>
              <v-col cols="12" class="my-8">
                <v-pagination
                  v-model="vm.page"
                  :length="vm.totalPageCount"
                  :total-visible="7"
                  color="blue"
                  :value="vm.page"
                  v-if="vm.totalPageCount > 1"
                ></v-pagination>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row class="mt-1">
              <v-col cols="12" sm="6" md="3">
                <v-sheet class="transparent d-flex align-center" height="100%">
                  <span class="transparent font-weight-bold neutral0--text pr-1">{{ vm.referralList.length }}</span>
                  <span class="neutral0--text">Refferals</span>
                </v-sheet>
              </v-col>
              <v-col class="ml-auto" cols="12" sm="6" md="3">
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
            <v-row>
              <v-col cols="12">
                <loading-component :loading="vm.loading"></loading-component>
                <v-scale-transition v-if="!vm.loading">
                  <div v-if="vm.referralWorkingList.length > 0">
                    <referral-card
                      v-for="item in vm.referralWorkingList"
                      :key="item.id"
                      :name="item.name"
                      :joinTime="item.joinTime"
                      :avatar="item.avatar"
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
              <v-col cols="12" class="my-8" v-if="vm.totalReferralPage > 1">
                <v-pagination
                  v-model="vm.referralPage"
                  :length="vm.totalReferralPage"
                  :total-visible="7"
                  color="blue"
                  :value="vm.referralPage"
                ></v-pagination>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-col>
    <v-dialog v-model="vm.dateRangeDialog" width="300" persistent>
      <v-sheet>
        <v-sheet class="d-flex justify-center">
          <v-date-picker v-model="dates" range no-title></v-date-picker>
        </v-sheet>
        <v-sheet class="d-flex justify-space-between pa-4">
          <v-btn class="rounded-0" depressed @click="closeDialog()">Cancel</v-btn>
          <v-btn class="rounded-0 background-blue-diversity white--text" depressed @click="changeDateRange()">
            Select
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { HuntingHistoryViewModel } from '@/modules/account/viewmodels/hunting-history-viewmodel'

@Observer
@Component({
  components: {
    'hunting-history-card': () => import('@/modules/account/components/hunting-history-card.vue'),
    'no-items': () => import('@/modules/account/components/no-items.vue'),
    'referral-card': () => import('@/modules/account/components/referral-card.vue'),
    'referral-copy-board': () => import('@/modules/account/components/referral-copy-board.vue'),
    'no-referrals': () => import('@/modules/account/components/no-referrals.vue'),
    'wallet-sheet-container': () => import('@/modules/account/components/wallet-sheet-container.vue'),
    'mini-info-container': () => import('@/modules/account/components/mini-info-container.vue'),
    'loading-component': () => import('@/modules/account/components/loading-component.vue'),
  },
})
export default class HuntingHistory extends Vue {
  @Provide() vm = new HuntingHistoryViewModel()
  walletStore = walletStore
  authStore = authStore
  items = ['Foo', 'Bar', 'Fizz', 'Buzz']
  status = ['Processing', 'Awarded', 'Completed', 'Rejected']
  statusModel = []
  socials = ['Twitter', 'Discord', 'Telegram']
  socialsModel = []
  dates = []
  tab = null

  mounted() {
    this.vm.initReaction()
  }

  closeDialog() {
    this.vm.changeDateRangeDialog(false)
    if (this.vm.dateRanges.length > 0) this.dates = this.vm.dateRanges
    else this.dates = []
  }

  changeDateRange() {
    this.vm.changeDateRange(this.dates)
    this.vm.changeDateRangeDialog(false)
  }

  beforeDestroy() {
    this.vm.destroyReaction()
  }
}
</script>

<style scoped lang="scss">
.hunter-info-container {
  background: linear-gradient(85.85deg, #daecff 36.82%, rgba(140, 250, 230, 0) 130.67%);
  background-size: cover;
  padding-bottom: 0;
}
.username-lg-text {
  font-size: 28px;
  line-height: 36px;
}
.number-count-text {
  font-size: 20px;
  line-height: 26px;
  font-weight: 700;
  margin-bottom: 8px;
}
.caption-text {
  font-size: 16px;
  line-height: 24px;
}
.font-weight-600 {
  font-weight: 600 !important;
}
</style>

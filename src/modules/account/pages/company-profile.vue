<template>
  <v-row>
    <v-col cols="12" class="hunter-info-container">
      <v-container class="d-flex justify-center mt-10">
        <v-sheet class="transparent overflow-hidden" width="100%">
          <v-row dense>
            <v-col cols="12" md="6" lg="5">
              <mini-info-container />
            </v-col>
            <v-col cols="12" md="6" lg="7">
              <v-row dense>
                <v-col cols="12">
                  <wallet-sheet-container class="pb-5" />
                </v-col>
                <v-col cols="12">
                  <v-sheet class="neutral100--bg d-flex justify-space-between rounded-lg pa-6 mt-6">
                    <div>
                      <div class="neutral10--text font-weight-600">Total campaign</div>
                      <div class="text-h6 font-weight-bold">100</div>
                    </div>
                    <div>
                      <div class="neutral10--text font-weight-600">Today referral</div>
                      <div class="text-h6 font-weight-bold">1000</div>
                    </div>
                    <div class="d-flex align-center">
                      <v-btn
                        depressed
                        height="40"
                        class="text-none white--text linear-background-blue-main rounded"
                        @click="vm.changeNewCampaignDialog(true)"
                        >New campaign</v-btn
                      >
                    </div>
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
              <div class="section-big-title-text font-weight-bold text-capitalize text-h6">All campaigns</div>
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
                <v-scale-transition origin="bottom center 0" v-if="!vm.loading">
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
            <v-row class="pt-6">
              <v-col cols="12" sm="6" md="4">
                <campaign-list-item></campaign-list-item>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <campaign-list-item></campaign-list-item>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <campaign-list-item></campaign-list-item>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <campaign-list-item></campaign-list-item>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <campaign-list-item></campaign-list-item>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <campaign-list-item></campaign-list-item>
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
    <new-campaign-dialog></new-campaign-dialog>
  </v-row>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { CompanyProfileViewModel } from '@/modules/account/viewmodels/company-profile-viewmodel'

@Observer
@Component({
  components: {
    'hunting-history-card': () => import('@/modules/account/components/hunting-history-card.vue'),
    'no-items': () => import('@/modules/account/components/no-items.vue'),
    'wallet-sheet-container': () => import('@/modules/account/components/wallet-sheet-container.vue'),
    'mini-info-container': () => import('@/modules/account/components/mini-info-container.vue'),
    'loading-component': () => import('@/modules/account/components/loading-component.vue'),
    'campaign-list-item': () => import('@/modules/account/components/campaign-list-item.vue'),
    'new-campaign-dialog': () => import('@/modules/account/components/new-campaign-dialog.vue'),
  },
})
export default class CompanyProfile extends Vue {
  @Provide() vm = new CompanyProfileViewModel()
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
    console.log('company-profile-page')

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
@import '../styles/index.scss';
</style>

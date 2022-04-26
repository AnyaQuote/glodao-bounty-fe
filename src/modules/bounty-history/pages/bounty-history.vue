<template>
  <v-row dense no-gutters>
    <v-col
      cols="12"
      class="banner"
      :class="{
        'banner-dark-bg': $vuetify.theme.dark,
      }"
    >
      <v-container class="py-8">
        <v-row>
          <v-col cols="12" md="6">
            <v-sheet
              class="fill-width fill-height background-transparent"
              :width="$vuetify.breakpoint.mdAndUp ? '95%' : '100%'"
            >
              <div class="banner-gradient-text">BOUNTY HISTORY</div>
              <div class="mt-2 primary--text intro-text">
                All bounty projects are enthusiastically hunted on GloDAO. Check it now!
              </div>
              <div>
                <v-sheet
                  class="d-flex justify-center align-center rounded-pill mt-7 position-relative"
                  style="background: white"
                  outlined
                  height="64"
                >
                  <v-sheet
                    class="position-absolute rounded-circle blue flex-center-box"
                    style="left: 10px; z-index: 2"
                    width="40"
                    height="40"
                  >
                    <v-icon color="white">mdi-magnify</v-icon>
                  </v-sheet>
                  <v-autocomplete
                    dense
                    flat
                    solo
                    hide-details
                    :items="vm.suggestedList"
                    :search-input.sync="searchKeyword"
                    item-text="name"
                    item-value="id"
                    label="Search by project name"
                    class="ma-0 pa-0 text-caption white black--text link-submit-custom-input rounded-pill pl-10 mr-2 ml-4 pr-4"
                    color="black"
                    theme="light"
                    :dark="false"
                    light
                    :loading="vm.taskNameInputLoading"
                    @change="vm.goToTaskDetailScreen"
                  ></v-autocomplete>
                </v-sheet>
              </div>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6">
            <v-sheet class="fill-width fill-height linear-background-blue-main rounded-lg" style="padding: 3px">
              <v-sheet color="white" light class="fill-width fill-height rounded py-8 py-sm-10 px-5 px-sm-8">
                <v-row>
                  <v-col cols="6">
                    <div class="d-flex align-center">
                      <v-sheet color="blue rounded-circle" class="flex-center-box mr-2" width="24" height="24">
                        <v-icon color="white" size="16"> mdi-crown </v-icon>
                      </v-sheet>
                      <div class="text-h5 text-sm-h4 blue--text font-weight-bold">{{ vm.totalProjectCount }}</div>
                    </div>
                    <div
                      class="neutral10--text-persistent font-weight-600 mt-1 text-body-2 text-sm-body-1 text-uppercase"
                    >
                      BOUNTY PROJECTS
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="d-flex align-center">
                      <v-sheet color="blue rounded-circle" class="flex-center-box mr-2" width="24" height="24">
                        <v-icon color="white" size="16"> mdi-account </v-icon>
                      </v-sheet>
                      <div class="text-h5 text-sm-h4 blue--text font-weight-bold">{{ vm.uniqueParticipantCount }}</div>
                    </div>
                    <div
                      class="neutral10--text-persistent font-weight-600 mt-1 text-uppercase text-body-2 text-sm-body-1 text-uppercase"
                    >
                      UNIQUE PARTICIPANTS
                    </div>
                  </v-col>
                </v-row>
                <v-divider class="my-6 my-sm-8" light></v-divider>
                <v-sheet class="d-flex justify-space-between align-center fill-width" light>
                  <div>
                    <div class="text-h6 text-sm-h5 font-weight-bold black--text">{{ vm.liveProjectCount }}</div>
                    <div
                      class="neutral10--text-persistent text-caption text-sm-body-2 font-weight-600 mt-1 text-uppercase"
                    >
                      LIVE PROJECTS
                    </div>
                  </div>
                  <div>
                    <div class="text-h6 text-sm-h5 font-weight-bold black--text">{{ vm.endedProjectCount }}</div>
                    <div
                      class="neutral10--text-persistent text-caption text-sm-body-2 font-weight-600 mt-1 text-uppercase"
                    >
                      COMPLETED PROJECTS
                    </div>
                  </div>
                  <div>
                    <div class="text-h6 text-sm-h5 font-weight-bold black--text">{{ vm.userCount }}</div>
                    <div
                      class="neutral10--text-persistent text-caption text-sm-body-2 font-weight-600 mt-1 text-uppercase"
                    >
                      USER ACCOUNTS
                    </div>
                  </div>
                </v-sheet>
              </v-sheet>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-col cols="12">
      <v-container>
        <div class="text-h5 font-weight-600 mt-10">BOUNTY PROJECT</div>
        <v-row class="mt-7 mb-3">
          <v-col cols="6" sm="4" md="3">
            <v-btn
              depressed
              class="rounded-pill neutral100--bg text-none text-caption fill-width text-start justify-start d-flex position-relative font-weight-regular neutral10--text"
              @click="vm.changeStartDateDialog(true)"
              outlined
              min-width="100"
            >
              <v-icon left color="neutral10">mdi-calendar-blank-outline</v-icon> From {{ vm.startDate || '(date)' }}
            </v-btn>
          </v-col>
          <v-col cols="6" sm="4" md="3">
            <v-btn
              depressed
              class="rounded-pill neutral100--bg text-none text-caption fill-width text-start justify-start d-flex position-relative font-weight-regular neutral10--text"
              @click="vm.changeEndDateDialog(true)"
              outlined
              min-width="100"
            >
              <v-icon left color="neutral10">mdi-calendar-blank-outline</v-icon> To {{ vm.endDate || '(date)' }}
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              class="text-capitalize white--text rounded-pill"
              color="bluePrimary"
              depressed
              @click="vm.changeDateRangeFilter"
            >
              <v-icon color="white" left>mdi-filter</v-icon>
              Filter
            </v-btn>
          </v-col>
        </v-row>
        <v-row dense no-gutters v-show="!vm.bountyListLoading">
          <v-col>
            <div class="mt-3" v-for="task in vm.convertedBountyList" :key="task.id">
              <bounty-history-card
                :coverImage="task.coverImage"
                :id="task.id"
                :chainId="task.chainId"
                :totalReward="task.rewardAmount"
                :name="task.name"
                :endTime="task.endTime"
                :rewardToken="task.rewardToken"
                :totalParticipants="task.totalParticipants"
              />
            </div>
          </v-col>
          <v-col cols="12" class="mt-6" v-if="vm.totalPageCount > 1">
            <v-pagination
              v-model="vm.page"
              :length="vm.totalPageCount"
              :total-visible="7"
              color="blue"
              :value="vm.page"
            ></v-pagination>
          </v-col>
        </v-row>
        <v-row dense no-gutters v-show="vm.bountyListLoading">
          <v-col>
            <v-sheet class="background-transparent flex-center-box" height="200">
              <v-progress-circular indeterminate color="bluePrimary" size="75"> </v-progress-circular>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-dialog v-model="vm.startDateDialog" width="300" persistent>
      <v-sheet>
        <v-sheet class="d-flex justify-center neutral100--bg">
          <v-date-picker
            class="date-picker-dialog-custom"
            v-model="startDate"
            no-title
            color="bluePrimary"
            header-color="bluePrimary"
            :max="vm.endDate || '2099-12-31'"
          ></v-date-picker>
        </v-sheet>
        <v-sheet class="d-flex justify-space-between pa-4 neutral100--bg">
          <v-btn class="rounded-0 neutral15" depressed @click="closeStartDateDialog()">Cancel</v-btn>
          <v-btn class="rounded-0 background-blue-diversity white--text" depressed @click="changeStartDateValue()">
            Select
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-dialog>
    <v-dialog v-model="vm.endDateDialog" width="300" persistent>
      <v-sheet>
        <v-sheet class="d-flex justify-center neutral100--bg">
          <v-date-picker
            class="date-picker-dialog-custom"
            v-model="endDate"
            no-title
            color="bluePrimary"
            header-color="bluePrimary"
            :min="vm.startDate || '1970-01-01'"
          ></v-date-picker>
        </v-sheet>
        <v-sheet class="d-flex justify-space-between pa-4 neutral100--bg">
          <v-btn class="rounded-0 neutral15" depressed @click="closeEndDateDialog()">Cancel</v-btn>
          <v-btn class="rounded-0 background-blue-diversity white--text" depressed @click="changeEndDateValue()">
            Select
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { BountyHistoryViewModel } from '@/modules/bounty-history/viewmodels/bounty-history-viewmodel'
import { debounce } from 'lodash'

@Observer
@Component({
  components: {
    'bounty-history-card': () => import('@/modules/bounty-history/components/bounty-history-card.vue'),
  },
})
export default class BountyHistoryPage extends Vue {
  @Provide() vm = new BountyHistoryViewModel()
  startDate = ''
  endDate = ''

  @Watch('searchKeyword') onSearchKeywordChange(val) {
    this.searchKeywordDebounce(val)
  }

  private searchKeywordDebounce = debounce(async (search) => {
    this.vm.getSuggestedList(search)
  }, 500)

  walletStore = walletStore
  authStore = authStore
  searchKeyword = null

  mounted() {
    this.vm.initReaction()
  }

  closeStartDateDialog() {
    this.vm.changeStartDateDialog(false)
    this.startDate = this.vm.startDate
  }

  changeStartDateValue() {
    this.vm.changeStartDateDialog(false)
    this.vm.changeStartDateValue(this.startDate)
  }
  closeEndDateDialog() {
    this.vm.changeEndDateDialog(false)
    this.endDate = this.vm.endDate
  }

  changeEndDateValue() {
    this.vm.changeEndDateDialog(false)
    this.vm.changeEndDateValue(this.endDate)
  }

  beforeDestroy() {
    this.vm.destroyReaction()
  }
}
</script>

<style scoped lang="scss">
.banner-dark-bg {
  background-image: url('~@/assets/images/bounty-history-bg-dark.png') !important;
}
.banner {
  background-image: url('~@/assets/images/bounty-history-bg.png');
  background-size: cover;
  .banner-gradient-text {
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 800;
    font-size: 48px;
    line-height: 130%;
    background: linear-gradient(90deg, #0276f0 0%, #00e5ff 113.65%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  .intro-text {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 130%;
  }
}
.theme--dark.v-input {
  color: black;
}
.neutral10--text-persistent {
  color: #5f6267;
}
</style>

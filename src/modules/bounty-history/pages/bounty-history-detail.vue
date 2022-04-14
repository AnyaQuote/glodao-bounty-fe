<template>
  <v-container
    :class="{
      'px-0': $vuetify.breakpoint.xsOnly,
    }"
  >
    <v-row no-gutters dense>
      <!-- breadcrumbs -->
      <v-col cols="12">
        <v-sheet height="50" class="neutral15">
          <v-breadcrumbs :items="vm.breadcrumbsItems" divider=">" class="pa-0">
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item :disabled="item.disabled">
                <template v-slot:default>
                  <router-link :to="item.href">
                    <span :class="item.text === 'Bounty history' ? 'bluePrimary--text' : ''">{{ item.text }}</span>
                  </router-link>
                </template>
                {{ item.text }}
              </v-breadcrumbs-item>
            </template>
            <template v-slot:divider>
              <v-icon size="22"> mdi-chevron-right </v-icon>
            </template>
          </v-breadcrumbs>
        </v-sheet>
      </v-col>
      <v-col cols="12">
        <div class="d-flex justify-center fill-width">
          <v-sheet class="border-radius-8 neutral100 pa-6 fill-width" max-width="960">
            <v-sheet
              class="fill-width white linear-background-blue-light pa-6 d-flex justify-space-between bluePrimary--text border-radius-8"
              :class="{
                'text-h5': $vuetify.breakpoint.smAndUp,
                'text-body-1': $vuetify.breakpoint.xsOnly,
              }"
            >
              <div class="font-weight-bold d-flex align-center">
                <v-sheet
                  :max-height="$vuetify.breakpoint.xsOnly ? 24 : 48"
                  :max-width="$vuetify.breakpoint.xsOnly ? 24 : 48"
                  class="mr-3 background-transparent"
                >
                  <chain-logo class="fill-height fill-width" :chain="vm.task.chainId" />
                </v-sheet>
                {{ vm.taskName }}
              </div>
              <div class="d-flex align-center bluePrimary--text font-weight-600">
                STATICS
                <v-icon
                  class="text-decoration-underline ml-3"
                  :size="$vuetify.breakpoint.xsOnly ? 14 : 18"
                  color="bluePrimary"
                  >mdi-chart-line-variant</v-icon
                >
              </div>
            </v-sheet>
            <v-row class="mt-3">
              <v-col cols="12" sm="6">
                <v-img :src="vm.coverImage" max-height="275" class="fill-width fill-height"></v-img>
              </v-col>
              <v-col cols="12" sm="6">
                <v-sheet
                  class="linear-background-blue-main border-radius-8 overflow-hidden"
                  height="275"
                  style="padding: 2px"
                >
                  <v-sheet class="pa-6 fill-height neutral100--bg" style="border-radius: 6px">
                    <table class="fill-width fill-height table-text">
                      <tr>
                        <td class="font-weight-600">Total participants</td>
                        <td class="text-end font-weight-bold">{{ vm.totalParticipants }} user(s)</td>
                      </tr>
                      <tr>
                        <td class="font-weight-600">Priority pool</td>
                        <td class="text-end font-weight-bold">{{ vm.totalPriorityParticipants }} user(s)</td>
                      </tr>
                      <tr>
                        <td class="font-weight-600">Community pool</td>
                        <td class="text-end font-weight-bold">{{ vm.totalCommunityParticipants }} user(s)</td>
                      </tr>
                      <tr>
                        <td class="font-weight-600">Total Awarded</td>
                        <td class="text-end font-weight-bold">{{ vm.totalAwarded }} {{ vm.rewardToken }}</td>
                      </tr>
                      <tr>
                        <td class="font-weight-600">Total shared</td>
                        <td class="text-end font-weight-bold">{{ vm.totalTwitterShare }}</td>
                      </tr>
                    </table>
                  </v-sheet>
                </v-sheet>
              </v-col>
              <v-col cols="12">
                <div
                  class="align-center"
                  :class="{
                    'd-flex': $vuetify.breakpoint.smAndUp,
                    'text-caption': $vuetify.breakpoint.xsOnly,
                  }"
                >
                  <div
                    class="d-flex align-center"
                    :class="{
                      ' mr-6': $vuetify.breakpoint.smAndUp,
                    }"
                  >
                    <v-icon color="neutral10" class="mr-2">mdi-crosshairs-gps</v-icon>
                    {{ vm.taskStartTime | datetime }} - {{ vm.taskEndTime | datetime }}
                  </div>
                  <div
                    class="d-flex align-center cursor-pointer"
                    :class="{
                      'mt-2': $vuetify.breakpoint.xsOnly,
                    }"
                    @click="openLink(vm.website)"
                  >
                    <v-icon color="neutral10" class="mr-2">mdi-web</v-icon>
                    {{ vm.website }}
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-sheet>
        </div>
      </v-col>

      <v-col cols="12">
        <div class="d-flex justify-center fill-width mt-6">
          <v-sheet class="border-radius-8 neutral100 pa-6 fill-width" max-width="960">
            <v-row>
              <v-col cols="12" md="4">
                <v-sheet width="100%" class="neutral15 pa-6 border-radius-8">
                  <div class="text-h6 font-weight-bold">Filters</div>
                  <!-- <div class="mt-6">
                    <v-autocomplete
                      dense
                      flat
                      solo
                      outlined
                      hide-details
                      :v-model="vm.nameInputModel"
                      :items="vm.uniqueHunterNameList"
                      @change="vm.onNameFilterChange"
                      item-text="hunterName"
                      item-value="hunterName"
                      label="All account name"
                      class="ma-0 pa-0 text-caption neutral100--bg link-submit-custom-input"
                    >
                    </v-autocomplete>
                  </div> -->
                  <div class="mt-6 d-flex align-center">
                    <v-btn
                      depressed
                      class="neutral100--bg text-none text-caption fill-width text-start justify-start d-flex position-relative font-weight-regular neutral10--text"
                      @click="vm.changeStartDateDialog(true)"
                      outlined
                      height="40"
                    >
                      <v-icon left color="neutral10">mdi-calendar-blank-outline</v-icon> From {{ vm.startDate || '' }}
                      <v-icon color="neutral10" class="position-absolute" style="right: 0">mdi-chevron-down</v-icon>
                    </v-btn>
                  </div>
                  <div class="mt-4 d-flex align-center">
                    <v-btn
                      depressed
                      class="neutral100--bg text-none text-caption fill-width text-start justify-start d-flex position-relative font-weight-regular neutral10--text"
                      @click="vm.changeEndDateDialog(true)"
                      outlined
                      height="40"
                    >
                      <v-icon left color="neutral10">mdi-calendar-blank-outline</v-icon> To {{ vm.endDate || '' }}
                      <v-icon color="neutral10" class="position-absolute" style="right: 0">mdi-chevron-down</v-icon>
                    </v-btn>
                  </div>
                  <div class="d-flex align-center">
                    <v-radio-group
                      v-model="vm.poolType"
                      row
                      class="d-flex fill-width align-center justify-space-between"
                    >
                      <v-radio class="ma-1" label="Priority pool" value="priority"> </v-radio>
                      <v-radio class="ma-1" label="Community pool" value="community"> </v-radio>
                    </v-radio-group>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" md="8">
                <v-sheet class="fill-width neutral15 pa-6 border-radius-8">
                  <div class="text-h6 font-weight-bold">Task done history</div>
                  <div class="mt-6">
                    <task-complete-list :applyList="vm.relatedApplies" />
                    <!-- <v-data-table
                        :headers="headers"
                        :items="vm.displayedTwitterSharedLinkList"
                        class="fill-width elevation-0 rounded-lg task-detail-twitter-share-data-table"
                        :hide-default-footer="vm.displayedTwitterSharedLinkList.length < 10"
                      >
                        <template v-slot:[`item.name`]="{ item }">
                          <v-row dense no-gutters justify="center" align="center" class="ma-2">
                            <v-avatar>
                              <img :src="item.hunterAvatar" alt="Avatar" />
                            </v-avatar>
                            <div class="ml-4 font-weight-medium">{{ `@${item.hunterName}` }}</div>
                          </v-row>
                        </template>
                        <template v-slot:[`item.time`]="{ item }">
                          <div>{{ item.shareTime | normalizeTimeDuration }}</div>
                        </template>
                        <template v-slot:[`item.link`]="{ item }">
                          <v-row no-gutters dense justify="center">
                            <div class="bluePrimary--text" @click="openLink(item.link)">
                              Link<v-icon size="14" color="bluePrimary" class="ml-2">mdi-open-in-new</v-icon>
                            </div>
                          </v-row>
                        </template>
                      </v-data-table> -->
                  </div>
                </v-sheet>
              </v-col>
            </v-row>
          </v-sheet>
        </div>
      </v-col>
    </v-row>
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
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
import { BountyHistoryDetailViewModel } from '@/modules/bounty-history/viewmodels/bounty-history-detail-viewmodel'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
    'task-complete-list': () => import('@/modules/bounty-history/components/task-complete-list.vue'),
  },
})
export default class BountyDetail extends Vue {
  @Provide() vm = new BountyHistoryDetailViewModel()
  startDate = ''
  endDate = ''

  @Watch('$route.params.taskId', { immediate: true }) onIdChanged(val: string) {
    if (val) {
      this.vm.taskIdChange(val)
    }
  }

  items = ['Twitter task', 'Telegram task', 'Discord task']
  tab = null

  headers = [
    {
      text: '@Account',
      value: 'name',
      align: 'center',
      sortable: false,
    },
    {
      text: 'Share time',
      value: 'time',
      align: 'center',
      sortable: false,
    },
    {
      text: 'Share link',
      value: 'link',
      align: 'center',
      sortable: false,
    },
  ]

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

  openLink(link: string) {
    const url = link.trim()
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }

  beforeDestroy() {
    this.vm.destroyReaction()
  }
}
</script>
<style scoped lang="scss">
.table-text {
  font-size: 18px;
  line-height: 24px;
}
</style>

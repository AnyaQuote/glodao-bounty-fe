<template>
  <div class="neutral15">
    <v-sheet class="my-4 neutral15">
      <div class="card-big-title-text font-weight-bold">Current Twitter shares</div>
    </v-sheet>
    <v-sheet class="neutral15">
      <v-row>
        <!-- 1 -->
        <v-col cols="12" sm="4" md="4" lg="4">
          <v-sheet outlined rounded height="80" class="pa-4 neutral100--bg" elevation="3">
            <v-row no-gutters dense>
              <v-sheet width="48" height="48" class="rounded-circle mr-4 flex-center-box linear-background-blue-main">
                <v-icon color="white">mdi-share-all</v-icon>
              </v-sheet>
              <div class="neutral100--bg">
                <v-sheet class="text-subtitle-2 neutral100--bg">Total share</v-sheet>
                <v-sheet class="text-h6 line-height font-weight-black neutral100--bg">
                  {{ vm.totalTwitterShare | formatNumber(0) }}
                </v-sheet>
              </div>
            </v-row>
          </v-sheet>
        </v-col>

        <!-- 2 -->
        <v-col cols="12" sm="4" md="4" lg="4">
          <v-sheet outlined rounded height="80" class="pa-4 neutral100--bg" elevation="3">
            <v-row no-gutters dense>
              <v-sheet width="48" height="48" class="rounded-circle mr-4 flex-center-box linear-background-blue-main">
                <v-icon color="white">mdi-share-all-outline</v-icon>
              </v-sheet>
              <div>
                <v-sheet class="text-subtitle-2 neutral100--bg">Daily share</v-sheet>
                <v-sheet class="text-h6 line-height font-weight-black neutral100--bg">
                  {{ vm.dailyTwitterShareCount | formatNumber(0) }}
                </v-sheet>
              </div>
            </v-row>
          </v-sheet>
        </v-col>

        <!-- 3 -->
        <v-col cols="12" sm="4" md="4" lg="4">
          <v-sheet outlined rounded height="80" class="pa-4 neutral100--bg" elevation="3">
            <v-row no-gutters dense>
              <v-sheet width="48" height="48" class="rounded-circle mr-4 flex-center-box linear-background-blue-main">
                <v-icon color="white" size="20"> mdi-twitter </v-icon>
              </v-sheet>
              <div>
                <v-sheet class="text-subtitle-2 neutral100--bg">Twitter account </v-sheet>
                <v-sheet class="text-h6 line-height font-weight-black neutral100--bg">
                  {{ vm.uniqueTwitterAccountCount | formatNumber(0) }}
                </v-sheet>
              </div>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet outlined class="mt-4 overflow-hidden" rounded>
      <v-data-table
        :headers="headers"
        :items="vm.twitterSharedLinkList"
        class="elevation-0 rounded-lg task-detail-twitter-share-data-table"
        :hide-default-footer="vm.totalTwitterShare < 10"
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
      </v-data-table>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel, HUNTING } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'

@Observer
@Component({
  components: {},
})
export default class PoolTypeContainer extends Vue {
  @Inject() vm!: BountyDetailViewModel
  HUNTING = HUNTING

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

  openLink(link: string) {
    const url = link.trim()
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.pool-type-container {
  background: url('~@/assets/images/pool-type-container-bg.png');
  background-size: cover;
}
.theme--light {
  .custom-check-dot {
    border: thin solid var(--v-primary-base);
  }
}
.theme--dark {
  .custom-check-dot {
    border: thin solid var(--v-bluePrimary-base);
  }
}

.mini-task-container-sheet {
  background-color: var(--v-neutral100-base);
  border: 1px solid var(--v-neutral20-base);
}
.neutral15-background {
  background-color: var(--v-neutral15-base);
}
.unqualify-msg {
  color: var(--v-redSenamatic-base);
  font-size: 12px;
}
.v-btn--disabled {
  background-image: none !important;
}
.primary--border-thin {
  border: thin solid var(--v-primary-base);
}
.font-size-8 {
  font-size: 8px;
}
.font-size-12 {
  font-size: 12px;
}
.font-size-12-important {
  font-size: 12px !important;
}
.font-size-14 {
  font-size: 14px;
}
.divider {
  border-left: 1px solid var(--v-neutral20-base);
  height: 100%;
  margin-left: 9px;
  padding-top: 30px;
}

.ba-secondary {
  border: 1px solid var(--v-grey-base);
}

.line-height {
  line-height: 26px;
}

.border-color {
  border: 1px solid var(--v-bluePrimary-base);
}

.ba-dotted {
  border: 1px dashed var(--v-neutral20-base);
}

.logo-chain {
  width: 32px;
  height: 32px;
}

.card-status {
  top: 18px;
  left: 18px;
  background-color: rgba(255, 255, 255, 0.3);
}
.green-border-custom {
  border: thin solid var(--v-green-base);
}
.red-border-custom {
  border: thin solid var(--v-red-base);
}
.green-background-color {
  background-color: var(--v-green-base);
}
.red-background-color {
  background-color: var(--v-red-base);
}
.title-1 {
  font-weight: 700;
  font-size: 18px;
  line-height: 130%;
}
.title-2 {
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
}
.li-text {
  font-weight: 600;
  font-size: 14px;
  line-height: 170%;
}
.number-font {
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
}
</style>

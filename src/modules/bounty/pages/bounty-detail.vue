<template>
  <v-container>
    <v-row no-gutters dense>
      <!-- breadcrumbs -->
      <v-col cols="12">
        <v-sheet height="50">
          <v-breadcrumbs :items="breadcrumbs" divider=">" class="pa-0">
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
                <template v-slot:default>
                  <span :class="item.text === 'Bounty hunter' ? 'blue--text' : ''">{{ item.text }}</span>
                </template>
                {{ item.text }}
              </v-breadcrumbs-item>
            </template>
            <template v-slot:divider>
              <v-icon size="22"> chevron_right </v-icon>
            </template>
          </v-breadcrumbs>
        </v-sheet>
      </v-col>

      <!-- BOUNTY NAME -->
      <v-col cols="12">
        <v-sheet class="d-flex align-center mb-4">
          <v-sheet width="32" height="32" class="violet rounded-circle d-flex justify-center align-center">
            <chain-logo :chain="vm.data | _get('chainId')" class="logo-chain" />
          </v-sheet>
          <div class="d-flex align-center ml-3 mt-1 section-big-title-text font-weight-bold">
            {{ vm.data | _get('name') }}
            <v-sheet width="10" height="10" class="rounded-circle mx-4" color="bluePrimary"></v-sheet>
            <div class="text-uppercase">
              {{ vm.data | _get('chainId') }}
            </div>
          </div>
        </v-sheet>
      </v-col>

      <!-- LEFT -->
      <v-col cols="12" md="4">
        <v-sheet class="mb-4 position-relative">
          <!-- image -->
          <v-img :src="vm.data | _get('metadata.coverImage')" class="rounded-md"></v-img>
          <!-- status -->
          <div class="position-absolute card-status rounded-pill flex-center-box px-2 py-1">
            <v-sheet
              class="rounded-circle flex-center-box background-transparent"
              :class="vm.data | _get('status') | statusBorder"
            >
              <v-sheet
                width="10"
                height="10"
                class="rounded-circle ma-1"
                :class="vm.data | _get('status') | statusBackground"
              >
              </v-sheet>
            </v-sheet>
            <div :class="vm.data | _get('status') | statusColor" class="text-uppercase ml-2 mr-1 green--text">
              {{ vm.data | _get('status') }}
            </div>
          </div>
        </v-sheet>

        <!-- subtitle -->
        <v-sheet class="mb-4 card-subtitle-1">
          {{ vm.data | _get('metadata.caption') }}
        </v-sheet>
        <v-sheet>
          <div class="card-title-text font-weight-medium">Time to hunting</div>
          <ul>
            <li class="card-subtitle-1 font-weight-medium">From: {{ vm.data.startTime | MMMddYYYYhhmm }}</li>
            <li class="card-subtitle-1 font-weight-medium">To: {{ vm.data.endTime | MMMddYYYYhhmm }}</li>
          </ul>
        </v-sheet>
      </v-col>

      <!-- RIGHT -->
      <v-col cols="12" md="8" class="mt-4 mt-md-0">
        <v-sheet class="ml-md-5">
          <!-- LIST -->
          <v-sheet class="mb-4">
            <v-row dense>
              <v-col cols="6" md="3">
                <v-sheet outlined rounded class="pa-4">
                  <div class="card-subtitle-1">Total reward (TPB)</div>
                  <div class="card-big-title-text font-weight-bold">1000</div>
                </v-sheet>
              </v-col>
              <v-col cols="6" md="3">
                <v-sheet outlined rounded class="pa-4">
                  <div class="card-subtitle-1">Remaining (TPB)</div>
                  <div class="card-big-title-text font-weight-bold">1000</div>
                </v-sheet>
              </v-col>
              <v-col cols="6" md="3">
                <v-sheet outlined rounded class="pa-4">
                  <div class="card-subtitle-1">Max participant</div>
                  <div class="card-big-title-text font-weight-bold">{{ vm.data | _get('maxParticipant') }}</div>
                </v-sheet>
              </v-col>
              <v-col cols="6" md="3">
                <v-sheet outlined rounded class="pa-4">
                  <div class="card-subtitle-1">Slot left</div>
                  <div class="card-big-title-text font-weight-bold">1000</div>
                </v-sheet>
              </v-col>
            </v-row>
          </v-sheet>

          <!-- POOL ENDS IN -->
          <v-sheet rounded class="pa-6 mb-4" color="blue">
            <v-row dense>
              <v-col cols="12">
                <div class="white--text">POOR ENDS IN</div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="d-flex">
                  <v-icon color="white" class="mr-3">mdi-clock-outline</v-icon>
                  <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
                    <div class="font-weight-bold">10</div>
                  </v-sheet>
                  <div class="flex-center-box mx-3 white--text">:</div>
                  <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
                    <div class="font-weight-bold">10</div>
                  </v-sheet>
                  <div class="flex-center-box mx-3 white--text">:</div>
                  <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
                    <div class="font-weight-bold">10</div>
                  </v-sheet>
                  <div class="flex-center-box mx-3 white--text">:</div>
                  <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
                    <div class="font-weight-bold">10</div>
                  </v-sheet>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <v-progress-linear :value="vm.percent" color="white" height="36" class="rounded font-weight-bold">
                  Progess: {{ `${vm.completed}/${vm.data.maxParticipant} ` }} ({{ vm.percent | formatNumber(2) }}%)
                </v-progress-linear>
              </v-col>
            </v-row>
          </v-sheet>

          <!-- TASK -->
          <v-sheet outlined rounded>
            <v-tabs v-model="tab" color="blue">
              <v-tab v-for="(item, index) in items" :key="index" :disabled="index !== 0"> {{ item }}</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" class="">
              <v-tab-item>
                <v-row dense no-gutters justify="center">
                  <v-col cols="12" md="10" class="mt-6">
                    <div class="card-subtitle-1 font-weight-medium">
                      Reward for twitter task: {{ vm.data | _get('rewardAmount') }} DVT
                    </div>
                    <div class="card-subtitle-1">
                      Please ensure you join our Twitter channel to be eligible. Our moderators will check through all
                      submissions and take action to reward or reject.
                    </div>
                    <div class="card-subtitle-1">Are you ready? Please click “Start hunting” button to start.</div>
                    <div class="text-center my-4">
                      <div v-if="vm.status === HUNTING.start">
                        <v-btn elevation color="bluePrimary" class="white--text" @click="vm.startHunting">
                          <v-icon left>power_settings_new</v-icon>
                          Start hunting
                        </v-btn>
                      </div>
                      <div v-else-if="vm.status === HUNTING.hunting">
                        <v-btn elevation outlined color="green">
                          <v-icon left>timelapse</v-icon>
                          Your hunting process has begun!
                        </v-btn>
                      </div>
                      <div v-else>
                        <v-btn elevation outlined color="red">
                          <v-icon left>error_outline</v-icon>
                          Your hunting process has finished!
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="9">
                    <div class="custom-dash-divider mb-7"></div>
                    <!-- ONE -->
                    <v-row dense no-gutters class="mb-4" v-for="(twitterTask, index) in vm.twitterTasks" :key="index">
                      <v-col cols="1">
                        <v-sheet class="pb-1">
                          <v-radio-group dense hide-details class="ma-0 pa-0 text-center">
                            <v-radio></v-radio>
                          </v-radio-group>
                        </v-sheet>
                        <v-sheet class="fill-height pb-7">
                          <div class="divider"></div>
                        </v-sheet>
                      </v-col>

                      <v-col cols="10">
                        <v-sheet outlined rounded>
                          <v-container fluid>
                            <div class="d-flex align-center">
                              <v-sheet
                                width="10"
                                height="10"
                                outlined
                                class="rounded-circle ba-secondary d-flex justify-center align-center mr-1"
                              >
                                <v-icon size="8" color="black">mdi-check</v-icon>
                              </v-sheet>
                              <div class="text-caption text-weight-400 line-height">Completed</div>
                            </div>
                            <div class="mb-4">
                              <div class="text-subtitle-2 font-weight-medium">{{ twitterTask | titleTask }}</div>
                              <ul v-if="twitterTask.type === 'follow'">
                                <li class="text-caption">
                                  Please follow “{{ vm.data | _get('name') }}” Twitter page to complete this task.
                                </li>
                              </ul>
                              <ul v-if="twitterTask.type === 'tweet'">
                                <li class="text-caption">
                                  Post a Tweet using <span class="blue--text">#{{ twitterTask | _get('hashtag') }}</span
                                  >, share why you want to have this project’s primary market exposure.
                                </li>
                                <li class="text-caption">Please enter your share link post to complete task.</li>
                              </ul>
                            </div>
                            <div class="d-flex justify-end">
                              <v-btn
                                v-if="twitterTask.type === 'follow' && vm.status !== HUNTING.finished"
                                color="blue"
                                class="white--text"
                                @click="vm"
                                :disabled="vm.status === HUNTING.start"
                                elevation="0"
                              >
                                <v-icon left>mdi-twitter</v-icon>
                                Twitter hunting
                              </v-btn>
                            </div>
                          </v-container>
                        </v-sheet>
                      </v-col>

                      <v-col cols="1" class="">
                        <v-sheet rounded class="fill-height ml-3 ba-dotted">
                          <v-sheet
                            outlined
                            rounded
                            class="fill-height d-flex justify-center align-center neutral20 lighten-1"
                          >
                            <v-icon v-if="vm.status">mdi-check</v-icon>
                          </v-sheet>
                        </v-sheet>
                      </v-col>
                    </v-row>

                    <!-- TWO -->
                    <v-row dense no-gutters>
                      <v-col cols="1">
                        <v-sheet class="pb-1">
                          <v-radio-group dense hide-details class="ma-0 pa-0 text-center">
                            <v-radio></v-radio>
                          </v-radio-group>
                        </v-sheet>
                        <v-sheet class="fill-height pb-7">
                          <div class="divider"></div>
                        </v-sheet>
                      </v-col>
                      <v-col cols="10">
                        <v-sheet outlined>
                          <v-container fluid>
                            <div class="d-flex align-center">
                              <v-sheet
                                width="10"
                                height="10"
                                class="rounded-circle ba-secondary d-flex justify-center align-center mr-1"
                              >
                                <v-icon size="8" color="black">mdi-check</v-icon>
                              </v-sheet>
                              <div class="text-caption text-weight-400 line-height">Processing</div>
                            </div>
                            <div>
                              <div class="text-subtitle-2 font-weight-medium">Share a Twitter post</div>
                              <ul>
                                <li class="text-caption">
                                  Post a Tweet using #PeakyBlinder, share why you want to have this project’s primary
                                  market exposure.
                                </li>
                                <li class="text-caption">Please enter your share link post to complete task.</li>
                              </ul>
                            </div>

                            <v-sheet class="mt-4">
                              <v-row dense no-gutters>
                                <v-col cols="10">
                                  <v-sheet outlined>
                                    <v-text-field
                                      hide-details
                                      dense
                                      flat
                                      solo
                                      class="ma-0 pa-0"
                                      placeholder="https://www.waggle.network/v=gJJzlpw8fG8"
                                    ></v-text-field>
                                  </v-sheet>
                                </v-col>
                                <v-col cols="2">
                                  <v-btn
                                    elevation="0"
                                    tile
                                    color="bluePrimary"
                                    class="fill-width white--text text-none"
                                    height="100%"
                                  >
                                    Submit
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-sheet>
                          </v-container>
                        </v-sheet>
                      </v-col>
                      <v-col cols="1">
                        <v-sheet class="fill-height ml-3 ba-dotted">
                          <v-sheet outlined class="fill-height d-flex justify-center align-center neutral20 lighten-1">
                            <v-icon>mdi-check</v-icon>
                          </v-sheet>
                        </v-sheet>
                      </v-col>
                    </v-row>

                    <v-sheet class="my-7">
                      <div class="custom-dash-divider"></div>
                    </v-sheet>

                    <!-- button -->
                    <v-row dense no-gutters class="mb-8">
                      <v-col cols="12" class="text-center">
                        <v-btn elevation="0" color="bluePrimary" class="white--text"> Confirm and earn reward </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item></v-tab-item>
              <v-tab-item></v-tab-item>
            </v-tabs-items>
          </v-sheet>

          <!-- divider -->
          <v-sheet class="my-10">
            <v-divider></v-divider>
          </v-sheet>

          <v-sheet class="my-4">
            <div class="card-big-title-text font-weight-bold">Current Twitter shares</div>
          </v-sheet>
          <v-sheet>
            <v-row no-gutters dense>
              <!-- 1 -->
              <v-col cols="4" class="pr-4">
                <v-sheet outlined height="80" class="pa-4">
                  <v-row no-gutters dense>
                    <v-sheet
                      width="48"
                      height="48"
                      class="rounded-circle bluePrimary mr-4 d-flex justify-center align-center"
                    >
                      <v-icon color="white">mdi-share-all</v-icon>
                    </v-sheet>
                    <div>
                      <v-sheet class="text-subtitle-2">Total share</v-sheet>
                      <v-sheet class="text-h6 line-heightm font-weight-black">{{
                        vm.statistical.total | formatNumber
                      }}</v-sheet>
                    </div>
                  </v-row>
                </v-sheet>
              </v-col>

              <!-- 2 -->
              <v-col cols="4" class="pl-2 pr-2">
                <v-sheet outlined height="80" class="pa-4">
                  <v-row no-gutters dense>
                    <v-sheet
                      outlined
                      width="48"
                      height="48"
                      class="rounded-circle mr-4 d-flex justify-center align-center border-color"
                    >
                      <v-icon color="blue" size="25">mdi-share-all-outline</v-icon>
                    </v-sheet>
                    <div>
                      <v-sheet class="text-subtitle-2">Daily share</v-sheet>
                      <v-sheet class="text-h6 line-height font-weight-black">{{
                        vm.statistical.daily | formatNumber
                      }}</v-sheet>
                    </div>
                  </v-row>
                </v-sheet>
              </v-col>

              <!-- 3 -->
              <v-col cols="4" class="pl-4">
                <v-sheet outlined height="80" class="pa-4">
                  <v-row no-gutters dense>
                    <v-sheet
                      width="48"
                      height="48"
                      class="rounded-circle bluePrimary mr-4 d-flex justify-center align-center"
                    >
                      <v-icon color="white" size="20"> mdi-twitter </v-icon>
                    </v-sheet>
                    <div>
                      <v-sheet class="text-subtitle-2">Twitter account</v-sheet>
                      <v-sheet class="text-h6 line-height font-weight-black">{{
                        vm.statistical.twitter | formatNumber
                      }}</v-sheet>
                    </div>
                  </v-row>
                </v-sheet>
              </v-col>
            </v-row>
          </v-sheet>

          <v-sheet outlined class="mt-4">
            <v-data-table :headers="headers" :items="vm.accounts" class="elevation-0" hide-default-footer>
              <template> </template>
              <template v-slot:[`item.account`]="{ item }">
                <v-row dense no-gutters align="center" class="ma-2">
                  <v-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                  </v-avatar>
                  <div class="ml-4 font-weight-medium">{{ `@${item.account}` }}</div>
                </v-row>
              </template>
              <template v-slot:[`item.time`]="{ item }">
                <div>{{ item.time | normalizeTimeDuration }}</div>
              </template>
              <template v-slot:[`item.link`]="{ item }">
                <v-row no-gutters dense justify="end">
                  <a :href="item.link" target="_blank" class="blue--text">
                    Link<v-icon size="14" color="bluePrimary" class="ml-2">mdi-open-in-new</v-icon>
                  </a>
                </v-row>
              </template>
            </v-data-table>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
import { BountyDetailViewModel, HUNTING } from '../viewmodels/bounty-detail-viewmodel'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
  },
})
export default class BountyDetail extends Vue {
  @Provide() vm = new BountyDetailViewModel()

  @Watch('$route.params.bountyId', { immediate: true }) onIdChanged(val: string) {
    if (val) {
      this.vm.bountyIdChange(val)
    }
  }

  breadcrumbs = [
    {
      text: 'Bounty hunter',
      disabled: false,
      href: 'bounty',
    },
    {
      text: 'The Peaky Blinder',
      disabled: false,
      href: 'bounty-detail',
    },
  ]

  HUNTING = HUNTING

  items = ['Twitter task', 'Telegram task', 'Discord task']
  tab = null

  headers = [
    {
      text: '@Account',
      value: 'account',
      align: 'center',
      sortable: false,
      class: ['blue lighten-1'],
    },
    {
      text: 'Share time',
      value: 'time',
      align: 'center',
      sortable: false,
      class: ['blue lighten-1'],
    },
    {
      text: 'Share link',
      value: 'link',
      align: 'end',
      sortable: false,
      class: ['blue lighten-1'],
    },
  ]
}
</script>
<style scoped>
.divider {
  border-left: 1px solid var(--v-grey-lighten1);
  height: 100%;
  margin-left: 11px;
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
</style>

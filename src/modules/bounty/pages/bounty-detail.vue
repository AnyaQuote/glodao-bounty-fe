<template>
  <v-container>
    <v-row no-gutters dense>
      <v-col cols="12" lg="4">
        <v-sheet class="d-flex align-center mb-4">
          <v-sheet width="40" height="40" class="violet rounded-circle d-flex justify-center align-center">
            <v-icon color="white" size="18"> mdi-twitter </v-icon>
          </v-sheet>
          <div class="text-h5 ml-3">The Peaky Blinder</div>
        </v-sheet>
        <v-sheet class="mb-4">
          <v-img src="https://picsum.photos/id/11/500/300"></v-img>
        </v-sheet>
        <v-sheet class="mb-4 text-body-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s
        </v-sheet>
        <v-sheet>
          <div class="text-subtitle-1 font-weight-medium">Time to hunting</div>
          <ul>
            <li class="text-subtitle-2">From: Jan 21st 2022, 10:00 am</li>
            <li class="text-subtitle-2">To: Feb 26th 2022, 10:00 am</li>
          </ul>
        </v-sheet>
      </v-col>
      <v-col cols="12" lg="8">
        <v-sheet class="ml-lg-5">
          <v-sheet outlined>
            <v-tabs v-model="tab">
              <v-tab v-for="(item, index) in items" :key="index"> {{ item }}</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" class="">
              <v-tab-item>
                <v-row dense no-gutters justify="center">
                  <v-col cols="12" lg="10" class="mt-4">
                    <div class="text-subtitle-2">Reward for twitter task: 1000 DVT</div>
                    <div class="text-body-2">
                      Please ensure you join our Twitter channel to be eligible. Our moderators will check through all
                      submissions and take action to reward or reject.
                    </div>
                  </v-col>
                  <v-col cols="12" lg="9">
                    <v-divider class="my-4"></v-divider>

                    <!-- one -->
                    <v-row dense no-gutters class="pb-4">
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
                                outlined
                                class="rounded-circle ba-secondary d-flex justify-center align-center mr-1"
                              >
                                <v-icon size="8" color="black">mdi-check</v-icon>
                              </v-sheet>
                              <div class="text-caption text-weight-400 line-height">Completed</div>
                            </div>
                            <div>
                              <div class="text-subtitle-2 font-weight-medium">Time to hunting</div>
                              <ul>
                                <li class="text-caption">
                                  Please follow “The Peaky Blinder” Twitter page to complete this task.
                                </li>
                              </ul>
                            </div>
                            <div class="text-end mt-2">
                              <v-btn elevation="0" color="bluePrimary white--text text-caption px-3 mt-2" tile small>
                                <v-icon left dark> mdi-twitter </v-icon>
                                Twitter follow
                              </v-btn>
                            </div>
                          </v-container>
                        </v-sheet>
                      </v-col>
                      <v-col cols="1">
                        <v-sheet outlined class="fill-height ml-3 d-flex justify-center align-center">
                          <v-icon>mdi-check</v-icon>
                        </v-sheet>
                      </v-col>
                    </v-row>

                    <!-- two -->
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

                            <v-sheet class="mt-5">
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
                                    class="fill-width white--text"
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
                        <v-sheet outlined class="fill-height ml-3 d-flex justify-center align-center">
                          <v-icon>mdi-check</v-icon>
                        </v-sheet>
                      </v-col>
                    </v-row>

                    <v-sheet class="my-8">
                      <v-divider></v-divider>
                    </v-sheet>

                    <!-- button -->
                    <v-row dense no-gutters class="mb-8">
                      <v-col cols="12" class="text-center">
                        <v-btn elevation="0" color="bluePrimary" class="normal-character white--text" tile>
                          Confirm and earn reward
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item>2</v-tab-item>
              <v-tab-item>3</v-tab-item>
            </v-tabs-items>
          </v-sheet>
          <v-sheet class="my-10">
            <v-divider></v-divider>
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
import { Component, Provide, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel } from '../viewmodels/bounty-detail-viewmodel'

@Observer
@Component
export default class BountyDetail extends Vue {
  tab = null
  items = ['Twitter task', 'Telegram task', 'Discord task']

  headers = [
    {
      text: '@Account',
      value: 'account',
      align: 'center',
      sortable: false,
      class: ['bluePrimary lighten-1'],
    },
    {
      text: 'Share time',
      value: 'time',
      align: 'start',
      sortable: false,
      class: ['bluePrimary lighten-1'],
    },
    {
      text: 'Share link',
      value: 'link',
      align: 'end',
      sortable: false,
      class: ['bluePrimary lighten-1'],
    },
  ]

  @Provide() vm = new BountyDetailViewModel()
}
</script>

<style scoped>
.divider {
  border-left: 1px solid grey;
  height: 100%;
  margin-left: 11px;
  padding-top: 30px;
}

.ba-secondary {
  border: 1px;
  border-style: solid;
  border-color: var(--v-neutral20-base);
}

.line-height {
  line-height: 26px;
}

.border-color {
  border: 1px solid var(--v-bluePrimary-base);
}

.normal-character {
  text-transform: unset;
}
</style>

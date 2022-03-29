<template>
  <v-container>
    <v-row no-gutters dense>
      <!-- breadcrumbs -->
      <v-col cols="12">
        <v-sheet height="50" class="neutral15">
          <v-breadcrumbs :items="vm.breadcrumbsItems" divider=">" class="pa-0">
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item :disabled="item.disabled">
                <template v-slot:default>
                  <router-link :to="item.href">
                    <span :class="item.text === 'Bounty hunter' ? 'bluePrimary--text' : ''">{{ item.text }}</span>
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

      <!-- BOUNTY NAME -->
      <v-col cols="12">
        <v-sheet class="d-flex align-center mb-4 neutral15">
          <v-sheet width="32" height="32" class="rounded-circle d-flex justify-center align-center">
            <chain-logo :chain="vm.task | _get('chainId')" class="logo-chain" />
          </v-sheet>
          <div class="d-flex align-center ml-3 mt-1 section-big-title-text font-weight-bold">
            {{ vm.task | _get('name') }}
            <v-sheet width="10" height="10" class="rounded-circle mx-4" color="bluePrimary"></v-sheet>
            <div class="text-uppercase">
              {{ vm.task | _get('chainId') }}
            </div>
          </div>
        </v-sheet>
      </v-col>

      <!-- LEFT -->
      <v-col cols="12" md="4">
        <v-sheet class="mb-4 position-relative">
          <!-- image -->
          <v-img :src="vm.task | _get('metadata.coverImage')" class="rounded-lg"></v-img>
          <!-- status -->
          <div class="position-absolute card-status rounded-pill flex-center-box px-2 py-1">
            <v-sheet
              class="rounded-circle flex-center-box background-transparent"
              :class="vm.task | _get('status') | statusBorder"
            >
              <v-sheet
                width="10"
                height="10"
                class="rounded-circle ma-1"
                :class="vm.task | _get('status') | statusBackground"
              >
              </v-sheet>
            </v-sheet>
            <div :class="vm.task | _get('status') | statusColor" class="text-uppercase ml-2 mr-1 green--text">
              {{ vm.task | _get('status') }}
            </div>
          </div>
        </v-sheet>

        <!-- subtitle -->
        <v-sheet class="mb-4 card-subtitle-1 neutral15">
          {{ vm.task | _get('metadata.caption') }}
        </v-sheet>
        <v-sheet class="neutral15">
          <v-sheet class="d-flex transparent mb-3">
            <v-sheet class="transparent title-2">Website:</v-sheet>
            <a class="bluePrimary--text title-2 ml-3" :href="vm.task | _get('metadata.website')" target="_blank">
              {{ vm.task | _get('metadata.website') }}
            </a>
          </v-sheet>
          <v-sheet class="d-flex align-center transparent">
            <v-sheet class="transparent title-2">Social link:</v-sheet>
            <v-btn
              v-for="(value, key) in vm.taskSocialLinks"
              :key="key"
              class="bluePrimary ml-3"
              fab
              width="24"
              height="24"
              :href="value"
              target="_blank"
            >
              <v-icon color="white" dark size="16"> {{ `mdi-${key}` }}</v-icon>
            </v-btn>
          </v-sheet>
        </v-sheet>
      </v-col>

      <!-- RIGHT -->
      <v-col cols="12" md="8" class="mt-4 mt-md-0" style="background-color: var(--v-neutral15-base)">
        <v-sheet class="ml-md-5" style="background-color: var(--v-neutral-15-base)">
          <!-- LIST -->
          <v-sheet class="mb-4 neutral15">
            <v-row dense>
              <v-col cols="12" sm="4" md="4">
                <v-sheet outlined rounded class="pa-4 neutral100--bg" elevation="3">
                  <div class="card-subtitle-1">Total reward ({{ vm.rewardToken }})</div>
                  <div class="card-big-title-text font-weight-bold d-flex align-center">
                    <v-img
                      :src="require('@/assets/icons/crypto.svg')"
                      max-height="19"
                      max-width="19"
                      class="mr-1"
                    ></v-img>
                    {{ vm.rewardAmount }}
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-sheet outlined rounded class="pa-4 neutral100--bg" elevation="3">
                  <div class="card-subtitle-1">Remaining ({{ vm.rewardToken }})</div>
                  <div class="card-big-title-text font-weight-bold d-flex align-center">
                    <v-img
                      :src="require('@/assets/icons/crypto.svg')"
                      max-height="19"
                      max-width="19"
                      class="mr-1"
                    ></v-img>
                    {{ vm.remainingReward }}
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-sheet outlined rounded class="pa-4 neutral100--bg" elevation="3">
                  <div class="card-subtitle-1">Participants</div>
                  <div class="card-big-title-text font-weight-bold d-flex align-center">
                    <v-icon size="20" class="mr-1" color="bluePrimary">mdi-account-circle</v-icon>
                    {{ vm.totalParticipants }}
                  </div>
                </v-sheet>
              </v-col>
              <!-- <v-col cols="6" md="3">
                <v-sheet outlined rounded class="pa-4" elevation="3">
                  <div class="card-subtitle-1">Slot left</div>
                  <div class="card-big-title-text font-weight-bold">{{ vm.remainingSlot }}</div>
                </v-sheet>
              </v-col> -->
            </v-row>
          </v-sheet>

          <!-- COUNTDOWN -->
          <v-sheet rounded class="pa-6 mb-4 linear-background-blue-main" elevation="3">
            <!-- <v-row dense>
              <v-col cols="12">
                <div class="white--text text-uppercase" v-if="!vm.isTaskEnded">POOL ENDS IN</div>
                <div class="white--text text-uppercase" v-else-if="vm.isTaskEnded">POOL ENDED</div>
              </v-col>  
              <v-col cols="12" md="6">
                <countdown v-if="!vm.isTaskEnded" :targetDate="vm.task.endTime" />
                <div class="d-flex" v-if="vm.isTaskEnded">
                  <v-icon color="white" class="mr-3">mdi-clock-outline</v-icon>
                  <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
                    <div class="font-weight-bold">0</div>
                  </v-sheet>
                  <div class="flex-center-box mx-3 white--text">:</div>
                  <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
                    <div class="font-weight-bold">0</div>
                  </v-sheet>
                  <div class="flex-center-box mx-3 white--text">:</div>
                  <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
                    <div class="font-weight-bold">0</div>
                  </v-sheet>
                  <div class="flex-center-box mx-3 white--text">:</div>
                  <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
                    <div class="font-weight-bold">0</div>
                  </v-sheet>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <v-progress-linear
                  :value="vm.taskProgressPercentage"
                  color="white"
                  height="36"
                  class="rounded font-weight-bold"
                >
                  Progess: {{ `${vm.currentParticipant}/${vm.task.maxParticipant} ` }} ({{
                    vm.taskProgressPercentage | formatNumber(2, 0)
                  }}%)
                </v-progress-linear>
              </v-col>
            </v-row> -->

            <v-row>
              <v-col v-if="!vm.isTaskEnded">
                <v-sheet class="d-flex flex-column justify-space-between transparent" height="100%">
                  <v-sheet class="title-2 white--text text-uppercase transparent mb-3">POOL ENDS IN</v-sheet>
                  <countdown :targetDate="vm.task.endTime" />
                </v-sheet>
              </v-col>
              <v-col v-else>
                <v-sheet
                  class="d-flex justify-center align-center white text-uppercase rounded-lg bluePrimary--text"
                  width="100%"
                  height="100%"
                >
                  <v-icon color="bluePrimary" size="32">mdi-camera-control</v-icon>
                  <div class="title-1 ml-1">the hunting has ended</div>
                </v-sheet>
              </v-col>
              <v-col
                :class="{
                  'col-12': !$vuetify.breakpoint.smAndUp,
                }"
              >
                <v-sheet
                  class="d-flex flex-column justify-space-between white--text font-family-proxima transparent"
                  height="100%"
                >
                  <div class="text-uppercase title-2">
                    {{ !vm.isTaskEnded ? 'time for mission' : 'time to hunting' }}
                  </div>
                  <ul class="li-text">
                    <li>From: {{ vm.task.startTime | MMMddYYYYhhmm }}</li>
                    <li>To: {{ vm.task.endTime | MMMddYYYYhhmm }}</li>
                  </ul>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-sheet
                  class="d-flex flex-column justify-space-between align-center rounded-lg pa-5 neutral100--bg"
                  width="100%"
                  height="100%"
                >
                  <v-sheet class="d-flex mb-3 neutral100--bg" width="100%">
                    <v-sheet class="text-uppercase primary--text mr-3 neutral100--bg" height="100%">
                      priority pool
                    </v-sheet>
                    <v-chip class="bluePrimary lighten-1 primary--text font-italic" small>For GDAO stakers</v-chip>
                  </v-sheet>
                  <v-sheet class="d-flex flex-column neutral100--bg" width="100%">
                    <v-sheet class="d-flex justify-space-between neutral100--bg">
                      <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Pool reward:</v-sheet>
                      <v-sheet class="primary--text number-font neutral100--bg">
                        {{ vm.totalPriorityReward }} {{ vm.rewardToken }}
                      </v-sheet>
                    </v-sheet>
                    <v-sheet class="d-flex justify-space-between neutral100--bg">
                      <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Participants:</v-sheet>
                      <v-sheet class="primary--text number-font neutral100--bg">
                        {{ vm.currentPriorityParticipants }}/{{ vm.maxPriorityParticipants }}
                      </v-sheet>
                    </v-sheet>
                    <v-sheet class="d-flex justify-space-between neutral100--bg">
                      <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Personal reward:</v-sheet>
                      <v-sheet class="primary--text number-font neutral100--bg">
                        {{ vm.singlePriorityReward | formatNumber(2, 0) }} {{ vm.rewardToken }}
                      </v-sheet>
                    </v-sheet>
                  </v-sheet>
                </v-sheet>
              </v-col>
              <v-col>
                <v-sheet
                  class="d-flex flex-column justify-space-between align-center neutral100--bg rounded-lg pa-5"
                  width="100%"
                  height="100%"
                >
                  <v-sheet class="d-flex mb-3 neutral100--bg" width="100%">
                    <v-sheet class="text-uppercase neutral100--bg primary--text mr-3" height="100%">
                      community pool
                    </v-sheet>
                    <v-chip class="bluePrimary lighten-1 primary--text font-italic" small>For community</v-chip>
                  </v-sheet>
                  <v-sheet class="d-flex flex-column neutral100--bg" width="100%">
                    <v-sheet class="d-flex justify-space-between neutral100--bg">
                      <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Pool reward:</v-sheet>
                      <v-sheet class="primary--text number-font neutral100--bg">
                        {{ vm.totalCommunityReward }} {{ vm.rewardToken }}
                      </v-sheet>
                    </v-sheet>
                    <v-sheet class="d-flex justify-space-between neutral100--bg">
                      <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Participants:</v-sheet>
                      <v-sheet class="primary--text number-font neutral100--bg">
                        {{ vm.currentCommunityParticipants }}
                      </v-sheet>
                    </v-sheet>
                    <v-sheet class="d-flex justify-space-between neutral100--bg">
                      <v-sheet class="neutral10--text card-subtitle-1 neutral100--bg">Personal reward:</v-sheet>
                      <v-sheet class="primary--text number-font neutral100--bg">
                        Sharing pool mission
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon color="primary" size="15" v-bind="attrs" v-on="on">mdi-help-circle-outline</v-icon>
                          </template>
                          <span>Pool rewards will be divided equally among all participants</span>
                        </v-tooltip>
                      </v-sheet>
                    </v-sheet>
                  </v-sheet>
                </v-sheet>
              </v-col>
            </v-row>
          </v-sheet>

          <v-row dense no-gutters>
            <v-col cols="12">
              <wallet-sheet v-if="vm.currentWallet"></wallet-sheet>
              <v-sheet
                class="pa-4 mb-6 rounded-lg neutral100--bg redSenamatic--text font-italic text-body-2"
                elevation="3"
                v-else
              >
                You need to connect your wallet to do task
              </v-sheet>
            </v-col>
          </v-row>
          <!-- TASK -->
          <v-sheet class="rounded-lg overflow-hidden neutral100" elevation="3">
            <v-tabs v-model="tab" color="bluePrimary" class="rounded-lg neutral100 custom-tabs-bar-bounty-detail">
              <v-tab v-for="(item, index) in items" :key="index" :disabled="index !== 0" class="text-caption">
                <span class="text-caption text-none primary--text">
                  {{ item }}
                </span>
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" class="">
              <v-tab-item>
                <v-row
                  dense
                  no-gutters
                  class="neutral100--bg"
                  justify="center"
                  :class="{
                    'px-4': $vuetify.breakpoint.smAndDown,
                  }"
                >
                  <v-col cols="12" md="10" class="mt-6">
                    <div class="card-subtitle-1 font-weight-medium">
                      Reward for twitter task: {{ vm.task | _get('rewardAmount') }}
                      {{ vm.task | _get('metadata.rewardToken') }}
                    </div>
                    <div class="card-subtitle-1">
                      Please ensure you join our Twitter channel to be eligible. Our moderators will check through all
                      submissions and take action to reward or reject.
                    </div>
                    <div class="card-subtitle-1">Are you ready? Please click “Start hunting” button to start.</div>
                    <div class="text-center my-4">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <div class="unqualify-msg" v-if="!vm.isAccountAgeQualify" v-bind="attrs" v-on="on">
                            Your account does not qualify for task hunting
                          </div>
                        </template>
                        <span>Your twitter account must be older than 6 months</span>
                      </v-tooltip>
                      <div v-if="vm.status === HUNTING.start">
                        <v-btn
                          elevation
                          class="white--text text-none linear-background-blue-main"
                          @click="vm.startHunting"
                          :disabled="!vm.isAccountAgeQualify || !vm.currentWallet"
                        >
                          <v-icon left>mdi-power</v-icon>
                          Start hunting
                        </v-btn>
                      </div>
                      <hunting-status v-else />
                    </div>
                  </v-col>
                  <v-col cols="12" md="9">
                    <div class="custom-dash-divider mb-7"></div>
                    <div v-for="(twitterTask, index) in vm.displayedTwitterData" :key="index">
                      <v-row
                        dense
                        no-gutters
                        class="mb-4"
                        v-if="vm.displayedTwitterData.length > 0 && twitterTask.type !== 'retweet'"
                      >
                        <!-- TASK COL 1 -->
                        <v-col cols="1" v-if="$vuetify.breakpoint.smAndUp">
                          <v-sheet class="pb-1 neutral100">
                            <v-sheet
                              width="18"
                              height="18"
                              class="rounded-circle flex-center-box background-transparent custom-check-dot"
                            >
                              <v-sheet
                                width="10"
                                height="10"
                                class="rounded-circle"
                                :color="$vuetify.theme.dark ? 'bluePrimary' : 'black'"
                                v-if="twitterTask.finished || twitterTask.activeStep"
                              >
                              </v-sheet>
                            </v-sheet>
                          </v-sheet>
                          <v-sheet class="fill-height pb-7 neutral100">
                            <div class="divider"></div>
                          </v-sheet>
                        </v-col>
                        <!-- TASK COL 2 -->
                        <v-col :cols="$vuetify.breakpoint.smAndUp ? 10 : 12">
                          <v-sheet outlined rounded class="mini-task-container-sheet">
                            <v-container fluid>
                              <!-- title -->
                              <div class="d-flex align-center">
                                <v-sheet
                                  width="10"
                                  height="10"
                                  class="rounded-circle flex-center-box primary--border-thin mr-1"
                                  v-if="twitterTask.finished || twitterTask.activeStep"
                                >
                                  <v-icon size="8" color="primary" v-if="twitterTask.finished">mdi-check</v-icon>
                                  <v-icon size="8" color="primary" v-else-if="twitterTask.activeStep">
                                    mdi-dots-horizontal
                                  </v-icon>
                                </v-sheet>
                                <div class="text-caption text-weight-400 line-height" v-if="twitterTask.finished">
                                  Completed
                                </div>
                                <div
                                  class="text-caption text-weight-400 line-height"
                                  v-else-if="twitterTask.activeStep"
                                >
                                  Processing
                                </div>
                              </div>
                              <!-- content -->
                              <div class="mb-4">
                                <div class="text-subtitle-2 font-weight-medium">{{ twitterTask | titleTask }}</div>
                                <!-- follow -->
                                <ul v-if="twitterTask.type === 'follow'">
                                  <li class="text-caption">
                                    Please follow “{{ vm.task | _get('name') }}” Twitter page to complete this task.
                                  </li>
                                </ul>
                                <!-- weet -->
                                <ul v-if="twitterTask.type === 'tweet'">
                                  <li class="text-caption">
                                    Post a Tweet using
                                    <span class="blue--text">#{{ twitterTask | _get('hashtag') }}</span
                                    >, share why you want to have this project’s primary market exposure.
                                  </li>
                                  <li class="text-caption">Please enter your share link post to complete task.</li>
                                </ul>
                                <!-- retweet -->
                                <ul v-if="twitterTask.type === 'referral'">
                                  <li class="text-caption">Share and referral with your friend.</li>
                                  <li class="text-caption">Please enter your referral link to complete task.</li>
                                </ul>
                              </div>
                              <!-- control -->
                              <div class="text-end">
                                <v-btn
                                  v-if="twitterTask.type === 'follow' && vm.status !== HUNTING.finished"
                                  class="white--text text-none linear-background-blue-main text-caption"
                                  :disabled="vm.shouldDisableTaskProcessing || twitterTask.finished"
                                  elevation="0"
                                  @click="openFollowTwitterLink(twitterTask.link, index)"
                                  :loading="!twitterTask.finished && vm.isTaskSubmiting"
                                >
                                  <v-icon left size="14">mdi-twitter</v-icon>
                                  Twitter follow
                                </v-btn>
                                <link-submit class="mt-4" v-else :twitterTask="twitterTask" :step="index" />
                              </div>
                            </v-container>
                          </v-sheet>
                        </v-col>
                        <!-- TASK COL 3 -->
                        <v-col cols="1" class="" v-if="$vuetify.breakpoint.smAndUp">
                          <v-sheet rounded class="fill-height ml-3 ba-dotted" min-width="40">
                            <v-sheet outlined rounded class="fill-height d-flex justify-center align-center neutral100">
                              <v-icon v-if="twitterTask && twitterTask.finished">mdi-check </v-icon>
                            </v-sheet>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </div>

                    <v-sheet class="my-7">
                      <div class="custom-dash-divider"></div>
                    </v-sheet>

                    <!-- button -->
                    <v-row class="mb-8">
                      <v-col cols="12" sm="6" class="text-center">
                        <v-btn
                          elevation="0"
                          color="bluePrimary"
                          class="white--text text-none linear-background-blue-main text-caption"
                          :disabled="!vm.isPriorityPoolAvailable || !vm.isTaskProcessFinish"
                          @click="vm.applyForPriorityPool()"
                          v-if="!vm.isInPriorityPool"
                          :loading="vm.isApplyPrioritying"
                        >
                          Apply for priority pool
                        </v-btn>
                      </v-col>
                      <v-col cols="12" :sm="!vm.isInPriorityPool ? 6 : 12" class="text-center">
                        <v-btn
                          elevation="0"
                          color="bluePrimary"
                          class="white--text text-none linear-background-blue-main text-caption"
                          :disabled="vm.shouldDisableTaskProcessing || !vm.isTaskProcessFinish"
                          @click="vm.changeEarnDialog(true)"
                          :loading="vm.isTaskSubmiting"
                        >
                          Confirm to complete
                        </v-btn>
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
          <v-divider class="my-10"></v-divider>

          <v-sheet class="my-4 neutral15">
            <div class="card-big-title-text font-weight-bold">Current Twitter shares</div>
          </v-sheet>
          <v-sheet class="neutral15-background">
            <v-row>
              <!-- 1 -->
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-sheet outlined rounded height="80" class="pa-4 neutral100--bg" elevation="3">
                  <v-row no-gutters dense>
                    <v-sheet
                      width="48"
                      height="48"
                      class="rounded-circle mr-4 flex-center-box linear-background-blue-main"
                    >
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
                    <v-sheet
                      width="48"
                      height="48"
                      class="rounded-circle mr-4 flex-center-box linear-background-blue-main"
                    >
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
                    <v-sheet
                      width="48"
                      height="48"
                      class="rounded-circle mr-4 flex-center-box linear-background-blue-main"
                    >
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
        </v-sheet>
      </v-col>
    </v-row>
    <recaptcha-dialog />
    <confirm-and-earn-dialog />
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
import { BountyDetailViewModel, HUNTING } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
    'link-submit': () => import('@/modules/bounty/components/bounty-detail/link-submit.vue'),
    'recaptcha-dialog': () => import('@/modules/bounty/components/recaptcha-dialog.vue'),
    'confirm-and-earn-dialog': () => import('@/modules/bounty/components/confirm-and-earn-dialog.vue'),
    countdown: () => import('@/modules/bounty/components/countdown.vue'),
    'wallet-sheet': () => import('@/modules/bounty/components/bounty-detail/wallet-sheet.vue'),
    'hunting-status': () => import('@/modules/bounty/components/bounty-detail/hunting-status.vue'),
  },
})
export default class BountyDetail extends Vue {
  @Provide() vm = new BountyDetailViewModel()
  HUNTING = HUNTING

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
  openLink(link: string) {
    const url = link.trim()
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }
  openFollowTwitterLink(link: string, index: number) {
    this.openLink(link)
    this.vm.submitLink('twitter', '', index)
  }
  beforeDestroy() {
    this.vm.destroyReaction()
  }
}
</script>
<style scoped lang="scss">
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

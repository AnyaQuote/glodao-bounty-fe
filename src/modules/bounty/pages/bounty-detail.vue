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
      <v-col cols="12" class="d-flex justify-space-between">
        <v-sheet class="d-flex align-center mb-4 neutral15">
          <project-logo :src="vm.projectLogo" size="48"></project-logo>
          <div
            class="d-flex flex-column flex-md-row align-md-center font-weight-bold text-h4 ml-3"
            style="flex-grow: 1; line-height: 2rem"
          >
            <span>
              {{ vm.task | _get('name') }}
            </span>
            <v-sheet
              v-show="$vuetify.breakpoint.mdAndUp"
              width="10"
              height="10"
              class="rounded-circle mx-4"
              color="bluePrimary"
              v-if="vm.task.missionIndex"
            ></v-sheet>
            <span class="text-none" v-if="vm.task.missionIndex">
              <div v-if="vm.missionType === 'bounty'">
                Mission No.
                {{ vm.task | _get('missionIndex') }}
              </div>
              <div v-else-if="vm.missionType === 'learn'">
                Learning Mission No.
                {{ vm.task | _get('missionIndex') }}
              </div>
              <div v-else-if="vm.isEventMission">
                Event Mission No.
                {{ vm.task | _get('missionIndex') }}
              </div>
            </span>
          </div>
        </v-sheet>
        <div class="d-flex flex-column" v-if="vm.missionType === 'learn'">
          <v-sheet
            class="bluePrimary"
            style="padding: 1px; clip-path: polygon(7% 0, 100% 0%, 100% 100%, 7% 100%, 0% 50%)"
          >
            <v-sheet
              class="d-flex align-center bluePrimary--text text-body-1 pa-4 font-weight-600 neutral100--bg"
              style="clip-path: polygon(7% 0, 100% 0%, 100% 100%, 7% 100%, 0% 50%)"
              height="44"
            >
              <v-icon :size="$vuetify.breakpoint.xsOnly ? 20 : 24" color="bluePrimary">mdi-school</v-icon>
              <div class="ml-3">Learn to earn mission</div>
            </v-sheet>
          </v-sheet>
        </div>
      </v-col>

      <!-- LEFT -->
      <v-col cols="12" v-if="vm.isEventMission">
        <div class="d-md-flex mb-8 neutral100--bg">
          <v-sheet class="position-relative rounded-lg overflow-hidden transparent">
            <!-- image -->
            <v-img :src="vm.task | _get('metadata.coverImage')" class="rounded-lg" v-if="!vm.coverVideo"></v-img>
            <video width="100%" loop autoplay muted v-if="vm.coverVideo" style="border-radius: 8px">
              <source :src="vm.coverVideo" type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </v-sheet>

          <!-- subtitle -->
          <v-sheet class="neutral100 pa-6 pb-4 pt-4 pb-md-1 fill-height">
            <v-sheet
              class="mb-4 card-subtitle-1 neutral100"
              v-html="$options.filters._get(vm.task, 'metadata.caption')"
              v-if="vm.missionType !== 'learn'"
            >
            </v-sheet>
            <v-sheet class="neutral100" v-if="vm.missionType !== 'learn'">
              <v-sheet class="bluePrimary lighten-3 pa-3 title-2 mb-3"
                >Event time: {{ vm.task.startTime | MMMddYYYYhhmm }} -
                {{ vm.task.endTime | MMMddYYYYhhmm }}
              </v-sheet>
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
                  depressed
                >
                  <v-icon color="white" dark size="14"> {{ `fab fa-${key}` }}</v-icon>
                </v-btn>
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </div>
      </v-col>
      <!-- LEFT -->
      <v-col cols="12" md="4" v-else>
        <div>
          <v-sheet class="mb-4 position-relative rounded-lg overflow-hidden transparent">
            <!-- image -->
            <v-img :src="vm.task | _get('metadata.coverImage')" class="rounded-lg" v-if="!vm.coverVideo"></v-img>
            <video width="100%" loop autoplay muted v-if="vm.coverVideo" style="border-radius: 8px">
              <source :src="vm.coverVideo" type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </v-sheet>

          <!-- subtitle -->
          <v-sheet
            class="mb-4 card-subtitle-1 neutral15"
            v-html="$options.filters._get(vm.task, 'metadata.caption')"
            v-if="vm.missionType !== 'learn'"
          >
          </v-sheet>
          <v-sheet class="neutral15" v-if="vm.missionType !== 'learn'">
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
                depressed
              >
                <v-icon color="white" dark size="14"> {{ `fab fa-${key}` }}</v-icon>
              </v-btn>
            </v-sheet>
          </v-sheet>
        </div>
      </v-col>

      <!-- RIGHT -->
      <v-col cols="12" class="mt-4 mt-md-0" style="background-color: var(--v-neutral15-base)" v-if="vm.isEventMission">
        <div class="row d-flex justify-center">
          <v-sheet class="mb-4 neutral15 col-12">
            <v-row dense>
              <v-col cols="12" sm="3" md="3">
                <v-sheet outlined rounded class="pa-4 neutral100--bg fill-height" elevation="3">
                  <div class="card-subtitle-1">Total reward: ({{ vm.rewardToken }})</div>
                  <div class="card-big-title-text font-weight-bold d-flex align-start align-lg-center">
                    <v-img :src="vm.tokenLogo" max-height="19" max-width="19" class="mr-2"></v-img>
                    <span>{{ vm.rewardAmount | formatNumber }}</span>
                  </div>
                </v-sheet>
              </v-col>

              <v-col cols="12" sm="3" md="3">
                <v-sheet outlined rounded class="pa-4 neutral100--bg fill-height" elevation="3">
                  <div class="card-subtitle-1">Participants</div>
                  <div class="card-big-title-text font-weight-bold d-flex">
                    <v-icon size="20" class="mr-2" color="bluePrimary">mdi-account-circle</v-icon>
                    <span>{{ vm.totalParticipants }}</span>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="3" md="3">
                <v-sheet outlined rounded class="pa-4 neutral100--bg fill-height" elevation="3">
                  <div class="card-subtitle-1">Total prizes</div>
                  <div class="card-big-title-text font-weight-bold d-flex">
                    <v-icon size="20" class="mr-2" color="orange">mdi-star-circle</v-icon>
                    <span>{{ vm.maxPriorityParticipants }}</span>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="3" md="3" v-if="vm.missionType === 'referral'">
                <v-sheet outlined rounded class="pa-4 neutral100--bg fill-height" elevation="3">
                  <div class="card-subtitle-1">Your total referrals</div>
                  <div class="card-big-title-text font-weight-bold d-flex">
                    <v-icon size="20" class="mr-2" color="bluePrimary">mdi-account-supervisor-circle</v-icon>
                    <span>{{ vm.totalReferralCount }}</span>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="3" md="3" v-else-if="vm.missionType === 'active'">
                <v-sheet outlined rounded class="pa-4 neutral100--bg fill-height" elevation="3">
                  <div class="card-subtitle-1">Your completed missions</div>
                  <div class="card-big-title-text font-weight-bold d-flex">
                    <v-icon size="20" class="mr-2" color="purple">mdi-shield-check</v-icon>
                    <span>{{ vm.totalCompleteMissionCount }}</span>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="3" md="3" v-else-if="vm.missionType === 'lucky'">
                <v-sheet outlined rounded class="pa-4 neutral100--bg fill-height" elevation="3">
                  <div class="card-subtitle-1">Highest reward</div>
                  <div class="card-big-title-text font-weight-bold d-flex">
                    <v-icon size="20" class="mr-2" color="deep-orange">mdi-assistant</v-icon>
                    <span>$250</span>
                  </div>
                </v-sheet>
              </v-col>
            </v-row>
          </v-sheet>
          <v-col cols="12" md="8">
            <v-sheet style="background-color: var(--v-neutral-15-base)">
              <!-- LIST -->

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
                <v-sheet class="neutral100--bg fill-width pa-7">
                  <v-row dense no-gutters>
                    <v-col cols="12">
                      <div class="text-uppercase bluePrimary--text font-weight-bold text-body-1">
                        event task
                        <span class="primary--text text-none font-weight-regular ml-3"
                          >Do all task to join this event!</span
                        >
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div v-if="!vm.isHuntingProcessStarted && !vm.isUserTaskCompleted">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <div class="unqualify-msg" v-if="!vm.isAccountAgeQualify" v-bind="attrs" v-on="on">
                              Your account does not qualify for task hunting
                            </div>
                          </template>
                          <span>Your twitter account must be older than 3 months</span>
                        </v-tooltip>
                        <div class="d-flex mt-5">
                          <v-btn
                            elevation
                            class="white--text text-none linear-background-blue-main"
                            @click="vm.startHunting"
                            :disabled="
                              !vm.isTaskStarted ||
                              vm.isTaskEnded ||
                              !vm.isAccountAgeQualify ||
                              !vm.currentWallet ||
                              !vm.isCurrentWalletMatchRegistered ||
                              !vm.isTaskLimitAvailable
                            "
                            :loading="vm.isStartingProcess"
                            height="40"
                          >
                            <v-icon left>mdi-power</v-icon>
                            Start hunting
                          </v-btn>
                        </div>
                      </div>
                    </v-col>
                    <v-sheet class="ba-dotted neutral100--bg fill-width mt-5 border-radius-8 overflow-hidden">
                      <v-sheet class="pa-4 pa-md-6 neutral100--bg">
                        <v-col
                          cols="12"
                          class="py-0"
                          v-for="(twitterTask, index) in vm.displayedTwitterData"
                          :key="'twitter' + index"
                          :class="{
                            'px-0': $vuetify.breakpoint.xsOnly,
                          }"
                        >
                          <div class="custom-dash-divider" v-if="index !== 0"></div>
                          <twitter-mini-task :twitterTask="twitterTask" :step="index" />
                        </v-col>
                        <v-col
                          cols="12"
                          class="py-0"
                          v-for="(telegramTask, index) in vm.displayedTelegramData"
                          :key="'telegram' + index"
                          :class="{
                            'px-0': $vuetify.breakpoint.xsOnly,
                          }"
                        >
                          <div class="custom-dash-divider"></div>
                          <telegram-mini-task :telegramTask="telegramTask" :step="index" />
                        </v-col>
                        <v-col
                          cols="12"
                          class="py-0"
                          v-for="(quizTask, index) in vm.displayedQuizTaskData"
                          :key="'quiz' + index"
                          :class="{
                            'px-0': $vuetify.breakpoint.xsOnly,
                          }"
                        >
                          <div class="custom-dash-divider"></div>
                          <quiz-mini-task :task="quizTask" :step="index" />
                        </v-col>
                      </v-sheet>
                      <v-divider></v-divider>
                      <v-row class="pa-6">
                        <v-col cols="12" sm="6" class="text-center" v-if="false">
                          <v-btn
                            elevation="0"
                            color="bluePrimary"
                            class="white--text text-none linear-background-blue-main text-caption"
                            :disabled="!vm.isPriorityPoolAvailable || !vm.isValidStakeAmount"
                            @click="vm.applyForPriorityPool()"
                            :loading="vm.isApplyPrioritying"
                          >
                            Apply for priority pool
                          </v-btn>
                        </v-col>
                        <v-col cols="12" class="text-center ma-0 pa-0" v-if="vm.completeTime">
                          <v-sheet class="neutral15 fill-width pa-6 text-center">
                            <span class="blue--text font-weight-bold" v-html="vm.finishMessage"></span>
                            <div class="d-flex justify-center mt-4">
                              <v-sheet
                                class="text-body-2 pa-4 cursor-pointer"
                                outlined
                                rounded
                                style="background: transparent"
                              >
                                <a :href="vm.finishLink" class="neutral10--text font-weight-600">{{ vm.finishLink }}</a>
                              </v-sheet>
                            </div>
                          </v-sheet>
                        </v-col>
                        <v-col cols="12" class="text-center" v-if="!vm.completeTime">
                          <v-btn
                            elevation="0"
                            color="bluePrimary"
                            class="white--text text-none linear-background-blue-main text-caption"
                            :disabled="vm.shouldDisableTaskProcessing || !vm.isTaskProcessFinish"
                            @click="requestChallenge"
                            :loading="vm.isTaskSubmiting"
                          >
                            Confirm to complete
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-sheet>
                    <v-col cols="12"> </v-col>
                  </v-row>
                </v-sheet>
                <!-- </v-tab-item>
              <v-tab-item></v-tab-item>
            </v-tabs-items> -->
              </v-sheet>

              <!-- divider -->
              <!-- <v-divider class="my-10"></v-divider> -->

              <!-- <twitter-share-table /> -->
            </v-sheet>
          </v-col>
        </div>
      </v-col>
      <!-- RIGHT -->
      <v-col cols="12" md="8" class="mt-4 mt-md-0" style="background-color: var(--v-neutral15-base)" v-else>
        <v-sheet class="ml-md-5" style="background-color: var(--v-neutral-15-base)">
          <!-- LIST -->
          <v-sheet class="mb-4 neutral15" v-if="vm.missionType !== 'learn'">
            <v-row dense>
              <v-col cols="12" sm="4" md="4">
                <v-sheet outlined rounded class="pa-4 neutral100--bg fill-height" elevation="3">
                  <div class="card-subtitle-1">Total reward ({{ vm.rewardToken }})</div>
                  <div class="card-big-title-text font-weight-bold d-flex align-start align-lg-center">
                    <v-img :src="vm.tokenLogo" max-height="19" max-width="19" class="mr-2"></v-img>
                    <span>{{ vm.rewardAmount | formatNumber }}</span>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-sheet outlined rounded class="pa-4 neutral100--bg fill-height" elevation="3">
                  <div class="card-subtitle-1">Reward value (USD)</div>
                  <div class="card-big-title-text font-weight-bold d-flex align-start align-lg-center">
                    <span>
                      {{ vm.rewardAmountExchanged | usdCustom(2, 2) }}
                    </span>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-sheet outlined rounded class="pa-4 neutral100--bg fill-height" elevation="3">
                  <div class="card-subtitle-1">Participants</div>
                  <div class="card-big-title-text font-weight-bold d-flex">
                    <v-icon size="20" class="mr-2" color="bluePrimary">mdi-account-circle</v-icon>
                    <span>{{ vm.totalParticipants }}</span>
                  </div>
                </v-sheet>
              </v-col>
            </v-row>
          </v-sheet>

          <!-- COUNTDOWN -->
          <pool-type-container />

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
            <v-sheet class="neutral100--bg fill-width pa-7">
              <v-row dense no-gutters>
                <v-col cols="12">
                  <div class="text-uppercase bluePrimary--text font-weight-bold text-body-1">hunting zone</div>
                </v-col>
                <v-col cols="12">
                  <div class="text-body-2 mt-5">
                    Please ensure you join our channels to be eligible. Our moderators will check through all
                    submissions and take action to reward or reject.
                  </div>
                </v-col>
                <v-col cols="12">
                  <div v-if="!vm.isHuntingProcessStarted && !vm.isUserTaskCompleted">
                    <div class="text-body-2">Are you ready? Please click “Start hunting” button to start.</div>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <div class="unqualify-msg" v-if="!vm.isAccountAgeQualify" v-bind="attrs" v-on="on">
                          Your account does not qualify for task hunting
                        </div>
                      </template>
                      <span>Your twitter account must be older than 3 months</span>
                    </v-tooltip>
                    <div class="d-flex mt-5">
                      <v-btn
                        elevation
                        class="white--text text-none linear-background-blue-main"
                        @click="vm.startHunting"
                        :disabled="
                          !vm.isTaskStarted ||
                          vm.isTaskEnded ||
                          !vm.isAccountAgeQualify ||
                          !vm.currentWallet ||
                          !vm.isCurrentWalletMatchRegistered ||
                          !vm.isTaskLimitAvailable
                        "
                        :loading="vm.isStartingProcess"
                        height="40"
                      >
                        <v-icon left>mdi-power</v-icon>
                        Start hunting
                      </v-btn>
                    </div>
                  </div>
                  <hunting-status v-else class="mt-5" />
                </v-col>
                <v-sheet class="ba-dotted neutral100--bg fill-width mt-5 border-radius-8 overflow-hidden">
                  <v-sheet class="pa-4 pa-md-6 neutral100--bg">
                    <v-col
                      cols="12"
                      class="py-0"
                      v-for="(twitterTask, index) in vm.displayedTwitterData"
                      :key="'twitter' + index"
                      :class="{
                        'px-0': $vuetify.breakpoint.xsOnly,
                      }"
                    >
                      <div class="custom-dash-divider" v-if="index !== 0"></div>
                      <twitter-mini-task :twitterTask="twitterTask" :step="index" />
                    </v-col>
                    <v-col
                      cols="12"
                      class="py-0"
                      v-for="(telegramTask, index) in vm.displayedTelegramData"
                      :key="'telegram' + index"
                      :class="{
                        'px-0': $vuetify.breakpoint.xsOnly,
                      }"
                    >
                      <div class="custom-dash-divider"></div>
                      <telegram-mini-task :telegramTask="telegramTask" :step="index" />
                    </v-col>
                    <v-col
                      cols="12"
                      class="py-0"
                      v-for="(quizTask, index) in vm.displayedQuizTaskData"
                      :key="'quiz' + index"
                      :class="{
                        'px-0': $vuetify.breakpoint.xsOnly,
                      }"
                    >
                      <div class="custom-dash-divider"></div>
                      <quiz-mini-task :task="quizTask" :step="index" />
                    </v-col>
                    <v-col
                      cols="12"
                      class="py-0"
                      :class="{
                        'px-0': $vuetify.breakpoint.xsOnly,
                      }"
                    >
                      <div class="custom-dash-divider"></div>
                      <coming-soon-task title="Join Discord group" icon="fab fa-discord" />
                    </v-col>
                    <v-col
                      cols="12"
                      class="py-0"
                      :class="{
                        'px-0': $vuetify.breakpoint.xsOnly,
                      }"
                    >
                      <div class="custom-dash-divider"></div>
                      <coming-soon-task title="Like Facebook page" icon="fab fa-facebook" />
                    </v-col>
                  </v-sheet>
                  <v-divider></v-divider>
                  <v-row class="pa-6">
                    <v-col cols="12" sm="6" class="text-center" v-if="false">
                      <v-btn
                        elevation="0"
                        color="bluePrimary"
                        class="white--text text-none linear-background-blue-main text-caption"
                        :disabled="!vm.isPriorityPoolAvailable || !vm.isValidStakeAmount"
                        @click="vm.applyForPriorityPool()"
                        :loading="vm.isApplyPrioritying"
                      >
                        Apply for priority pool
                      </v-btn>
                    </v-col>
                    <v-col cols="12" class="text-center ma-0 pa-0" v-if="vm.completeTime">
                      <span
                        ><a class="blue--text text-caption" :href="vm.finishLink">{{ vm.finishMessage }}</a></span
                      >
                    </v-col>
                    <v-col cols="12" class="text-center">
                      <v-btn
                        elevation="0"
                        color="bluePrimary"
                        class="white--text text-none linear-background-blue-main text-caption"
                        :disabled="vm.shouldDisableTaskProcessing || !vm.isTaskProcessFinish"
                        @click="requestChallenge"
                        :loading="vm.isTaskSubmiting"
                      >
                        Confirm to complete
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-sheet>
                <v-col cols="12"> </v-col>
              </v-row>
            </v-sheet>
            <!-- </v-tab-item>
              <v-tab-item></v-tab-item>
            </v-tabs-items> -->
          </v-sheet>

          <!-- divider -->
          <!-- <v-divider class="my-10"></v-divider> -->

          <!-- <twitter-share-table /> -->
        </v-sheet>
      </v-col>
    </v-row>
    <recaptcha-dialog />
    <confirm-and-earn-dialog />
    <vue-hcaptcha
      sitekey="e5651f89-7669-4385-89da-90571faf78c0"
      size="invisible"
      ref="vueHcaptcha"
      @opened="hcaptchaOnOpen"
      @verify="hcaptchaOnVerify"
      @expired="vm.resetHCaptchaToken"
      theme="dark"
    ></vue-hcaptcha>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Ref, Vue, Watch } from 'vue-property-decorator'
import { BountyDetailViewModel, HUNTING } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'
import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
@Observer
@Component({
  components: {
    ProjectLogo: () => import('@/components/project-logo.vue'),
    'link-submit': () => import('@/modules/bounty/components/bounty-detail/link-submit.vue'),
    'recaptcha-dialog': () => import('@/modules/bounty/components/bounty-detail/recaptcha-dialog.vue'),
    'confirm-and-earn-dialog': () => import('@/modules/bounty/components/bounty-detail/confirm-and-earn-dialog.vue'),
    countdown: () => import('@/modules/bounty/components/countdown.vue'),
    'wallet-sheet': () => import('@/modules/bounty/components/bounty-detail/wallet-sheet.vue'),
    'hunting-status': () => import('@/modules/bounty/components/bounty-detail/hunting-status.vue'),
    'pool-type-container': () => import('@/modules/bounty/components/bounty-detail/pool-type-container.vue'),
    'twitter-mini-task': () => import('@/modules/bounty/components/bounty-detail/twitter-mini-task.vue'),
    'telegram-mini-task': () => import('@/modules/bounty/components/bounty-detail/telegram-mini-task.vue'),
    'quiz-mini-task': () => import('@/modules/bounty/components/bounty-detail/quiz-mini-task.vue'),
    'coming-soon-task': () => import('@/modules/bounty/components/bounty-detail/coming-soon-task.vue'),
    VueHcaptcha,
  },
})
export default class BountyDetail extends Vue {
  @Provide() vm = new BountyDetailViewModel()
  HUNTING = HUNTING
  @Ref('vueHcaptcha') vueHcaptcha: any

  loading = false

  hcaptchaOnOpen() {
    this.loading = false
    this.vm.resetHCaptchaToken()
  }

  async requestChallenge() {
    this.loading = true
    this.vueHcaptcha.hcaptcha.execute()
  }

  async hcaptchaOnVerify(token) {
    this.vm.changeEarnDialog(true, token)
  }

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

.card-status {
  top: 18px;
  left: 18px;
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0.5;
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

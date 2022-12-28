<template>
  <v-sheet class="neutral100--bg" v-if="isRightVm === true">
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
      v-for="(discordTask, index) in vm.displayedDiscordData"
      :key="'discord' + index"
      :class="{
        'px-0': $vuetify.breakpoint.xsOnly,
      }"
    >
      <div class="custom-dash-divider"></div>
      <discord-mini-task :discordTask="discordTask" :step="index" />
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
      v-for="(facebookTask, index) in vm.displayedFacebookTaskData"
      :key="'facebook' + index"
      :class="{
        'px-0': $vuetify.breakpoint.xsOnly,
      }"
    >
      <div class="custom-dash-divider"></div>
      <facebook-mini-task :facebookTask="facebookTask" :step="index" />
    </v-col>
    <v-col
      cols="12"
      class="py-0"
      v-for="(optionalTask, index) in vm.displayedOptionalTaskData"
      :key="'optional' + index"
      :class="{
        'px-0': $vuetify.breakpoint.xsOnly,
      }"
    >
      <div class="custom-dash-divider"></div>
      <optional-mini-task :task="optionalTask" :step="index" />
    </v-col>
  </v-sheet>
</template>

<script lang="ts">
import VueHcaptcha from '@hcaptcha/vue-hcaptcha'
import { Observer } from 'mobx-vue'
import { Component, Inject, Provide, Ref, Vue, Watch } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'
import { IBaseDetailViewModel } from '../../viewmodels/bounty-detail-viewmodel'
import { BountyMixViewModel } from '../../viewmodels/bounty-mix-viewmodel'

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
    'discord-mini-task': () => import('@/modules/bounty/components/bounty-detail/discord-mini-task.vue'),
    'optional-mini-task': () => import('@/modules/bounty/components/bounty-detail/optional-mini-task.vue'),
    'facebook-mini-task': () => import('@/modules/bounty/components/bounty-detail/facebook-mini-task.vue'),
    'coming-soon-task': () => import('@/modules/bounty/components/bounty-detail/coming-soon-task.vue'),
    'mission-ref-code': () => import('@/modules/bounty/components/independent-mission-ref-code.vue'),
    'quiz-simple-chart': () => import('@/modules/bounty/components/bounty-detail/learn-task/simple-chart.vue'),
    VueHcaptcha,
    'connect-metamask': () => import('@/components/connect-metamask.vue'),
  },
})
export default class SocialTaskContainer extends Vue {
  @Inject() vm!: BountyMixViewModel
  isRightVm = false

  mounted() {
    if (this.vm instanceof BountyMixViewModel) this.isRightVm = true
  }
}
</script>

<style></style>

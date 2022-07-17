<template>
  <div>
    <v-row dense no-gutters>
      <v-col cols="auto" class="mr-auto pa-2 pa-sm-3 pa-md-4">
        <task-icon-container
          type="discord"
          iconType="fab fa"
          color="purple"
          :isActive="vm.isHuntingProcessStarted && state === 0"
        />
      </v-col>
      <v-col>
        <div class="pa-2 pa-sm-4">
          <div class="text-body-1 font-weight-600">Join {{ page }} on Discord</div>
          <div class="text-caption mt-1">
            Please <a :href="discordTask.link" target="_blank" class="blue--text">join {{ page }}</a> on Discord to
            complete this task.
          </div>
        </div>
        <div
          v-if="
            $vuetify.breakpoint.smAndUp && vm.isHuntingProcessStarted && discordTask.activeStep && !discordTask.finished
          "
        >
          <div class="px-2 px-sm-3 px-md-4 mb-3 mb-md-4 d-flex justify-space-between align-center">
            <v-btn
              class="white--text text-none linear-background-blue-main text-caption"
              elevation="0"
              @click="showDialog"
            >
              Link my account
            </v-btn>
            <v-btn
              class="white--text text-none linear-background-blue-main text-caption"
              elevation="0"
              @click="submitLink"
              :loading="!discordTask.finished && vm.isTaskUpdating"
              :disabled="vm.shouldDisableTaskProcessing"
            >
              I had finished this task
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col cols="auto" class="ml-auto">
        <div class="pa-2 pa-sm-3 pa-md-4">
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle greenSenamatic--bg"
            style="padding: 1px"
            v-if="discordTask.finished"
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box">
              <v-icon size="18" color="greenSenamatic" v-if="discordTask.finished">mdi-check</v-icon>
            </v-sheet>
          </v-sheet>
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle neutral20--bg"
            style="padding: 1px"
            v-else-if="!vm.isHuntingProcessStarted"
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box"> </v-sheet>
          </v-sheet>
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle"
            :class="{
              'linear-background-blue-main': state === 0,
              'greenSenamatic--bg': state === 1,
              'neutral20--bg': state === -1,
            }"
            style="padding: 1px"
            v-else
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box">
              <v-icon size="18" color="greenSenamatic" v-if="discordTask.finished">mdi-check</v-icon>
            </v-sheet>
          </v-sheet>
        </div>
      </v-col>
      <v-col cols="12" class="mb-3">
        <div
          v-if="
            $vuetify.breakpoint.xsOnly && vm.isHuntingProcessStarted && discordTask.activeStep && !discordTask.finished
          "
        >
          <div class="d-flex justify-center align-center">
            <v-btn
              class="white--text text-none mx-2 mx-sm-4 linear-background-blue-main text-caption mt-2"
              elevation="0"
              @click="showDialog"
            >
              Link my account
            </v-btn>
            <v-btn
              class="white--text text-none mx-2 mx-sm-4 linear-background-blue-main text-caption mt-2"
              elevation="0"
              @click="submitLink"
              :loading="!discordTask.finished && vm.isTaskUpdating"
              :disabled="vm.shouldDisableTaskProcessing"
            >
              I had finished this task
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="420">
      <v-sheet class="neutral100 pa-4 text-body-2">
        <div>
          Follow these steps and you will be able to finish the task:
          <ol>
            <li>Get <span @click="openHuntingHistory" class="blue--text cursor-pointer">your referral link</span></li>
            <li>
              Chat with the
              <a :href="`https://discordapp.com/users/${discordBot}`" target="_blank" class="blue--text"
                >GloDAO Mission Bot</a
              >
              your referral link
            </li>
            <li>Chat something in the {{ page }} Server</li>
          </ol>
        </div>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'
import { get } from 'lodash-es'
import { authStore } from '@/stores/auth-store'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
    'task-icon-container': () => import('@/modules/bounty/components/bounty-detail/task-icon-container.vue'),
  },
})
export default class DiscordJoinServerTask extends Vue {
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) discordTask!: any
  @Prop({ required: true }) step!: number
  type = get(this.discordTask, 'type', '')
  page = get(this.discordTask, 'page', '')
  title = ''
  dialog = false

  telegramBot = process.env.VUE_APP_TELEGRAM_BOT
  discordBot = process.env.VUE_APP_DISCORD_BOT

  referralLink = `https://app.glodao.io/bounty?ref=${authStore.hunterReferralCode}`
  referralCode = authStore.hunterReferralCode

  openBotLink() {
    window.open(`https://t.me/${this.telegramBot}?start=${this.referralCode}`, '_blank')
  }

  openHuntingHistory() {
    let routeData = this.$router.resolve({ name: 'HuntingHistory' })
    window.open(routeData.href, '_blank')
  }

  showDialog() {
    this.dialog = true
  }

  openJoinTelegramLink() {
    this.openLink(get(this.discordTask, 'link', ''))
  }
  openLink(link: string) {
    const url = link.trim()
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }
  submitLink() {
    this.vm.submitLink('discord', '', this.step)
  }

  get state() {
    if (this.vm.isUserTaskCompleted || this.vm.isTaskProcessFinish) return 1
    if (this.vm.isHuntingProcessStarted && this.discordTask.activeStep) return 0
    else if (this.discordTask.finished) return 1
    else return -1
  }
}
</script>
<style scoped>
.greenSenamatic--bg {
  background: var(--v-greenSenamatic-base);
}
.neutral20--bg {
  background: var(--v-neutral20-base);
}
.v-btn--disabled {
  background-image: none !important;
}
</style>

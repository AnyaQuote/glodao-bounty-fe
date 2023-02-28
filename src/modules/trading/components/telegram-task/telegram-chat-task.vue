<template>
  <v-card class="mb-6 neutral100" elevation="0" outlined rounded="lg">
    <v-card-text>
      <v-row align="center">
        <v-col cols="1">
          <v-card
            height="60px"
            width="60px"
            outlined
            elevation="0"
            class="text-h5 white--text font-weight-bold d-flex justify-center align-center"
            :class="!data.currentApplyState.finished ? 'background-blue-diversity' : 'greenSenamatic--bg'"
          >
            <span v-if="!data.currentApplyState.finished">
              {{ data.index }}
            </span>
            <v-icon x-large color="white" v-else> mdi-checkbox-marked-circle-outline </v-icon>
          </v-card>
        </v-col>
        <v-col class="col">
          <div class="font-weight-bold neutral0--text text-h5 mb-2">Follow {{ data.missionInformation.page }}</div>
          <div class="text-subtitle-1">
            Please
            <a :href="data.missionInformation.link" target="_blank" class="blue--text">
              chat in {{ data.missionInformation.page }}
            </a>
            to complete this task
          </div>
        </v-col>
        <v-col class="text-right col-auto" v-if="data.masterController.missionStateController.isMissionProgressAble">
          <v-btn
            large
            v-if="data.link"
            class="text-none rounded-lg font-weight-bold text-subtitle-1 mx-2 py-6"
            depressed
            outlined
          >
            <span class="truncate-text">
              {{ data.link }}
            </span>
            <v-icon right>mdi-content-copy</v-icon>
          </v-btn>
          <v-btn
            large
            v-if="!data.currentApplyState.finished"
            class="blue-diversity--text rounded-lg text-none font-weight-bold py-6"
            :class="{ 'mx-2': !data.link }"
            outlined
            depressed
            @click="verify"
            :loading="data.masterController.taskLoading"
          >
            Verify
          </v-btn>
          <v-btn
            large
            v-if="!data.link && !data.currentApplyState.finished"
            class="linear-background-blue-main white--text rounded-lg text-none font-weight-bold py-6"
            outlined
            depressed
            @click="openLink(data.missionInformation.link)"
          >
            Follow
          </v-btn>
          <span v-if="data.currentApplyState.finished" class="neutral0--text text-subtitle-1 font-weight-bold">
            Completed
          </span>
        </v-col>
      </v-row>
    </v-card-text>
    <div class="text-center text-decoration-underline font-italic text-caption cursor-pointer" @click="openBotLink">
      I have join {{ data.missionInformation.page }} on Telegram but can't finish the task?
    </div>
  </v-card>
</template>

<script lang="ts">
import { authStore } from '@/stores/auth-store'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { TelegramController } from '../../controllers/telegram-controller'

@Component
export default class TelegramFollowTask extends Vue {
  @Prop({ required: true }) data!: TelegramController
  dialog = false

  telegramBot = process.env.VUE_APP_TELEGRAM_BOT

  referralLink = `https://app.glodao.io/bounty?ref=${authStore.hunterReferralCode}`
  referralCode = authStore.hunterReferralCode

  verify() {
    this.data.submit('')
  }
  openLink(link: string) {
    const url = link.trim()
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }
  openBotLink() {
    window.open(`https://t.me/${this.telegramBot}?start=${this.referralCode}`, '_blank')
  }
}
</script>

<style scoped>
.greenSenamatic--bg {
  background: var(--v-greenSenamatic-base);
}
.truncate-text {
  white-space: nowrap;
  width: 90px;
  overflow: hidden;
  text-overflow: clip;
}
</style>

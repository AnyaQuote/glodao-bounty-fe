<template>
  <div class="mb-10">
    <v-card elevation="0" class="neutral100" outlined rounded="lg">
      <v-card-text>
        <v-row>
          <v-col cols="1">
            <v-card
              outlined
              height="60px"
              width="60px"
              rounded="lg"
              class="pa-4 white--text font-weight-bold text-h5 d-flex justify-center align-center"
              :class="!data.currentApplyState.finished ? 'background-blue-diversity' : 'greenSenamatic--bg'"
            >
              <span v-if="!data.currentApplyState.finished">{{ data.index }} </span>
              <v-icon x-large color="white" v-else>mdi-checkbox-marked-circle-outline </v-icon></v-card
            >
          </v-col>
          <v-col cols="9">
            <div class="text-h5 font-weight-bold">Quote a Twitter post</div>
            <div class="mt-2">
              Quote <a @click="openLink(data.missionInformation.link)" class="font-italic blue--text">tweet</a> from "{{
                data.missionInformation.page
              }}"<span v-if="content">
                with content: <span class="blue--text">"{{ content }}"</span></span
              >
              <span v-else
                ><span v-if="hashtags.length > 0">
                  using<span v-for="(tag, index) in hashtags" :key="index" class="blue--text"
                    >&nbsp;#{{ tag }}</span
                  ></span
                >
                <span v-if="mentions.length > 0"
                  >, tag<span v-for="user in mentions" :key="user" class="blue--text">&nbsp;@{{ user }}</span></span
                ></span
              >, share why you want to have this project’s primary market exposure. (At least
              {{ TWEET_MIN_WORDS_COUNT }} words)
            </div>
          </v-col>
          <v-col cols="2" class="text-right" v-if="data.masterController.missionStateController.isMissionProgressAble">
            <v-btn
              v-if="!data.currentApplyState.finished"
              large
              class="linear-background-blue-main white--text text-none rounded-lg py-6 font-weight-bold"
              depressed
              @click="openLink(data.missionInformation.link)"
            >
              Start
            </v-btn>

            <span v-else class="neutral0--text text-subtitle-1 font-weight-bold"> Completed </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      elevation="0"
      outlined
      rounded="lg"
      class="mt-3 neutral100"
      v-if="data.masterController.missionStateController.isMissionProgressAble"
    >
      <v-card-text class="d-flex justify-space-between align-center">
        <v-text-field
          rounded
          dense
          v-if="!data.currentApplyState.finished"
          placeholder="Enter your link here"
          hide-details="auto"
          :value="value"
          @input="onValueChange"
        >
        </v-text-field>
        <div v-else class="blue-diversity--text">{{ data.currentApplyState.link }}</div>
        <v-btn
          text
          v-if="!data.currentApplyState.finished"
          class="blue-diversity--text font-weight-bold text-subtitle-1 text-none"
          @click="verify"
          :loading="data.masterController.taskLoading"
        >
          Verify
        </v-btn>

        <div v-else class="neutral0--text font-weight-bold text-subtitle-1">Verified</div></v-card-text
      >
    </v-card>
    <div v-if="isError" class="unqualify-msg mt-2">Invalid link. Please check and retry!</div>
  </div>
</template>

<script lang="ts">
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { TWEET_MIN_WORDS_COUNT } from '@/constants'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { TwitterController } from '../../controllers/twitter-controller'
import { get } from 'lodash-es'

@Component
export default class TwiterTweetCard extends Vue {
  TWEET_MIN_WORDS_COUNT = TWEET_MIN_WORDS_COUNT

  @Prop({ required: true }) data!: TwitterController

  value = get(this.data, 'currentApplyState.link', '')
  hashtags = get(this.data, 'missionInformation.hashtag', [])
  mentions = get(this.data, 'missionInformation.mentions', [])
  content = get(this.data, 'missionInformation.content', '')
  isError = false

  onValueChange(value: string) {
    this.value = value
  }

  verify() {
    this.isError = false
    if (!this.value.trim()) snackController.error('Link cannot be empty')
    else {
      this.data.submit(this.value)
    }
  }
  openLink(link: string) {
    const url = link.trim()
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }
}
</script>

<style scoped>
.greenSenamatic--bg {
  background: var(--v-greenSenamatic-base);
}
.unqualify-msg {
  color: var(--v-redSenamatic-base);
  font-size: 12px;
}
</style>

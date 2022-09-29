<template>
  <div>
    <v-row dense no-gutters>
      <v-col cols="auto" class="mr-auto pa-2 pa-sm-3 pa-md-4">
        <task-icon-container type="twitter" :isActive="vm.isHuntingProcessStarted && state === 0" />
      </v-col>
      <v-col>
        <div class="pa-2 pa-sm-4">
          <div class="text-body-1 font-weight-600">Retweet from {{ page }}</div>
          <div class="text-caption mt-1">
            Please retweet <a @click="openLink(twitterTask.link)" class="font-italic blue--text"></a> to complete this
            task.
          </div>
        </div>
        <div
          class="px-2 px-sm-3 px-md-4 mb-3 mb-md-4"
          v-if="
            $vuetify.breakpoint.smAndUp && vm.isHuntingProcessStarted && twitterTask.activeStep && !twitterTask.finished
          "
        >
          <div class="d-flex row justify-center" v-if="twitterTask.embedLink">
            <embed-tweet :link="twitterTask.embedLink" class="col-10" />
          </div>
          <v-btn
            class="white--text text-none linear-background-blue-main text-caption"
            elevation="0"
            @click="openFollowTwitterLink"
            :loading="!twitterTask.finished && vm.isTaskUpdating"
            :disabled="vm.shouldDisableTaskProcessing"
          >
            <v-icon left size="14">mdi-twitter</v-icon>
            I have retweeted the tweet
          </v-btn>
        </div>
      </v-col>
      <v-col cols="auto" class="ml-auto">
        <div class="pa-2 pa-sm-3 pa-md-4">
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle greenSenamatic--bg"
            style="padding: 1px"
            v-if="twitterTask.finished"
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box">
              <v-icon size="18" color="greenSenamatic" v-if="twitterTask.finished">mdi-check</v-icon>
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
              <v-icon size="18" color="greenSenamatic" v-if="twitterTask.finished">mdi-check</v-icon>
            </v-sheet>
          </v-sheet>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="mb-3"
        v-if="
          $vuetify.breakpoint.xsOnly && vm.isHuntingProcessStarted && twitterTask.activeStep && !twitterTask.finished
        "
      >
        <div class="d-flex row justify-center" v-if="twitterTask.embedLink">
          <embed-tweet :link="twitterTask.embedLink" class="col-10" />
        </div>
        <v-btn
          class="white--text text-none mx-2 mx-sm-4 linear-background-blue-main text-caption mt-2"
          elevation="0"
          @click="openFollowTwitterLink"
          :loading="!twitterTask.finished && vm.isTaskUpdating"
          :disabled="vm.shouldDisableTaskProcessing"
        >
          <v-icon left size="14">mdi-twitter</v-icon>
          I have retweeted the tweet
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'
import { get } from 'lodash-es'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
    'task-icon-container': () => import('@/modules/bounty/components/bounty-detail/task-icon-container.vue'),
  },
})
export default class RetweetTask extends Vue {
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) twitterTask!: any
  @Prop({ required: true }) step!: number
  type = get(this.twitterTask, 'type', '')
  page = get(this.twitterTask, 'page', '')
  title = ''

  openFollowTwitterLink() {
    // this.openLink(get(this.twitterTask, 'link', ''))
    this.vm.submitLink('twitter', '', this.step)
  }
  openLink(link: string) {
    const url = link.trim()
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }

  get state() {
    if (this.vm.isUserTaskCompleted || this.vm.isTaskProcessFinish) return 1
    if (this.vm.isHuntingProcessStarted && this.twitterTask.activeStep) return 0
    else if (this.twitterTask.finished) return 1
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

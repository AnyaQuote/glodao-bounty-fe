<template>
  <div>
    <v-row dense no-gutters>
      <v-col cols="auto" class="mr-auto pa-2 pa-sm-3 pa-md-4">
        <task-icon-container type="web" :color="'purple'" :isActive="vm.isHuntingProcessStarted && state === 0" />
      </v-col>
      <v-col>
        <div class="pa-2 pa-sm-4">
          <div class="text-body-1 font-weight-600">KYC</div>
          <div class="text-caption mt-1" style="word-break: break-word">
            Complete KYC on <a href="https://remitano.net/home/vn" class="blue--text cursor-pointer">Remitano</a> then
            paste your Reminato's referral link here
          </div>
        </div>
        <div
          class="px-2 px-sm-3 px-md-4 mb-3 mb-md-4"
          v-if="vm.isHuntingProcessStarted && task.activeStep && !task.finished"
        >
          <v-sheet class="neutral100" v-show="$vuetify.breakpoint.smAndUp">
            <v-row dense no-gutters>
              <v-col cols="9" sm="10">
                <v-sheet outlined class="rounded rounded-r-0">
                  <v-text-field
                    hide-details
                    dense
                    flat
                    solo
                    class="ma-0 pa-0 text-caption neutral100 link-submit-custom-input"
                    :placeholder="task.stepLink || 'https://remitano.net/home/vn/join/4978870'"
                    :value="value"
                    @input="onValueChange"
                  ></v-text-field>
                </v-sheet>
              </v-col>
              <v-col cols="3" sm="2">
                <v-btn
                  elevation="0"
                  tile
                  class="fill-width white--text text-none linear-background-blue-main text-caption rounded rounded-l-0"
                  height="100%"
                  @click="submitLink"
                  :loading="!task.finished && vm.isTaskUpdating"
                  :disabled="vm.shouldDisableTaskProcessing"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </div>
      </v-col>
      <v-col cols="auto" class="ml-auto">
        <div class="pa-2 pa-sm-3 pa-md-4">
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle greenSenamatic--bg"
            style="padding: 1px"
            v-if="task.finished"
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box">
              <v-icon size="18" color="greenSenamatic" v-if="task.finished">mdi-check</v-icon>
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
              <v-icon size="18" color="greenSenamatic" v-if="task.finished">mdi-check</v-icon>
            </v-sheet>
          </v-sheet>
        </div>
      </v-col>
      <v-col
        cols="12"
        class="mb-3"
        v-show="$vuetify.breakpoint.xsOnly"
        v-if="vm.isHuntingProcessStarted && task.activeStep && !task.finished"
      >
        <v-sheet class="neutral100 px-2 px-sm-4">
          <v-row dense no-gutters>
            <v-col cols="9" sm="10">
              <v-sheet outlined class="rounded rounded-r-0">
                <v-text-field
                  hide-details
                  dense
                  flat
                  solo
                  class="ma-0 pa-0 text-caption neutral100 link-submit-custom-input"
                  :placeholder="task.stepLink || 'https://remitano.net/home/vn/join/4978870'"
                  :value="value"
                  @input="onValueChange"
                ></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="3" sm="2">
              <v-btn
                elevation="0"
                tile
                class="fill-width white--text text-none linear-background-blue-main text-caption rounded rounded-l-0"
                height="100%"
                @click="submitLink"
                :loading="!task.finished && vm.isTaskUpdating"
                :disabled="vm.shouldDisableTaskProcessing"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { TWEET_MIN_WORDS_COUNT } from '@/constants'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'
import { get } from 'lodash-es'
import { Observer } from 'mobx-vue'
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
    'task-icon-container': () => import('@/modules/bounty/components/bounty-detail/task-icon-container.vue'),
  },
})
export default class OptionalTask extends Vue {
  TWEET_MIN_WORDS_COUNT = TWEET_MIN_WORDS_COUNT
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) task!: any
  @Prop({ required: true }) step!: number
  type = get(this.task, 'type', '')
  value = get(this.task, 'stepLink', '')
  hashtags = get(this.task, 'hashtag', [])
  content = get(this.task, 'content', '')
  mentions = get(this.task, 'mentions', [])

  title = ''

  onValueChange(value: string) {
    this.value = value
  }

  openLink(link: string) {
    const url = link.trim()
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }

  submitLink() {
    if (!this.value.trim()) snackController.error('Link cannot be empty')
    else this.vm.submitLink('optional', this.value, this.step)
  }

  get state() {
    if (this.vm.isUserTaskCompleted || this.vm.isTaskProcessFinish) return 1
    if (this.vm.isHuntingProcessStarted && this.task.activeStep) return 0
    else if (this.task.finished) return 1
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

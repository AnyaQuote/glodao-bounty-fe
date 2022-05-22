<template>
  <div>
    <v-row dense no-gutters>
      <v-col class="pa-2 pa-sm-3 pa-md-4 col-auto">
        <task-icon-container type="twitter" :isActive="vm.isHuntingProcessStarted && state === 0" />
      </v-col>
      <v-col class="col">
        <div class="pa-2 pa-sm-4">
          <div class="text-body-1 font-weight-600">Share your result</div>
          <div class="text-caption mt-1">
            Please <span class="blue--text cursor-pointer" @click="shareOnTwitter">share your result</span> with the
            Twitter community
          </div>
        </div>
        <div
          class="px-2 px-sm-3 px-md-4 mb-3 mb-md-4 d-flex"
          v-if="vm.isHuntingProcessStarted && task.activeStep && !task.finished"
        >
          <v-btn
            depressed
            class="white--text linear-background-blue-main mr-6 text-capitalize"
            height="40"
            @click="shareOnTwitter"
            v-show="$vuetify.breakpoint.smAndUp"
            >Tweet</v-btn
          >
          <v-sheet class="neutral100 fill-width" v-show="$vuetify.breakpoint.smAndUp">
            <v-row dense no-gutters>
              <v-col cols="9" sm="10">
                <v-sheet outlined class="rounded rounded-r-0">
                  <v-text-field
                    hide-details
                    dense
                    flat
                    solo
                    class="ma-0 pa-0 text-caption neutral100 link-submit-custom-input"
                    :placeholder="task.stepLink || 'https://twitter.com/CyberKDev/status/1505764152094035972'"
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
                  :loading="!task.finished && vm.isTaskUpdating"
                  :disabled="vm.shouldDisableTaskProcessing"
                  @click="submitLink"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </div>
      </v-col>
      <v-col class="col-auto">
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
            class="rounded-circle linear-background-blue-main"
            style="padding: 1px"
            :class="{
              'linear-background-blue-main': state === 0,
              'greenSenamatic--bg': state === 1,
              'neutral20--bg': state === -1,
            }"
            v-else
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box">
              <v-icon size="18" color="greenSenamatic" v-if="task.finished">mdi-check</v-icon>
            </v-sheet>
          </v-sheet>
        </div>
      </v-col>
      <v-col cols="12" class="mb-3">
        <div
          class="px-2 px-sm-3 px-md-4 pr-6 mb-3 mb-md-4 border-radius-8 position-relative"
          v-if="$vuetify.breakpoint.xsOnly && vm.isHuntingProcessStarted && task.activeStep && !task.finished"
          style="background-size: cover"
        >
          <v-btn
            depressed
            class="white--text linear-background-blue-main text-capitalize mb-4"
            height="40"
            @click="shareOnTwitter"
            >Tweet</v-btn
          >
          <v-sheet class="neutral100 fill-width" v-show="!$vuetify.breakpoint.smAndUp">
            <v-row dense no-gutters>
              <v-col cols="9" sm="10">
                <v-sheet outlined class="rounded rounded-r-0">
                  <v-text-field
                    hide-details
                    dense
                    flat
                    solo
                    class="ma-0 pa-0 text-caption neutral100 link-submit-custom-input"
                    :placeholder="task.stepLink || 'https://twitter.com/CyberKDev/status/1505764152094035972'"
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
                  :loading="!task.finished && vm.isTaskUpdating"
                  :disabled="vm.shouldDisableTaskProcessing"
                  @click="submitLink"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'
import { get } from 'lodash-es'
import { apiService } from '@/services/api-service'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { authStore } from '@/stores/auth-store'
import { IReactionDisposer, reaction } from 'mobx'

@Observer
@Component({
  components: {
    'task-icon-container': () => import('@/modules/bounty/components/bounty-detail/task-icon-container.vue'),
  },
})
export default class ShareRecordTask extends Vue {
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) task!: any
  @Prop({ required: true }) step!: number
  quiz: any = {}
  type = get(this.task, 'type', '')
  value = get(this.task, 'stepLink', '')

  page = get(this.task, 'page', '')
  title = ''
  revalidateLoading = false
  quizRecord: any = {}
  _disposers: IReactionDisposer[] = []

  shareOnTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=Learn and Earn on Glodao&hashtags=glodao&url=https://app.glodao.io/quiz-record/${this.quizRecord.id}`,
      '_blank'
    )
  }
  onValueChange(value: string) {
    this.value = value
  }

  submitLink() {
    if (!this.value.trim()) snackController.error('Link cannot be empty')
    else
      this.vm.submitQuizRecordShareLink('quizShare', this.value, this.step, { quizId: this.quiz.id, link: this.value })
  }

  mounted() {
    apiService.quizzes
      .findOne(this.task.quizId)
      .then((res) => {
        this.quiz = res
      })
      .catch((err) => {
        snackController.error(err)
      })

    apiService.quizAnswerRecords.find({ ID: `${this.task.quizId}_${authStore.hunterId}` }).then((res) => {
      if (res.length > 0) this.quizRecord = res[0]
    })
    this._disposers = [
      reaction(
        () => this.vm.apply,
        () => {
          apiService.quizAnswerRecords.find({ ID: `${this.task.quizId}_${authStore.hunterId}` }).then((res) => {
            if (res.length > 0) this.quizRecord = res[0]
          })
        }
      ),
    ]
  }

  get coverImage() {
    return get(this.quiz, 'metadata.coverImage', '')
  }

  get state() {
    if (this.vm.isUserTaskCompleted || this.vm.isTaskProcessFinish) return 1
    if (this.vm.isHuntingProcessStarted && this.task.activeStep) return 0
    else if (this.task.finished) return 1
    else return -1
  }

  beforeDestroy() {
    this._disposers.forEach((d) => d())
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
.black-cover-layer {
  opacity: 0.3;
  background: black;
  top: 0;
  left: 0;
}
</style>

<template>
  <v-dialog v-model="vm.quizReviewDialog" max-width="1090" class="overflow-hidden position-relative" persistent>
    <div class="d-flex close-icon justify-end col-auto">
      <v-sheet class="white">
        <v-icon @click="vm.changeQuizReviewDialog(false)" color="black">mdi-window-close</v-icon>
      </v-sheet>
    </div>
    <div>
      <v-sheet
        class="neutral100--bg blue lighten-3 pa-6 pr-0 d-flex justify-space-between bluePrimary--text border-radius-8 rounded-b-0"
        :class="{
          'text-h5': $vuetify.breakpoint.smAndUp,
          'text-body-1': $vuetify.breakpoint.xsOnly,
        }"
      >
        <div class="font-weight-bold d-flex align-center">
          <project-logo :src="vm.projectLogo" :size="$vuetify.breakpoint.xsOnly ? 24 : 48" class="mr-3"></project-logo>
          <div
            class="align-center"
            :class="{
              'd-flex': $vuetify.breakpoint.smAndUp,
            }"
          >
            <div>{{ vm.task | _get('name', 'TBA') }}</div>
          </div>
        </div>
        <!-- <v-sheet
          class="d-flex align-center bluePrimary--text text-body-1 pa-4 font-weight-600 neutral100--bg"
          style="clip-path: polygon(7% 0, 100% 0%, 100% 100%, 7% 100%, 0% 50%)"
          height="56"
        >
          <v-icon :size="$vuetify.breakpoint.xsOnly ? 20 : 24" color="bluePrimary">mdi-school</v-icon>
          <div class="ml-3">{{ vm.answerCount }}/{{ vm.questionList.length }} answers</div>
        </v-sheet> -->
      </v-sheet>
      <div class="neutral100--bg pt-6">
        <v-sheet
          class="mx-6 pa-7 success-msg-bg d-flex align-center justify-space-between rounded"
          :class="{
            'flex-column': $vuetify.breakpoint.xsOnly,
          }"
          v-if="isQuizCorrect"
        >
          <div>
            <v-icon size="80" color="greenSenamatic">mdi-emoticon-excited-outline</v-icon>
          </div>
          <div>
            <div class="font-weight-bold text-h5">Congratulations</div>
            <div>
              This mission has success. You have {{ correctAnswerCount }}/{{ vm.quizReviewList.length }} correct
              answers.
            </div>
          </div>
          <v-btn class="linear-background-blue-main white--text mt-sm-0 mt-4" depressed @click="shareOnTwitter">
            Tweet
          </v-btn>
        </v-sheet>
        <v-sheet
          class="mx-6 pa-7 neutral20 d-flex align-center justify-space-between rounded"
          :class="{
            'flex-column': $vuetify.breakpoint.xsOnly,
          }"
          v-if="!isQuizCorrect"
        >
          <div>
            <v-icon size="80">mdi-emoticon-sad-outline</v-icon>
          </div>
          <div>
            <div class="font-weight-bold text-h5">Try again once you are ready</div>
            <div>
              This mission has failed. You have only {{ correctAnswerCount }}/{{ vm.quizReviewList.length }} correct
              answers.
            </div>
          </div>
          <v-btn
            class="linear-background-blue-main white--text mt-sm-0 mt-4"
            depressed
            @click="restartQuizProcess"
            :loading="restartQuizLoading"
          >
            try again
          </v-btn>
        </v-sheet>
      </div>
      <div v-for="(questionDataObj, index) in vm.quizReviewList" :key="index">
        <v-sheet class="pt-10 neutral100--bg d-flex justify-center" style="padding-left: 5%; padding-right: 5%">
          <v-sheet :max-width="$vuetify.breakpoint.mdAndUp ? '90%' : '95%'" class="neutral100--bg" min-width="90%">
            <div class="text-md-h5 text-h6 font-weight-bold">
              {{ questionDataObj.question }}
            </div>

            <v-radio-group v-model="questionDataObj.answer" class="mt-0">
              <v-radio
                v-for="option in questionDataObj.data"
                class="mt-5 events-disabled"
                :value="option.value"
                :key="option.value + option.text"
                :color="questionDataObj.isCorrect ? 'success' : 'error'"
              >
                <template v-slot:label>
                  <div class="neutral10--text">{{ option.text }}{{ questionDataObj.isCorrect }}</div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-sheet>
        </v-sheet>
      </div>

      <v-divider></v-divider>
      <div class="d-flex justify-space-between neutral100--bg pa-4 flex-column flex-sm-row">
        <v-btn
          class="text-uppercase d-flex align-center background-transparent bluePrimary--text"
          depressed
          @click="backToTask"
        >
          <v-icon left>mdi-arrow-left</v-icon>
          back to mission
        </v-btn>

        <v-btn
          class="text-uppercase d-flex align-center background-transparent bluePrimary--text"
          depressed
          v-if="!isQuizCorrect"
          @click="restartQuizProcess"
          :loading="restartQuizLoading"
        >
          try again
        </v-btn>
        <v-btn
          class="text-uppercase d-flex align-center background-transparent bluePrimary--text"
          depressed
          v-if="isQuizCorrect"
          @click="shareOnTwitter"
        >
          Share on Twitter
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Inject } from 'vue-property-decorator'
import * as _ from 'lodash-es'
import { BountyLearnViewModel } from '@/modules/bounty/viewmodels/bounty-learn-viewmodel'
import { reaction } from 'mobx'
import { promiseHelper } from '@/helpers/promise-helper'

@Observer
@Component({
  components: {
    'project-logo': () => import('@/components/project-logo.vue'),
  },
})
export default class QuizReviewDialog extends Vue {
  @Inject() vm!: BountyLearnViewModel

  _disposers: any[] = []
  inCorrectAnswerCount = 0
  restartQuizLoading = false
  passingCriteria = 1
  questionsPerQuiz = 10

  mounted() {
    this._disposers = [
      reaction(
        () => this.vm.quizReviewList,
        () => {
          this.inCorrectAnswerCount = this.vm.quizReviewList.filter((x) => !x.isCorrect).length
          this.passingCriteria = this.vm.quizPassingCriteria
          this.questionsPerQuiz = this.vm.questionsPerQuiz
        }
      ),
    ]
  }

  get isQuizCorrect() {
    return (
      this.questionsPerQuiz - this.inCorrectAnswerCount >= this.passingCriteriaByQuestions ||
      this.inCorrectAnswerCount === 0
    )
  }

  get correctAnswerCount() {
    return this.questionsPerQuiz - this.inCorrectAnswerCount
  }

  get passingCriteriaByQuestions() {
    return _.ceil(this.questionsPerQuiz * this.passingCriteria)
  }

  shareOnTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=Learn and Earn on Glodao&hashtags=glodao&url=https://app.glodao.io/quiz-record/${this.vm.quizRecord.id}`,
      '_blank'
    )
  }

  backToTask() {
    this.$router.push(`/bounty/${this.vm.taskId}`)
  }

  restartQuizProcess() {
    this.restartQuizLoading = true
    promiseHelper
      .delay(1000)
      .then(() => {
        this.vm.reset()
        this.vm.changeQuizReviewDialog(false)
        this.vm.changeQuizAnswerDialog(true)
      })
      .finally(() => {
        this.restartQuizLoading = false
      })
  }

  beforeDestroy() {
    this._disposers.forEach((d) => d())
  }
}
</script>

<style scoped lang="scss">
.close-icon {
  position: absolute;
  top: 0;
  right: 0;
}
.all-aspect-padding-lg {
  padding: 90px 60px;
}
.success-msg-bg {
  background: rgba(30, 185, 101, 0.2);
}
.v-btn--disabled {
  background-image: none !important;
}
</style>

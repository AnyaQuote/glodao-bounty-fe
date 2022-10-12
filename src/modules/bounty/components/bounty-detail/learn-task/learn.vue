<template>
  <div>
    <v-row dense no-gutters>
      <v-col class="pa-2 pa-sm-3 pa-md-4 col-auto">
        <task-icon-container type="school" :isActive="vm.isHuntingProcessStarted && task.activeStep" color="purple" />
      </v-col>
      <v-col class="col">
        <div class="pa-2 pa-sm-4">
          <div class="text-body-1 font-weight-600">Explore {{ vm.task.name }}</div>
          <div class="text-caption mt-1">Learn about project and answer our question to complete task.</div>
          <a
            class="text-caption mt-1 mb-0 blue--text font-italic"
            @click="goToQuizDetailScreen"
            v-if="task.finished && canRepeat"
          >
            Redo the quiz here
          </a>
        </div>
        <div
          class="px-2 px-sm-3 px-md-4 mb-3 mb-md-4 border-radius-8 position-relative ml-4"
          v-if="$vuetify.breakpoint.smAndUp && vm.isHuntingProcessStarted && task.activeStep && !task.finished"
          v-bind:style="{ 'background-image': 'url(' + coverImage + ')' }"
          style="background-size: cover"
        >
          <div class="black-cover-layer fill-width fill-height position-absolute black border-radius-8"></div>
          <div class="pa-6 white--text" style="z-index: 3; position: relative">
            <div class="text-h6 font-weight-bold">{{ quiz.name }}</div>
            <div class="text-body-2 mt-2">
              {{ quiz.description }}
            </div>
            <div class="d-flex align-center justify-space-between">
              <v-btn
                @click="goToQuizDetailScreen"
                class="text-none linear-background-blue-main mt-4 white--text"
                depressed
              >
                Learn more</v-btn
              >
              <div class="neutral100--bg mt-4 rounded">
                <v-btn
                  @click="revalidateQuizTask"
                  class="text-none linear-background-blue-main white--text"
                  depressed
                  :loading="revalidateLoading || (!task.finished && vm.isTaskUpdating)"
                  :disabled="vm.shouldDisableTaskProcessing"
                >
                  Continue</v-btn
                >
              </div>
            </div>
          </div>
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
            v-else-if="!vm.isHuntingProcessStarted && !vm.activeStep"
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box"> </v-sheet>
          </v-sheet>
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle linear-background-blue-main"
            style="padding: 1px"
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
          v-bind:style="{ 'background-image': 'url(' + coverImage + ')' }"
          style="background-size: cover"
        >
          <div class="black-cover-layer fill-width fill-height position-absolute black border-radius-8"></div>
          <div class="pa-6 white--text" style="z-index: 3; position: relative">
            <div class="text-h6 font-weight-bold">{{ quiz.name }}</div>
            <div class="text-body-2 mt-2">
              {{ quiz.description }}
            </div>
            <div class="d-flex align-center justify-space-between">
              <v-btn
                @click="goToQuizDetailScreen"
                class="text-none linear-background-blue-main mt-4 white--text"
                depressed
              >
                Learn more
              </v-btn>
              <div class="neutral100--bg mt-4 rounded">
                <v-btn
                  @click="revalidateQuizTask"
                  class="text-none linear-background-blue-main white--text"
                  depressed
                  :loading="revalidateLoading || (!task.finished && vm.isTaskUpdating)"
                  :disabled="vm.shouldDisableTaskProcessing"
                >
                  Continue
                </v-btn>
              </div>
            </div>
          </div>
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

@Observer
@Component({
  components: {
    'task-icon-container': () => import('@/modules/bounty/components/bounty-detail/task-icon-container.vue'),
  },
})
export default class LearnTask extends Vue {
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) task!: any
  @Prop({ required: true }) step!: number
  quiz: any = {}
  type = get(this.task, 'type', '')
  page = get(this.task, 'page', '')
  title = ''
  revalidateLoading = false
  canRepeat = get(this.task, 'canRepeat', false)

  mounted() {
    apiService
      .getQuiz(this.task.quizId, this.task.id)
      .then((res) => {
        this.quiz = res
      })
      .catch((err) => {
        snackController.error(err)
      })
  }
  revalidateQuizTask() {
    //
    this.revalidateLoading = true
    apiService.quizAnswerRecords
      .count({ ID: `${this.quiz.id}_${authStore.hunterId}_${this.vm.task.id}` })
      .then((res) => {
        if (res > 0) {
          //
          this.vm.submitQuizRevalidation(this.quiz.id)
        } else {
          snackController.error('You have not finished this task yet!')
        }
      })
      .finally(() => {
        this.revalidateLoading = false
      })
  }

  goToQuizDetailScreen() {
    this.$router.push(`/learn/${this.vm.task.id}?quiz=${this.quiz.id}`)
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

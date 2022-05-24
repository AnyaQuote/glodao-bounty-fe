<template>
  <v-dialog
    v-model="vm.quizAnswerDialog"
    max-width="1090"
    class="overflow-hidden position-relative"
    :persistent="vm.submitAnswerLoading"
  >
    <div class="d-flex close-icon justify-end col-auto">
      <v-sheet class="white">
        <v-icon @click="vm.changeQuizAnswerDialog(false)" color="black" :disabled="vm.submitAnswerLoading"
          >mdi-window-close</v-icon
        >
      </v-sheet>
    </div>
    <div v-show="!vm.isAnswerProcessStarted">
      <v-sheet
        class="neutral100--bg"
        :class="{
          'all-aspect-padding-lg': $vuetify.breakpoint.smAndUp,
          'pa-10': $vuetify.breakpoint.xsOnly,
        }"
      >
        <v-row>
          <v-col cols="12" md="6" class="position-relative">
            <div class="text-md-h4 text-h5 font-weight-bold">{{ vm.task.name }}</div>
            <div class="text-md-h4 text-h5 font-weight-bold">{{ vm.quizName }}</div>
            <div class="text-md-h5 text-h6 neutral10--text mt-4">
              {{ vm.quizDescription }}
            </div>
            <div class="mt-8 d-flex align-center">
              <v-icon color="bluePrimary"> mdi-school </v-icon>
              <div class="font-weight-600 ml-2 font-size-18">{{ vm.questionList.length }} questions</div>
            </div>
            <v-btn
              class="text-uppercase linear-background-blue-main fill-width mt-8 fill-width white--text"
              depressed
              height="40"
              block
              @click="vm.startQuizAnswerProcess"
              :loading="vm.startProcessLoading"
            >
              start
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-img
              src="https://api.glodao.io/uploads/BANNER_HUNTING_v1_1_1f3ca51e43.png"
              aspect-ratio="1.5"
              height="100%"
              class="rounded"
            />
          </v-col>
        </v-row>
      </v-sheet>
    </div>
    <div v-show="vm.isAnswerProcessStarted">
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
            <div class="text-h6 text-sm-h5 font-weight-bold">{{ vm.task | _get('name', 'TBA') }}</div>
          </div>
        </div>
        <v-sheet
          class="d-flex align-center bluePrimary--text text-body-1 pa-4 font-weight-600 neutral100--bg"
          style="clip-path: polygon(7% 0, 100% 0%, 100% 100%, 7% 100%, 0% 50%)"
          :height="$vuetify.breakpoint.smAndUp ? 56 : 40"
        >
          <v-icon :size="$vuetify.breakpoint.xsOnly ? 20 : 24" color="bluePrimary">mdi-school</v-icon>
          <div class="ml-3">{{ vm.answerCount }}/{{ vm.questionList.length }} answers</div>
        </v-sheet>
      </v-sheet>
      <div v-for="(questionDataObj, index) in vm.questionList" :key="index" v-show="vm.currentStep === index">
        <v-sheet
          class="py-10 neutral100--bg d-flex justify-center"
          style="padding-left: 5%; padding-right: 5%"
          min-height="340"
        >
          <v-sheet :max-width="$vuetify.breakpoint.mdAndUp ? '90%' : '95%'" class="neutral100--bg" min-width="90%">
            <div class="font-size-28 font-weight-bold">
              {{ questionDataObj.question }}
            </div>

            <v-radio-group v-model="questionDataObj.answer" class="mt-0">
              <v-radio
                v-for="option in questionDataObj.data"
                class="mt-5"
                :value="option.value"
                :key="option.value + option.text"
              >
                <template v-slot:label>
                  <div class="neutral10--text font-size-18">{{ option.text }}</div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-sheet>
        </v-sheet>
      </div>
      <v-sheet
        class="neutral100--bg flex-center-box pa-5 flex-column"
        v-if="vm.currentStep === vm.questionList.length"
        min-height="340"
      >
        <!-- <div class="text-h5 font-weight-bold">Please check your answer carefully before submiting!</div> -->
        <div class="text-h5 text-sm-h4 font-weight-bold">
          You have completed {{ vm.answerCount }}/{{ vm.questionList.length }} questions
        </div>
        <div class="text-h6 text-center mt-4" style="max-width: 540px">
          Please check your all answers once again and summit to complete this mission. Thank you!
        </div>
        <v-btn
          class="linear-background-blue-main mt-6 white--text"
          depressed
          @click="vm.submitQuizAnswer()"
          :loading="vm.submitAnswerLoading"
          >Submit</v-btn
        >
      </v-sheet>

      <v-sheet
        class="blue lighten-3 d-flex justify-space-between align-center bluePrimary--text pa-7 position-relative"
      >
        <v-btn
          class="text-uppercase d-flex align-center background-transparent bluePrimary--text"
          depressed
          :disabled="vm.currentStep === 0"
          @click="vm.changeStep(-1)"
        >
          <v-icon left>mdi-arrow-left</v-icon>
          PREVIOUS
        </v-btn>
        <div class="position-absolute fill-width fill-height flex-center-box" style="left: 0">
          <div class="primary--text" v-if="$vuetify.breakpoint.smAndUp">
            Question <span class="bluePrimary--text"> {{ vm.currentStep + 1 > 10 ? 10 : vm.currentStep + 1 }} </span> of
            10
          </div>
        </div>
        <v-btn
          class="text-uppercase d-flex align-center background-transparent bluePrimary--text"
          depressed
          :disabled="
            vm.currentStep === vm.questionList.length ||
            (vm.currentStep === vm.questionList.length - 1 && vm.answerCount < vm.questionList.length)
          "
          @click="vm.changeStep(1)"
        >
          next
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
      </v-sheet>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Inject } from 'vue-property-decorator'
import { BountyLearnViewModel } from '@/modules/bounty/viewmodels/bounty-learn-viewmodel'

@Observer
@Component({
  components: {
    'project-logo': () => import('@/components/project-logo.vue'),
  },
})
export default class QuizDialog extends Vue {
  @Inject() vm!: BountyLearnViewModel
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
.font-size-28 {
  font-size: 28px;
}
.font-size-18 {
  font-size: 18px;
}
</style>

<template>
  <v-container class="pa-4">
    <div class="elevation-3 rounded">
      <v-sheet
        class="neutral100--bg blue lighten-3 pa-6 pr-0 d-flex justify-space-between bluePrimary--text border-radius-8 rounded-b-0 mt-8"
        :class="{
          'text-h5': $vuetify.breakpoint.smAndUp,
          'text-body-1': $vuetify.breakpoint.xsOnly,
        }"
      >
        <div class="font-weight-bold d-flex align-center">
          <div class="mr-3">
            <v-avatar>
              <img :src="vm.hunter.metadata.avatar" alt="" />
            </v-avatar>
          </div>
          <div
            class="align-center"
            :class="{
              'd-flex': $vuetify.breakpoint.smAndUp,
            }"
          >
            <div>{{ vm.hunter | _get('name', 'TBA') }}</div>
            <v-sheet
              v-show="$vuetify.breakpoint.smAndUp"
              width="10"
              height="10"
              class="rounded-circle mx-4"
              color="bluePrimary"
            ></v-sheet>

            <div>{{ vm.quiz | _get('name', 'TBA') }}</div>
          </div>
        </div>
        <v-sheet
          class="d-flex align-center bluePrimary--text text-body-1 pa-4 font-weight-600 neutral100--bg"
          style="clip-path: polygon(7% 0, 100% 0%, 100% 100%, 7% 100%, 0% 50%)"
          height="56"
        >
          <v-icon :size="$vuetify.breakpoint.xsOnly ? 20 : 24" color="bluePrimary">mdi-school</v-icon>
          <div class="ml-3">Learn to earn mission</div>
        </v-sheet>
      </v-sheet>
      <div>
        <div v-for="(questionDataObj, index) in vm.quizReviewList" :key="index">
          <v-sheet class="pt-10 neutral100--bg d-flex justify-center" style="padding-left: 3%; padding-right: 3%">
            <v-sheet :max-width="$vuetify.breakpoint.mdAndUp ? '95%' : '95%'" class="neutral100--bg" min-width="90%">
              <div class="text-md-h5 text-h6 font-weight-bold">
                {{ questionDataObj.question }}
              </div>

              <v-radio-group v-model="questionDataObj.answer" class="mt-0">
                <v-radio
                  v-for="option in questionDataObj.data"
                  class="mt-5"
                  :value="option.value"
                  :key="option.value + option.text"
                  color="success"
                >
                  <template v-slot:label>
                    <div class="neutral10--text">{{ option.text }}{{ questionDataObj.isCorrect }}</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-sheet>
          </v-sheet>
        </div>
        <!-- <v-divider></v-divider> -->
        <!-- <div class="d-flex justify-space-between neutral100--bg pa-4 flex-column flex-sm-row">
        <v-btn class="text-uppercase d-flex align-center background-transparent bluePrimary--text" depressed>
          Share on Twitter
        </v-btn>
      </div> -->
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { QuizRecordViewModel } from '@/modules/bounty/viewmodels/quiz-record-viewmodel'
import * as _ from 'lodash-es'

@Observer
@Component({
  components: {
    'markdown-component': () => import('@/components/markdown-component.vue'),
    'quiz-dialog': () => import('@/modules/bounty/components/bounty-detail/learn-task/quiz-dialog.vue'),
    'quiz-review-dialog': () => import('@/modules/bounty/components/bounty-detail/learn-task/quiz-review-dialog.vue'),
    'project-logo': () => import('@/components/project-logo.vue'),
  },
})
export default class QuizRecordPage extends Vue {
  @Provide() vm = new QuizRecordViewModel()
  walletStore = walletStore
  authStore = authStore
  mouseoverEvent = new Event('mouseleave')

  @Watch('$route.params.id', { immediate: true }) onIdChanged(val: string) {
    if (val) {
      if (_.isEmpty(val)) this.$router.back()
      else this.vm.fetchRecordData(val)
    }
  }

  mounted() {
    this.vm.initReaction()
  }

  beforeDestroy() {
    this.vm.destroyReaction()
  }
}
</script>

<style scoped lang="scss">
.font-size-28 {
  font-size: 28px;
}
.font-size-18 {
  font-size: 18px;
}
.v-btn--disabled {
  background-image: none !important;
}
</style>

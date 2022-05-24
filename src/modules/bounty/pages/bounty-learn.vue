<template>
  <v-container class="pa-4">
    <v-row class="mt-6" dense no-gutters>
      <v-col cols="12">
        <router-link :to="`/bounty/${vm.task.id}`" class="d-flex align-center">
          <v-icon color="primary">mdi-arrow-left</v-icon>
          <div class="text-h6 bluePrimary--text font-weight-bold ml-7">Back to mission</div>
        </router-link>
      </v-col>
      <v-col cols="12">
        <v-sheet
          class="neutral100--bg blue lighten-3 pa-6 pr-0 d-flex justify-space-between bluePrimary--text border-radius-8 rounded-b-0 mt-8"
          :class="{
            'text-h5': $vuetify.breakpoint.smAndUp,
            'text-body-1': $vuetify.breakpoint.xsOnly,
          }"
        >
          <div
            class="font-weight-bold d-flex align-center"
            :class="{
              'font-size-28': $vuetify.breakpoint.smAndUp,
            }"
          >
            <project-logo
              :src="vm.projectLogo"
              :size="$vuetify.breakpoint.xsOnly ? 24 : 48"
              class="mr-3"
            ></project-logo>
            <div
              class="align-center"
              :class="{
                'd-flex': $vuetify.breakpoint.smAndUp,
              }"
            >
              <div>{{ vm.task | _get('name', 'TBA') }}</div>
              <v-sheet
                v-show="$vuetify.breakpoint.smAndUp"
                width="10"
                height="10"
                class="rounded-circle mx-4"
                color="bluePrimary"
              ></v-sheet>
              <span class="text-none"> Mission No. {{ vm.task | _get('missionIndex', 'TBA') }} </span>
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
        <v-sheet class="pa-7 neutral100--bg">
          <v-row>
            <v-col cols="12" md="7">
              <div class="text-h4 font-weight-bold">{{ vm.quizName }}</div>
              <div class="text-body-1 neutral10--text font-weight-600 mt-4">
                {{ vm.quizDescription }}
              </div>
              <div class="d-flex mt-4 align-center">
                <v-chip class="text-uppercase mr-2" v-for="tag in vm.quizTags" :key="tag"> {{ tag }} </v-chip>
                <div class="ml-4 text-body-1 font-weight-600">10 min read</div>
              </div>
              <v-btn
                class="linear-background-blue-main font-weight-bold text-none rounded white--text mt-8"
                depressed
                @click="vm.changeQuizAnswerDialog(true)"
                :disabled="vm.isQuizCompleted || vm.shouldDisableTaskProcessing"
                >Start the quest!</v-btn
              >
            </v-col>
            <v-col cols="12" md="4" class="px-0 ml-md-auto">
              <v-img
                src="https://api.glodao.io/uploads/BANNER_HUNTING_v1_1_1f3ca51e43.png"
                aspect-ratio="1.5"
                height="100%"
                class="rounded"
              />
            </v-col>
          </v-row>
        </v-sheet>
        <v-divider></v-divider>
        <v-sheet class="pa-7 neutral100--bg">
          <markdown-component :description="vm.quizLearningInformation"> </markdown-component>
        </v-sheet>
      </v-col>
    </v-row>
    <quiz-dialog />
    <quiz-review-dialog />
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { BountyLearnViewModel } from '@/modules/bounty/viewmodels/bounty-learn-viewmodel'
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
export default class BountyLearnPage extends Vue {
  @Provide() vm = new BountyLearnViewModel()
  walletStore = walletStore
  authStore = authStore
  mouseoverEvent = new Event('mouseleave')

  @Watch('$route.params.id', { immediate: true }) onIdChanged(val: string) {
    if (val) {
      if (_.isEmpty(val)) this.$router.back()
      else this.vm.fetchTaskData(val)
    }
  }

  @Watch('$route.query', { immediate: true }) onRefChanged(val: string) {
    if (val) {
      if (_.isEmpty(val)) this.$router.back()
      else this.vm.fetchQuizData(_.get(val, 'quiz'))
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

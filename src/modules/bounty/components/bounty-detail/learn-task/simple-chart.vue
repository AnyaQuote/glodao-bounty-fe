<template>
  <div>
    <span class="title-2 mt-2">
      <span class="title-1">Quiz: {{ record | _get('quiz.name', '') }}</span> - Your best answer record</span
    >
    <v-data-table
      class="neutral100"
      hide-default-footer
      :headers="headers"
      :items="items"
      disable-sort
      disable-filtering
      disable-pagination
    >
    </v-data-table>
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
import moment from 'moment'
import _ from 'lodash-es'

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
  title = ''
  revalidateLoading = false
  canRepeat = get(this.task, 'canRepeat', false)
  record: any = {}
  headers = [
    { text: 'Date', value: 'date' },
    { text: 'Correct answer', value: 'correctAnswerCount' },
  ]

  mounted() {
    apiService.quizAnswerRecords
      .find({ ID: `${this.task.quizId}_${authStore.hunterId}_${this.vm.task.id}` })
      .then((res) => {
        if (res.length > 0) this.record = res[0]
        console.log(this.record)
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

  get history() {
    return this.record.history || []
  }

  get items() {
    return _.orderBy(
      this.history.map((el) => ({
        ...el,
        date: moment(el.date).format('DD/MM/YYYY'),
      })),
      'correctAnswerCount',
      'desc'
    ).slice(0, 5)
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
.title-2 {
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
}
.title-1 {
  font-size: 20px;
}
</style>

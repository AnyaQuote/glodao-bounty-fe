<template>
  <v-dialog :value="dialog" max-width="520" persistent v-if="question">
    <div class="neutral100 pa-8">
      <div :class="question.titleClass">{{ question.title }}</div>
      <div class="pt-4 text-body-2 d-flex">
        <!-- <div>
          <v-icon size="40" class="mr-3">mdi-progress-question</v-icon>
        </div> -->
        <div style="white-space: pre-line">{{ question.question }}</div>
      </div>
      <div class="row d-flex justify-space-between pt-6">
        <v-col cols="12" sm="6" v-for="answer in question.answers" :key="answer.id" @click="submitAnswer(answer)">
          <v-btn depressed block :class="answer.class">{{ answer.answer }}</v-btn>
        </v-col>
      </div>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { authStore } from '@/stores/auth-store'
import { Component, Vue } from 'vue-property-decorator'
import { get, find, isEmpty } from 'lodash-es'
import { apiService } from '@/services/api-service'

@Component
export default class OverlayQuestionDialog extends Vue {
  dialog = false
  questionIndex = 1
  questionList: any[] = [
    {
      id: '01',
      title: 'Poll of member views',
      titleClass: 'text-body-1 font-weight-bold',
      question: `Hello GloDAO members! We are now planning to connect with exchanges and create special missions pools in addition to provide more exciting prizes to the community.
Members will complete KYC activities for the partner exchange and get a reward of between $2 and $3.
Please let us know your thoughts on this plan so that we can propose it to GloDAO's partners!`,
      answers: [
        {
          id: '0101',
          answer: 'Yes',
          class: 'blue white--text',
        },
        {
          id: '0102',
          answer: 'No',
          class: '',
        },
      ],
    },
  ]
  question = this.questionList[this.questionIndex] || null
  mounted() {
    if (!this.question) return
    const user = get(authStore, 'user', {})
    if (isEmpty(user) || isEmpty(user.hunter)) return
    const answerData = get(user, 'hunter.data.answerBank', [])
    const preAnswer = find(answerData, (answer) => answer.questionId === this.question.id)
    if (answerData.length === 0) {
      this.dialog = true
    }
    if (!preAnswer) this.dialog = true
  }
  submitAnswer(answer) {
    this.dialog = false
    // authStore.updateHunterAnswerBank(answerBank)
    apiService
      .updateHunterAnswerBank({ ...answer, questionId: this.question.id })
      .then((res) => authStore.updateHunter(res))
      .catch((err) => console.log(err))
  }
}
</script>

<style scoped></style>

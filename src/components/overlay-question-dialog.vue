<template>
  <v-dialog :value="dialog" max-width="520" persistent>
    <div class="neutral100 pa-8">
      <div class="text-body-2">To continue to the website, please answer the following question:</div>
      <div class="font-weight-bold pt-4 text-body-1 d-flex">
        <div>
          <v-icon size="40" class="mr-3">mdi-progress-question</v-icon>
        </div>
        <div>{{ question.question }}</div>
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
  questionIndex = 0
  questionList: any[] = [
    {
      id: 1,
      question: 'What is your favorite color?',
      answers: [
        {
          id: 1,
          answer: 'Red',
          class: 'red',
        },
        {
          id: 2,
          answer: 'Blue',
          class: 'blue',
        },
        {
          id: 3,
          answer: 'Green',
          class: 'green',
        },
        {
          id: 4,
          answer: 'Yellow',
          class: 'yellow',
        },
      ],
    },
    {
      id: 2,
      question: 'What is your favorite animal?',
      answers: [
        {
          id: 1,
          answer: 'Dog',
          class: 'red',
        },
        {
          id: 2,
          answer: 'Cat',
          class: 'blue',
        },
        {
          id: 3,
          answer: 'Bird',
          class: 'green',
        },
        {
          id: 4,
          answer: 'Fish',
          class: 'yellow',
        },
      ],
    },
    {
      id: 3,
      question: 'What is your favorite food?',
      answers: [
        {
          id: 1,
          answer: 'Pizza',
          class: 'red',
        },
        {
          id: 2,
          answer: 'Pasta',
          class: 'blue',
        },
        {
          id: 3,
          answer: 'Sushi',
          class: 'green',
        },
        {
          id: 4,
          answer: 'Steak',
          class: 'yellow',
        },
      ],
    },
  ]
  question = this.questionList[this.questionIndex]
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

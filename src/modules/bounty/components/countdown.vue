<template>
  <div class="d-flex">
    <v-icon color="white" class="mr-3">mdi-clock-outline</v-icon>
    <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
      <div class="font-weight-bold">{{ days | twoDigits }}</div>
    </v-sheet>
    <div class="flex-center-box mx-3 white--text">:</div>
    <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
      <div class="font-weight-bold">{{ hours | twoDigits }}</div>
    </v-sheet>
    <div class="flex-center-box mx-3 white--text">:</div>
    <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
      <div class="font-weight-bold">{{ minutes | twoDigits }}</div>
    </v-sheet>
    <div class="flex-center-box mx-3 white--text">:</div>
    <v-sheet rounded width="36" height="36" color="white" class="flex-center-box">
      <div class="font-weight-bold">{{ seconds | twoDigits }}</div>
    </v-sheet>
  </div>
</template>

<style scoped></style>

<script>
export default {
  props: {
    targetDate: String,
  },
  mounted() {
    this.countdownInterval = setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000)
    }, 1000)
  },
  destroyed() {
    clearInterval(this.countdownInterval)
  },
  data() {
    return {
      now: '',
      countdownInterval: null,
    }
  },
  computed: {
    dateInMilliseconds() {
      if (!this.targetDate) return 0
      return Math.trunc(Date.parse(this.targetDate) / 1000)
    },
    seconds() {
      return (this.dateInMilliseconds - this.now) % 60
    },
    minutes() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60
    },
    hours() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24
    },
    days() {
      if (!this.now) return 0
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24)
    },
  },
}
</script>

<template>
  <v-sheet class="d-flex justify-space-between align-center rounded-lg px-3 py-1 neutral100--bg">
    <slot name="prepend"></slot>
    <v-sheet rounded width="36" height="36" color="neutral100" class="flex-center-box">
      <div class="font-weight-bold primary--text">{{ days | twoDigits }}</div>
    </v-sheet>
    <div class="flex-center-box mx-3">:</div>
    <v-sheet rounded width="36" height="36" color="neutral100" class="flex-center-box">
      <div class="font-weight-bold primary--text">{{ hours | twoDigits }}</div>
    </v-sheet>
    <div class="flex-center-box mx-3">:</div>
    <v-sheet rounded width="36" height="36" color="neutral100" class="flex-center-box">
      <div class="font-weight-bold primary--text">{{ minutes | twoDigits }}</div>
    </v-sheet>
    <div class="flex-center-box mx-3">:</div>
    <v-sheet rounded width="36" height="36" color="neutral100" class="flex-center-box">
      <div class="font-weight-bold primary--text">{{ seconds | twoDigits }}</div>
    </v-sheet>
  </v-sheet>
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

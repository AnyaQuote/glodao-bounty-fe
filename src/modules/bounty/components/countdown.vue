<template>
  <v-sheet :class="`d-flex justify-space-between align-center rounded-lg py-1 neutral100--bg ${padding}`">
    <slot name="prepend"></slot>
    <div class="flex-center-box h-36-w-36">
      <div class="font-weight-bold">{{ days | twoDigits }}</div>
    </div>
    <div :class="`flex-center-box ${textMargin}`">:</div>
    <div class="flex-center-box h-36-w-36">
      <div class="font-weight-bold">{{ hours | twoDigits }}</div>
    </div>
    <div :class="`flex-center-box ${textMargin}`">:</div>
    <div class="flex-center-box h-36-w-36">
      <div class="font-weight-bold">{{ minutes | twoDigits }}</div>
    </div>
    <div :class="`flex-center-box ${textMargin}`">:</div>
    <div class="flex-center-box h-36-w-36">
      <div class="font-weight-bold">{{ seconds | twoDigits }}</div>
    </div>
    <slot name="append"></slot>
  </v-sheet>
</template>

<script>
export default {
  props: {
    targetDate: String,
    textMargin: {
      type: String,
      default: 'mx-3',
    },
    padding: {
      type: String,
      default: 'px-3',
    },
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

<style scoped>
.h-36-w-36 {
  height: 36px;
  width: 36px;
}
</style>

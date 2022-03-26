<template>
  <div class="d-grid fill linear-background-blue-main h-336">
    <v-img
      v-show="$vuetify.breakpoint.mdAndUp"
      class="circle-wrapper ma-0 pa-0"
      :src="require('@/assets/images/circle-bg.svg')"
    ></v-img>
    <v-img
      v-show="$vuetify.breakpoint.mdAndUp"
      class="coins-right"
      max-width="168"
      max-height="194"
      contain
      :src="require('@/assets/images/coins.png')"
    ></v-img>
    <v-img
      v-show="$vuetify.breakpoint.mdAndUp"
      class="coins-left"
      max-width="168"
      max-height="194"
      contain
      :src="require('@/assets/images/coins-flipped.png')"
    ></v-img>
    <div class="b-content d-flex flex-column justify-center align-center white--text">
      <div class="font-size-72 text-center mb-5">BOUNTY HUNTER</div>
      <div class="d-flex flex-row align-center justify-center mb-5">
        <v-img max-height="21" max-width="28" :src="require('@/assets/images/double-arrow.svg')"></v-img>
        <span class="mx-2 font-size-36 text-center">Do tasks to earn</span>
        <v-img max-height="21" max-width="28" :src="require('@/assets/images/double-arrow-flipped.svg')"></v-img>
      </div>
      <div>
        <v-btn color="white" outlined> See hot pools </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {}
</script>

<style scoped>
.d-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
  --custom-margin: -80px;
}

.b-content {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  z-index: 1;
}

.circle-wrapper {
  opacity: 0.1;
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  z-index: 0;
  height: 100%;
}

.coins-left {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  justify-self: start;
  margin-left: var(--custom-margin);
}

.coins-right {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  justify-self: end;
  margin-right: var(--custom-margin);
}

.font-size-72 {
  font-size: 72px;
  line-height: 64px;
  font-weight: 700;
}

.font-size-36 {
  font-size: 36px;
  line-height: 54px;
  font-weight: 600;
}

.h-336 {
  height: 360px;
}
</style>

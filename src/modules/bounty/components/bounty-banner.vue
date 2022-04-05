<template>
  <div
    class="d-grid linear-gradient-bg"
    :class="$vuetify.breakpoint.lgAndUp ? 'grid-setting-web' : 'grid-setting-mobile'"
  >
    <div
      v-if="$vuetify.breakpoint.lgAndUp"
      class="d-grid image-wrapper justify-self-start"
      style="justify-items: center; align-items: end"
    >
      <Circles class="overlap full-height fill-width opacity-low" :color="'#0276F0'"></Circles>
      <div class="overlap" style="margin-left: 25%">
        <v-img :src="require('@/assets/images/bounty-briefcase.png')" max-height="320" max-width="420"> </v-img>
      </div>
    </div>
    <div
      :class="
        $vuetify.breakpoint.lgAndUp
          ? 'b-content-setting-web justify-self-end'
          : 'b-content-setting-mobile text-center align-center'
      "
      class="d-flex flex-column"
    >
      <div class="font-size-72 mb-5 blue--text">BOUNTY HUNTER</div>
      <div class="d-flex flex-row align-center mb-5">
        <DoubleArrow></DoubleArrow>
        <span class="mx-1 font-size-36 color-1--text">Do tasks to earn</span>
        <DoubleArrowFlipped></DoubleArrowFlipped>
      </div>
      <div>
        <v-btn class="justify-start" color="blue" outlined> See hot pools </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DoubleArrow from '@/assets/icons/double-arrow-vec.vue'
import DoubleArrowFlipped from '@/assets/icons/double-arrow-flipped-vec.vue'
import Circles from '@/assets/images/circles.vue'

@Component({
  components: {
    DoubleArrow,
    DoubleArrowFlipped,
    Circles,
  },
})
export default class extends Vue {}
</script>

<style scoped>
* {
  --color-1: #8197bb;
}

.d-grid {
  display: grid;
}

.grid-setting-web {
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(5, 73px);
}

.grid-setting-mobile {
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 73px);
}

.b-content-setting-web {
  grid-area: 2 / 2 / 5 / 5;
}

.overlap {
  grid-area: 1/1;
}

.justify-self-end {
  justify-self: end;
}

.justify-self-start {
  justify-self: start;
}

.b-content-setting-mobile {
  grid-area: 2 / 1 / 4 / 2;
}

.image-wrapper {
  grid-area: 1 / 5 / 6 / 9;
}

.full-height {
  height: 100%;
}

.circle-wrapper {
  grid-area: 1 / 1;
}

.opacity-low {
  opacity: 0.1;
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

.linear-gradient-bg {
  background: linear-gradient(90deg, rgba(2, 118, 240, 0.08) 0%, rgba(0, 229, 255, 0.08) 113.65%);
}

.color-1--text {
  color: var(--color-1);
}
</style>

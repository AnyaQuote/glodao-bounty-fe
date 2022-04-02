<template>
  <div class="d-grid grid-setting linear-gradient-bg">
    <div class="d-grid align-g-item-center justify-g-items-center image-wrapper">
      <Circles
        v-show="$vuetify.breakpoint.mdAndUp"
        class="circle-wrapper full-height opacity-low"
        :color="'#0276F0'"
      ></Circles>
      <v-img
        v-show="$vuetify.breakpoint.mdAndUp"
        :src="require('@/assets/images/bounty-briefcase.png')"
        class="b-icon"
        height="320"
        width="420"
      >
      </v-img>
    </div>
    <div class="b-content d-flex flex-column white--text">
      <div class="font-size-72 mb-5 blue--text">BOUNTY HUNTER</div>
      <div class="d-flex flex-row align-center mb-5">
        <DoubleArrow></DoubleArrow>
        <span class="mx-2 font-size-36 color-1--text">Do tasks to earn</span>
        <DoubleArrowFlipped></DoubleArrowFlipped>
      </div>
      <div>
        <v-btn color="blue" outlined> See hot pools </v-btn>
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

.grid-setting {
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(5, 73px);
}

.b-content {
  grid-area: 2 / 2 / 4 / 5;
}

.b-icon {
  grid-area: 1 / 1;
  /* This is not a good way to do this, will fix */
  margin-right: 170px;
  /**=========================================== */
}

.align-g-item-center {
  align-items: end;
}

.justify-g-items-center {
  justify-items: end;
}

.image-wrapper {
  grid-area: 1 / 4 / 6 / 9;
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

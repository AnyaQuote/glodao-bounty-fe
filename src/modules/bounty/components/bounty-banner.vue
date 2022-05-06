<template>
  <!-- MD SCREEN SIZE -->
  <div v-if="$vuetify.breakpoint.smAndUp" class="custom-gradient-bg overflow-hidden">
    <v-container class="position-relative">
      <v-row align="center" justify="center">
        <v-col cols="7">
          <div class="d-flex h-330 flex-column justify-center">
            <div class="mb-8 bluePrimary--text font-weight-bold" style="font-size: 4.5rem; line-height: 4.5rem">
              BOUNTY HUNTER
            </div>
            <div class="d-flex flex-row align-center">
              <double-arrow></double-arrow>
              <span class="mx-3 grey2--text font-weight-bold" style="font-size: 2rem; line-height: 2rem">
                Do tasks to earn
              </span>
              <double-arrow-flipped></double-arrow-flipped>
            </div>
          </div>
        </v-col>
        <v-col cols="5">
          <div class="image-wrapper">
            <circles v-show="!$vuetify.theme.dark" class="circle" style=""></circles>
            <div v-show="$vuetify.theme.dark" class="shadow-wrapper white-shadow"></div>
            <v-img class="image" contain :src="require('@/assets/images/bounty-briefcase.png')"> </v-img>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <!-- XS SCREEN SIZE -->
  <div v-else class="custom-gradient-bg">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div class="d-flex flex-column align-center text-center mb-2">
            <div class="mb-4 bluePrimary--text font-weight-bold" style="font-size: 4.5rem; line-height: 4.5rem">
              BOUNTY HUNTER
            </div>
            <div class="d-flex flex-row align-center mb-2">
              <DoubleArrow></DoubleArrow>
              <span class="mx-3 grey2--text font-weight-bold" style="font-size: 2rem; line-height: 2rem"
                >Do tasks to earn</span
              >
              <DoubleArrowFlipped></DoubleArrowFlipped>
            </div>
            <v-img width="214px" height="150px" :src="require('@/assets/images/bounty-briefcase.png')"> </v-img>
          </div>
        </v-col>
      </v-row>
    </v-container>
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
export default class BountyBanner extends Vue {}
</script>

<style lang="scss" scoped>
.custom-gradient-bg {
  background: linear-gradient(90deg, rgba(2, 118, 240, 0.08) 0%, rgba(0, 229, 255, 0.08) 113.65%);
}

.image-wrapper {
  position: absolute;
  top: 20px;
  bottom: 0;
  right: 50px;
  left: 0;
  transform: translateX(170px);
  .circle {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    overflow: visible;
    opacity: 0.1;
  }
  .shadow-wrapper {
    width: 370px;
    height: 300px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 160px;
    z-index: 0;
    opacity: 1;
    &.white-shadow {
      background: #ffffff;
      -webkit-box-shadow: 25px 30px 80px 38px #ffffff;
      box-shadow: 25px 30px 80px 38px #ffffff;
      filter: blur(60px);
    }
  }

  .image {
    position: absolute;
    top: 10px;
    right: 140px;
    z-index: 1;
  }
}
.overflow-hidden {
  overflow: hidden;
}
.h-330 {
  height: 330px;
}
</style>

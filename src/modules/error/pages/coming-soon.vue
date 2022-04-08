<template>
  <v-container class="fill-height">
    <div class="flex-center-box fill-height fill-width text-center position-relative">
      <v-img
        :src="
          $vuetify.theme.dark
            ? require('@/assets/images/coming-soon-bg-dark.svg')
            : require('@/assets/images/coming-soon-bg.svg')
        "
        class="fill-height fill-width d-flex align-center position-absolute"
        style="left: 0"
        contain
        v-if="$vuetify.breakpoint.mdAndUp"
      >
        <div class="fill-width fill-height text-start" style="margin: 80px; width: 50%">
          <div class="text-uppercase bluePrimary--text text-h2 text-start font-weight-bold">Coming soon</div>
          <div class="text-h5 mt-6">We are currently working verry hard on getting you a fantastic product.</div>
          <div class="text-h5 mt-4">Stay tuned for the official announcement!</div>
          <div>
            <v-sheet height="65" width="300" class="mt-6 d-flex justify-space-around align-center neutral15">
              <a href="">
                <v-icon> mdi-telegram </v-icon>
              </a>
              <a href="">
                <v-icon> mdi-telegram </v-icon>
              </a>
              <a href="">
                <v-icon> mdi-twitter </v-icon>
              </a>
              <a href="">
                <v-icon> mdi-telegram </v-icon>
              </a>
              <a href="">
                <v-icon>mdi-discord</v-icon>
              </a>
            </v-sheet>
          </div>
        </div>
      </v-img>
      <div
        class="fill-width fill-height coming-soon-container text-start"
        :class="{
          'theme--dark': $vuetify.theme.dark,
        }"
        v-if="$vuetify.breakpoint.smOnly"
      >
        <div class="fill-width fill-height" style="margin: 50px; width: 60%; margin-left: 50px">
          <div class="text-uppercase bluePrimary--text text-h5 text-start font-weight-bold">Coming soon</div>
          <div class="text-body-1 mt-6">We are currently working verry hard on getting you a fantastic product.</div>
          <div class="text-body-1 mt-4">Stay tuned for the official announcement!</div>
          <div>
            <v-sheet class="mt-6 d-flex justify-space-around align-center neutral15 py-2" max-width="200">
              <a href="">
                <v-icon small> mdi-telegram </v-icon>
              </a>
              <a href="">
                <v-icon small> mdi-telegram </v-icon>
              </a>
              <a href="">
                <v-icon small> mdi-twitter </v-icon>
              </a>
              <a href="">
                <v-icon small> mdi-telegram </v-icon>
              </a>
              <a href="">
                <v-icon small>mdi-discord</v-icon>
              </a>
            </v-sheet>
          </div>
        </div>
      </div>
      <div class="fill-width fill-height text-center flex-center-box" v-if="$vuetify.breakpoint.xsOnly">
        <div>
          <div class="text-uppercase bluePrimary--text text-h4 font-weight-bold">Coming soon</div>
          <div class="text-h6 mt-6">We are currently working verry hard on getting you a fantastic product.</div>
          <div class="text-h6 mt-4">Stay tuned for the official announcement!</div>
          <div class="d-flex justify-center">
            <v-sheet class="mt-6 d-flex justify-space-around align-center py-2 background-transparent" width="200">
              <a href="">
                <v-icon> mdi-telegram </v-icon>
              </a>
              <a href="">
                <v-icon> mdi-telegram </v-icon>
              </a>
              <a href="">
                <v-icon> mdi-twitter </v-icon>
              </a>
              <a href="">
                <v-icon> mdi-telegram </v-icon>
              </a>
              <a href="">
                <v-icon>mdi-discord</v-icon>
              </a>
            </v-sheet>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { Observer } from 'mobx-vue'
import { Component, Vue } from 'vue-property-decorator'
@Observer
@Component({})
export default class ComingSoon extends Vue {
  goToBountyPage() {
    this.$router.push('/bounty').catch(() => {
      //
    })
  }
}
</script>

<style scoped lang="scss">
.w-50 {
  width: 60%;
}
.coming-soon-container {
  background-image: url('~@/assets/images/coming-soon-bg.svg');
  background-size: contain;
  &.theme--dark {
    background-image: url('~@/assets/images/coming-soon-bg-dark.svg');
  }
}
.position-absolute {
  position: absolute !important;
}
.neutral15--bg-persistent {
  background-color: #f9fbfd !important;
  background: #f9fbfd !important;
}
</style>

<template>
  <v-dialog v-model="dialog" class="rounded-0" max-width="450">
    <v-sheet outlined class="position-relative pa-8 text-center dialog-normal-text position-relative">
      <v-sheet min-height="300" class="d-flex align-center justify-center" v-if="!logined">
        <v-sheet>
          <div class="d-flex justify-center">
            <v-sheet width="64" height="64" class="background-twitter rounded-circle d-flex justify-center">
              <v-icon class="white--text" size="30">mdi-twitter</v-icon>
            </v-sheet>
          </div>
          <div class="mt-3 font-weight-bold card-big-title-text">Connect Twitter</div>
          <div class="mt-1 card-title-text">To complete task & earn reward</div>
          <div class="mt-4">
            <v-btn outlined depressed class="rounded-pill black--text login-btn" @click="changeLoginState">
              <span> Log in with Twitter </span>
            </v-btn>
          </div>
          <div class="mt-8 px-10">
            By connect you accept Diversity’s
            <a href="#" class="blue-diversity--text">Ternms and Conditions</a> and
            <a href="#" class="blue-diversity--text">Privacy Policy</a>
          </div>
        </v-sheet>
      </v-sheet>

      <v-sheet v-if="logined">
        <div class="d-flex align-center justify-center blue-diversity--text">
          <v-icon size="18" class="mr-2 blue-diversity--text">mdi-twitter</v-icon>
          Log in with Twitter
        </div>
        <div class="mt-6">
          <div>
            <v-avatar size="48" color="blue"></v-avatar>
          </div>
          <div class="mt-2 card-title-text font-weight-600">Diversity is requesting access to:</div>
          <div class="mt-2 neutral10--text">Your name, profile picture, activity</div>
        </div>
        <div class="mt-6"><a href="#" class="blue-diversity--text">View access</a></div>
        <v-btn
          class="mt-6 text-capitalize background-blue-diversity white--text rounded-0 fill-width dialog-button dialog-normal-text"
          depressed
          height="40"
        >
          Continue as Tommy
        </v-btn>
        <v-btn
          class="mt-3 text-capitalize background-neutral neutral10--text rounded-0 fill-width dialog-button dialog-normal-text"
          depressed
          height="40"
        >
          Cancel
        </v-btn>
        <div class="dialog-small-text neutral10--text mt-6">
          By continuing, Diversity will receive ongoing access to the information you share. <br />
          <a class="blue-diversity--text" href="#">Learn more</a> about this sharing and the settings you have.<br />
          Diversity's <a class="blue-diversity--text" href="#">Privacy Policy</a>
        </div>
      </v-sheet>
      <v-icon class="close-icon">mdi-window-close</v-icon>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {},
})
export default class TwitterLoginDialog extends Vue {
  dialog = true
  logined = false

  changeLoginState() {
    this.logined = !this.logined
  }
}
</script>

<style lang="scss" scoped>
.close-icon {
  position: absolute;
  top: 0;
  right: 0;
}
.dialog-normal-text {
  font-size: 14px;
  line-height: 20px;
}
.dialog-button {
  padding: 10px !important;
}
.neutral10--text {
  color: var(--v-neutral10-base);
}
.blue-diversity--text {
  color: var(--v-bluePrimary-base);
}
.dialog-small-text {
  font-size: 9px;
  line-height: 12px;
}
.background-twitter {
  background-color: var(--v-twitter-base);
}
.login-btn {
  font-size: 14px;
  line-height: 24px;
  border: 1px solid var(--v-bluePrimary-base);
  text-transform: unset;
}
</style>

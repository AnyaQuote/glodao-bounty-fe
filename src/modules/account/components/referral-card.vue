<template>
  <v-sheet class="fill-width neutral100--bg d-flex flex-column flex-md-row align-md-center rounded-lg pa-4" outlined>
    <v-sheet class="transparent d-flex overflow-hidden">
      <v-img class="rounded-circle mx-auto" src="https://i.pravatar.cc/64" max-width="64" max-height="64"></v-img>
    </v-sheet>
    <v-sheet class="transparent d-flex flex-md-column pa-3">
      <v-sheet class="transparent neutral10--text">Reffered</v-sheet>
      <v-sheet class="transparent neutral0--text pl-3 pl-md-0 ml-auto ml-md-0">@Tommy_Shelby</v-sheet>
    </v-sheet>
    <v-sheet class="transparent d-flex flex-md-column pa-3 ml-0 ml-md-auto">
      <v-sheet class="transparent neutral10--text">Time</v-sheet>
      <v-sheet class="transparent neutral0--text pl-3 pl-md-0 ml-auto ml-md-0">Jan 22nd, 10:00 pm</v-sheet>
    </v-sheet>
    <v-sheet class="transparent d-flex flex-md-column pa-3">
      <v-sheet class="transparent neutral10--text">Social</v-sheet>
      <v-sheet class="transparent d-flex align-center neutral0--text pl-3 pl-md-0 ml-auto ml-md-0">
        <v-sheet class="blue d-flex justify-center align-center rounded-circle mr-1" width="25" height="25">
          <v-icon color="white" size="15">mdi-twitter</v-icon>
        </v-sheet>
        Twitter
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue } from 'vue-property-decorator'

@Observer
@Component
export default class ReferralCard extends Vue {}
</script>

<style scoped lang="scss"></style>

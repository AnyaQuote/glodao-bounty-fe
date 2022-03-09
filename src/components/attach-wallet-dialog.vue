<template>
  <v-dialog v-model="dialog" class="rounded-0" max-width="450">
    <v-sheet outlined class="position-relative pa-8 text-center dialog-normal-text overflow-hidden">
      <v-avatar size="48" color="blue"></v-avatar>
      <div class="mt-3 card-title-text font-weight-600">Set the attached wallet</div>
      <div class="mt-6 font-weight-600">Please enter your wallet address to setting</div>
      <v-sheet class="mt-4 py-1 px-2 d-flex align-center" outlined>
        <v-text-field hide-details dense placeholder="Your wallet address" flat solo class="ma-0 pa-0"></v-text-field>
        <!-- <v-icon>mdi-wallet-outline</v-icon> -->
      </v-sheet>
      <div class="mt-3">
        <v-btn class="dialog-btn rounded-0 white--text background-blue-diversity" depressed>Done</v-btn>
      </div>
      <div class="mt-3">
        <v-btn class="dialog-btn rounded-0 black--text background-neutral" depressed>Ok, I'll set later</v-btn>
      </div>
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
export default class AttachWalletDialog extends Vue {
  dialog = true
}
</script>

<style lang="scss" scoped>
.dialog-normal-text {
  font-size: 14px;
  line-height: 20px;
}
.dialog-btn {
  text-transform: unset;
  width: 100%;
}
.close-icon {
  position: absolute;
  top: 0;
  right: 0;
}
</style>

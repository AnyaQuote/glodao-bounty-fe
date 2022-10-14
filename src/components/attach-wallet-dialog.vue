<template>
  <v-dialog v-model="authStore.attachWalletDialog" content-class=" rounded overflow-hidden" max-width="500" persistent>
    <v-sheet
      outlined
      class="position-relative pa-8 text-center dialog-normal-text overflow-hidden rounded neutral100--bg"
    >
      <!-- <div class="d-flex align-center"> -->
      <v-avatar size="64">
        <img :src="authStore.user.avatar" alt="Avatar" />
      </v-avatar>
      <div class="mt-3 ml-3 card-title-text font-weight-600">Set the BSC attached wallet</div>
      <!-- </div> -->
      <div class="mt-6 font-weight-600">Connect your wallet to continue:</div>
      <v-sheet outlined class="d-flex align-center justify-center mt-4 pa-1 neutral100--bg rounded">
        <v-text-field
          hide-details
          dense
          placeholder="Your wallet address"
          flat
          solo
          class="neutral100--bg link-submit-custom-input"
          @input="authStore.changeWalletDialogInput"
          :value="walletStore.account"
          readonly
        >
        </v-text-field>
        <v-btn
          width="100"
          class="dialog-btn rounded white--text linear-background-blue-main text-uppercase"
          depressed
          @click="authStore.saveAttachWallet()"
          :loading="authStore.isWalletUpdating"
          :disabled="!walletStore.account"
        >
          Set
        </v-btn>
      </v-sheet>
      <div class="mt-3">
        <!-- <v-btn
          class="dialog-btn rounded-0 black--text background-neutral"
          depressed
          @click="authStore.changeAttachWalletDialog(false)"
          :disabled="authStore.isWalletUpdating"
          >Ok, I'll set later</v-btn
        > -->
      </div>
      <div class="mt-3">
        <connect-metamask class="fill-width linear-background-blue-main" requiredChain="bsc" />
      </div>
      <div class="text-start mt-3 neutral10--text">
        <i>
          *This wallet is used to get reward when participating in Bounty Hunter. And you can edit this address for any
          bounty project!
        </i>
      </div>
      <v-icon
        class="close-icon"
        @click="authStore.changeAttachWalletDialog(false)"
        :disabled="authStore.isWalletUpdating"
        >mdi-window-close</v-icon
      >
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue } from 'vue-property-decorator'
import { authStore } from '@/stores/auth-store'
import { walletStore } from '@/stores/wallet-store'

@Observer
@Component({
  components: {
    'connect-wallet': () => import('@/components/connect-wallet.vue'),
    'connect-metamask': () => import('@/components/connect-metamask.vue'),
  },
})
export default class AttachWalletDialog extends Vue {
  authStore = authStore
  walletStore = walletStore
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
.v-btn--disabled {
  background-image: none;
}
</style>

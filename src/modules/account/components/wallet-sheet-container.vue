<template>
  <v-sheet class="neutral100 d-flex flex-column rounded-lg pa-6 pt-5 pb-3">
    <v-row>
      <v-col cols="12" class="pb-1">
        <v-sheet
          class="transparent d-flex justify-space-between align-center flex-wrap text-overflow-ellipsis"
          width="100%"
        >
          <v-sheet class="transparent d-flex align-center">
            <v-icon> mdi-wallet-outline </v-icon>
            <v-sheet
              class="transparent px-1 text-body-2 neutral10--text"
              :class="{
                'text-caption': $vuetify.breakpoint.xsOnly,
              }"
            >
              {{ vm.connectedWalletAddress }}
            </v-sheet>
          </v-sheet>
          <v-sheet
            class="transparent d-flex align-center"
            :class="{
              'mt-2': $vuetify.breakpoint.xsOnly,
            }"
          >
            <v-sheet
              :class="`transparent text-body-2 mr-3 neutral10--text text-capitalize ${labelColorClass}`"
              height="fit-content"
            >
              {{ connectWalletText }}
            </v-sheet>
            <v-icon size="14" color="green" v-if="labelColorClass === 'green--text'">mdi-check</v-icon>
          </v-sheet>
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <v-sheet class="neutral15 text-center rounded-lg pa-3 text-body-2 neutral10--text">
          <v-sheet class="transparent neutral10--text">GLD Staking</v-sheet>
          <v-sheet class="transparent pt-1 neutral10--text">
            <span class="font-weight-bold text-body-1 primary--text">{{ vm.stakeAmount }}</span> ${{ vm.stakeValue }}
          </v-sheet>
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <v-sheet class="neutral15 text-center rounded-lg pa-3 text-body-2 neutral10--text">
          <v-sheet class="transparent d-flex justify-center align-center" width="100%">
            <v-sheet class="transparent neutral10--text" height="fit-content"> Rank </v-sheet>
            <v-icon class="pl-1" color="blue" size="16">mdi-star</v-icon>
          </v-sheet>
          <v-sheet class="transparent font-weight-bold text-capitalize pt-1 text-body-1 neutral10--text">
            standard
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'
import { Observer } from 'mobx-vue'
import { HuntingHistoryViewModel } from '../viewmodels/hunting-history-viewmodel'
import { authStore } from '@/stores/auth-store'
import { walletStore } from '@/stores/wallet-store'
import { autorun } from 'mobx'

@Observer
@Component
export default class extends Vue {
  @Inject() vm!: HuntingHistoryViewModel
  authStore = authStore
  walletStore = walletStore
  disposer: any[] = []

  connectWalletText = 'not connected'
  labelColorClass = 'red--text'

  mounted() {
    this.disposer = [
      autorun(() => {
        if (!this.vm.isWalletConnected) this.connectWalletText = 'not connected'
        else if (!this.vm.isWalletMatched) this.connectWalletText = 'wrong wallet'
        else this.connectWalletText = 'connected'
        if (this.connectWalletText === 'connected') this.labelColorClass = 'green--text'
        else this.labelColorClass = 'red--text'
      }),
    ]
  }

  beforeDestroy() {
    this.disposer.forEach((d) => d())
  }
}
</script>
<style scoped>
.container-frame {
  cursor: pointer;
  word-break: break-all;
}
</style>

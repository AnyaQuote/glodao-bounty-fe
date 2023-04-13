<template>
  <v-sheet class="pa-6 mb-6 bluePrimary--border" color="#F0F7FF" rounded="lg" outlined>
    <v-card elevation="0" outlined rounded="lg">
      <v-card-text>
        <v-row>
          <v-col cols="1">
            <v-card
              outlined
              height="60px"
              width="60px"
              rounded="lg"
              class="pa-4 white--text font-weight-bold text-h5 d-flex justify-center align-center"
              :class="!data.currentApplyState.finished ? 'background-blue-diversity' : 'greenSenamatic--bg'"
              ><span v-if="!data.currentApplyState.finished">{{ data.stepIndex }}</span
              ><v-icon x-large color="white" v-else>mdi-checkbox-marked-circle-outline</v-icon></v-card
            ></v-col
          >
          <v-col cols="col">
            <div class="text-h5 font-weight-bold">Swap on Kyberswap</div>
            <div class="mt-2">
              Swap on Kyberswap<span v-if="data.pairsName"> with pairs {{ data.pairsName }} </span>
              to complete this task
            </div></v-col
          >
          <v-col class="text-right col-auto" v-if="data.masterController.missionStateController.isMissionProgressAble">
            <v-btn
              large
              v-if="data.link"
              class="text-none rounded-lg font-weight-bold text-subtitle-1 mx-2 py-6"
              depressed
              outlined
            >
              <span class="truncate-text">
                {{ data.link }}
              </span>
              <v-icon right>mdi-content-copy</v-icon>
            </v-btn>
            <v-btn
              large
              v-if="!data.link && !data.currentApplyState.finished"
              class="linear-background-blue-main white--text rounded-lg text-none font-weight-bold py-6"
              outlined
              depressed
              @click="openLink('https://kyberswap.com/')"
            >
              Start
            </v-btn>
            <span v-if="data.currentApplyState.finished" class="neutral0--text text-subtitle-1 font-weight-bold">
              Completed
            </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card
      elevation="0"
      outlined
      rounded="lg"
      class="mt-6 neutral100"
      v-if="data.masterController.missionStateController.isMissionProgressAble"
    >
      <v-card-text class="d-flex justify-space-between align-center">
        <v-text-field
          rounded
          dense
          v-if="!data.currentApplyState.finished"
          placeholder="Enter your wallet address for verification"
          hide-details="auto"
          :value="value"
          @input="onValueChange"
        >
        </v-text-field>
        <div v-else class="blue-diversity--text">{{ data.currentApplyState.link }}</div>
        <v-btn
          text
          v-if="!data.currentApplyState.finished"
          class="blue-diversity--text font-weight-bold text-subtitle-1 text-none"
          @click="verify"
          :loading="data.masterController.taskLoading"
        >
          Verify
        </v-btn>

        <div v-else class="neutral0--text font-weight-bold text-subtitle-1">Verified</div></v-card-text
      >
    </v-card>
  </v-sheet>
</template>

<script lang="ts">
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { get } from 'lodash-es'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { KyberTaskController } from '../../controllers/kyber-task-controller'

@Component
export default class KyberSwap extends Vue {
  @Prop({ required: true }) data!: KyberTaskController
  value = get(this.data, 'currentApplyState.link', '')
  onValueChange(value: string) {
    this.value = value
  }
  verify() {
    if (!this.value.trim()) snackController.error('Link cannot be empty')
    else {
      this.data.submit(this.value)
    }
  }
  openLink(link: string) {
    const url = link.trim()
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }
}
</script>

<style scoped>
.greenSenamatic--bg {
  background: var(--v-greenSenamatic-base);
}
.unqualify-msg {
  color: var(--v-redSenamatic-base);
  font-size: 12px;
}
</style>

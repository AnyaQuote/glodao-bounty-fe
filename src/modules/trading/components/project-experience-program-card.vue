<template>
  <v-sheet class="pa-6 mb-6 bluePrimary--border" color="#F0F7FF" rounded="lg" outlined>
    <v-card class="mb-6" elevation="0" outlined rounded="lg"
      ><v-card-text>
        <v-row
          ><v-col cols="1"
            ><v-card
              outlined
              height="60px"
              width="60px"
              rounded="lg"
              class="pa-4 white--text font-weight-bold text-h5 d-flex justify-center align-center"
              :class="!isVerify ? 'background-blue-diversity' : 'greenSenamatic--bg'"
              ><span v-if="!isVerify">{{ data.id }}</span
              ><v-icon x-large color="white" v-else>mdi-checkbox-marked-circle-outline</v-icon></v-card
            ></v-col
          ><v-col cols="9"
            ><div class="text-h5 font-weight-bold">{{ data.title }}</div>
            <div class="mt-2">
              {{ data.content }}
            </div></v-col
          ><v-col cols="2" class="text-right">
            <v-btn
              v-if="!isVerify"
              large
              class="linear-background-blue-main white--text text-none rounded-lg py-6 font-weight-bold"
              depressed
              >Start</v-btn
            >
            <span v-else class="neutral0--text text-subtitle-1 font-weight-bold">Completed</span></v-col
          ></v-row
        >
      </v-card-text></v-card
    >
    <v-card elevation="0" outlined rounded="lg"
      ><v-card-text class="d-flex justify-space-between align-center"
        ><v-text-field
          rounded
          dense
          v-if="!isVerify"
          placeholder="Enter your transaction hash to verify"
          hide-details="auto"
        ></v-text-field>
        <div v-else class="blue-diversity--text">>0xcA41405fB875753371D0FAf6e18891d87A7139Ce</div>
        <v-btn
          text
          v-if="!isVerify"
          class="blue-diversity--text font-weight-bold text-subtitle-1 text-none"
          @click="verify"
          >Verify</v-btn
        >

        <div v-else class="neutral0--text font-weight-bold text-subtitle-1">Verified</div></v-card-text
      ></v-card
    >
    <div v-if="isError" class="unqualify-msg mt-2">Invalid transaction. Please check and retry!</div>
  </v-sheet>
</template>

<script lang="ts">
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ProjectExperienceProgramCard extends Vue {
  @Prop({ required: true }) data
  isVerify = false
  isError = false
  verify() {
    if (this.data.id === 5) {
      const config = {
        icon: 'mdi-information-outline',
        title: 'Verification failed',
        message: 'We are unable to verify this task. Please check and try again later',
        color: '#000000',
        timeout: 5000,
      }
      snackController.config = config
      snackController.show = true
      this.isError = true
    } else {
      this.isVerify = true
      this.isError = false
    }
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

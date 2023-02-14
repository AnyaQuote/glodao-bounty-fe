<template>
  <div>
    <v-card class="mb-6" elevation="0" outlined rounded="lg"
      ><v-card-text>
        <v-row align="center"
          ><v-col cols="1">
            <v-card
              height="60px"
              width="60px"
              outlined
              elevation="0"
              class="text-h5 white--text font-weight-bold d-flex justify-center align-center"
              :class="!isVerify ? 'background-blue-diversity' : 'greenSenamatic--bg'"
              ><span v-if="!isVerify">{{ data.id }}</span
              ><v-icon x-large color="white" v-else>mdi-checkbox-marked-circle-outline</v-icon></v-card
            ></v-col
          ><v-col class="col"
            ><div class="font-weight-bold neutral0--text text-h5 mb-2">{{ data.title }}</div>
            <div class="text-subtitle-1">
              {{ data.content }}
            </div></v-col
          ><v-col class="text-right col-auto">
            <v-btn
              large
              v-if="data.link"
              class="text-none rounded-lg font-weight-bold text-subtitle-1 mx-2 py-6"
              depressed
              outlined
              ><span class="truncate-text">
                {{ data.link }}
              </span>
              <v-icon right>mdi-content-copy</v-icon></v-btn
            >
            <v-btn
              large
              v-if="!isVerify"
              class="blue-diversity--text rounded-lg text-none font-weight-bold py-6"
              :class="{ 'mx-2': !data.link }"
              outlined
              depressed
              @click="verify"
              >Verify</v-btn
            >
            <v-btn
              large
              v-if="!data.link && !isVerify"
              class="linear-background-blue-main white--text rounded-lg text-none font-weight-bold py-6"
              outlined
              depressed
              >Join</v-btn
            >
            <span v-if="isVerify" class="neutral0--text text-subtitle-1 font-weight-bold">Completed</span>
          </v-col></v-row
        >
      </v-card-text></v-card
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CommunitydataCard extends Vue {
  @Prop({ required: true }) data
  isVerify = false
  verify() {
    this.isVerify = true
  }
}
</script>

<style scoped>
.greenSenamatic--bg {
  background: var(--v-greenSenamatic-base);
}
.truncate-text {
  white-space: nowrap;
  width: 90px;
  overflow: hidden;
  text-overflow: clip;
}
</style>

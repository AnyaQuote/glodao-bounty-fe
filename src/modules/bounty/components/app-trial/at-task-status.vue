<template>
  <div>
    <div class="d-flex align-center">
      <v-sheet
        v-if="!task.finished"
        width="40"
        height="40"
        rounded="lg"
        class="font-weight-bold neutral15 text-h6 d-flex"
      >
        <span class="ma-auto">{{ task.step }}</span>
      </v-sheet>
      <v-sheet v-else width="40" height="40" rounded="lg" class="d-flex success">
        <v-icon color="white" class="ma-auto" size="35">mdi-check</v-icon>
      </v-sheet>
      <div class="text-h6 font-weight-bold flex-grow-1 ml-4 text-truncate">{{ task.context }}</div>
      <!-- <v-icon v-bind="attrs" v-on="on" color="bluePrimary">mdi-open-in-new</v-icon> -->
    </div>
  </div>
</template>

<script lang="ts">
import { DisplayAppTrialData } from '@/models/ApplyModel'
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

const defaultProp = () => ({})

@Observer
@Component
export default class AppTrialTaskStatus extends Vue {
  @Prop({ default: defaultProp }) task!: DisplayAppTrialData
}
</script>

<style scoped></style>

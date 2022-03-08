<template>
  <v-sheet height="140" outlined class="pa-3 pb-2 card-text" style="position: relative">
    <div class="custom-flag-container">
      <div class="custom-flag-css d-flex justify-end align-center background-blue-diversity pb-2 flex-column">
        <v-icon color="white" size="18"> mdi-twitter </v-icon>
      </div>
    </div>
    <div>
      <div class="rounded-circle d-flex justify-center card-project-small-icon">
        <v-icon color="white">mdi-minus</v-icon>
      </div>
      <div class="mt-1 font-family-proxima font-weight-bold card-title-text">The Peaky Blinder</div>
      <div class="mt-1 card-text">Short description about social tasks of project</div>
      <div class="d-flex justify-end mt-4 align-center">
        <div class="rounded-circle mr-1 d-flex justify-center align-center progress-icon-container">
          <v-icon size="8" color="black" class="font-weight-600">mdi-dots-horizontal</v-icon>
        </div>
        <div class="mr-2 font-italic font-weight-600">Processing</div>
        <v-sheet
          width="18"
          height="18"
          class="font-weight-bold d-flex align-center justify-center line-height-6 card-text background-neutral"
        >
          <span>3/5</span>
        </v-sheet>
      </div>
      <div class="mt-1 d-flex justify-space-between">
        <v-sheet v-for="i in 3" class="progress-step background-blue-diversity" :key="i"> </v-sheet>
        <v-sheet class="background-neutral progress-step"> </v-sheet>
        <v-sheet class="background-neutral progress-step"> </v-sheet>
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Ref, Provide, Prop } from 'vue-property-decorator'

@Observer
@Component
export default class CurrentTask extends Vue {}
</script>

<style scoped lang="scss">
.custom-flag-container {
  position: absolute;
  top: 0;
  right: 14px;
}
.custom-flag-css {
  clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
  width: 36px;
  height: 60px;
}
.progress-step {
  height: 4px;
  max-width: 100%;
  flex: 1;
  margin-right: 4px;
}
.progress-step:last-child {
  margin-right: 0;
}
.card-project-small-icon {
  width: 28px;
  height: 28px;
  background-color: var(--v-bluePrimary-base);
  color: white;
}
.progress-icon-container {
  width: 10px;
  height: 10px;
  border: 1px solid black;
}
</style>

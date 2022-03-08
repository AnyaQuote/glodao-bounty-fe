<template>
  <v-hover v-slot="{ hover }">
    <v-card class="mx-auto rounded-0" outlined>
      <div
        :class="{
          'backdrop-hover-overlay': hover,
        }"
      >
        <div class="pt-4 px-4 position-relative">
          <v-img height="236" src="https://picsum.photos/200"></v-img>
          <div class="start-date-container"></div>
          <div
            class="start-date-label d-flex justify-end py-2 pr-8 font-weight-600"
            style="opacity: 1; background: transparent"
          >
            Start in Jan 21st 2022 10:00 pm 🔥
          </div>
          <div class="position-absolute custom-chevron-flag-container rounded-0">
            <div class="custom-chevron-flag d-flex flex-column justify-center align-center pt-6 pb-3 elavation-10">
              <v-icon color="white" size="14" class="mb-2"> mdi-twitter </v-icon>
            </div>
          </div>
        </div>
        <div class="pa-4">
          <div>
            <div class="rounded-circle d-flex justify-center card-project-medium-icon background-blue-diversity">
              <v-icon color="white">mdi-minus</v-icon>
            </div>
            <div class="mt-2 font-family-proxima font-weight-bold card-big-title-text">The Peaky Blinder</div>
            <div class="custom-dash-divider my-3"></div>
            <div class="d-flex justify-space-between">
              <div>Total reward</div>
              <div class="font-weight-bold">1000 TVN</div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="justify-center align-center"
        :class="{
          'd-flex  card-hover-overlay': hover,
          'd-none': !hover,
        }"
      >
        <v-btn width="152" height="124">
          <div>
            <div>
              <v-icon>mdi-crown</v-icon>
            </div>
            <br />
            <div class="text-capitalize font-weight-bold card-big-title-text">Start hunting</div>
          </div>
        </v-btn>
      </div>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Ref, Provide, Prop } from 'vue-property-decorator'

@Observer
@Component
export default class CurrentTask extends Vue {}
</script>

<style scoped lang="scss">
@import url('~@/modules/bounty/styles/index.scss');
.backdrop-hover-overlay {
  filter: blur(8px);
  z-index: -1;
}
.card-hover-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  top: 0;
  left: 0;
  z-index: 2;
  border: 1px solid var(--v-bluePrimary-base);
  filter: blur(0) !important;
}
.custom-chevron-flag-container {
  top: 0;
  right: 28px;
  filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
}
.custom-chevron-flag {
  clip-path: polygon(100% 0, 100% 100%, 50% 82%, 0 100%, 0% 0%);
  background: var(--v-bluePrimary-base);
  width: 24px;
  min-height: 50px;
}
.start-date-container {
  height: 42px;
  width: 100%;
  position: absolute;
  background-color: white;
  bottom: 0;
  left: 0;
  opacity: 0.7;
}
.start-date-label {
  height: 42px;
  width: 100%;
  position: absolute;
  background-color: transparent;
  bottom: 0;
  left: 0;
  font-size: 14px;
  line-height: 24px;
  opacity: 1;
}
.card-project-medium-icon {
  width: 32px;
  height: 32px;
}
</style>

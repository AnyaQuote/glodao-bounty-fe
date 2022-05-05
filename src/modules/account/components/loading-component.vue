<template>
  <v-fade-transition>
    <v-sheet v-if="loading" height="320" outlined class="d-flex align-center justify-center neutral100--bg" rounded>
      <v-progress-circular lo :size="70" :width="7" color="bluePrimary" indeterminate></v-progress-circular>
    </v-sheet>
  </v-fade-transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class LoadingComponent extends Vue {
  @Prop({ required: true }) loading!: boolean
}
</script>

<style scoped></style>

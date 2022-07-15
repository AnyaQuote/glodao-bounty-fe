<template>
  <v-row>
    <v-col cols="12">
      <v-skeleton-loader type="image" class="rounded-xl" />
    </v-col>
    <v-col cols="12"> <v-skeleton-loader type="image" class="rounded-lg" height="120" /> </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" sm="8" order="2" order-sm="1">
          <v-skeleton-loader type="image, image" class="rounded-xl" />
        </v-col>
        <v-col cols="12" sm="4" order="1" order-sm="2">
          <v-skeleton-loader type="image" class="rounded-xl" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-skeleton-loader type="image" class="rounded-lg" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppTrialSkeletonLoader extends Vue {}
</script>

<style scoped></style>

<template>
  <v-dialog :value="true" width="80%">
    <a href="https://glodao-official.medium.com/glodao-awards-handbook-9c17a4b22801" target="_blank">
      <v-img :src="require('@/assets/images/popup-01.png')"></v-img>
    </a>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class OverlayBannerDialog extends Vue {}
</script>

<style scoped></style>

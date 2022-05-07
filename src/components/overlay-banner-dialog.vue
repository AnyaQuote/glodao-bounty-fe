<template>
  <v-dialog :value="true" width="80%">
    <v-img :src="require('@/assets/images/popup-01.png')" @click="openBannerLink"></v-img>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class OverlayBannerDialog extends Vue {
  openBannerLink = () => {
    // window.open('https://medium.com', '_blank')
  }
}
</script>

<style scoped></style>

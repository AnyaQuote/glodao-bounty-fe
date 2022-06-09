<template>
  <v-tooltip left nudge-left="">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        fab
        icon
        fixed
        style="bottom: 50px; right: 40px"
        class="bluePrimary elevation-2"
        color="bluePrimary"
        @click="openTechnicalSupportTelegram"
      >
        <v-icon color="white" size="36">mdi-face-agent</v-icon>
      </v-btn>
    </template>
    <span>Technical support</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CustomerSupportButton extends Vue {
  openTechnicalSupportTelegram() {
    window.open('https://t.me/glodao_technical_support', '_blank')
  }
}
</script>

<style scoped></style>

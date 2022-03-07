<template>
  <img :src="require(`@/assets/icons/${chain || 'bsc'}-icon.svg`)" v-bind="$attrs" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ChainLogo extends Vue {
  @Prop({ default: 'bsc' }) chain!: 'bsc' | 'eth' | 'sol'
}
</script>

<style scoped></style>

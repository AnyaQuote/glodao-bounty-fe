<template>
  <v-avatar :size="size" class="black-layer">
    <v-img :src="src" aspect-ratio="1" contain></v-img>
  </v-avatar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ProjectLogo extends Vue {
  @Prop({ required: true }) src!: string
  @Prop({ default: '64' }) size!: string
}
</script>

<style scoped>
.black-layer {
  background: #00102a;
}
</style>

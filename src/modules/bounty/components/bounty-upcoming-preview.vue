<template>
  <div class="preview-card rounded-lg mb-2" @click="toggleTab" v-ripple>
    <v-img class="preview-img rounded-lg" :src="coverImage" :aspect-ratio="1.55"></v-img>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) metadata!: any
  coverImage = this.metadata?.coverImage ?? 'https://diversity-api.contracts.dev/uploads/download_cff108eb0b.png'
  toggleTab() {
    this.$emit('onClick', this.$vnode.key)
  }
}
</script>

<style lang="scss" scoped>
.preview-card {
  &:hover {
    transform: scale(1.05);
    transition: transform 200ms ease-in-out;
    background-image: linear-gradient(to right, #0276f0, #0096ff, #00b3ff, #00cdff, #00e5ff);
  }
  .preview-img {
    border: 1px solid transparent !important;
  }
}
</style>

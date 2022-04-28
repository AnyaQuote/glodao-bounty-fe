<template>
  <div class="mb-2" @click="toggleTab" v-ripple>
    <v-img class="rounded-lg" :src="coverImage" :aspect-ratio="1.55"></v-img>
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

<style scoped></style>

<template>
  <div class="p-relative mb-2" @click="toggleTab" v-ripple>
    <v-img class="p-relative z-index-0 rounded-lg" :src="coverImage" :aspect-ratio="1.55"></v-img>
    <div
      class="p-absolute z-index-1 left-0 bottom-0 rounded-lg rounded-t-0 text-truncate blue--text pa-2 fill-width font-weight-medium"
      style="font-size: 1.125rem; background: rgba(255, 255, 255, 0.7)"
    >
      {{ name }}
    </div>
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

<style scoped>
.p-relative {
  position: relative;
}

.p-absolute {
  position: absolute;
}

.left-0 {
  left: 0;
}

.bottom-0 {
  bottom: 0;
}

.flex-1 {
  flex: 1;
}

.align-items-start {
  align-items: flex-start;
}
</style>

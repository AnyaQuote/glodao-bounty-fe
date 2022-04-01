<template>
  <div class="position-relative mb-2" @click="toggleTab" v-ripple>
    <v-img
      class="position-relative z-index-0 w-fill h-fill object-fit-cover border-radius-16"
      :src="coverImage"
      :aspect-ratio="1.55"
    ></v-img>
    <div
      class="position-absolute z-index-1 left-0 rounded-lg bottom-0 rounded-t-0 custom-white-bg w-fill font-size-18 text-truncate blue--text pa-2"
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
.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.z-index-0 {
  z-index: 0;
}

.z-index-1 {
  z-index: 1;
}

.w-fill {
  width: 100%;
}

.h-fill {
  height: 100%;
}

.object-fit-cover {
  object-fit: cover;
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

.border-radius-16 {
  border-radius: 16px;
}

.custom-white-bg {
  background: rgba(255, 255, 255, 0.7);
}

.font-size-18 {
  font-size: 18px;
  line-height: 21px;
  font-weight: 600;
}
</style>

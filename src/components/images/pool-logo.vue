<template>
  <div
    class="pool-logo pa-1 d-flex justify-center align-center"
    :style="
      'width:' +
      outlineSize +
      'px; ' +
      'height:' +
      outlineSize +
      'px; ' +
      'border-radius: ' +
      Math.floor(outlineSize / 2) +
      'px'
    "
  >
    <app-logo :width="logoSize" :height="logoSize" :avatar="img" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Observer } from 'mobx-vue'

@Observer
@Component({})
export default class PoolLogo extends Vue {
  @Prop() img: any
  @Prop({ default: 42 }) logoSize: any
  @Prop({ default: 56 }) outlineSize: any
}
</script>

<style lang="scss" scoped>
.pool-logo {
  background: #ffffff !important;
  overflow: hidden;
}
</style>

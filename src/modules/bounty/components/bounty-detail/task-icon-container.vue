<template>
  <v-sheet class="rounded flex-center-box elevation-2 white pa-1" width="48" height="48">
    <v-sheet :class="`flex-center-box rounded ${color} fill-width fill-height position-relative`">
      <v-icon size="22" color="white"> mdi-{{ type }} </v-icon>
      <v-sheet
        width="12"
        height="12"
        class="rounded-circle position-absolute active-indicator greenSenamatic--bg"
        v-if="isActive"
      ></v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {},
})
export default class BountyDetail extends Vue {
  @Prop({ required: true }) type!: string
  @Prop({ required: true }) isActive!: boolean
  @Prop({ default: 'blue' }) color = 'blue'
}
</script>
<style scoped>
.active-indicator {
  bottom: -1px;
  right: -1px;
  border: thin solid white;
}
.greenSenamatic--bg {
  background: var(--v-greenSenamatic-base);
}
.neutral20--bg {
  background: var(--v-neutral20-base);
}
.v-btn--disabled {
  background-image: none !important;
}
</style>

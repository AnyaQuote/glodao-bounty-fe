<template>
  <v-hover v-slot="{ hover }">
    <v-card
      outlined
      :class="{
        'card-border': !disableBorder,
        'no-border ': disableBorder,
        'big-primary-border': hover && !disableHover,
        darker: darker,
        shadow: !disableShadow,
        'blend-overlay': blendOverlay,
        'no-materilal-card': !hasMaterialCardBg,
        root: hasMaterialCardBg,
        'blur-md': blurLevel === 'blur-md',
        'blur-sm': blurLevel === 'blur-sm',
      }"
      :max-width="maxWidth"
      :v-bind="$attrs"
      :rounded="rounded"
    >
      <slot />
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Observer
@Component
export default class CardHover extends Vue {
  @Prop({ default: false }) disableHover
  @Prop({ default: false }) disableShadow
  @Prop({ default: false }) disableBorder
  @Prop({ default: false }) darker
  @Prop({ default: null }) maxWidth
  @Prop({ default: false }) rounded
  @Prop({ default: false }) blendOverlay
  @Prop({ default: true }) hasMaterialCardBg
  @Prop({ default: 'blur-md' }) blurLevel
}
</script>

<style lang="scss" scoped>
.no-border {
  border: none;
}
.theme--light {
  .root,
  .no-materilal-card {
    background: linear-gradient(179.93deg, rgba(255, 255, 255, 0.3) 2.53%, rgba(255, 255, 255, 0.3) 113.97%);
    background: rgba(255, 255, 255, 0.25);
    background-blend-mode: overlay;
    /* backdrop-filter: blur(12px); */
    border-radius: 24px !important;
    padding: 0;
  }
  .darker,
  .blend-overlay {
    background: #ef797240 !important;
  }
  .shadow {
    box-shadow: 2px 4px 16px rgba(239, 121, 114, 0.25) !important;
  }
  .card-border {
    border-width: 2px;
    border-color: white !important;
  }
}
.theme--dark {
  .card-border {
    border-width: 2px;
    border-color: #686868;
  }
  .root {
    background-blend-mode: overlay;
    border-radius: 24px !important;
    padding: 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .no-materilal-card {
    background: linear-gradient(to right, rgba(255, 199, 73, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%);
    background-blend-mode: overlay;
    padding: 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .darker {
    border: 2px solid var(--v-primary-base) !important;
    background: var(--v-primary-lighten-1);
  }
  .blend-overlay {
    // border: 2px solid linear-gradient(rgba(255, 199, 73, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%);
    background: transparent !important;
    background-blend-mode: overlay;
    /* backdrop-filter: blur(12px); */
  }
  .shadow {
    box-shadow: 2px 4px 16px rgba(255, 255, 187, 0.1) !important;
  }
}
.blur-md {
  backdrop-filter: blur(12px) !important;
}
.blur-sm {
  backdrop-filter: blur(1px) !important;
}

//do not remove blurLevel = 'blur-none' from component prop
</style>

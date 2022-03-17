<template>
  <v-sheet>
    <v-row dense no-gutters>
      <v-col cols="10">
        <v-sheet outlined>
          <v-text-field
            hide-details
            dense
            flat
            solo
            class="ma-0 pa-0 font-size-14"
            :placeholder="twitterTask.stepLink || 'https://www.waggle.network/v=gJJzlpw8fG8'"
            :readonly="twitterTask.finished"
            :value="value"
            @change="onValueChange"
          ></v-text-field>
        </v-sheet>
      </v-col>
      <v-col cols="2">
        <v-btn
          elevation="0"
          tile
          color="blue"
          class="fill-width white--text text-none font-size-14 linear-background-blue-main"
          height="100%"
          :disabled="vm.status === HUNTING.start || vm.status === HUNTING.finish || twitterTask.finished"
          @click="submitLink"
        >
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { Observer } from 'mobx-vue'
import { Component, Inject, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { BountyDetailViewModel, HUNTING } from '../viewmodels/bounty-detail-viewmodel'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
  },
})
export default class BountyDetail extends Vue {
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) twitterTask!: any
  @Prop({ required: true }) step!: number
  value = this.twitterTask.stepLink
  HUNTING = HUNTING

  onValueChange(value: string) {
    this.value = value
  }

  submitLink() {
    if (!this.value.trim()) snackController.error('Link cannot be empty')
    else this.vm.submitLink('twitter', this.value, this.step)
  }

  openLink(url) {
    window.open(url, '_blank')
  }
}
</script>
<style scoped>
.v-btn--disabled {
  background-image: none !important;
}
.black--border-thin {
  border: thin solid black;
}
.font-size-12 {
  font-size: 12px;
}
.font-size-14 {
  font-size: 14px;
}
.divider {
  border-left: 1px solid var(--v-grey-lighten1);
  height: 100%;
  margin-left: 9px;
  padding-top: 30px;
}

.ba-secondary {
  border: 1px solid var(--v-grey-base);
}

.line-height {
  line-height: 26px;
}

.border-color {
  border: 1px solid var(--v-bluePrimary-base);
}

.ba-dotted {
  border: 1px dashed var(--v-neutral20-base);
}

.logo-chain {
  width: 32px;
  height: 32px;
}

.card-status {
  top: 18px;
  left: 18px;
  background-color: rgba(255, 255, 255, 0.3);
}
.green-border-custom {
  border: thin solid var(--v-green-base);
}
.red-border-custom {
  border: thin solid var(--v-red-base);
}
.green-background-color {
  background-color: var(--v-green-base);
}
.red-background-color {
  background-color: var(--v-red-base);
}
</style>

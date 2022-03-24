<template>
  <v-sheet class="neutral100">
    <v-row dense no-gutters>
      <v-col cols="9" sm="10">
        <v-sheet outlined class="rounded rounded-r-0">
          <v-text-field
            hide-details
            dense
            flat
            solo
            class="ma-0 pa-0 text-caption neutral100 link-submit-custom-input"
            :placeholder="twitterTask.stepLink || 'https://twitter.com/CyberKDev/status/1505764152094035972'"
            :readonly="vm.shouldDisableTaskProcessing || twitterTask.finished"
            :value="value"
            @change="onValueChange"
          ></v-text-field>
        </v-sheet>
      </v-col>
      <v-col cols="3" sm="2">
        <v-btn
          elevation="0"
          tile
          class="fill-width white--text text-none linear-background-blue-main text-caption rounded rounded-l-0"
          height="100%"
          :disabled="vm.shouldDisableTaskProcessing || twitterTask.finished"
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
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel, HUNTING } from '../../viewmodels/bounty-detail-viewmodel'

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
</style>

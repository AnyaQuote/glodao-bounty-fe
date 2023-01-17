<template>
  <reward-claimer-v1 :claimer="claimer"></reward-claimer-v1>
</template>

<script lang="ts">
import { BountyClaimerStore } from '@/stores/bounty-claimer-stores'
import { Observer } from 'mobx-vue'
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    'reward-claimer-v1': () => import('@/modules/bounty-reward/pages/widgets/reward-claimer-v1.vue'),
  },
})
export default class RewardClaimer extends Vue {
  @Prop({ required: true }) claimer!: BountyClaimerStore
}
</script>

<style></style>

<template>
  <div>
    <follow-task v-if="type === 'follow'" :twitterTask="twitterTask" :step="step" :state="state" />
    <tweet-task v-if="type === 'tweet'" :twitterTask="twitterTask" :step="step" :state="state" />
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'
import { get } from 'lodash-es'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
    'follow-task': () => import('@/modules/bounty/components/bounty-detail/twitter-task/follow-task.vue'),
    'tweet-task': () => import('@/modules/bounty/components/bounty-detail/twitter-task/tweet-task.vue'),
  },
})
export default class BountyDetail extends Vue {
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) twitterTask!: any
  @Prop({ required: true }) step!: number
  type = get(this.twitterTask, 'type', '')
  title = ''
}
</script>
<style scoped>
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

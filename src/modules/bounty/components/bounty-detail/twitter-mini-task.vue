<template>
  <div>
    <follow-task v-if="type === 'follow'" :twitterTask="twitterTask" :step="step" />
    <tweet-task v-else-if="type === 'tweet'" :twitterTask="twitterTask" :step="step" />
    <quote-task v-else-if="type === 'quote'" :twitterTask="twitterTask" :step="step" />
    <comment-task v-else-if="type === 'comment'" :twitterTask="twitterTask" :step="step" />
    <like-task v-else-if="type === 'like'" :twitterTask="twitterTask" :step="step" />
    <retweet-task v-else-if="type === 'retweet'" :twitterTask="twitterTask" :step="step" />
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel } from '@/modules/bounty/viewmodels/bounty-detail-viewmodel'
import { get } from 'lodash-es'
import { BountyMixViewModel } from '../../viewmodels/bounty-mix-viewmodel'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
    'follow-task': () => import('@/modules/bounty/components/bounty-detail/twitter-task/follow-task.vue'),
    'tweet-task': () => import('@/modules/bounty/components/bounty-detail/twitter-task/tweet-task.vue'),
    'quote-task': () => import('@/modules/bounty/components/bounty-detail/twitter-task/quote-task.vue'),
    'comment-task': () => import('@/modules/bounty/components/bounty-detail/twitter-task/comment-task.vue'),
    'like-task': () => import('@/modules/bounty/components/bounty-detail/twitter-task/like-task.vue'),
    'retweet-task': () => import('@/modules/bounty/components/bounty-detail/twitter-task/retweet-task.vue'),
  },
})
export default class BountyDetail extends Vue {
  @Inject() vm!: BountyDetailViewModel | BountyMixViewModel
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

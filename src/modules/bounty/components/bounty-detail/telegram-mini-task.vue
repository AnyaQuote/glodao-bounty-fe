<template>
  <div>
    <follow-task v-if="type === 'follow'" :telegramTask="telegramTask" :step="step" />
    <follow-task v-else-if="type === 'chat'" :telegramTask="telegramTask" :step="step" />
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
    'follow-task': () => import('@/modules/bounty/components/bounty-detail/telegram-task/follow-task.vue'),
    'chat-task': () => import('@/modules/bounty/components/bounty-detail/telegram-task/chat-task.vue'),
  },
})
export default class TelegramMiniTask extends Vue {
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) telegramTask!: any
  @Prop({ required: true }) step!: number
  type = get(this.telegramTask, 'type', '')
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

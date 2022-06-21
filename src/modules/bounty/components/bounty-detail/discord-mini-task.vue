<template>
  <div>
    <join-server-task v-if="type === 'join-server'" :discordTask="discordTask" :step="step" />
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
    'join-server-task': () => import('@/modules/bounty/components/bounty-detail/discord-task/join-server-task.vue'),
  },
})
export default class DiscordMiniTask extends Vue {
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) discordTask!: any
  @Prop({ required: true }) step!: number
  type = get(this.discordTask, 'type', '')
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

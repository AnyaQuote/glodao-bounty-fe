<template>
  <div>
    <learn-task v-if="type === 'quiz'" :task="task" :step="step" />
    <share-record-task v-else-if="type === 'share'" :task="task" :step="step" />
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { get } from 'lodash-es'

@Observer
@Component({
  components: {
    'learn-task': () => import('@/modules/bounty/components/bounty-detail/learn-task/learn.vue'),
    'share-record-task': () => import('@/modules/bounty/components/bounty-detail/learn-task/share-record-task.vue'),
  },
})
export default class BountyDetail extends Vue {
  @Prop({ required: true }) task!: any
  @Prop({ required: true }) step!: number
  type = get(this.task, 'type', '')
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

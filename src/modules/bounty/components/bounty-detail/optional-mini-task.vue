<template>
  <div>
    <custom-optional-task :task="task" v-if="type === 'custom'" :step="step" />
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { get } from 'lodash-es'

@Observer
@Component({
  components: {
    'optional-task': () => import('@/modules/bounty/components/bounty-detail/optional-task/optional-task.vue'),
    'custom-optional-task': () =>
      import('@/modules/bounty/components/bounty-detail/optional-task/custom-optional-task.vue'),
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

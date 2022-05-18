<template>
  <div>
    <v-row dense no-gutters>
      <v-col class="pa-2 pa-sm-3 pa-md-4 col-auto">
        <task-icon-container type="school" :isActive="vm.isHuntingProcessStarted && state === 0" color="purple" />
      </v-col>
      <v-col class="col">
        <div class="pa-2 pa-sm-4">
          <div class="text-body-1 font-weight-600">Explore PeakyBlinder</div>
          <div class="text-caption mt-1">Learn about project and answer our question to complete task.</div>
        </div>
        <div class="px-2 px-sm-3 px-md-4 mb-3 mb-md-4 border-radius-8 position-relative">
          <img
            class="border-radius-8 position-absolute"
            src="@/assets/images/bounty-history-bg.png"
            aspect-ratio=""
            style="width: 100%; height: 100%"
          />
          <div class="fill-width fill-height position-absolute black border-radius-8" style="opacity: 0.2"></div>
          <div class="pa-6 white--text" style="z-index: 3; position: relative">
            <div class="text-h6 font-weight-bold">What Is Peaky Blinder (PBB)?</div>
            <div class="text-body-2">
              Peaky Blinder is a decentralized community-driven blockchain project focused on creating an ecosystem with
              true governance.
            </div>
            <v-btn class="text-none linear-background-blue-main mt-2 white--text" depressed> Learn more</v-btn>
          </div>
        </div>
      </v-col>
      <v-col class="col-auto">
        <div class="pa-2 pa-sm-3 pa-md-4">
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle greenSenamatic--bg"
            style="padding: 1px"
            v-if="task.finished"
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box">
              <v-icon size="18" color="greenSenamatic" v-if="task.finished">mdi-check</v-icon>
            </v-sheet>
          </v-sheet>
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle neutral20--bg"
            style="padding: 1px"
            v-else-if="!vm.isHuntingProcessStarted"
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box"> </v-sheet>
          </v-sheet>
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle"
            :class="{
              'linear-background-blue-main': state === 0,
              'greenSenamatic--bg': state === 1,
              'neutral20--bg': state === -1,
            }"
            style="padding: 1px"
            v-else
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box">
              <v-icon size="18" color="greenSenamatic" v-if="task.finished">mdi-check</v-icon>
            </v-sheet>
          </v-sheet>
        </div>
      </v-col>
    </v-row>
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
    'task-icon-container': () => import('@/modules/bounty/components/bounty-detail/task-icon-container.vue'),
  },
})
export default class LearnTask extends Vue {
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) task!: any
  @Prop({ required: true }) step!: number
  type = get(this.task, 'type', '')
  page = get(this.task, 'page', '')
  title = ''

  openJoinTelegramLink() {
    this.openLink(get(this.task, 'link', ''))
    this.vm.submitLink('telegram', '', this.step)
  }
  openLink(link: string) {
    const url = link.trim()
    if (url.startsWith('https://') || url.startsWith('http://')) window.open(url, '_blank')
    else window.open('https://' + url, '_blank')
  }

  get state() {
    if (this.vm.isUserTaskCompleted || this.vm.isTaskProcessFinish) return 1
    if (this.vm.isHuntingProcessStarted && this.task.activeStep) return 0
    else if (this.task.finished) return 1
    else return -1
  }
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

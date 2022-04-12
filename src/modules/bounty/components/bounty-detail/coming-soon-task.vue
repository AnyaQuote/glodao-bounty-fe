<template>
  <div>
    <v-row dense no-gutters>
      <v-col cols="auto" class="mr-auto pa-2 pa-sm-3 pa-md-4">
        <v-sheet class="rounded flex-center-box pa-1" color="white" elevation="2" width="48" height="48">
          <v-sheet
            :class="`flex-center-box rounded neutral20--bg-light-persistent fill-width fill-height position-relative`"
          >
            <v-icon size="22" color="white"> mdi-{{ icon }} </v-icon>
          </v-sheet>
        </v-sheet>
      </v-col>
      <v-col>
        <div class="pa-2 pa-sm-4">
          <div class="text-body-1 font-weight-600">{{ title }}</div>
          <div class="text-caption mt-1">Coming soon</div>
        </div>
      </v-col>
      <v-col cols="auto" class="ml-auto">
        <div class="pa-2 pa-sm-3 pa-md-4">
          <v-sheet height="24" width="24" class="rounded-circle neutral20--bg" style="padding: 1px">
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box"> </v-sheet>
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

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
    'task-icon-container': () => import('@/modules/bounty/components/bounty-detail/task-icon-container.vue'),
  },
})
export default class TelegramComingsoon extends Vue {
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) title!: any
  @Prop({ required: true }) icon!: number
}
</script>
<style scoped>
.greenSenamatic--bg {
  background: var(--v-greenSenamatic-base);
}
.neutral20--bg {
  background: var(--v-neutral20-base);
}
.neutral20--bg-light-persistent {
  background: #e5e5e5;
}
.v-btn--disabled {
  background-image: none !important;
}
</style>

<template>
  <router-link tag="div" :to="`/bounty/${id}`" class="cursor-pointer">
    <v-card
      class="mx-auto overflow-hidden border-radius-16 neutral100 fill-height cursor-pointer"
      elevation="3"
      outlined
    >
      <div class="position-relative">
        <v-img :src="coverImage" :aspect-ratio="1.5"></v-img>
        <div class="position-absolute" style="top: 10px; left: 10px">
          <v-sheet
            class="border-radius-8 font-weight-bold flex-center-box text-center px-2 white--text"
            height="25"
            color="blue"
            >Event mission #{{ task | _get('missionIndex', 0) }}</v-sheet
          >
        </div>
      </div>
      <div class="pa-4 pb-6">
        <div class="d-flex align-center">
          <v-sheet class="rounded-circle white--bg flex-center-box pa-3" outlined>
            <v-icon :color="spareIconColor" size="40">{{ spareIcon }}</v-icon>
          </v-sheet>
          <div class="text-h4 bluePrimary--text font-weight-bold ml-3">
            {{ task | _get('name') }}
          </div>
        </div>
        <v-sheet class="bluePrimary lighten-3 mt-4 px-4 py-3 rounded">
          <v-row dense no-gutters>
            <v-col cols="6" class="text-center">
              <div class="font-weight-bold text-h5">${{ totalReward | formatNumber(2) }}</div>
              <div class="text-h6 neutral10--text font-weight-600">reward</div>
            </v-col>
            <v-col cols="6" class="text-center">
              <div class="font-weight-bold text-h5">{{ totalPrize }}</div>
              <div class="text-h6 neutral10--text font-weight-600">prizes</div>
            </v-col>
          </v-row>
        </v-sheet>
      </div>
    </v-card>
  </router-link>
</template>

<script lang="ts">
import { MissionType } from '@/models/TaskModel'
import { get } from 'lodash'
import { Observer } from 'mobx-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    ProjectLogo: () => import('@/components/project-logo.vue'),
  },
})
export default class BountyCard extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) task!: any
  coverImage = get(this.task, 'metadata.coverImage', '')
  spareIcon = get(this.task, 'metadata.spareIcon', '')
  spareIconColor = get(this.task, 'metadata.spareIconColor', '')
  totalReward = get(this.task, 'rewardAmount', '')
  totalPrize = get(this.task, 'maxPriorityParticipants', 0)

  openLink() {
    const missionType = get(this.task, 'type', '')
    if (missionType === 'iat') {
      this.$router.push(`/bounty/iat/${this.id}`)
    } else {
      this.$router.push(`/bounty/${this.id}`)
    }
  }

  get missionTypeText() {
    const missionType = get(this.task, 'type', '')
    switch (missionType) {
      case MissionType.APP_TRIAL:
        return 'App Trial mission'
      case MissionType.LEARN:
        return 'Learn mission'
      case MissionType.BOUNTY:
        return 'Social mission'
      default:
        return 'Mission'
    }
  }
}
</script>

<style scoped lang="scss">
.border-radius-16 {
  border-radius: 16px;
}
.white--bg {
  background: white;
}
</style>

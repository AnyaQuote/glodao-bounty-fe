<template>
  <router-link tag="div" :to="`/bounty-history/${id}`">
    <v-hover v-slot="{ hover }">
      <v-card
        class="mx-auto overflow-hidden border-radius-8px neutral100 fill-height"
        :class="{ 'move-up': hover, 'move-down': !hover }"
        elevation="3"
        outlined
      >
        <div class="position-relative">
          <v-img height="236" :src="coverImage" :aspect-ratio="1.5"></v-img>
          <div class="position-absolute" style="top: 10px; left: 10px">
            <v-sheet
              class="rounded-pill flex-center-box text-center px-2"
              :class="{
                'black--text': missionType !== 'learn',
                'white--text': missionType === 'learn',
              }"
              height="25"
              :color="missionType === 'learn' ? 'purple' : 'white'"
              >{{ missionTypeText }} #{{ task | _get('missionIndex', 0) }}</v-sheet
            >
          </div>
          <div class="start-date-container" v-if="isEnded"></div>
          <div class="start-date-label d-flex justify-end py-2 pr-8 font-weight-600 black--text" v-if="isEnded">
            Closed: {{ endTime | datetime }}
          </div>
        </div>
        <div class="pa-4">
          <div>
            <div class="rounded-circle d-flex justify-center card-project-medium-icon">
              <project-logo :src="projectLogo" :size="32"></project-logo>
            </div>
            <div class="mt-2 font-family-proxima font-weight-bold card-big-title-text bluePrimary--text">
              {{ name }}
            </div>
            <div class="custom-dash-divider my-3"></div>
            <div class="d-flex justify-space-between">
              <div>Total reward</div>
              <div class="font-weight-bold">${{ value | formatNumber(2) }}</div>
            </div>
            <div class="d-flex justify-space-between mt-2">
              <div>Participants</div>
              <div class="font-weight-bold">{{ totalParticipants }}</div>
            </div>
          </div>
        </div>
      </v-card>
    </v-hover>
  </router-link>
</template>

<script lang="ts">
import { MissionType } from '@/models/TaskModel'
import { FixedNumber } from '@ethersproject/bignumber'
import { get } from 'lodash'
import { Observer } from 'mobx-vue'
import moment from 'moment'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    ProjectLogo: () => import('@/components/project-logo.vue'),
  },
})
export default class BountyCard extends Vue {
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) startTime!: string
  @Prop({ required: true }) endTime!: string
  @Prop({ required: true }) rewardAmount!: number
  @Prop({ required: true }) chainId!: number
  @Prop({ required: true }) metadata!: any
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) types!: string[]
  @Prop({ required: true }) totalParticipants!: number
  @Prop({ required: true }) task!: any
  value = 'TBA'
  coverImage = this.metadata?.coverImage ?? 'https://diversity-api.contracts.dev/uploads/download_cff108eb0b.png'
  rewardTokenName = this.metadata?.rewardToken ?? ''
  isEnded = moment(this.endTime).isBefore(moment())
  projectLogo = this.metadata?.projectLogo ?? ''
  missionType = get(this.task, 'type', '')
  optionalTokens = get(this.task, 'optionalTokens', [])

  mounted() {
    const tempBaseTokenValue = FixedNumber.from(`${this.task.rewardAmount}`).mulUnsafe(
      FixedNumber.from(`${this.task.tokenBasePrice}`)
    )
    let optionalTokenTotalValue = FixedNumber.from('0')
    this.optionalTokens.forEach((token) => {
      optionalTokenTotalValue = optionalTokenTotalValue.addUnsafe(
        FixedNumber.from(`${token.rewardAmount}`).mulUnsafe(FixedNumber.from(`${token.tokenBasePrice}`))
      )
    })
    this.value = tempBaseTokenValue.addUnsafe(optionalTokenTotalValue)._value
  }
  openLink() {
    if (this.missionType === MissionType.APP_TRIAL) {
      this.$router.push(`/bounty/iat/${this.id}`)
    } else {
      this.$router.push(`/bounty/${this.id}`)
    }
  }

  get missionTypeText() {
    switch (this.missionType) {
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
.border-radius-8px {
  border-radius: 8px !important;
}

.start-date-container {
  height: 42px;
  width: 100%;
  position: absolute;
  background-color: white;
  bottom: 0;
  left: 0;
  opacity: 0.7;
}
.start-date-label {
  height: 42px;
  width: 100%;
  position: absolute;
  background-color: transparent;
  bottom: 0;
  left: 0;
  font-size: 14px;
  line-height: 24px;
  opacity: 1;
}
.card-project-medium-icon {
  width: 32px;
  height: 32px;
}

.move-up {
  transform: translateY(-12px);
  transition: transform 300ms ease-in-out;
}

.move-down {
  transform: translateY(-0px);
  transition: transform 300ms ease-in-out;
}
</style>

<template>
  <v-sheet class="overflow-hidden rounded-lg neutral100--bg fill-height" elevation="3">
    <v-sheet class="position-relative">
      <div class="position-relative">
        <v-img :src="coverImageUrl" :aspect-ratio="1.5"></v-img>
        <!-- <video
          width="100%"
          height="100%"
          loop
          autoplay
          muted
          v-if="coverVideo"
          style="position: absolute; top: 0; left: 0; object-fit: cover"
        >
          <source :src="coverVideo" type="video/mp4" />
          Your browser does not support HTML video.
        </video> -->
        <div class="position-absolute" style="top: 10px; left: 10px">
          <v-sheet class="rounded-pill flex-center-box text-center px-2" :class="missionTypeTextStyle" height="25"
            >{{ missionTypeText }} #{{ task | _get('missionIndex', 0) }}</v-sheet
          >
        </div>
      </div>
      <div class="fill-width" style="position: absolute; bottom: 0">
        <div class="d-flex justify-center">
          <div class="rounded-pill mb-3 linear-border-blue-main">
            <countdown
              class="countdown text-h6 text-sm-body-2 text-md-h6 text-md-h6 white black--text border-radius-16"
              style="border-radius: 16px !important"
              :targetDate="endTime"
              :textMargin="$vuetify.breakpoint.smOnly ? 'mx-2' : 'mx-3'"
              :padding="$vuetify.breakpoint.smOnly ? 'px-2' : 'px-3'"
            >
              <template slot="append">
                <div class="font-weight-bold neutral10--text text-truncate mx-2">left</div>
                <div class="flame-emoji">🔥</div>
              </template>
            </countdown>
          </div>
        </div>
      </div>
    </v-sheet>

    <div class="d-flex flex-column pa-6 mt-2">
      <div class="d-flex align-center">
        <project-logo :src="projectLogo" size="48"></project-logo>
        <div
          class="bluePrimary--text ml-6 text-truncate flex-grow-1 font-weight-bold"
          :class="{
            'text-h5': $vuetify.breakpoint.smAndDown,
            title: !$vuetify.breakpoint.smAndDown,
          }"
        >
          {{ name }}
        </div>
      </div>

      <v-sheet class="mt-5 text-body-1 neutral10--text text-truncate webkit-line-clamp-2 neutral100--bg" min-height="40"
        >{{ task.shortDescription }}
      </v-sheet>

      <v-row dense no-gutters class="mt-5">
        <v-col cols="6">
          <div
            class="neutral10--text font-size-20"
            :class="{
              'text-body-1': $vuetify.breakpoint.smAndDown,
            }"
          >
            Value
          </div>
          <div
            class="font-weight-bold mt-1 font-size-28 text-truncate"
            :class="{
              'text-body-1': $vuetify.breakpoint.smAndDown,
            }"
            v-if="!isRewardTBD && shouldShowValueInstead"
          >
            {{ value | usdCustom(2, 2) }}
          </div>
          <div
            class="font-weight-bold mt-1 font-size-28 text-truncate"
            :class="{
              'text-body-1': $vuetify.breakpoint.smAndDown,
            }"
            v-else-if="!shouldShowValueInstead"
          >
            {{ rewardAmount }} {{ tokenName }}
          </div>
          <div
            class="font-weight-bold mt-1 font-size-28 text-truncate"
            :class="{
              'text-body-1': $vuetify.breakpoint.smAndDown,
            }"
            v-else
          >
            TBA
          </div>
        </v-col>
        <v-col cols="6">
          <div
            class="neutral10--text font-size-20"
            :class="{
              'text-body-1': $vuetify.breakpoint.smAndDown,
            }"
          >
            Participants
          </div>
          <div
            class="font-weight-bold mt-1 font-size-28 text-truncate"
            :class="{
              'text-body-1': $vuetify.breakpoint.smAndDown,
            }"
          >
            {{ participant | formatNumber(0, 0) }}
          </div>
        </v-col>
      </v-row>

      <!-- Button start -->
      <v-btn
        class="btn transparent btn-text text-capitalize white--text rounded-lg font-size-20 mt-6"
        width="100%"
        large
        @click="openLink()"
        height="56"
      >
        <v-img class="mr-3" :src="require('@/assets/icons/crown-white.svg')" max-height="25" max-width="25"></v-img>
        <span class="font-size-20 white--text">Start hunting</span>
      </v-btn>
      <!-- Button end -->
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { MissionType } from '@/models/TaskModel'
import { FixedNumber } from '@ethersproject/bignumber'
import { get } from 'lodash'
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    countdown: () => import('@/modules/bounty/components/countdown.vue'),
    ProjectLogo: () => import('@/components/project-logo.vue'),
  },
})
export default class HuntingTimeCard extends Vue {
  @Prop({ required: true }) coverImageUrl!: string
  @Prop({ required: true }) endTime!: string
  @Prop({ default: 'bsc' }) chainId!: 'bsc' | 'eth' | 'sol'
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) rewardAmount!: number
  @Prop({ required: true }) tokenName!: string
  @Prop({ required: true }) participant!: number
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) projectLogo!: string
  @Prop({ required: true }) task!: any
  value = `${this.rewardAmount}`
  coverVideo = get(this.task, 'metadata.coverVideo', '')
  missionCompleteCount: any = 'TBA'
  missionType = get(this.task, 'type', '')
  optionalTokens = get(this.task, 'optionalTokens', [])
  shouldShowValueInstead = this.optionalTokens.length > 0

  mounted() {
    const tempBaseTokenValue = FixedNumber.from(`${this.rewardAmount}`).mulUnsafe(
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

  get missionTypeTextStyle() {
    switch (this.missionType) {
      case MissionType.BOUNTY:
        return 'black--text white'
      case MissionType.LEARN:
        return 'white--text purple'
      case MissionType.APP_TRIAL:
        return 'white--text blue'
      default:
        return 'Mission'
    }
  }

  get isRewardTBD() {
    try {
      return FixedNumber.from(`${this.value.substring(0, 4)}`).isZero()
    } catch (error) {
      return true
    }
  }
}
</script>

<style scoped lang="scss">
.countdown-container {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.countdown {
  min-width: 60%;
  max-width: 100%;
}
.title-container {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
}
.title {
  font-weight: 700;
  font-size: 40px !important;
  line-height: 130%;
}
.btn {
  background: linear-gradient(90deg, #0276f0 0%, #00e5ff 113.65%);
}
.btn-text {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}
.webkit-line-clamp-2 {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: pre-wrap !important;
}
.flex-grow-1 {
  flex-grow: 1;
}
.font-size-20 {
  font-size: 20px;
}
.font-size-28 {
  font-size: 28px;
}
.flame-emoji {
  line-height: 42px;
  font-size: 24px;
}
.linear-border-blue-main {
  position: relative;
}
.border-radius-16 {
  border-radius: 16px !important;
}

.linear-border-blue-main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(to right, #0276f0, #0096ff, #00b3ff, #00cdff, #00e5ff);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
</style>

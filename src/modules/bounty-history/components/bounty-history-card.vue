<template>
  <router-link :to="`/bounty-history/${id}`">
    <v-sheet class="fill-width pa-4 rounded-lg neutral100--bg" outlined min-height="102px" elevation="3">
      <v-row dense no-gutters v-if="$vuetify.breakpoint.mdAndUp">
        <v-col
          cols="12"
          md="2"
          :class="{
            'pr-8': $vuetify.breakpoint.mdAndUp,
          }"
        >
          <div class="position-relative">
            <v-img class="rounded-lg bounty-image-md" min-height="70" :src="coverImage" :aspect-ratio="1.5"></v-img>
            <div class="position-absolute" style="top: 5px; left: 5px">
              <v-sheet
                class="rounded-circle flex-center-box text-center black--text text-caption"
                width="20"
                height="20"
                color="white"
                >{{ task | _get('missionIndex', 0) }}</v-sheet
              >
            </div>
          </div>
        </v-col>
        <v-col cols="6" md="3" class="d-flex align-center">
          <div>
            <div>
              <project-logo :src="projectLogo" :size="26"></project-logo>
            </div>
            <div class="card-title-text mt-2 font-weight-bold bluePrimary--text">{{ name }}</div>
          </div>
        </v-col>
        <v-col cols="6" md="2" class="d-flex align-center">
          <div>
            <div class="small-caption-text">Total reward</div>
            <div class="d-flex align-center mt-2 font-weight-bold" v-if="shouldShowValueInstead">
              <div>{{ value | usdCustom(2, 2) }}</div>
            </div>
            <div class="d-flex align-center mt-2 font-weight-bold" v-if="!shouldShowValueInstead">
              <div>{{ totalReward }} {{ rewardToken }}</div>
            </div>
          </div>
        </v-col>
        <v-col cols="6" md="2" class="d-flex align-center">
          <div>
            <div class="small-caption-text">Participants</div>
            <div class="d-flex align-center mt-2 font-weight-bold">
              <div>{{ totalParticipants }}</div>
            </div>
          </div>
        </v-col>
        <v-col class="d-flex align-center justify-end">
          <div>
            <div class="small-caption-text">Closed</div>
            <div class="d-flex align-center mt-2 font-weight-bold">
              <div>{{ endTime | datetime }}</div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row dense no-gutters v-else>
        <v-col cols="12" md="2">
          <div class="position-relative">
            <v-img
              class="rounded-lg"
              min-height="70"
              :class="{
                'bounty-image-sm': $vuetify.breakpoint.smAndDown,
                'bounty-image-sm-lg': $vuetify.breakpoint.smOnly,
              }"
              :src="coverImage"
              :aspect-ratio="1.5"
            ></v-img>
            <div class="position-absolute" style="top: 10px; left: 10px">
              <v-sheet
                class="rounded-circle flex-center-box text-center black--text"
                width="25"
                height="25"
                color="white"
                >{{ task | _get('missionIndex', 0) }}</v-sheet
              >
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="d-flex align-center">
          <div class="d-flex align-center mt-2 fill-width">
            <div class="mr-4">
              <project-logo :src="projectLogo" :size="26"></project-logo>
            </div>
            <div class="card-title-text font-weight-bold bluePrimary--text">{{ name }}</div>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between mt-2">
            <div class="text-body-2">Total reward</div>
            <div class="font-weight-bold text-body-1" v-if="!isRewardTBD && shouldShowValueInstead">
              {{ value | usdCustom(2, 2) }}
            </div>
            <div class="font-weight-bold text-body-1" v-else-if="!shouldShowValueInstead">
              {{ totalReward }} {{ rewardToken }}
            </div>
            <div class="font-weight-bold text-body-1" v-else>TBA</div>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between mt-2">
            <div class="text-body-2">Participants</div>
            <div class="font-weight-bold text-body-1">{{ totalParticipants }}</div>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between mt-2">
            <div class="text-body-2">Closed time</div>
            <div class="font-weight-bold text-body-1">{{ endTime | datetime }}</div>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </router-link>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { get } from 'lodash'
import { FixedNumber } from '@ethersproject/bignumber'

@Observer
@Component({
  components: {
    ProjectLogo: () => import('@/components/project-logo.vue'),
  },
})
export default class HuntingHistoryCard extends Vue {
  @Prop({ required: true }) coverImage!: string
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) endTime!: string
  @Prop({ required: true }) chainId!: string
  @Prop({ required: true }) rewardToken!: string
  @Prop({ required: true }) totalReward!: string
  @Prop({ required: true }) totalParticipants!: string
  @Prop({ required: true }) projectLogo!: string
  @Prop({ required: true }) task!: any

  value = 'TBA'
  optionalTokens = get(this.task, 'optionalTokens', [])
  shouldShowValueInstead = this.optionalTokens.length > 0

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
.small-caption-text {
  font-size: 14px;
  line-height: 20px;
  color: var(--v-neutral10-base);
}
.medium-caption-text {
  font-size: 20px;
  line-height: 26px;
}
.bounty-image-md {
  height: 90px;
}
.bounty-image-sm {
  height: 200px;
}
.bounty-image-sm-lg {
  height: 300px;
}
</style>

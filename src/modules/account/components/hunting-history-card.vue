<template>
  <v-sheet class="fill-width pa-4 rounded-lg neutral100--bg" outlined min-height="102px">
    <v-row dense no-gutters>
      <v-col
        cols="12"
        md="2"
        class=""
        :class="{
          'pr-7': $vuetify.breakpoint.mdAndUp,
          'mb-2': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div class="position-relative">
          <v-img
            class="rounded-lg"
            min-height="70"
            :class="{
              'bounty-image-sm': $vuetify.breakpoint.smAndDown,
              'bounty-image-md': $vuetify.breakpoint.mdAndUp,
            }"
            :src="coverImage"
          ></v-img>
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
            <!-- <chain-logo :chain="chainId" class="fill-width fill-height" /> -->
            <project-logo :src="projectLogo" :size="26"></project-logo>
            <!-- <v-avatar color="primary" size="26"></v-avatar> -->
          </div>
          <div class="card-title-text mt-2 font-weight-600">{{ name }}</div>
        </div>
      </v-col>
      <v-col
        cols="6"
        md="1"
        class="d-flex align-center"
        :class="{
          'justify-end': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div>
          <div
            class="small-caption-text"
            :class="{
              'text-end': $vuetify.breakpoint.smAndDown,
            }"
          >
            Social task
          </div>
          <div class="d-flex align-center mt-2">
            <v-sheet
              width="20"
              height="20"
              class="rounded-circle background-blue-diversity d-flex justify-center align-center"
            >
              <v-icon color="white" size="10">mdi-{{ type }}</v-icon>
            </v-sheet>
            <div class="ml-1 medium-caption-text font-weight-bold text-capitalize">{{ type }}</div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="6"
        md="2"
        class="d-flex align-center"
        :class="{
          'pl-4': $vuetify.breakpoint.mdAndUp,
          'mt-2': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div>
          <div class="small-caption-text">Bounty earned</div>
          <div class="medium-caption-text font-weight-bold mt-2" v-if="!isRewardTBD">
            {{ value | usdCustom(2, 2) }}
          </div>
          <div class="medium-caption-text font-weight-bold mt-2" v-else>TBA</div>
        </div>
      </v-col>
      <v-col
        cols="6"
        md="2"
        class="d-flex align-center"
        :class="{
          'justify-end mt-2': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div>
          <div
            class="small-caption-text"
            :class="{
              'text-end': $vuetify.breakpoint.smAndDown,
            }"
          >
            Time
          </div>
          <div class="medium-caption-text font-weight-bold mt-2">{{ startTime | datetime }}</div>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="2"
        class="d-flex align-center justify-end"
        :class="{
          'justify-center mt-4': $vuetify.breakpoint.smAndDown,
        }"
      >
        <v-btn
          class="text-capitalize rounded-lg"
          outlined
          small
          :style="`border: thin solid var(--v-${buttonColor}-base); color: var(--v-${buttonColor}-base)`"
        >
          <v-sheet
            v-if="statusIcon"
            class="flex-center-box rounded-circle mr-1"
            :style="`border: thin solid var(--v-${buttonColor}-base)`"
          >
            <v-icon size="14" :style="`color: var(--v-${buttonColor}-base)`">{{ statusIcon }}</v-icon>
          </v-sheet>
          {{ status }}</v-btn
        >
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { lowerCase, get } from 'lodash'
import { FixedNumber } from '@ethersproject/bignumber'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
    'project-logo': () => import('@/components/project-logo.vue'),
  },
})
export default class HuntingHistoryCard extends Vue {
  walletStore = walletStore
  @Prop({ required: true }) coverImage!: string
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) startTime!: string
  @Prop({ required: true }) chainId!: string
  @Prop({ required: true }) status!: string
  @Prop({ required: true }) totalStep!: number
  @Prop({ required: true }) currentStep!: number
  @Prop({ required: true }) bountyEarn!: number
  @Prop({ required: true }) type!: string
  @Prop({ required: true }) rewardToken!: string
  @Prop({ required: true }) projectLogo!: string
  @Prop({ required: true }) task!: any

  statusIcon = ''
  buttonColor = ''

  value = 'TBA'
  optionalTokens = get(this.task, 'optionalTokenReward', [])

  mounted() {
    const lowercaseStatus = lowerCase(this.status)
    switch (lowercaseStatus) {
      case 'completed':
        this.buttonColor = 'greenSenamatic'
        this.statusIcon = 'mdi-check'
        break
      case 'rejected':
        this.buttonColor = 'redSenamatic'
        this.statusIcon = 'mdi-exclamation'
        break
      case 'processing':
        this.buttonColor = 'bluePrimary'
        this.statusIcon = 'mdi-dots-horizontal'
        break
      default:
        this.buttonColor = 'orangeSenamatic'
        break
    }
    const bounty = get(this.task, 'bounty', '0')
    const tokenBasePrice = get(this.task, 'task.tokenBasePrice', '0')
    const tempBaseTokenValue = FixedNumber.from(`${bounty}`).mulUnsafe(FixedNumber.from(`${tokenBasePrice}`))
    let optionalTokenTotalValue = FixedNumber.from('0')
    this.optionalTokens.forEach((token) => {
      const tokenBounty = get(token, 'bounty', '0')
      const optionalTokenBasePrice = get(token, 'tokenBasePrice', '0')
      optionalTokenTotalValue = optionalTokenTotalValue.addUnsafe(
        FixedNumber.from(`${tokenBounty}`).mulUnsafe(FixedNumber.from(`${optionalTokenBasePrice}`))
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
  font-size: 12px;
  line-height: 18px;
}
.medium-caption-text {
  font-size: 14px;
  line-height: 20px;
}
.bounty-image-md {
  height: 80px;
}
.bounty-image-sm {
  height: 200px;
}
</style>

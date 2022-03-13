<template>
  <v-sheet class="fill-width pa-4" outlined min-height="102px">
    <v-row dense no-gutters>
      <v-col
        cols="12"
        md="2"
        class="mb-2"
        :class="{
          'pr-7': $vuetify.breakpoint.mdAndUp,
        }"
      >
        <v-img
          min-height="70"
          :class="{
            'bounty-image-sm': $vuetify.breakpoint.smAndDown,
            'bounty-image-md': $vuetify.breakpoint.mdAndUp,
          }"
          :src="coverImage"
        ></v-img>
      </v-col>
      <v-col cols="6" md="3" class="d-flex align-center">
        <div>
          <div>
            <v-sheet width="26" height="26">
              <chain-logo :chain="chainId" class="fill-width fill-height" />
            </v-sheet>
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
          <div class="medium-caption-text font-weight-bold mt-2">
            {{ bountyEarn | formatNumber(2, 0) }} {{ rewardToken }}
          </div>
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
          class="text-capitalize"
          outlined
          :style="`border: thin solid var(--v-${buttonColor}-base); color: var(--v-${buttonColor}-base)`"
        >
          <v-sheet
            v-if="statusIcon"
            width="16"
            height="16"
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
import { Component, Vue, Ref, Provide, Prop } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { lowerCase } from 'lodash'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
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

  statusIcon = ''
  buttonColor = ''
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

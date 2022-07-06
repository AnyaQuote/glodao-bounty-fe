<template>
  <v-sheet
    class="fill-width neutral100--bg d-flex flex-column flex-md-row align-md-center rounded-lg pa-4 pr-md-4 pr-lg-6"
    outlined
  >
    <div class="d-flex">
      <v-img
        class="rounded-circle mx-auto"
        min-width="50"
        min-height="50"
        :src="avatar"
        max-width="64"
        max-height="64"
      ></v-img>
    </div>
    <div class="d-flex flex-md-column pa-3 py-0 text-truncate">
      <div class="neutral10--text small-caption-text">Reffered</div>
      <div class="font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0 medium-caption-text text-truncate">
        @{{ name }}
      </div>
    </div>
    <div class="d-flex flex-md-column pa-3 pa-md-2 py-0 ml-0 ml-md-auto" style="min-width: 165px">
      <div class="neutral10--text small-caption-text">Join at</div>
      <div class="font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0 medium-caption-text">
        {{ joinTime | datetime }}
      </div>
    </div>
    <div class="d-flex flex-md-column pa-3 py-0 pl-md-10">
      <v-sheet class="background-transparent d-flex flex-md-column fill-width" min-width="92">
        <div class="neutral10--text small-caption-text">Total commission</div>
        <div class="font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0 medium-caption-text">
          {{ commission | usdCustom(2, 2) }}
        </div>
      </v-sheet>
    </div>
    <div class="d-flex flex-md-column pa-3 py-0">
      <v-sheet class="background-transparent d-flex flex-md-column fill-width" min-width="99">
        <div class="neutral10--text small-caption-text">Today commission</div>
        <div class="font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0 medium-caption-text">
          {{ commissionToday | usdCustom(2, 2) }}
        </div>
      </v-sheet>
    </div>
    <div class="d-flex flex-md-column pa-3 py-0">
      <v-sheet class="background-transparent d-flex flex-md-column fill-width" min-width="99">
        <div class="neutral10--text small-caption-text">Total referrals</div>
        <div class="font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0 medium-caption-text">
          {{ totalReferral }}
        </div>
      </v-sheet>
    </div>
    <div class="flex-center-box text-caption bluePrimary--text cursor-pointer" @click="openSubReferralDialog">
      Detail <v-icon color="bluePrimary">mdi-chevron-right</v-icon>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Observer
@Component
export default class CampaignReferralCard extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) joinTime!: string
  @Prop({ required: true }) avatar!: string
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) totalEarn!: string
  @Prop({ required: true }) commission!: string
  @Prop({ required: true }) commissionToday!: string
  @Prop({ required: true }) totalReferral!: number

  openSubReferralDialog() {
    this.$emit('openReferralList')
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
</style>

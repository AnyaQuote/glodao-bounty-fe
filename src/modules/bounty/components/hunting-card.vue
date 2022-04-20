<template>
  <v-sheet class="overflow-hidden rounded-lg neutral100--bg fill-height" elevation="3">
    <v-img :src="coverImageUrl" :aspect-ratio="1.5"></v-img>

    <div class="d-flex flex-column pa-6">
      <div class="d-flex align-center mb-6">
        <v-sheet width="64" height="64" class="rounded-circle transparent">
          <v-img :src="projectLogo" class="rounded-circle" />
        </v-sheet>
        <div class="title blue--text ml-6 text-truncate flex-grow-1">
          {{ name }}
        </div>
      </div>

      <!-- Total reward start -->
      <div class="d-flex justify-start flex-wrap mb-6">
        <div class="d-flex flex-column mr-6 overflow-hidden">
          <div class="neutral10--text font-size-20">Total reward</div>
          <div class="font-weight-bold mt-1 font-size-20 text-truncate">
            {{ rewardAmount | formatNumber(2, 0) }} {{ tokenName }}
          </div>
        </div>
        <!-- Total reward end -->
        <!-- Participants start -->
        <div class="d-flex flex-column overflow-hidden">
          <div class="neutral10--text font-size-20">Participants</div>
          <div class="font-weight-bold mt-1 font-size-20 text-truncate">
            {{ participant | formatNumber(0, 0) }}
          </div>
        </div>
      </div>
      <!-- Participants end -->

      <!-- Countdown start -->
      <div class="rounded-lg mb-6 custom-border">
        <countdown class="countdown bluePrimary lighten-1" :targetDate="endTime">
          <template slot="append">
            <div class="font-weight-bold neutral10--text text-truncate mx-2">left</div>
            <div class="flame-emoji">🔥</div>
          </template>
        </countdown>
      </div>
      <!-- Countdown end -->

      <!-- Button start -->
      <v-btn
        class="btn transparent btn-text text-capitalize white--text rounded-lg"
        width="100%"
        large
        @click="openLink()"
      >
        <v-img class="mr-3" :src="require('@/assets/icons/crown-white.svg')" max-height="25" max-width="25"></v-img>
        Start hunting
      </v-btn>
      <!-- Button end -->
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    countdown: () => import('@/modules/bounty/components/countdown.vue'),
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

  openLink() {
    this.$router.push(`bounty/${this.id}`)
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
  font-size: 32px !important;
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
.custom-border {
  border: 1px solid #00b3ff;
}
.flex-grow-1 {
  flex-grow: 1;
}
.font-size-20 {
  font-size: 20px;
}
.flame-emoji {
  line-height: 42px;
  font-size: 24px;
}
</style>

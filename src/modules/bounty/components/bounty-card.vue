<template>
  <v-hover v-slot="{ hover }">
    <v-card class="mx-auto overflow-hidden border-radius-8px" elevation="3" outlined>
      <div
        :class="{
          'backdrop-hover-overlay': hover,
        }"
      >
        <div class="position-relative">
          <v-img height="236" :src="coverImage"></v-img>
          <div class="start-date-container" v-if="!isStarted"></div>
          <div class="start-date-label d-flex justify-end py-2 pr-8 font-weight-600" v-if="!isStarted">
            Start in {{ startTime | datetime }} 🔥
          </div>
          <div class="position-absolute custom-chevron-flag-container rounded-0">
            <div class="custom-chevron-flag d-flex flex-column justify-center align-center pt-6 pb-3 elavation-10">
              <v-icon color="white" size="14" class="mb-2" v-for="type in types" :key="type">
                {{ `mdi-${type}` }}
              </v-icon>
            </div>
          </div>
        </div>
        <div class="pa-4">
          <div>
            <div class="rounded-circle d-flex justify-center card-project-medium-icon">
              <chain-logo :chain="chainId" class="fill-width fill-height" />
            </div>
            <div class="mt-2 font-family-proxima font-weight-bold card-big-title-text bluePrimary--text">
              {{ name }}
            </div>
            <div class="custom-dash-divider my-3"></div>
            <div class="d-flex justify-space-between">
              <div>Total reward</div>
              <div class="font-weight-bold">{{ rewardAmount | formatNumber(2, 0) }} {{ rewardTokenName }}</div>
            </div>
            <div class="d-flex justify-space-between mt-2">
              <div>Max participant</div>
              <div class="font-weight-bold">{{ maxParticipant }}</div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="justify-center align-center position-relative rounded-0"
        :class="{
          'd-flex  card-hover-overlay': hover,
          'd-none': !hover,
        }"
      >
        <div
          class="position-absolute linear-background-blue-main fill-width fill-height rounded-0"
          style="opacity: 0.3"
        ></div>
        <v-btn width="152" height="124" @click="openLink()">
          <div>
            <div class="d-flex justify-center">
              <v-img :src="require('@/assets/icons/crown-black.svg')" max-height="50" max-width="50"></v-img>
            </div>
            <br />
            <div class="text-none font-weight-bold card-big-title-text">Start hunting</div>
          </div>
        </v-btn>
      </div>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import moment from 'moment'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
  },
})
export default class BountyCard extends Vue {
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) startTime!: string
  @Prop({ required: true }) rewardAmount!: number
  @Prop({ required: true }) chainId!: number
  @Prop({ required: true }) metadata!: any
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) types!: string[]
  @Prop({ required: true }) maxParticipant!: number
  coverImage = this.metadata?.coverImage ?? 'https://diversity-api.contracts.dev/uploads/download_cff108eb0b.png'
  rewardTokenName = this.metadata?.rewardToken ?? ''
  isStarted = moment(this.startTime).isBefore(moment())

  openLink() {
    this.$router.push(`bounty/${this.id}`)
  }
}
</script>

<style scoped lang="scss">
.border-radius-8px {
  border-radius: 8px !important;
}
.backdrop-hover-overlay {
  filter: blur(2px);
  z-index: -1;
}
.card-hover-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  // background-color: rgba(255, 255, 255, 0.6);
  top: 0;
  left: 0;
  z-index: 2;
  border: 1px solid var(--v-bluePrimary-base);
  filter: blur(0) !important;
}
.custom-chevron-flag-container {
  top: 0;
  right: 28px;
  filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
}
.custom-chevron-flag {
  clip-path: polygon(100% 0, 100% 100%, 50% 82%, 0 100%, 0% 0%);
  background-image: linear-gradient(to bottom, #0276f0, #0096ff, #00b3ff, #00cdff, #00e5ff);
  width: 24px;
  min-height: 50px;
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
</style>

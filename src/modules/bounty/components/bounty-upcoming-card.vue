<template>
  <v-sheet class="test transparent d-flex rounded-lg pa-5 mr-10" :style="hover && 'width: calc(100% - 250px);'">
    <div class="d-flex" style="flex-grow: 1">
      <v-sheet width="64" height="64" class="transparent">
        <ChainLogo :chain="chainId" class="fill-width fill-height" />
      </v-sheet>
      <div class="d-flex flex-column ml-2">
        <div class="d-flex align-center">
          <span class="bluePrimary--text font-weight-bold" style="font-size: 1.5rem">{{ name }}</span>
          <div class="dot mx-4"></div>
          <span class="font-weight-bold" style="font-size: 1.5rem"
            >{{ rewardAmount | formatNumber(2, 0) }} {{ metadata.rewardToken }}</span
          >
        </div>
        <div class="d-flex">
          <span>{{ startTime | datetime }}</span>
          <span>&nbsp;-&nbsp;</span>
          <span>{{ endTime | datetime }}</span>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column" style="margin-right: 58px">
      <div class="mb-2">Social link:</div>
      <div class="ml-n2">
        <v-btn :href="metadata.website" icon><v-icon color="white">mdi-domain</v-icon></v-btn>
        <v-btn v-for="(link, icon) in metadata.socialLinks" :key="icon" :href="link" icon>
          <v-icon color="white" v-html="`mdi-${icon}`"></v-icon>
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: { ChainLogo: () => import('@/components/chain-logo.vue') },
})
export default class BountyUpcomingCard extends Vue {
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) startTime!: string
  @Prop({ required: true }) endTime!: string
  @Prop({ required: true }) rewardAmount!: number
  @Prop({ required: true }) chainId!: number
  @Prop({ required: true }) metadata!: any
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) types!: string[]
  @Prop({ required: true }) maxParticipant!: number
  @Prop({ required: true }) hover!: boolean
  coverImage = this.metadata?.coverImage ?? 'https://diversity-api.contracts.dev/uploads/download_cff108eb0b.png'
  rewardTokenName = this.metadata?.rewardToken ?? ''
}
</script>

<style scoped>
.background-transparent {
  background: transparent;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.h-560 {
  height: 560px;
}

.h-64 {
  height: 64px;
}

.w-64 {
  weight: 64px;
}

.z-index-0 {
  z-index: 0;
}

.z-index-1 {
  z-index: 1;
}

.w-fill {
  width: 100%;
}

.h-fill {
  height: 100%;
}

.object-fit-cover {
  object-fit: cover;
}

.top-0 {
  bottom: 0;
}

.left-0 {
  left: 0;
}

.right-30 {
  right: 30px;
}

.flex-1 {
  flex: 1;
}

.align-items-start {
  align-items: flex-start;
}

.border-radius-16 {
  border-radius: 16px;
}

.font-size-24 {
  font-size: 24px;
  font-weight: 700;
  line-height: 31px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background: #c4c4c4;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.font-size-16 {
  font-size: 16;
  line-height: 24px;
  font-weight: 600;
}

.test {
  background: radial-gradient(
    66.84% 180.1% at 19.81% 27.89%,
    rgba(255, 255, 255, 0.42) 0%,
    rgba(255, 255, 255, 0.06) 100%
  );
  backdrop-filter: blur(24px);
}
</style>

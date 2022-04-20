<template>
  <v-sheet class="neutral100--bg d-flex flex-column rounded-lg ma-1 fill-height" elevation="3" eager>
    <div class="position-relative flex-shrink-0">
      <v-img class="rounded-lg rounded-b-0" :src="coverImage" :aspect-ratio="1.5"></v-img>
      <div
        class="position-absolute top-0 right-28 custom-chevron-flag d-flex flex-column align-center pt-2 pb-5 elavation-10"
      >
        <v-btn class="mb-n3" v-for="(link, icon) in metadata.socialLinks" :key="icon" :href="link" icon depressed>
          <v-icon color="white" size="14" v-html="`mdi-${icon}`"></v-icon>
        </v-btn>
      </div>
    </div>
    <div class="d-flex flex-column justify-space-between mx-4 my-3">
      <div class="d-flex flex-column mb-3">
        <!-- <ChainLogo :chain="chainId" class="w-32 h-32 align-self-start flex-shrink-0 mb-2" /> -->
        <v-sheet class="rounded-circle" width="32" height="32">
          <v-img :src="projectLogo"></v-img>
        </v-sheet>
        <div class="d-flex flex-column flex-1">
          <div class="blue--text font-size-18 text-truncate">{{ name }}</div>
          <div class="d-flex">
            <div class="flex-shrink-0">Reward</div>
            <div class="font-size-18 flex-1 text-end">
              {{ rewardAmount | formatNumber(2, 0) }} {{ rewardTokenName }}
            </div>
          </div>
        </div>
      </div>
      <v-divider />
      <div class="d-flex flex-column font-size-14 mt-3">
        <div class="d-flex flex-row">
          <div class="flex-shrink-0">Start</div>
          <div class="flex-1 text-end">{{ startTime | datetime }}</div>
        </div>
        <div class="d-flex flex-row">
          <div class="flex-shrink-0">End</div>
          <div class="flex-1 text-end">{{ endTime | datetime }}</div>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    ChainLogo: () => import('@/components/chain-logo.vue'),
  },
})
export default class BountyCarouselItem extends Vue {
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) startTime!: string
  @Prop({ required: true }) endTime!: string
  @Prop({ required: true }) rewardAmount!: number
  @Prop({ required: true }) chainId!: number
  @Prop({ required: true }) metadata!: any
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) types!: string[]
  @Prop({ required: true }) maxParticipant!: number
  coverImage = this.metadata?.coverImage ?? 'https://diversity-api.contracts.dev/uploads/download_cff108eb0b.png'
  rewardTokenName = this.metadata?.rewardToken ?? ''
  projectLogo = this.metadata?.projectLogo ?? ''
}
</script>

<style scoped>
.align-self-start {
  align-self: flex-start;
}

.font-size-24 {
  font-size: 24px;
  font-weight: 700;
  line-height: 31px;
}

.w-32 {
  weight: 32px;
}

.h-32 {
  height: 32px;
}
.position-relative {
  position: relative;
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
  top: 0px;
}

.left-0 {
  left: 0;
}

.bottom-0 {
  bottom: 0;
}

.right-28 {
  right: 28px;
}

.flex-1 {
  flex: 1;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.custom-white-bg {
  background: rgba(255, 255, 255, 0.7);
}

.font-size-18 {
  font-size: 18px;
  line-height: 21px;
  font-weight: 600;
}
.custom-chevron-flag {
  clip-path: polygon(100% 0, 100% 100%, 50% 82%, 0 100%, 0% 0%);
  background-image: linear-gradient(to bottom, #0276f0, #0096ff, #00b3ff, #00cdff, #00e5ff);
  width: 24px;
  min-height: 50px;
}
</style>

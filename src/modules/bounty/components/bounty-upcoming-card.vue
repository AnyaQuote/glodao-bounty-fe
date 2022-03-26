<template>
  <div class="position-relative h-560">
    <v-img
      class="position-relative w-fill h-fill z-index-0 object-fit-cover border-radius-16"
      :src="coverImage"
    ></v-img>
    <div
      class="position-absolute top-0 left-0 z-index-1 w-fill h-fill d-flex flex-column justify-space-between align-items-start pa-10"
    >
      <div>
        <v-sheet class="neutral100--bg d-flex flex-row align-center border-radius-16 pa-5">
          <div class="w-64 h-64 flex-shrink-0">
            <ChainLogo :chain="chainId" class="fill-width fill-height" />
          </div>
          <div class="d-flex flex-column flex-1 pl-5">
            <div class="d-flex flex-row align-center justify-space-between mb-3">
              <div class="font-size-24 blue--text text-no-wrap text-truncate">{{ name }}</div>
              <div class="dot flex-shrink-0 mx-2"></div>
              <div class="font-size-24 text-no-wrap text-truncate text-end">
                {{ rewardAmount | formatNumber(2, 0) }} {{ rewardTokenName }}
              </div>
            </div>
            <div class="d-flex flex-row justify-space-between text-no-wrap text-truncate">
              <div class="">{{ startTime | datetime }}</div>
              <div class="flex-shrink-0 mx-2">-</div>
              <div>{{ endTime | datetime }}</div>
            </div>
          </div>
        </v-sheet>
      </div>
      <v-sheet class="background-transparent position-relative z-index-1 d-flex flex-column white--text">
        <div class="d-block font-size-16 mb-2">Social link:</div>
        <div class="d-block ml-n2">
          <v-btn :href="metadata.website" icon><v-icon color="white">mdi-domain</v-icon></v-btn>
          <v-btn v-for="(link, icon) in metadata.socialLinks" :key="icon" :href="link" icon>
            <v-icon color="white" v-html="`mdi-${icon}`"></v-icon>
          </v-btn>
        </div>
      </v-sheet>
    </div>
  </div>
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
  top: 0;
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
  background: grey;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.font-size-16 {
  font-size: 16;
  line-height: 24px;
  font-weight: 600;
}
</style>

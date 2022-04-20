<template>
  <v-sheet class="blur-bg transparent d-flex rounded-lg pa-5 mr-10" :style="retract && 'width: calc(100% - 250px);'">
    <div class="d-flex" style="flex-grow: 1">
      <v-sheet width="64" height="64" class="rounded-circle transparent">
        <v-img :src="projectLogo"></v-img>
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
        <v-btn :href="metadata.website" icon><v-icon small>mdi-domain</v-icon></v-btn>
        <v-btn v-for="(link, icon) in metadata.socialLinks" :key="icon" :href="link" icon>
          <v-icon small v-html="`mdi-${icon}`"></v-icon>
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
  @Prop({ required: true }) maxParticipant!: number
  @Prop({ required: true }) retract!: boolean
  coverImage = this.metadata?.coverImage ?? 'https://diversity-api.contracts.dev/uploads/download_cff108eb0b.png'
  rewardTokenName = this.metadata?.rewardToken ?? ''
  projectLogo = this.metadata?.projectLogo ?? ''
}
</script>

<style scoped>
.dot {
  height: 8px;
  width: 8px;
  background-color: #c4c4c4;
  border-radius: 50%;
  display: inline-block;
}
</style>

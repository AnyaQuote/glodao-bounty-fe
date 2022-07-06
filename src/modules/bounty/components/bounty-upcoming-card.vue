<template>
  <v-sheet
    class="blur-bg transparent d-flex rounded-lg pa-5 mr-10 white--text"
    :class="retract ? 'retract-animation' : 'expand-animation'"
  >
    <div class="d-flex" style="flex-grow: 1">
      <project-logo :src="projectLogo"></project-logo>
      <div class="d-flex flex-column justify-center ml-2">
        <div class="d-flex align-center">
          <span class="mint--text font-weight-bold text-truncate" style="font-size: 1.8rem; line-height: 1.8rem">{{
            name
          }}</span>
          <div class="dot mx-2"></div>
          <span class="font-weight-bold text-truncate" style="font-size: 1.4em">${{ value | formatNumber(2, 2) }}</span>
        </div>
        <div class="d-flex text-body-1 font-weight-medium">
          <span>{{ startTime | datetime }}</span>
          <span>&nbsp;-&nbsp;</span>
          <span>{{ endTime | datetime }}</span>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column justify-center ml-2">
      <div class="text-body-1 font-weight-medium">Social link:</div>
      <div class="ml-n2">
        <v-btn :href="metadata.website" icon><v-icon small color="white">mdi-domain</v-icon></v-btn>
        <v-btn v-for="(link, icon) in metadata.socialLinks" :key="icon" :href="link" icon>
          <v-icon small v-html="`mdi-${icon}`" color="white"></v-icon>
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { get } from 'lodash-es'
import { FixedNumber } from '@ethersproject/bignumber'
@Component({
  components: { ProjectLogo: () => import('@/components/project-logo.vue') },
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
  @Prop({ required: true }) task!: any
  value = 'TBA'
  coverImage = this.metadata?.coverImage ?? 'https://diversity-api.contracts.dev/uploads/download_cff108eb0b.png'
  rewardTokenName = this.metadata?.rewardToken ?? ''
  projectLogo = this.metadata?.projectLogo ?? ''
  optionalTokens = get(this.task, 'optionalTokens', [])

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
.retract-animation {
  width: calc(100% - 250px);
  transition: width 160ms ease-in-out;
}
.expand-animation {
  width: 96%;
  transition: width 200ms ease-in-out;
}
.back-layer {
  background: #092249;
}
</style>

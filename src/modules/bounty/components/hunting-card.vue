<template>
  <v-sheet class="overflow-hidden rounded-lg" elevation="3">
    <v-sheet class="position-relative">
      <v-img height="350" :src="coverImageUrl"></v-img>
      <v-sheet class="d-flex justify-end countdown-container transparent pa-6">
        <countdown class="countdown rounded-lg" :targetDate="endTime">
          <template slot="prepend">
            <v-sheet class="d-flex justify-center align-center transparent" width="24" height="31">🔥</v-sheet>
          </template>
        </countdown>
      </v-sheet>
      <v-sheet class="title-container d-flex align-center px-5 py-3">
        <v-img max-height="64" max-width="64" src="@/assets/images/dummy_cryptocurrency.svg"></v-img>
        <v-sheet class="transparent title blue--text px-6">{{ name }}</v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet class="d-flex px-6 py-4">
      <v-sheet class="d-flex flex-column">
        <v-sheet class="text-1 neutral10--text">Total reward</v-sheet>
        <v-sheet class="text-2 mt-1">{{ rewardAmount | formatNumber(2, 0) }} {{ tokenName }}</v-sheet>
      </v-sheet>
      <v-sheet class="d-flex flex-column ml-9">
        <v-sheet class="text-1 neutral10--text">Participants</v-sheet>
        <v-sheet class="text-2 mt-1">{{ participant | formatNumber(0, 0) }}</v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet class="px-6 pb-6">
      <v-btn class="btn btn-text text-capitalize white--text rounded-lg" width="100%" x-large @click="openLink()">
        <v-img class="mr-3" :src="require('@/assets/icons/crown-white.svg')" max-height="25" max-width="25"></v-img>
        Start hunting
      </v-btn>
    </v-sheet>
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
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) rewardAmount!: number
  @Prop({ required: true }) tokenName!: string
  @Prop({ required: true }) participant!: number
  @Prop({ required: true }) id!: string

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
  font-size: 48px;
  line-height: 130%;
}
.text-1 {
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}
.text-2 {
  font-weight: 700;
  font-size: 24px;
  line-height: 130%;
  color: #06032b;
}
.btn {
  background: linear-gradient(90deg, #0276f0 0%, #00e5ff 113.65%);
}
.btn-text {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
}
</style>

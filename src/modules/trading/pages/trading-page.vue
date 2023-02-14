<template>
  <div>
    <v-img class="d-flex align-center" height="416" src="@/assets/images/dummy_cover.png">
      <v-container class="white--text">
        <v-chip size="x-large" color="white" class="font-weight-bold text-subtitle-1 mb-10">Moonfrost</v-chip>
        <div class="text-h3 font-weight-bold mb-2">Moonfrost</div>
        <div class="text-h5">
          Abundant farms and yields galore! Discover yield farming and staking on Dopex, and earn an NFT for all your
          hard work.
        </div>
      </v-container>
    </v-img>
    <v-container class="position-relative" style="z-index; top:-60px">
      <v-sheet color="background-blue-diversity" class="py-4" rounded="lg" outlined>
        <div class="d-flex white--text justify-space-between px-6">
          <div>
            <div class="text-h5">Total reward</div>
            <div class="font-weight-bold text-h4">100.000 XP</div>
          </div>
          <div>
            <div class="text-h5">Personal reward<v-icon color="white" right>mdi-information-outline</v-icon></div>
            <div class="font-weight-bold text-h4">100 XP</div>
          </div>
          <div>
            <div class="text-h5">Participant<v-icon color="white" right>mdi-information-outline</v-icon></div>
            <div class="font-weight-bold text-h4">6500</div>
          </div>
        </div>
        <v-progress-linear
          color="#D6F76B"
          background-color="#000000
"
          value="60"
          class="my-5"
        ></v-progress-linear>
        <div class="d-flex justify-space-between px-6 white--text">
          <div class="text-h5 font-weight-bold">🔥 16 : 48 : 12 : 00 left</div>
          <div class="text-h5">100/160 completed</div>
        </div></v-sheet
      >
      <v-sheet v-if="!authStore.jwt" color="#06032B" class="px-6 white--text mt-10" rounded="lg" outlined>
        <v-row align="center"
          ><v-col cols="2"> <v-img :src="require('@/assets/images/lock.png')"></v-img></v-col
          ><v-col cols="8">
            <div class="font-weight-bold text-h5">You're not signed in</div>
            <div class="text-subtitle-1">Get access to this Bounty by sign in Glodao</div></v-col
          ><v-col cols="2">
            <v-btn
              depressed
              class="linear-background-blue-main white--text text-none rounded text-h6 font-weight-bold"
              x-large
              @click="authStore.changeTwitterLoginDialog(true)"
              >Log in</v-btn
            >
          </v-col></v-row
        >
      </v-sheet>
      <v-sheet v-else color="#06032B" class="pa-6 d-flex justify-space-between white--text mt-10" rounded="lg" outlined>
        <div class="font-weight-bold text-h5">You have completed 6/6 missions. Claim reward now</div>
        <div class="font-weight-bold text-h5">100% quest</div>
      </v-sheet>
      <div class="blue-diversity--text font-weight-bold mt-10 text-h5">Community Program</div>
      <v-sheet color="#F0F7FF" class="px-6 pt-6 bluePrimary--border mt-6" rounded="lg" outlined
        ><community-program-card v-for="item in communityProgram" :key="item.id" :data="item"></community-program-card
      ></v-sheet>
      <div class="blue-diversity--text font-weight-bold text-h5 mt-20 mb-6">Project Experience Program</div>
      <project-experience-program-card
        v-for="item in projectExperienceProgram"
        :key="item.id"
        :data="item"
      ></project-experience-program-card>
      <v-sheet
        class="white--text d-flex justify-space-between align-center background-blue-diversity pa-6 mt-10"
        rounded="lg"
        outlined
      >
        <div class="text-h5 font-weight-bold">
          <div>Congratulation you have completed the quest</div>
          <div>Your reward is <strong>30 xp</strong></div>
        </div>
        <div>
          <v-btn
            class="font-weight-bold text-none text-h6"
            :class="claimed !== 'Claim reward' ? 'neutral0--text' : 'blue-diversity--text'"
            rounded
            depressed
            large
            @click="claimReward"
            >{{ claimed }}</v-btn
          >
        </div>
      </v-sheet>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { authStore } from '@/stores/auth-store'

@Component({
  components: {
    'community-program-card': () => import('../components/community-program-card.vue'),
    'project-experience-program-card': () => import('../components/project-experience-program-card.vue'),
    'snack-bar': () => import('@/components/snack-bar/snack-bar.vue'),
  },
})
export default class extends Vue {
  isFinish = false
  claimed = 'Claim reward'
  authStore = authStore
  communityProgram: any = [
    {
      id: 1,
      title: 'Join Moon frost’s Telegram',
      content:
        'Please join Moonfrost’s telegram to complete task. If you have joined before, click on verify to completed!',
      link: null,
    },
    {
      id: 2,
      title: 'Follow Moon frost’s Twitter',
      content:
        'Please join Moonfrost’s telegram to complete task. If you have joined before, click on verify to completed!',
      link: null,
    },
    {
      id: 3,
      title: 'Refer Friends this bounty ',
      content:
        'Refer your friends to thinkin using the link below. task is completed when a your friend become thinkin members.',
      link: 'https://glodao.io/r/dj',
    },
  ]
  projectExperienceProgram: any = [
    {
      id: 4,
      title: 'Buy 100 XP token with BNB on PancakeSwap',
      content:
        "Purchase XP token with BNB from swaps and leveraged trading. You'll be able to verify if you've completed task",
    },
    {
      id: 5,
      title: 'Add liquidity XP-BNB in PancakeSwap',
      content: 'Go to PancakeSwap and Add at least 100 XP-BNB Liquidity to complete task.',
    },
  ]
  finish() {
    this.isFinish = true
  }
  claimReward() {
    const config = { icon: 'check_circle', message: '30 xp added in your reward', color: '#000000', timeout: 5000 }
    snackController.config = config
    snackController.show = true
    this.claimed = 'Claimed'
  }
}
</script>

<style scoped lang="scss"></style>

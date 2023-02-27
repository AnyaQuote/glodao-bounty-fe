<template>
  <div>
    <v-img class="d-flex align-center" height="416" :src="vm.controller.informationController.coverImage">
      <v-container class="white--text">
        <v-chip size="x-large" color="white" class="font-weight-bold text-subtitle-1 mb-10">
          {{ vm.controller.informationController.coverImage }}
        </v-chip>
        <div class="text-h3 font-weight-bold mb-2">{{ vm.controller.informationController.name }}</div>
        <div class="text-h5">
          {{ vm.controller.informationController.shortDescription }}
        </div>
      </v-container>
    </v-img>
    <v-container class="position-relative" style="z-index; top:-60px">
      <v-sheet color="background-blue-diversity" class="py-4" rounded="lg" outlined>
        <div class="d-flex white--text justify-space-between px-6">
          <div>
            <div class="text-h5">Total reward</div>
            <div class="font-weight-bold text-h4">
              {{ vm.controller.informationController.rewardAmount }}
              {{ vm.controller.informationController.rewardToken }}
            </div>
          </div>
          <div>
            <div class="text-h5">Personal reward</div>
            <div class="font-weight-bold text-h4">
              {{ vm.controller.informationController.personalReward }}
              {{ vm.controller.informationController.rewardToken }}
            </div>
          </div>
          <div>
            <div class="text-h5">Participants</div>
            <div class="font-weight-bold text-h4">{{ vm.controller.informationController.totalParticipants }}</div>
          </div>
        </div>
        <v-progress-linear
          color="#D6F76B"
          background-color="#000000"
          :value="vm.controller.informationController.currentProgress"
          class="my-5"
        >
        </v-progress-linear>
        <div class="d-flex justify-space-between px-6 white--text text-h5">
          <div class="font-weight-bold">
            <countdown :targetDate="vm.controller.informationController.endTime">
              <slot name="prepend">🔥</slot>
            </countdown>
          </div>
          <div>
            <span class="mr-2">
              {{ vm.controller.informationController.completedParticipants }}/{{
                vm.controller.informationController.maxParticipants
              }}
              completed
            </span>
            <v-avatar size="36" :class="{ 'ml-n2': index !== 0 }" v-for="(item, index) in arrayImg" :key="index">
              <v-img :src="item"></v-img>
            </v-avatar>
          </div>
        </div>
      </v-sheet>
      <mission-state-container :controller="vm.controller.missionStateController" />
      <div class="blue-diversity--text font-weight-bold mt-10 text-h5">Community Program</div>

      <v-sheet color="#F0F7FF" class="px-6 pt-6 bluePrimary--border mt-6" rounded="lg" outlined>
        <div v-for="(data, index) in vm.controller.socialTaskControllers" :key="data.controllerType + index">
          <twitter-like-task :data="data" v-if="data.taskType === 'like' && data.controllerType === 'twitter'" />
          <twitter-follow-task :data="data" v-if="data.taskType === 'follow' && data.controllerType === 'twitter'" />
          <twitter-retweet-task :data="data" v-if="data.taskType === 'retweet' && data.controllerType === 'twitter'" />
          <twitter-comment-task :data="data" v-if="data.taskType === 'comment' && data.controllerType === 'twitter'" />
          <twitter-tweet-task :data="data" v-if="data.taskType === 'tweet' && data.controllerType === 'twitter'" />
          <twitter-quote-task :data="data" v-if="data.taskType === 'quote' && data.controllerType === 'twitter'" />
        </div>
      </v-sheet>
      <div class="blue-diversity--text font-weight-bold text-h5 mt-20 mb-6">Project Experience Program</div>
      <project-experience-program-card
        v-for="item in projectExperienceProgram"
        :key="item.id"
        :data="item"
      ></project-experience-program-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { authStore } from '@/stores/auth-store'
import { TradingViewModel } from '@/modules/trading/viewmodels/trading-viewmodel'
import MissionStateContainer from '../components/mission-state-container.vue'

@Component({
  components: {
    'community-program-card': () => import('../components/community-program-card.vue'),
    'project-experience-program-card': () => import('../components/project-experience-program-card.vue'),
    'snack-bar': () => import('@/components/snack-bar/snack-bar.vue'),
    countdown: () => import('@/modules/bounty/components/countdown.vue'),
    'mission-state-container': () => import('@/modules/trading/components/mission-state-container.vue'),
    'twitter-like-task': () => import('@/modules/trading/components/twitter-task/twitter-like-task.vue'),
    'twitter-follow-task': () => import('@/modules/trading/components/twitter-task/twitter-follow-task.vue'),
    'twitter-retweet-task': () => import('@/modules/trading/components/twitter-task/twitter-retweet-task.vue'),
    'twitter-comment-task': () => import('@/modules/trading/components/twitter-task/twitter-comment-task.vue'),
    'twitter-tweet-task': () => import('@/modules/trading/components/twitter-task/twitter-tweet-task.vue'),
    'twitter-quote-task': () => import('@/modules/trading/components/twitter-task/twitter-quote-task.vue'),
  },
})
export default class extends Vue {
  @Provide() vm = new TradingViewModel()

  @Watch('$route.params.taskId', { immediate: true }) onIdChanged(val: string) {
    if (val) {
      this.vm.taskIdChange(val)
    }
  }

  isFinish = false
  claimed = 'Claim reward'
  authStore = authStore
  arrayImg = [
    'https://picsum.photos/200/201',
    'https://picsum.photos/200/202',
    'https://picsum.photos/200/203',
    'https://picsum.photos/200/204',
    'https://picsum.photos/200/205',
  ]
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

  beforeDestroy() {
    this.vm.controller.informationController.destroyReaction()
  }
}
</script>

<style scoped lang="scss"></style>

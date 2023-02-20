<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { authStore } from '@/stores/auth-store'
import { TradingViewModel } from '@/modules/trading/viewmodels/trading-viewmodel'

@Component({
  components: {
    'community-program-card': () => import('../components/community-program-card.vue'),
    'project-experience-program-card': () => import('../components/project-experience-program-card.vue'),
    'snack-bar': () => import('@/components/snack-bar/snack-bar.vue'),
  },
})
export default class extends Vue {}
</script>

<style scoped lang="scss"></style>

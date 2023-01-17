<template>
  <v-container>
    <div class="align-center justify-center d-flex pa-8">
      <img :src="require('@/assets/images/reward.png')" alt="" />
      <div class="page-title ml-4">Bounty reward dashboard</div>
    </div>
    <div class="d-flex justify-center">
      <div v-if="authStore.registeredWallet" class="blue lighten-3 pa-4 rounded-lg">
        <v-icon class="mr-2" left size="24">mdi-wallet-outline</v-icon>
        <span class="address" v-if="$vuetify.breakpoint.smAndUp">
          {{ authStore.registeredWallet }}
        </span>
        <span class="address" v-else>
          {{ authStore.registeredWallet | shortAddress(6, 6) }}
        </span>
      </div>
    </div>
    <div class="d-flex justify-center flex-wrap gap-24px mt-6">
      <reward-claimer
        v-for="claimer in vm.claimers"
        :key="claimer.claimerInfo.contract"
        :claimer="claimer"
      ></reward-claimer>
      <!-- <reward-claimer></reward-claimer>
      <reward-claimer></reward-claimer>
      <reward-claimer></reward-claimer> -->
      <fake-claimer-v1
        outlined
        v-for="balance in vm.balances"
        :key="balance.address"
        :amount="balance.rewardAmount"
        :name="balance.token"
        :address="balance.tokenAddress"
      >
      </fake-claimer-v1>
    </div>
  </v-container>
</template>

<script lang="ts">
import { BountyRewardV2ViewModel } from '@/modules/bounty-reward/viewmodels/bounty-reward-v2-viewmodel'
import { authStore } from '@/stores/auth-store'
import { walletStore } from '@/stores/wallet-store'
import { Observer } from 'mobx-vue'
import moment from 'moment'
import { Component, Provide, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    'reward-claimer': () => import('@/modules/bounty-reward/pages/widgets/reward-claimer.vue'),
    'fake-claimer-v1': () => import('@/modules/bounty-reward/pages/widgets/fake-claimer-v1.vue'),
  },
})
export default class BountyRewardV2Page extends Vue {
  @Provide() vm = new BountyRewardV2ViewModel()
  walletStore = walletStore
  authStore = authStore
  moment = moment
}
</script>

<style scoped lang="scss">
.gap-10px {
  gap: 10px;
}
.gap-24px {
  gap: 24px;
}
.page-title {
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 130%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: var(--v-bluePrimary-base);
}
.address {
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
}
.sub-title {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 130%;
}
.sub-card {
  background: transparent !important;
}
.connect-text {
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 150%;
  cursor: pointer;
  color: var(--v-bluePrimary-base);
}
</style>

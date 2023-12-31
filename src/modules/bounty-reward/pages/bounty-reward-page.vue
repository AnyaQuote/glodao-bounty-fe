<template>
  <v-container>
    <div class="d-flex align-center justify-center mt-6">
      <v-card class="neutral100 border-radius-16 pa-8" elevation="3" style="max-width: 555px" outlined>
        <v-container>
          <div class="d-flex align-center justify-center">
            <img :src="require('@/assets/images/reward.png')" alt="" />
            <div class="page-title ml-4">Bounty reward dashboard</div>
          </div>
          <div class="mt-4 py-4 text-center">
            <div v-if="authStore.registeredWallet">
              <v-icon class="mr-2" left size="24">mdi-wallet-outline</v-icon>
              <span class="address" v-if="$vuetify.breakpoint.smAndUp">
                {{ authStore.registeredWallet }}
              </span>
              <span class="address" v-else>
                {{ authStore.registeredWallet | shortAddress(6, 6) }}
              </span>
            </div>
            <!-- <div v-else :class="{ 'd-flex align-center justify-space-around': $vuetify.breakpoint.mdAndUp }">
              <div>
                <v-icon class="mr-2" left size="24">mdi-wallet-outline</v-icon>
                <span class="address"> Connect wallet to check your reward </span>
              </div>
              <div class="connect-text" @click="walletStore.changeShowConnectDialog(true)">Connect now</div>
            </div> -->
          </div>
          <v-card class="mt-4 border-radius-8 py-6 px-2 text-center sub-card" outlined>
            <div :class="{ 'd-flex align-center justify-space-around': $vuetify.breakpoint.mdAndUp }">
              <div class="d-flex flex-column">
                Lock for claiming
                <span class="sub-title"> {{ vm.currentBounty | usd }} </span>
              </div>
              <div class="d-flex flex-column">
                Total received
                <span class="sub-title"> {{ vm.bountyRewarded | usd }} </span>
              </div>
            </div>
            <div class="font-italic success--text font-weight-600 mt-6 px-2">
              You can claim your reward after TGE. Participate and complete your mission to earn more!
            </div>
          </v-card>

          <div class="mt-6">
            <v-card v-for="claimer in vm.claimers" :key="claimer.claimerInfo.contract" class="pa-4">
              <div>
                <span class="mr-4">Token:</span>
                <span>{{ claimer.claimerInfo.name }}</span>
              </div>
              <div>
                <span class="mr-4">Total:</span>
                <span>{{ claimer.userAmount | formatNumber(2, 2) }}</span>
              </div>
              <div>
                <span class="mr-4">Claimed:</span>
                <span>{{ claimer.userClaimedAmount | formatNumber(2, 2) }}</span>
              </div>
              <div>
                <span class="mr-4">Claimable now:</span>
                <span>{{ claimer.userClaimableAmount | formatNumber(2, 2) }}</span>
              </div>
              <div>
                <connect-metamask :requiredChainId="claimer.claimerInfo.chainId">
                  <v-btn
                    :disabled="!claimer.canClaim"
                    color="primary"
                    @click="vm.claim(claimer)"
                    :loading="claimer.claiming"
                    >Claim</v-btn
                  >
                </connect-metamask>
              </div>
            </v-card>
          </div>

          <div v-if="vm.balances.length > 0">
            <div class="sub-title mt-6">Balance details</div>
            <v-card
              class="sub-card border-radius-8 my-2 pa-4"
              outlined
              v-for="balance in vm.balances"
              :key="balance.address"
              :class="{ 'd-flex align-center justify-space-between': $vuetify.breakpoint.mdAndUp }"
            >
              <div>
                <span> Token: </span>
                <span class="font-weight-bold"> {{ balance.token }} </span>
              </div>
              <div>
                <span>Token amount:</span>
                <span class="font-weight-bold"> {{ balance.rewardAmount }} </span>
              </div>
            </v-card>
          </div>

          <div v-if="$_get(vm.slicedRewardHistories, 'length')">
            <div class="sub-title mt-6">Recently rewarded</div>
            <v-card
              class="sub-card border-radius-8 my-2 pa-4"
              outlined
              v-for="(rewardHistory, index) in vm.slicedRewardHistories"
              :key="index"
              :class="{ 'd-flex align-center justify-space-between': $vuetify.breakpoint.mdAndUp }"
            >
              <div>
                <span> Bounty rewarded: </span>
                <span class="font-weight-bold"> {{ rewardHistory.rewardAmount | usd }} {{ rewardHistory.token }} </span>
              </div>
              <div>{{ moment(rewardHistory.datetime) | datetime }}</div>
            </v-card>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import { BountyRewardViewModel } from '@/modules/bounty-reward/viewmodels/bounty-reward-viewmodel'
import { authStore } from '@/stores/auth-store'
import { walletStore } from '@/stores/wallet-store'
import { Observer } from 'mobx-vue'
import moment from 'moment'
import { Component, Provide, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {},
})
export default class BountyRewardPage extends Vue {
  @Provide() vm = new BountyRewardViewModel()
  walletStore = walletStore
  authStore = authStore
  moment = moment
}
</script>

<style scoped lang="scss">
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

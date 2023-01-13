<template>
  <v-card style="width: 450px" class="pa-6" color="neutral100">
    <v-row dense no-gutters>
      <v-col cols="12">
        <div class="d-flex">
          <v-avatar size="48">
            <v-img :src="require('@/assets/images/busd-logo.png')"></v-img>
          </v-avatar>
          <div class="ml-2 text-truncate">
            <div class="titile-h4 text-truncate">{{ claimer.claimerInfo.poolName }}</div>
            <div class="d-flex text-truncate">
              <span class="text-truncate paragraph-body-bold">
                {{ claimer.claimerInfo.name }}
                <span class="blue--text">{{ claimer.claimerInfo.token }}</span>
              </span>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="mt-4">
        <v-container class="blue lighten-3 rounded-lg pa-6">
          <v-row dense no-gutters>
            <v-col cols="12" dense no-gutters>
              <div class="d-flex justify-space-between">
                <div class="paragraph-sub-semibold neutral10--text">Total reward</div>
                <div class="paragraph-sub-semibold neutral0--text">
                  {{ claimer.userAmount | formatNumber(2, 2) }} {{ claimer.claimerInfo.name }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" dense no-gutters>
              <div class="d-flex justify-space-between mt-3">
                <div class="paragraph-sub-semibold neutral10--text">Claimed</div>
                <div class="paragraph-sub-semibold neutral0--text">
                  {{ claimer.userClaimedAmount | formatNumber(2, 2) }} {{ claimer.claimerInfo.name }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" dense no-gutters>
              <div class="d-flex justify-space-between mt-3">
                <div class="paragraph-sub-semibold neutral10--text">Claimable now</div>
                <div class="paragraph-sub-semibold neutral0--text">
                  {{ claimer.userClaimableAmount | formatNumber(2, 2) }} {{ claimer.claimerInfo.name }}
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12" class="mt-4">
        <connect-metamask :requiredChainId="claimer.claimerInfo.chainId">
          <v-btn class="full-width elevation-0 bluePrimary white--text" @click="claim()" :disabled="!claimer.canClaim">
            Claim
          </v-btn>
        </connect-metamask>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { loadingController } from '@/components/global-loading/global-loading-controller'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { BountyClaimerStore } from '@/stores/bounty-claimer-stores'
import { walletStore } from '@/stores/wallet-store'
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {},
})
export default class RewardClaimerV1 extends Vue {
  @Prop({ required: true }) claimer!: BountyClaimerStore

  async claim() {
    try {
      loadingController.increaseRequest()
      await this.claimer.claim(walletStore.account!)
    } catch (error) {
      snackController.error(error as string)
    } finally {
      loadingController.decreaseRequest()
    }
  }
}
</script>

<style>
.titile-h4 {
  font-weight: 700;
  font-size: 20px;
}
.paragraph-body-bold {
  font-weight: 700;
  font-size: 14px;
}
.paragraph-sub-semibold {
  font-weight: 600;
  font-size: 16px;
}
</style>

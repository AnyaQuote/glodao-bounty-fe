<template>
  <v-container>
    <div class="d-flex align-center justify-center">
      <v-card class="neutral100 border-radius-16 pa-8" elevation="3" style="max-width: 555px" outlined>
        <v-container>
          <div class="d-flex align-center justify-center">
            <img :src="require('@/assets/images/reward.svg')" alt="" />
            <div class="page-title ml-4">Bounty reward dashboard</div>
          </div>
          <div class="mt-4 py-4 text-center">
            <v-icon class="mr-2" left size="24">mdi-wallet-outline</v-icon>
            <span class="address">
              {{ walletStore.account }}
            </span>
          </div>
          <v-card class="mt-4 border-radius-8 py-6 text-center sub-card" outlined>
            <div class="d-flex align-center justify-space-around">
              <div class="d-flex flex-column">
                Current bounty
                <span class="sub-title"> 0.00 BUSD </span>
              </div>
              <div class="d-flex flex-column">
                Bounty rewarded
                <span class="sub-title"> 0.00 BUSD </span>
              </div>
            </div>
            <div class="font-italic success--text font-weight-bold mt-4">
              We will pay you when your reward reaches 0.5$. Participate and complete your mission to earn more!
            </div>
          </v-card>

          <div v-if="showHistory">
            <div class="sub-title mt-6">Rewarded History</div>
            <v-card
              class="sub-card border-radius-8 d-flex align-center justify-space-between my-2 pa-4"
              outlined
              v-for="index in 5"
              :key="index"
            >
              <div>
                <span> Bounty rewarded: </span>
                <span class="font-weight-bold"> $0.5 BUSD </span>
              </div>
              <div>18/8/2022</div>
            </v-card>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'

@Observer
@Component({
  components: {},
})
export default class BountyHistoryPage extends Vue {
  walletStore = walletStore
  authStore = authStore
  showHistory = true
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
</style>

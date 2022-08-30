<template>
  <div>
    <div class="fill-width">
      <v-img :src="require('@/assets/images/donationPageBanner.jpg')"></v-img>
    </div>
    <v-container>
      <div class="d-flex align-center justify-center mt-6">
        <v-card class="neutral100 border-radius-16 pa-8" elevation="3" style="max-width: 555px" outlined>
          <v-container>
            <div class="d-flex align-center justify-center">
              <img :src="require('@/assets/images/reward.png')" alt="" />
              <div class="page-title ml-4">Donate now</div>
            </div>
            <div class="mt-4 py-2 text-center">
              <v-icon class="mr-2" left size="24">mdi-wallet-outline</v-icon>
              <span v-if="!vm.account">You need to connect your wallet first</span>
              <span class="address" v-if="$vuetify.breakpoint.smAndUp">
                {{ vm.account }}
              </span>
              <span class="address" v-else>
                {{ vm.account | shortAddress(6, 6) }}
              </span>
            </div>
            <div class="py-6 px-2 text-center">
              <div :class="{ 'd-flex align-center justify-center': $vuetify.breakpoint.mdAndUp }">
                <v-card
                  @click="vm.changeDonationAmount(amount)"
                  class="border-radius-8 py-6 px-2 text-center ma-2"
                  :class="{
                    'linear-background-blue-main white--text': amount === vm.amount,
                    'neutral100--bg primary--text': amount !== vm.amount,
                  }"
                  style="min-width: 80px"
                  v-for="amount in vm.amountList"
                  :key="amount"
                >
                  {{ amount }}$
                </v-card>
              </div>
            </div>
            <div class="ml-5">
              <span class="text-body-2 font-italic text-decoration-underline"
                >Donate to support us and earn a chance to receive our exclusive NFT</span
              >
            </div>
            <div class="mt-1 py-4 text-center">
              <div :class="{ 'd-flex align-center justify-space-around': $vuetify.breakpoint.mdAndUp }">
                <div>
                  <v-btn
                    depressed
                    :class="buttonClass"
                    large
                    :block="$vuetify.breakpoint.xs"
                    :disabled="vm.shouldDisableDonate"
                    @click="vm.donate()"
                  >
                    Donate
                  </v-btn>
                </div>
              </div>
            </div>
          </v-container>
        </v-card>
      </div>
      <div :class="{ 'd-flex align-center justify-space-around ': $vuetify.breakpoint.mdAndUp }">
        <div class="mt-8" style="min-width: 300px">
          <!-- <div class="page-title">Donation history</div>
        <v-card class="pa-8" flat elevation="3">
          <div>
            <v-data-table
              border=""
              :disable-sort="true"
              :headers="headers1"
              :items="desserts1"
              :hide-default-footer="true"
            ></v-data-table>
          </div>
        </v-card> -->
        </div>
        <div class="mt-8" style="min-width: 300px">
          <!-- <div class="page-title">Your donation history</div>
        <v-card class="pa-8" flat elevation="3">
          <div>
            <v-data-table
              border=""
              :headers="headers"
              :items="desserts"
              :disable-sort="true"
              :hide-default-footer="true"
              :sortable="false"
            ></v-data-table>
          </div>
        </v-card> -->
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { DonateViewModel } from '@/modules/donate/viewmodels/donate-viewmodel'
import moment from 'moment'

@Observer
@Component({
  components: {},
})
export default class DonatePage extends Vue {
  @Provide() vm = new DonateViewModel()
  buttonClass = 'rounded linear-background-blue-main white--text'
  headers = [
    {
      text: 'Amount',
      align: 'start',
      sortable: false,
      value: 'amount',
    },
    { text: 'Date', value: 'date' },
  ]
  desserts = [
    {
      amount: '600',
      date: '10/10/2022',
    },
    {
      amount: '600',
      date: '10/10/2022',
    },
  ]
  headers1 = [
    {
      text: 'Amount',
      align: 'start',
      sortable: false,
      value: 'amount',
    },
    { text: 'Date', value: 'date' },
    { text: 'Address', value: 'address' },
  ]
  desserts1 = [
    {
      amount: '600',
      date: '10/10/2022',
      address: '0xb641934f5cD11755581D3587Dfd6cB81109a908bo',
    },
    {
      amount: '600',
      date: '10/10/2022',
      address: '0xb641934f5cD11755581D3587Dfd6cB81109a908b',
    },
  ]

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
.v-btn--disabled {
  background-image: none;
}
</style>

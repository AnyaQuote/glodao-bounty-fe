<template>
  <v-container>
    <div class="d-flex align-center justify-center mt-6">
      <v-card class="neutral100 border-radius-16 pa-8" elevation="3" style="max-width: 555px" outlined>
        <v-container>
          <div class="d-flex align-center justify-center">
            <img :src="require('@/assets/images/reward.png')" alt="" />
            <div class="page-title ml-4">Support us</div>
          </div>
          <div class="mt-4 py-2 text-center">
            <v-icon class="mr-2" left size="24">mdi-wallet-outline</v-icon>
            <span class="address" v-if="$vuetify.breakpoint.smAndUp">
              {{ walletStore.account }}
            </span>
            <span class="address" v-else>
              {{ walletStore.account | shortAddress(6, 6) }}
            </span>
          </div>
          <div class="py-6 px-2 text-center">
            <div :class="{ 'd-flex align-center justify-center': $vuetify.breakpoint.mdAndUp }">
              <v-card
                @click="changeColor('button')"
                class="border-radius-8 py-6 px-2 text-center ma-2"
                :color="color"
                style="min-width: 80px"
              >
                1$
              </v-card>
              <v-card
                @click="changeColor('button1')"
                class="border-radius-8 py-6 px-2 text-center ma-2"
                :color="color1"
                style="min-width: 80px"
              >
                5$
              </v-card>
              <v-card
                @click="changeColor('button2')"
                :color="color2"
                class="border-radius-8 py-6 px-2 text-center ma-2"
                style="min-width: 80px"
              >
                10$
              </v-card>
              <v-card
                @click="changeColor('button3')"
                :color="color3"
                class="border-radius-8 py-6 px-2 text-center ma-2"
                style="min-width: 80px"
              >
                20$
              </v-card>
            </div>
          </div>
          <div class="ml-5">
            <span>lorem ipsum dolor sit am id urna et ullamcorper lorem ipsum 
              dolor sit am id urna et ull lorem</span>
          </div>
          <div class="mt-1 py-4 text-center">
            <div :class="{ 'd-flex align-center justify-space-around': $vuetify.breakpoint.mdAndUp }">
              <div>
                <v-btn depressed :class="buttonClass" large :block="$vuetify.breakpoint.xs" :disabled="isDonateAble()">
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
        <div class="page-title">Donation history</div>
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
        </v-card>
      </div>
      <div class="mt-8" style="min-width: 300px">
        <div class="page-title">Your donation history</div>
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
        </v-card>
      </div>
    </div>
  </v-container>
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
  color = 'white'
  color1 = 'white'
  color2 = 'white'
  color3 = 'white'
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
  isDonateAble() {
    if (this.color1 === 'white' && this.color2 === 'white' && this.color3 === 'white' && this.color === 'white') {
      this.buttonClass = 'rounded white--text'
      return true
    } else {
      this.buttonClass = 'rounded linear-background-blue-main white--text'
      return false
    }
  }

  changeColor(type: string) {
    if (this.color === 'white' && type === 'button') {
      this.color = 'red'
    } else {
      this.color = 'white'
    }
    if (this.color1 === 'white' && type === 'button1') {
      this.color1 = 'red'
    } else {
      this.color1 = 'white'
    }
    if (this.color2 === 'white' && type === 'button2') {
      this.color2 = 'red'
    } else {
      this.color2 = 'white'
    }
    if (this.color3 === 'white' && type === 'button3') {
      this.color3 = 'red'
    } else {
      this.color3 = 'white'
    }
  }

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

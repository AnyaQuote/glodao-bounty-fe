<template>
  <v-row>
    <v-col cols="12">
      <v-container class="d-flex justify-center mt-10">
        <v-sheet width="534" height="418" outlined>
          <div class="d-flex justify-center align-center py-5 card-title-text font-weight-600 text-uppercase">
            confirm and earn reward
          </div>
          <div class="custom-blue-divider fill-width"></div>
          <div class="mt-7 px-8">
            <div>
              <ul class="card-title-text">
                <li>You have done successfully the Twitter task!</li>
                <li>Your total reward: <span class="card-title-text font-weight-600">1000 DVT</span></li>
              </ul>
            </div>
            <div class="mt-8 small-label">Please enter your reward address and perform KYC to reward</div>
            <v-sheet class="mt-4 py-1 px-2 d-flex align-center" outlined>
              <v-text-field
                hide-details
                dense
                placeholder="Your wallet address"
                flat
                solo
                class="ma-0 pa-0"
              ></v-text-field>
              <v-icon>mdi-wallet-outline</v-icon>
            </v-sheet>
            <v-sheet class="mt-6 py-1 px-2 d-flex align-center" outlined>
              <!-- <v-icon color="success">mdi-check</v-icon> -->
              <v-text-field
                hide-details
                dense
                placeholder="Perform KYC to complete"
                flat
                solo
                class="ma-0 pa-0"
                readonly
              ></v-text-field>
              <v-btn depressed class="background-blue-diversity white--text rounded-0 text-capitalize">
                Submit KYC
              </v-btn>
            </v-sheet>
            <div class="mt-6 d-flex justify-center">
              <v-btn depressed class="background-blue-diversity line-height-6 rounded-0 px-4 py-2" height="40">
                <span class="btn-span text-capitalize">Reward</span>
              </v-btn>
            </div>
          </div>
        </v-sheet>
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Ref, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { BountyHunterViewModel } from '@/modules/bounty/viewmodels/bounty-hunter-viewmodel'

@Observer
@Component({
  components: {},
})
export default class Farming extends Vue {
  @Provide() vm = new BountyHunterViewModel()
  walletStore = walletStore
  items = ['Foo', 'Bar', 'Fizz', 'Buzz']
}
</script>

<style scoped lang="scss">
@import url('~@/modules/reward/styles/index.scss');
.small-label {
  font-size: 14px;
  line-height: 18px;
}
.custom-blue-divider {
  border-top: 3px solid var(--v-bluePrimary-base);
}
.btn-span {
  line-height: 24px;
  color: white;
  font-size: 14px;
}
</style>

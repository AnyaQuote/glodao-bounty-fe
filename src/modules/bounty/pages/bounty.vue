<template>
  <v-container class="pa-0 ma-0 fill-width" style="max-width: 100% !important">
    <v-row dense no-gutters>
      <v-col>
        <v-sheet height="336" class="page-title-container text-uppercase">
          <div>Bounty</div>
          <div class="mt-4 font-italic">Hunter</div>
        </v-sheet>
        <v-divider />
      </v-col>
    </v-row>
    <v-row dense no-gutters>
      <v-col>
        <v-container>
          <v-row>
            <v-col class="mt-10 section-big-title-text font-weight-bold" cols="12">Your current task</v-col>
            <v-col lg="3" md="6" sm="12" cols="12">
              <current-task />
            </v-col>
            <v-col lg="3" md="6" sm="12" cols="12">
              <current-task />
            </v-col>
            <v-col lg="3" md="6" sm="12" cols="12">
              <current-task />
            </v-col>
            <v-col lg="3" md="6" sm="12" cols="12">
              <current-task />
            </v-col>
          </v-row>
        </v-container>
        <v-divider class="mt-8" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-container class="mt-10">
          <v-row>
            <v-col>
              <div class="section-big-title-text font-weight-bold">Bounty hunters (32)</div>
            </v-col>
            <v-col cols="12" lg="2" md="3" sm="3" xs="4">
              <v-select :items="items" label="Start time" outlined dense class="rounded-0"></v-select>
            </v-col>
            <v-col cols="12" lg="2" md="3" sm="3" xs="4">
              <v-select :items="items" label="Recently added" outlined dense class="rounded-0"></v-select>
            </v-col>
          </v-row>
          <v-row class="mt-8">
            <v-col md="4" sm="6" cols="12">
              <bounty-card />
            </v-col>
            <v-col md="4" sm="6" cols="12">
              <bounty-card />
            </v-col>
            <v-col md="4" sm="6" cols="12">
              <bounty-card />
            </v-col>
          </v-row>
          <v-row dense no-gutters>
            <v-col>
              <div class="my-10 d-flex justify-center align-center">
                <v-btn outlined class="rounded-0 font-weight-600 button-small text-capitalize">
                  Loadmore (118 bounty hunters)
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Ref, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { BountyHunterViewModel } from '@/modules/bounty/viewmodels/bounty-hunter-viewmodel'

@Observer
@Component({
  components: {
    'current-task': () => import('@/modules/bounty/components/current-task.vue'),
    'bounty-card': () => import('@/modules/bounty/components/bounty-card.vue'),
  },
})
export default class Farming extends Vue {
  @Provide() vm = new BountyHunterViewModel()
  walletStore = walletStore
  items = ['Foo', 'Bar', 'Fizz', 'Buzz']
}
</script>

<style scoped lang="scss">
@import url('~@/modules/bounty/styles/index.scss');
.button-small {
  font-size: 14px;
  line-height: 24px;
}
.page-title-container {
  padding: 86px 0 106px 178px;
  font-size: 72px;
  line-height: 64px;
  font-weight: 700;
}
</style>

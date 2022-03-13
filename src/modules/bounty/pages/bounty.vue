<template>
  <v-row>
    <v-col cols="12">
      <v-container>
        <v-sheet height="336" class="page-title-container text-uppercase">
          <!-- <div>Bounty</div> -->
          <!-- <div class="mt-4 font-italic">Hunter</div> -->
        </v-sheet>
      </v-container>
      <v-divider />
    </v-col>
    <v-col cols="12" v-if="authStore.jwt && vm.currentTaskList.length > 0">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-space-between align-center">
              <div class="section-big-title-text font-weight-bold">Your current task</div>
              <div class="card-title-text font-weight-600">
                <router-link to="/hunting-history" class="blue-diversity--text">View all</router-link>
                <v-icon>mdi-chevron-right</v-icon>
              </div>
            </div>
          </v-col>

          <v-col lg="3" md="6" sm="12" cols="12" v-for="task in vm.currentTaskList" :key="task.id">
            <current-task
              :id="task.id"
              :currentStep="task.currentStep"
              :totalStep="task.totalStep"
              :type="task.type"
              :shortDescription="task.shortDescription"
              :status="task.status"
              :name="task.name"
              :chainId="task.chainId"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="mt-8" />
    </v-col>
    <v-col cols="12">
      <v-container>
        <v-row>
          <v-col>
            <div class="section-big-title-text font-weight-bold">Bounty hunters ({{ vm.bountyCount }})</div>
          </v-col>
          <v-col cols="12" lg="2" md="3" sm="3" xs="4">
            <v-select :items="items" label="Start time" outlined dense class="rounded-0"></v-select>
          </v-col>
          <v-col cols="12" lg="2" md="3" sm="3" xs="4">
            <v-select :items="items" label="Recently added" outlined dense class="rounded-0"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="4" sm="6" cols="12" v-for="bounty in vm.convertedBountyList" :key="bounty.id">
            <bounty-card
              :name="bounty.name"
              :id="bounty.id"
              :startTime="bounty.startTime"
              :rewardAmount="bounty.rewardAmount"
              :chainId="bounty.chainId"
              :metadata="bounty.metadata"
              :types="bounty.types"
              :maxParticipant="bounty.maxParticipant"
            />
          </v-col>
        </v-row>
        <v-row dense no-gutters v-if="vm.remainingBounty > 0">
          <v-col>
            <div class="my-10 d-flex justify-center align-center">
              <v-btn
                outlined
                class="rounded-0 font-weight-600 button-small text-capitalize"
                @click="vm.getBountyListByPage()"
              >
                Loadmore ({{ vm.remainingBounty }} bounty hunters)
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Ref, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { BountyHunterViewModel } from '@/modules/bounty/viewmodels/bounty-hunter-viewmodel'

@Observer
@Component({
  components: {
    'current-task': () => import('@/modules/bounty/components/current-task.vue'),
    'bounty-card': () => import('@/modules/bounty/components/bounty-card.vue'),
  },
})
export default class BountyPage extends Vue {
  @Provide() vm = new BountyHunterViewModel()
  walletStore = walletStore
  authStore = authStore
  items = ['Foo', 'Bar', 'Fizz', 'Buzz']

  mounted() {
    this.vm.initReaction()
  }

  goToHuntingHistory() {
    this.$router.push('hunting-history')
  }

  beforeDestroy() {
    this.vm.destroyReaction()
  }
}
</script>

<style scoped lang="scss">
.button-small {
  font-size: 14px;
  line-height: 24px;
}
.page-title-container {
  // padding: 86px 0 106px 0;
  font-size: 72px;
  line-height: 64px;
  font-weight: 700;
  background-image: url('~@/assets/images/task-list-cover-bg.svg');
  background-size: cover;
  background-position: center;
}
</style>

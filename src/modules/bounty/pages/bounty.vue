<template>
  <v-row>
    <v-col cols="12">
      <bounty-banner></bounty-banner>
    </v-col>
    <v-col cols="12" v-if="authStore.jwt && vm.currentTaskList.length > 0">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="d-flex justify-space-between align-center">
              <div class="section-big-title-text font-weight-bold">Your current task</div>
              <div class="card-title-text font-weight-600 d-flex align-center">
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
        <bounty-upcomming :upcomingPoolList="vm.convertedUpcomingBountyList"></bounty-upcomming>
      </v-container>
    </v-col>

    <v-col cols="12">
      <v-divider class="my-4"></v-divider>
      <v-container>
        <v-row>
          <v-col>
            <div class="section-big-title-text text-uppercase font-weight-bold">Hunting time starts</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="6" sm="6" cols="12" v-for="bounty in vm.convertedLiveBountyList" :key="bounty.id">
            <hunting-time-card
              :coverImageUrl="bounty.coverImage"
              :endTime="bounty.endTime"
              :chainId="bounty.chainId"
              :name="bounty.name"
              :rewardAmount="bounty.rewardAmount"
              :projectLogo="bounty.projectLogo"
              :tokenName="bounty.tokenName"
              :participant="bounty.participant"
              :id="bounty.id"
              :task="bounty"
            ></hunting-time-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-col cols="12">
      <v-divider class="my-4"></v-divider>
      <v-container>
        <v-row>
          <v-col>
            <div class="section-big-title-text text-uppercase font-weight-bold">FINISHED POOLS</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="4" sm="6" cols="12" v-for="bounty in vm.convertedBountyList" :key="bounty.id">
            <bounty-card
              :name="bounty.name"
              :id="bounty.id"
              :rewardAmount="bounty.rewardAmount"
              :startTime="bounty.startTime"
              :endTime="bounty.endTime"
              :chainId="bounty.chainId"
              :metadata="bounty.metadata"
              :types="bounty.types"
              :maxParticipant="bounty.maxParticipant"
              :totalParticipants="bounty.totalParticipants"
            />
          </v-col>
        </v-row>
        <v-row dense no-gutters>
          <v-col>
            <div class="my-10 mb-4 d-flex justify-center align-center">
              <v-btn
                outlined
                class="rounded-0 font-weight-600 button-small text-capitalize"
                @click="goToBountyHistoryPage"
              >
                View more
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
import { Component, Vue, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { BountyHunterViewModel } from '@/modules/bounty/viewmodels/bounty-hunter-viewmodel'

@Observer
@Component({
  components: {
    'current-task': () => import('@/modules/bounty/components/current-task.vue'),
    'bounty-card': () => import('@/modules/bounty/components/bounty-card.vue'),
    'info-card': () => import('@/modules/bounty/components/info-card.vue'),
    'bounty-banner': () => import('@/modules/bounty/components/bounty-banner.vue'),
    'bounty-upcomming': () => import('@/modules/bounty/components/bounty-upcomming.vue'),
    'hunting-time-card': () => import('@/modules/bounty/components/hunting-card.vue'),
  },
})
export default class BountyPage extends Vue {
  @Provide() vm = new BountyHunterViewModel()
  walletStore = walletStore
  authStore = authStore
  dates = []

  mounted() {
    this.vm.initReaction()
  }

  goToBountyHistoryPage() {
    this.$router.push('/bounty-history')
  }

  goToHuntingHistory() {
    this.$router.push('hunting-history')
  }

  closeDialog() {
    this.vm.changeDateRangeDialog(false)
    if (this.vm.dateRanges.length > 0) this.dates = this.vm.dateRanges
    else this.dates = []
  }

  changeDateRange() {
    this.vm.changeDateRange(this.dates)
    this.vm.changeDateRangeDialog(false)
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
.section-big-title-text {
  color: var(--v-primary-base) !important;
}
</style>

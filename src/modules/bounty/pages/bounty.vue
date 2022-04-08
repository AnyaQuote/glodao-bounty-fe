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
            <div class="section-big-title-text text-uppercase blue--text font-weight-bold">Hunting time starts</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="4" sm="6" cols="12" v-for="bounty in vm.convertedLiveBountyList" :key="bounty.id">
            <hunting-time-card
              :coverImageUrl="bounty.coverImage"
              :endTime="bounty.endTime"
              :chainId="bounty.chainId"
              :name="bounty.name"
              :rewardAmount="bounty.rewardAmount"
              :tokenName="bounty.tokenName"
              :participant="bounty.participant"
              :id="bounty.id"
            ></hunting-time-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <!-- <v-col cols="12">
      <v-divider class="my-4"></v-divider>
      <v-container>
        <bounty-upcomming :upcomingPoolList="vm.convertedUpcomingBountyList"></bounty-upcomming>
      </v-container>
    </v-col> -->

    <!-- <v-col cols="12">
      <v-divider class="my-4"></v-divider>
      <v-container>
        <v-row>
          <v-col>
            <div class="section-big-title-text font-weight-bold">Live pools</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6" sm="6" cols="12" v-for="bounty in vm.convertedLiveBountyList" :key="bounty.id">
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
      </v-container>
    </v-col> -->

    <v-col cols="12">
      <v-divider class="my-4"></v-divider>
      <v-container>
        <v-row>
          <v-col>
            <div class="section-big-title-text text-uppercase blue--text font-weight-bold">
              Bounty pools ({{ vm.bountyCount }})
            </div>
          </v-col>
          <!-- <v-col cols="12" lg="2" md="3" sm="3" xs="4">
            <v-btn
              outlined
              depressed
              class="fill-width text-none text-start font-weight-regular d-flex justify-start align-center"
              height="40"
              @click="vm.changeDateRangeDialog(true)"
              style="border: thin solid rgba(0, 0, 0, 0.38) !important"
            >
              Filter by start time
            </v-btn>
          </v-col> -->
          <v-col cols="12" lg="2" md="3" sm="3" xs="4">
            <v-select
              :items="vm.sortList"
              label="Sort"
              outlined
              dense
              height="40"
              @change="vm.onSortConditionChange"
            ></v-select>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col lg="3" md="6" sm="6" cols="12">
            <info-card type="missions" :info="vm.bountyCount"></info-card>
          </v-col>
          <v-col lg="3" md="6" sm="6" cols="12">
            <info-card type="rewards" :info="'10000' | formatNumber(2, 0)"></info-card>
          </v-col>
          <v-col lg="3" md="6" sm="6" cols="12">
            <info-card type="users" :info="'100' | formatNumber(2, 0)"></info-card>
          </v-col>
          <v-col lg="3" md="6" sm="6" cols="12">
            <info-card type="participants" :info="'1000' | formatNumber(2, 0)"></info-card>
          </v-col>
        </v-row> -->
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
    <v-dialog v-model="vm.dateRangeDialog" width="300" persistent>
      <v-sheet>
        <v-sheet class="d-flex justify-center">
          <v-date-picker v-model="dates" range no-title></v-date-picker>
        </v-sheet>
        <v-sheet class="d-flex justify-space-between pa-4">
          <v-btn class="rounded-0" depressed @click="closeDialog()">Cancel</v-btn>
          <v-btn class="rounded-0 background-blue-diversity white--text" depressed @click="changeDateRange()">
            Select
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-dialog>
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
</style>

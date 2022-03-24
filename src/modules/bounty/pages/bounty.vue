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
      <!-- <v-container>
        <v-row>
          <v-col>
            <div class="section-big-title-text font-weight-bold">Upcoming pools</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6" sm="6" cols="12" v-for="bounty in vm.convertedUpcomingBountyList" :key="bounty.id">
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
      </v-container> -->
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="section-big-title-text font-weight-bold">Upcoming pools</div>
          </v-col>
          <v-col cols="9">
            <div class="view-container">
              <v-img class="view-cover border-radius-16" :src="require('@/assets/images/dummy_cover.png')"></v-img>
              <div class="view-content d-flex flex-column justify-space-between align-items-start pa-10">
                <div class="view-top">
                  <v-sheet class="d-flex flex-row align-center border-radius-16 pa-5">
                    <v-img
                      class="view-top-icon"
                      max-height="64"
                      max-width="64"
                      :src="require('@/assets/images/dummy_cryptocurrency.svg')"
                    ></v-img>
                    <div class="d-flex flex-column flex-grow-1 pl-5">
                      <div class="d-flex flex-row align-center justify-space-between">
                        <div class="view-top-name blue--text">The Peaky Blinder</div>
                        <div class="dot"></div>
                        <div class="view-top-value">10,000 TPB</div>
                      </div>
                      <div class="view-top-date">Jan 21st 2022, 10:00 am - Feb 26th 2022, 10:00 am</div>
                    </div>
                  </v-sheet>
                </div>
                <div class="view-bottom white--text">
                  <div>Social link:</div>
                  <div>
                    <v-btn icon><v-icon color="white">mdi-twitter</v-icon></v-btn>
                    <v-btn icon><v-icon color="white">mdi-twitter</v-icon></v-btn>
                    <v-btn icon><v-icon color="white">mdi-twitter</v-icon></v-btn>
                    <v-btn icon><v-icon color="white">mdi-twitter</v-icon></v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="3">
            <div>Slider here</div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>

    <v-col cols="12">
      <v-divider class="my-4"></v-divider>
      <v-container>
        <v-row>
          <v-col>
            <div class="section-big-title-text font-weight-bold">Hunting time starts</div>
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
            <div class="section-big-title-text font-weight-bold">Bounty pools ({{ vm.bountyCount }})</div>
          </v-col>
          <v-col cols="12" lg="2" md="3" sm="3" xs="4">
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
          </v-col>
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

.view-container {
  position: relative;
  height: auto;
}

.view-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 0;
}

.view-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.flex-grow-1 {
  flex: 1;
}

.align-items-start {
  align-items: flex-start;
}

.view-bottom {
  position: relative;
  z-index: 1;
}

.border-radius-16 {
  border-radius: 16px;
}

.view-top-name {
  font-size: 24px;
  font-weight: 700;
  line-height: 31px;
}

.view-top-value {
  font-size: 24px;
  font-weight: 700;
  line-height: 31px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background: grey;
  flex-shrink: 0;
}
</style>

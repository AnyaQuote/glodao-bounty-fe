<template>
  <v-row>
    <v-col cols="12" class="hunter-info-container">
      <v-container class="d-flex justify-center mt-20">
        <v-sheet elevation="2" class="fill-width">
          <v-row dense no-gutters>
            <v-col cols="12" md="4" lg="4">
              <v-sheet height="160" outlined style="flex: 1">
                <div class="mt-6 d-flex justify-center">
                  <v-avatar size="68">
                    <img :src="authStore.user.hunter.metadata.avatar" alt="Avatar" />
                  </v-avatar>
                </div>
                <div class="d-flex justify-center mt-3 username-lg-text font-weight-bold">
                  {{ authStore.user.hunter.name }}
                </div>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet height="160" outlined style="flex: 2">
                <v-row dense no-gutters class="d-flex align-center fill-height pl-6">
                  <v-col cols="4">
                    <v-sheet class="number-count-text d-flex align-center">
                      <div>
                        <v-icon style="opacity: 0.8">mdi-bullseye-arrow</v-icon>
                      </div>
                      <div class="d-flex align-center ml-2">{{ vm.completedTaskCount }}</div>
                    </v-sheet>
                    <v-sheet class="caption-text">Successful task</v-sheet>
                  </v-col>
                  <v-col cols="4">
                    <v-sheet class="number-count-text d-flex align-center">
                      <div>
                        <v-img :src="require('@/assets/icons/processing-spiral.svg')" width="20" height="20"></v-img>
                      </div>
                      <div class="d-flex align-center ml-2">{{ vm.processingTaskCount }}</div>
                    </v-sheet>
                    <v-sheet class="caption-text">Processing task</v-sheet>
                  </v-col>
                  <v-col cols="4">
                    <v-sheet class="number-count-text d-flex align-center">
                      <div>
                        <v-img :src="require('@/assets/icons/crown-mini.svg')" width="20" height="20"></v-img>
                      </div>
                      <div class="d-flex align-center ml-2">$0.00</div>
                    </v-sheet>
                    <v-sheet class="caption-text">Bounty earned</v-sheet>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
      <v-divider class="mt-10"></v-divider>
    </v-col>

    <v-col cols="12">
      <v-container>
        <v-row :dense="$vuetify.breakpoint.smAndDown" :no-gutters="$vuetify.breakpoint.smAndDown">
          <v-col cols="12">
            <div class="section-big-title-text font-weight-bold text-capitalize">Bounty Hunting History</div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-select v-model="vm.statusModel" :items="vm.status" label="Status" outlined dense multiple>
              <template v-slot:selection="{ item, index }">
                <span v-if="index === 0">{{ item }}</span>
                <span v-if="index === 1" class="text-caption"> &nbsp;(+{{ vm.statusModel.length - 1 }}) </span>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <!-- <v-select :items="items" label="Time" outlined dense class="rounded-0"></v-select> -->
            <v-btn
              outlined
              depressed
              class="fill-width text-none text-start font-weight-regular d-flex justify-start align-center"
              height="40"
              @click="vm.changeDateRangeDialog(true)"
              style="border: thin solid rgba(0, 0, 0, 0.38) !important"
            >
              Filter by date
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <!-- <v-select :items="items" label="Project" outlined dense class="rounded-0"></v-select> -->
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <!-- <v-select
              v-model="socialsModel"
              :items="socials"
              label="Social task"
              outlined
              dense
              class="rounded-0"
              multiple
            >
              <template v-slot:selection="{ item, index }">
                <span v-if="index === 0">{{ item }}</span>
                <span v-if="index === 1" class="grey--text text-caption"> &nbsp;(+{{ socialsModel.length - 1 }}) </span>
              </template>
            </v-select> -->
          </v-col>

          <v-col cols="12" md="3">
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
        <v-row dense no-gutters>
          <v-col v-if="vm.convertedHuntingHistoryList.length > 0">
            <div class="mt-2" v-for="task in vm.convertedHuntingHistoryList" :key="task.id">
              <hunting-history-card
                :coverImage="task.coverImage"
                :id="task.id"
                :chainId="task.chainId"
                :bountyEarn="task.bountyEarn"
                :currentStep="task.currentStep"
                :name="task.name"
                :startTime="task.startTime"
                :status="task.status"
                :totalStep="task.totalStep"
                :type="task.type"
                :rewardToken="task.rewardToken"
              />
            </div>
          </v-col>
          <v-col cols="12" v-else>
            <no-items />
          </v-col>
          <v-col cols="12" class="my-8">
            <v-pagination
              v-model="vm.page"
              :length="vm.totalPageCount"
              :total-visible="7"
              color="blue"
              :value="vm.page"
              v-if="vm.page > 1"
            ></v-pagination>
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
import { Component, Vue, Ref, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { HuntingHistoryViewModel } from '@/modules/account/viewmodels/hunting-history-viewmodel'

@Observer
@Component({
  components: {
    'hunting-history-card': () => import('@/modules/account/components/hunting-history-card.vue'),
    'no-items': () => import('@/modules/account/components/no-items.vue'),
  },
})
export default class HuntingHistory extends Vue {
  @Provide() vm = new HuntingHistoryViewModel()
  walletStore = walletStore
  authStore = authStore
  items = ['Foo', 'Bar', 'Fizz', 'Buzz']
  status = ['Processing', 'Awarded', 'Completed', 'Rejected']
  statusModel = []
  socials = ['Twitter', 'Discord', 'Telegram']
  socialsModel = []
  dates = []

  mounted() {
    this.vm.initReaction()
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
.hunter-info-container {
  background-image: url('~@/assets/images/blue-bg.svg');
  background-size: cover;
  padding-bottom: 0;
}
.username-lg-text {
  font-size: 24px;
  line-height: 32px;
}
.number-count-text {
  font-size: 20px;
  line-height: 26px;
  font-weight: 700;
  margin-bottom: 8px;
}
.caption-text {
  font-size: 16px;
  line-height: 24px;
}
</style>

<template>
  <v-dialog v-model="vm.campaignReferralDialog">
    <v-sheet class="neutral100--bg rounded pa-6">
      <div class="d-flex align-center justify-space-between">
        <div class="font-weight-bold text-h5">
          {{ vm.subReferralList | _get('length', 0) }} Referred user by @{{ vm.subReferrerName }}
        </div>
        <v-icon @click="vm.changeCampaignReferralDialog(false)">mdi-window-close</v-icon>
      </div>
      <div class="mt-6"></div>
      <div v-for="item in vm.subReferralList" :key="item.id" class="cursor-pointer">
        <referral-card
          :name="item.name"
          :joinTime="item.createdAt"
          :avatar="item.metadata.avatar"
          :commission="item.commission"
          :totalEarn="item.totalEarn"
          :commissionToday="item.commissionToday"
          :id="item.id"
          class="mb-2"
        ></referral-card>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { CampaignDetailViewModel } from '../viewmodels/campaign-detail-viewmodel'

@Observer
@Component({
  components: {
    'referral-card': () => import('@/modules/account/components/referral-card.vue'),
  },
})
export default class CampaignReferralDialog extends Vue {
  @Inject() vm!: CampaignDetailViewModel
}
</script>

<style lang="scss" scoped></style>

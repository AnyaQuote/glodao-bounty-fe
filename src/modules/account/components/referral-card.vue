<template>
  <v-sheet class="fill-width neutral100--bg d-flex flex-column flex-md-row align-md-center rounded-lg pa-4" outlined>
    <div class="d-flex overflow-hidden">
      <v-img class="rounded-circle mx-auto" :src="avatar" max-width="64" max-height="64"></v-img>
    </div>
    <div class="d-flex flex-md-column pa-3 py-0" style="width: 150px">
      <div class="neutral10--text">Reffered</div>
      <div class="font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0">@{{ name }}</div>
    </div>
    <div class="d-flex flex-md-column pa-3 pr-md-10 py-0 ml-0 ml-md-auto">
      <div class="neutral10--text">Join at</div>
      <div class="font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0">
        {{ joinTime | datetime }}
      </div>
    </div>
    <div class="d-flex flex-md-column pa-3 pr-md-10 py-0 ml-0 ml-md-auto">
      <div class="neutral10--text">Social</div>
      <div class="d-flex align-center font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0">
        <v-sheet class="bluePrimary d-flex justify-center align-center rounded-circle mr-1" width="20" height="20">
          <v-icon color="white" size="12">mdi-twitter</v-icon>
        </v-sheet>
        Twitter
      </div>
    </div>
    <div class="d-flex flex-md-column pa-3 pr-md-10 py-0 ml-0 ml-md-auto">
      <div class="neutral10--text">Total commission</div>
      <div class="font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0">
        {{ commission | usdCustom(2, 2) }}
      </div>
    </div>
    <div class="d-flex flex-md-column pa-3 pr-md-10 py-0 ml-0 ml-md-auto">
      <div class="neutral10--text">Today commission</div>
      <div class="font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0">
        {{ commissionToday | usdCustom(2, 2) }}
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Observer
@Component
export default class ReferralCard extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) joinTime!: string
  @Prop({ required: true }) avatar!: string
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) totalEarn!: string
  @Prop({ required: true }) commission!: string
  @Prop({ required: true }) commissionToday!: string
}
</script>

<style scoped lang="scss"></style>

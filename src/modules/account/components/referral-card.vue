<template>
  <v-sheet class="fill-width neutral100--bg d-flex flex-column flex-md-row align-md-center rounded-lg pa-4" outlined>
    <v-sheet class="transparent d-flex overflow-hidden">
      <v-img class="rounded-circle mx-auto" :src="avatar" max-width="64" max-height="64"></v-img>
    </v-sheet>
    <v-sheet class="transparent d-flex flex-md-column pa-3 py-0">
      <v-sheet class="transparent neutral10--text">Reffered</v-sheet>
      <v-sheet class="transparent font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0">@{{ name }}</v-sheet>
    </v-sheet>
    <v-sheet class="transparent d-flex flex-md-column pa-3 pr-md-10 py-0 ml-0 ml-md-auto">
      <v-sheet class="transparent neutral10--text">Time</v-sheet>
      <v-sheet class="transparent font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0">
        {{ joinTime | datetime }}
      </v-sheet>
    </v-sheet>
    <v-sheet class="transparent d-flex flex-md-column pa-3 py-0">
      <v-sheet class="transparent neutral10--text">Social</v-sheet>
      <v-sheet class="transparent d-flex align-center font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0">
        <v-sheet class="bluePrimary d-flex justify-center align-center rounded-circle mr-1" width="20" height="20">
          <v-icon color="white" size="12">mdi-twitter</v-icon>
        </v-sheet>
        Twitter
      </v-sheet>
    </v-sheet>
    <v-sheet class="transparent d-flex flex-md-column pa-3 pr-md-10 py-0 ml-0 ml-md-auto">
      <v-sheet class="transparent neutral10--text">Commission</v-sheet>
      <v-sheet class="transparent font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0">
        {{ commission }}
      </v-sheet>
    </v-sheet>
    <v-sheet class="transparent d-flex flex-md-column pa-3 pr-md-10 py-0 ml-0 ml-md-auto">
      <v-sheet class="transparent neutral10--text">Last 24h</v-sheet>
      <v-sheet class="transparent font-weight-bold primary--text pl-3 pl-md-0 ml-auto ml-md-0">
        {{ commissionToday }}
      </v-sheet>
    </v-sheet>
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

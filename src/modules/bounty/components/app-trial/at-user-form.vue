<template>
  <v-sheet class="mt-10 pa-7" rounded outlined>
    <div class="text-h6 font-weight-bold mb-2"><v-icon class="mb-1 mr-1">mdi-alert-circle</v-icon>Before starting</div>
    <div class="row no-gutters mb-2">
      <div class="col-12 col-sm-6 mb-2 mb-sm-0 text-subtitle-1">
        Some task will required you to have an unique ID in order to complete it. Please fill in these information to
        help us recognize you!
      </div>
      <v-spacer />
      <v-text-field class="col-12 col-sm-5" clearable solo dense flat outlined @change="vm.updateUniqueId" />
    </div>
    <i class="text-subtitle-2 font-weight-regular"
      >*Read the <strong>Task Description</strong> below on how to find your unique Id</i
    >
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'

@Observer
@Component
export default class AppTrialUserRequirementForm extends Vue {
  @Inject() vm!: BountyAppTrialViewModel
}
</script>

<style scoped>
.debug {
  border: 1px solid red;
}
</style>

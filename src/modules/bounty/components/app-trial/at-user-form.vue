<template>
  <v-sheet v-if="vm.hasHunterStartedTask" class="mt-10 pa-7 neutral100--bg" rounded outlined>
    <div class="text-h6 font-weight-bold mb-2">
      <v-icon class="mb-1 mr-2">{{ !!vm.applyUniqueId ? 'mdi-check-circle' : 'mdi-alert-circle' }}</v-icon>
      {{ !!vm.applyUniqueId ? 'All set and ready to go' : 'Before starting' }}
    </div>
    <div class="d-flex flex-column flex-sm-row mb-2">
      <div class="text-subtitle-1" style="width: 50%">
        Some task will required you to have an unique ID in order to complete it. Please fill in these information to
        help us recognize you!
      </div>
      <div class="mb-2 mb-sm-0 mr-sm-2" />
      <v-text-field
        dense
        flat
        outlined
        clearable
        class="neutral100--bg"
        :value="vm.applyUniqueId"
        :disabled="!!vm.applyUniqueId"
        :loading="vm.updatingUniqueId"
        @change="vm.changeUniqueId"
      />
      <div class="mb-2 mb-sm-0 mr-sm-2" />
      <v-btn
        depressed
        v-if="!vm.applyUniqueId"
        class="linear-background-blue-main white--text text-none"
        :loading="vm.updatingUniqueId"
        @click="vm.updateUniqueId"
      >
        Submit my ID
      </v-btn>
    </div>
    <i class="text-subtitle-2 font-weight-regular"
      >*Read the <strong>Task Description</strong> below on how to find your unique Id</i
    >
    <span class="float-right font-italic red--text">You can't change ID after submitted*</span>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'
import { IBaseDetailViewModel } from '../../viewmodels/bounty-detail-viewmodel'

@Observer
@Component
export default class AppTrialUserRequirementForm extends Vue {
  @Inject() vm!: IBaseDetailViewModel
}
</script>

<style scoped></style>

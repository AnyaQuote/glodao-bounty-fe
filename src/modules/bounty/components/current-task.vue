<template>
  <router-link :to="navigationLink">
    <v-sheet
      outlined
      class="d-flex pa-3 pb-2 card-text neutral100 fill-height"
      rounded
      elevation="3"
      style="position: relative"
    >
      <div class="custom-flag-container">
        <div
          class="custom-flag-css d-flex justify-end align-center pb-2 flex-column"
          :style="`background-color: var(--v-${flagColor}-base)`"
        >
          <v-icon color="white" size="18"> {{ `mdi-${type}` }} </v-icon>
        </div>
      </div>
      <div class="d-flex flex-column flex-1">
        <div class="rounded-circle d-flex justify-center card-project-small-icon">
          <chain-logo :chain="chainId" class="fill-width fill-height" />
        </div>
        <div class="mt-1 font-family-proxima font-weight-bold card-title-text">{{ name }}</div>
        <div class="mt-1 card-text short-description">
          {{ shortDescription }}
        </div>
        <div class="mt-auto">
          <div class="d-flex justify-end mt-4 align-center">
            <div
              class="rounded-circle mr-1 d-flex justify-center align-center progress-icon-container"
              v-if="statusIcon"
            >
              <v-icon size="8" :color="$vuetify.theme.dark ? 'white' : 'black'" class="font-weight-600">
                {{ this.statusIcon }}
              </v-icon>
            </div>
            <div class="mr-2 font-italic font-weight-600 text-capitalize">{{ status }}</div>
            <v-sheet
              width="18"
              height="18"
              class="font-weight-bold d-flex align-center justify-center line-height-6 card-text background-neutral"
            >
              <span>{{ currentStep }}/{{ totalStep }}</span>
            </v-sheet>
          </div>
          <div class="mt-1 d-flex justify-space-between">
            <v-sheet v-for="i in currentStep" class="progress-step background-blue-diversity" :key="`currentStep${i}`">
            </v-sheet>
            <v-sheet
              v-for="i in totalStep - currentStep"
              class="background-neutral progress-step"
              :key="`unfinishedStep${i}`"
            >
            </v-sheet>
          </div>
        </div>
      </div>
    </v-sheet>
  </router-link>
</template>

<script lang="ts">
import { lowerCase } from 'lodash'
import { Observer } from 'mobx-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
  },
})
export default class CurrentTask extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) taskId!: string
  @Prop({ required: true }) currentStep!: number
  @Prop({ required: true }) totalStep!: number
  @Prop({ required: true }) type!: string
  @Prop({ required: true }) shortDescription!: string
  @Prop({ required: true }) status!: string
  @Prop({ required: true }) name!: string
  @Prop({ required: true }) chainId!: string

  statusIcon = ''
  flagColor = ''
  navigationLink = ''
  mounted() {
    const lowercaseStatus = lowerCase(this.status)
    switch (lowercaseStatus) {
      case 'completed':
        this.flagColor = 'greenSenamatic'
        this.statusIcon = 'mdi-check'
        this.navigationLink = `bounty-history/${this.taskId}`
        break
      case 'rejected':
        this.flagColor = 'redSenamatic'
        this.statusIcon = 'mdi-exclamation'
        this.navigationLink = `bounty-history/${this.taskId}`
        break
      case 'processing':
        this.flagColor = 'bluePrimary'
        this.statusIcon = 'mdi-dots-horizontal'
        this.navigationLink = `bounty/${this.taskId}`
        break
      default:
        this.flagColor = 'purple'
        break
    }
  }
}
</script>

<style scoped lang="scss">
.custom-flag-container {
  position: absolute;
  top: 0;
  right: 14px;
}
.custom-flag-css {
  clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
  width: 36px;
  height: 60px;
}
.progress-step {
  height: 4px;
  max-width: 100%;
  flex: 1;
  margin-right: 4px;
}
.progress-step:last-child {
  margin-right: 0;
}
.card-project-small-icon {
  width: 28px;
  height: 28px;
  color: white;
}
.progress-icon-container {
  width: 10px;
  height: 10px;
  border: thin solid black;
}
.theme--dark {
  .progress-icon-container {
    border: thin solid white;
  }
}
.short-description {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.flex-1 {
  flex: 1;
}
</style>

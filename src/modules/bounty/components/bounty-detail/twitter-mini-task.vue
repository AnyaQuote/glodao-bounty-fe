<template>
  <div>
    <v-row dense no-gutters>
      <v-col cols="auto" class="mr-auto pa-2 pa-sm-3 pa-md-4">
        <v-sheet class="rounded flex-center-box elevation-2 white pa-1" width="48" height="48">
          <v-sheet class="flex-center-box rounded bluePrimary fill-width fill-height">
            <v-icon size="22" color="white"> mdi-twitter </v-icon>
          </v-sheet>
        </v-sheet>
      </v-col>
      <v-col>
        <div class="pa-2 pa-sm-4">
          <div class="text-body-1 font-weight-600">Follow GloDAO page</div>
          <div class="text-caption mt-1">Please follow “GloDAO” Twitter page to complete this task.</div>
        </div>
        <div class="px-2 px-sm-3 px-md-4 mt-2" v-if="twitterTask.activeStep">
          <v-btn
            class="white--text text-none linear-background-blue-main text-caption"
            elevation="0"
            v-if="type === 'follow'"
          >
            <v-icon left size="14">mdi-twitter</v-icon>
            Follow GDao
          </v-btn>
          <v-sheet class="neutral100" v-if="type === 'tweet'" v-show="$vuetify.breakpoint.smAndUp">
            <v-row dense no-gutters>
              <v-col cols="9" sm="10">
                <v-sheet outlined class="rounded rounded-r-0">
                  <v-text-field
                    hide-details
                    dense
                    flat
                    solo
                    class="ma-0 pa-0 text-caption neutral100 link-submit-custom-input"
                    :placeholder="'https://twitter.com/CyberKDev/status/1505764152094035972'"
                  ></v-text-field>
                </v-sheet>
              </v-col>
              <v-col cols="3" sm="2">
                <v-btn
                  elevation="0"
                  tile
                  class="fill-width white--text text-none linear-background-blue-main text-caption rounded rounded-l-0"
                  height="100%"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>
        </div>
      </v-col>
      <v-col cols="auto" class="ml-auto">
        <div class="pa-2 pa-sm-3 pa-md-4">
          <v-sheet
            height="24"
            width="24"
            class="rounded-circle"
            :class="{
              'linear-background-blue-main': twitterTask.activeStep,
              'greenSenamatic--bg': twitterTask.finished,
              'neutral20--bg': !twitterTask.activeStep && !twitterTask.finished,
            }"
            style="padding: 1px"
          >
            <v-sheet class="fill-height fill-width neutral100--bg rounded-circle flex-center-box">
              <v-icon size="18" color="greenSenamatic" v-if="twitterTask.finished">mdi-check</v-icon>
            </v-sheet>
          </v-sheet>
        </div>
      </v-col>
    </v-row>
    <v-row dense no-gutters v-show="$vuetify.breakpoint.xsOnly" v-if="twitterTask.activeStep">
      <v-col>
        <v-sheet class="neutral100 px-2 px-sm-4 mt-2">
          <v-row dense no-gutters>
            <v-col cols="9" sm="10">
              <v-sheet outlined class="rounded rounded-r-0">
                <v-text-field
                  hide-details
                  dense
                  flat
                  solo
                  class="ma-0 pa-0 text-caption neutral100 link-submit-custom-input"
                  :placeholder="'https://twitter.com/CyberKDev/status/1505764152094035972'"
                ></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="3" sm="2">
              <v-btn
                elevation="0"
                tile
                class="fill-width white--text text-none linear-background-blue-main text-caption rounded rounded-l-0"
                height="100%"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { Observer } from 'mobx-vue'
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { BountyDetailViewModel, HUNTING } from '../../viewmodels/bounty-detail-viewmodel'
import { get } from 'lodash-es'

@Observer
@Component({
  components: {
    'chain-logo': () => import('@/components/chain-logo.vue'),
  },
})
export default class BountyDetail extends Vue {
  @Inject() vm!: BountyDetailViewModel
  @Prop({ required: true }) twitterTask!: any
  @Prop({ required: true }) step!: number
  type = get(this.twitterTask, 'type', '')

  mounted() {
    console.log(this.twitterTask)
  }
  // value = this.twitterTask.stepLink ?? ''
  // HUNTING = HUNTING
  // onValueChange(value: string) {
  //   this.value = value
  // }
  // submitLink() {
  //   if (!this.value.trim()) snackController.error('Link cannot be empty')
  //   else this.vm.submitLink('twitter', this.value, this.step)
  // }
  // openLink(url) {
  //   window.open(url, '_blank')
  // }
}
</script>
<style scoped>
.greenSenamatic--bg {
  background: var(--v-greenSenamatic-base);
}
.neutral20--bg {
  background: var(--v-neutral20-base);
}
.v-btn--disabled {
  background-image: none !important;
}
</style>

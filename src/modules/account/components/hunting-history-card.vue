<template>
  <v-sheet class="fill-width pa-4" outlined min-height="102px">
    <v-row dense no-gutters>
      <v-col
        cols="12"
        md="2"
        class="mb-2"
        :class="{
          'pr-7': $vuetify.breakpoint.mdAndUp,
        }"
      >
        <v-img
          min-height="70"
          :class="{
            'bounty-image-sm': $vuetify.breakpoint.smAndDown,
            'bounty-image-md': $vuetify.breakpoint.mdAndUp,
          }"
          src="https://picsum.photos/200"
        ></v-img>
      </v-col>
      <v-col cols="6" md="3" class="d-flex align-center">
        <div>
          <div><v-avatar color="primary" size="26"></v-avatar></div>
          <div class="card-title-text mt-2 font-weight-600">The Peaky Blinder</div>
        </div>
      </v-col>
      <v-col
        cols="6"
        md="1"
        class="d-flex align-center"
        :class="{
          'justify-end': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div>
          <div
            class="small-caption-text"
            :class="{
              'text-end': $vuetify.breakpoint.smAndDown,
            }"
          >
            Social task
          </div>
          <div class="d-flex align-center mt-2">
            <v-sheet
              width="20"
              height="20"
              class="rounded-circle background-blue-diversity d-flex justify-center align-center"
            >
              <v-icon color="white" size="10">mdi-twitter</v-icon>
            </v-sheet>
            <div class="ml-1 medium-caption-text font-weight-bold">Twitter</div>
          </div>
        </div>
      </v-col>
      <v-col
        cols="6"
        md="2"
        class="d-flex align-center"
        :class="{
          'pl-4': $vuetify.breakpoint.mdAndUp,
          'mt-2': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div>
          <div class="small-caption-text">Bounty earned</div>
          <div class="medium-caption-text font-weight-bold mt-2">100,000 TPB</div>
        </div>
      </v-col>
      <v-col
        cols="6"
        md="2"
        class="d-flex align-center"
        :class="{
          'justify-end mt-2': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div>
          <div
            class="small-caption-text"
            :class="{
              'text-end': $vuetify.breakpoint.smAndDown,
            }"
          >
            Time
          </div>
          <div class="medium-caption-text font-weight-bold mt-2">Jan 22nd, 10:00 pm</div>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="2"
        class="d-flex align-center"
        :class="{
          'justify-center mt-4': $vuetify.breakpoint.smAndDown,
        }"
      >
        <v-btn outlined color="success" class="text-capitalize">Completed</v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Ref, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'

@Observer
@Component({
  components: {},
})
export default class HuntingHistoryCard extends Vue {
  walletStore = walletStore
}
</script>

<style scoped lang="scss">
.small-caption-text {
  font-size: 12px;
  line-height: 18px;
}
.medium-caption-text {
  font-size: 14px;
  line-height: 20px;
}
.bounty-image-md {
  height: 80px;
}
.bounty-image-sm {
  height: 200px;
}
</style>

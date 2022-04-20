<template>
  <v-row>
    <v-col cols="12">
      <div class="section-big-title-text text-uppercase blue--text font-weight-bold">Upcoming pools</div>
    </v-col>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-col cols="12">
        <v-hover v-slot="{ hover }">
          <div class="p-relative">
            <v-tabs-items v-model="tab" class="rounded-lg">
              <!-- Background image start (This width and height will decide the structure) -->
              <v-sheet class="fill-height p-relative">
                <v-tab-item v-for="(pool, index) in upcomingPoolList" :value="index" :key="pool.id">
                  <v-img height="700" :src="pool.metadata.coverImage" aspect-ratio="1.5"></v-img>
                </v-tab-item>
              </v-sheet>
              <!-- Background image end -->
            </v-tabs-items>

            <!-- info header start -->
            <div class="d-flex p-absolute t-b-l-r-0 ma-10 mr-0">
              <div class="d-flex flex-column justify-end" style="flex-grow: 1">
                <v-tabs-items v-model="tab">
                  <v-tab-item v-for="(pool, index) in upcomingPoolList" :value="index" :key="pool.id" eager>
                    <v-sheet
                      class="test transparent d-flex rounded-lg pa-5 mr-10"
                      :style="hover && 'width: calc(100% - 250px);'"
                    >
                      <div class="d-flex" style="flex-grow: 1">
                        <v-sheet width="64" height="64" class="transparent">
                          <ChainLogo :chain="pool.chainId" class="fill-width fill-height" />
                        </v-sheet>
                        <div class="d-flex flex-column justify-space-between ml-2">
                          <div class="d-flex align-center">
                            <span class="bluePrimary--text font-weight-bold" style="font-size: 1.5rem">{{
                              pool.name
                            }}</span>
                            <div class="dot mx-2"></div>
                            <span style="font-size: 1.5rem"
                              >{{ pool.rewardAmount | formatNumber(2, 0) }} {{ pool.metadata.rewardToken }}</span
                            >
                          </div>
                          <div class="d-flex">
                            <span>{{ pool.startTime | datetime }}</span>
                            <span>&nbsp;-&nbsp;</span>
                            <span>{{ pool.endTime | datetime }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex flex-column" style="margin-right: 58px">
                        <div class="font-size-16 mb-2">Social link</div>
                        <div class="ml-n2">
                          <v-btn :href="pool.metadata.website" icon><v-icon color="white">mdi-domain</v-icon></v-btn>
                          <v-btn v-for="(link, icon) in pool.metadata.socialLinks" :key="icon" :href="link" icon>
                            <v-icon color="white" v-html="`mdi-${icon}`"></v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-sheet>
                  </v-tab-item>
                </v-tabs-items>
              </div>
              <!-- info header end -->

              <!-- slider button start -->
              <div v-show="!hover" class="p-absolute t-b-l-r-0 flex-center-end">
                <div class="test rounded-tl-lg rounded-bl-lg py-8">
                  <v-icon size="50">mdi-chevron-left</v-icon>
                </div>
              </div>
              <!-- slider button end -->

              <!-- slider start -->
              <v-slide-x-reverse-transition>
                <div v-show="hover" class="flex-center p-absolute t-r-0 fill-height">
                  <div class="d-flex align-center justify-end">
                    <div class="test rounded-tl-lg rounded-bl-lg py-8">
                      <v-icon size="50">mdi-chevron-left</v-icon>
                    </div>
                  </div>
                  <div
                    class="pa-3 scrollable fill-height transparent test rounded-tl-lg rounded-bl-lg"
                    style="width: 218px"
                  >
                    <BountyUpcomingPreview
                      v-for="(pool, index) in upcomingPoolList"
                      @onClick="toggleTab"
                      :metadata="pool.metadata"
                      :name="pool.name"
                      :id="pool.id"
                      :key="index"
                    ></BountyUpcomingPreview>
                  </div>
                </div>
              </v-slide-x-reverse-transition>
              <!-- slider end -->
            </div>
          </div>
        </v-hover>
      </v-col>
    </template>
    <template v-else>
      <v-col cols="12" sm="6" v-for="(pool, index) in upcomingPoolList" :key="index">
        <BountyCarouselItem
          :maxParticipant="pool.maxParticipant"
          :rewardAmount="pool.rewardAmount"
          :startTime="pool.startTime"
          :endTime="pool.endTime"
          :metadata="pool.metadata"
          :chainId="pool.chainId"
          :types="pool.types"
          :name="pool.name"
          :id="pool.id"
        >
        </BountyCarouselItem>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    BountyUpcomingCard: () => import('@/modules/bounty/components/bounty-upcoming-card.vue'),
    BountyUpcomingPreview: () => import('@/modules/bounty/components/bounty-upcoming-preview.vue'),
    BountyCarouselItem: () => import('@/modules/bounty/components/bounty-carousel-item.vue'),
    ChainLogo: () => import('@/components/chain-logo.vue'),
  },
})
export default class BountyUpcoming extends Vue {
  @Prop({ required: true }) upcomingPoolList!: any[]

  tab = 0
  toggleTab(tabIndex: number) {
    this.tab = tabIndex
  }
  toggleSide = false
}
</script>

<style scoped>
.scrollable {
  overflow: auto;
}

.p-relative {
  position: relative;
}

.p-absolute {
  position: absolute;
}

.t-b-l-r-0 {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.t-r-0 {
  top: 0;
  right: 0;
}

.test {
  background: radial-gradient(
    66.84% 180.1% at 19.81% 27.89%,
    rgba(255, 255, 255, 0.42) 0%,
    rgba(255, 255, 255, 0.06) 100%
  );
  backdrop-filter: blur(4px);
}

.dot {
  height: 8px;
  width: 8px;
  background-color: #c4c4c4;
  border-radius: 50%;
  display: inline-block;
}

.hidden {
  display: none !important;
}

.flex-center {
  display: flex;
  align-items: center;
}
.flex-center-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

<template>
  <v-row>
    <v-col cols="12">
      <div class="section-big-title-text text-uppercase font-weight-bold">Upcoming pools</div>
    </v-col>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-col cols="12">
        <div class="p-relative">
          <v-tabs-items v-model="tab" class="rounded-lg">
            <!-- Background image start (This width and height will decide the structure) -->
            <v-sheet class="fill-height p-relative">
              <v-tab-item v-for="(pool, index) in upcomingPoolList" :value="index" :key="pool.id">
                <div class="fill-width fill-height position-relative">
                  <v-img height="700" :src="pool.metadata.coverImage" aspect-ratio="1.5"></v-img>
                  <video
                    width="100%"
                    height="100%"
                    loop
                    autoplay
                    muted
                    v-if="pool.metadata.coverVideo"
                    style="position: absolute; top: 0; left: 0; object-fit: cover"
                  >
                    <source :src="pool.metadata.coverVideo" type="video/mp4" />
                    Your browser does not support HTML video.
                  </video>
                  <div class="position-absolute" style="top: 20px; left: 20px">
                    <v-sheet
                      class="rounded-pill flex-center-box text-center px-2"
                      :class="poolTypeTextStyle(pool.type)"
                      height="25"
                      >{{ poolTypeText(pool.type) }} #{{ pool | _get('missionIndex', 0) }}</v-sheet
                    >
                  </div>
                </div>
              </v-tab-item>
              <div class="fill-width fill-height position-absolute backdrop-shadow" style="top: 0; left: 0"></div>
            </v-sheet>
            <!-- Background image end -->
          </v-tabs-items>

          <!-- info header start -->
          <div class="d-flex p-absolute t-b-l-r-0 ma-10 mr-0">
            <div class="d-flex flex-column justify-end" style="flex-grow: 1">
              <v-tabs-items v-model="tab">
                <v-tab-item v-for="(pool, index) in upcomingPoolList" :value="index" :key="pool.id" eager>
                  <bounty-upcoming-card
                    :name="pool.name"
                    :startTime="pool.startTime"
                    :endTime="pool.endTime"
                    :rewardAmount="pool.rewardAmount"
                    :chainId="pool.chainId"
                    :maxParticipant="pool.maxParticipant"
                    :metadata="pool.metadata"
                    :retract="showSide"
                    :task="pool"
                  ></bounty-upcoming-card>
                </v-tab-item>
              </v-tabs-items>
            </div>
            <!-- info header end -->

            <!-- slider button start -->
            <div v-show="!showSide" class="p-absolute t-b-l-r-0 flex-center-end">
              <div class="blur-bg rounded-tl-lg rounded-bl-lg py-8" @click="toggleSide">
                <v-icon size="40" color="white">mdi-chevron-left</v-icon>
              </div>
            </div>
            <!-- slider button end -->

            <!-- slider start -->
            <v-expand-x-transition>
              <div v-show="showSide" class="flex-center p-absolute t-r-0 fill-height">
                <div class="d-flex align-center justify-end">
                  <div class="blur-bg rounded-tl-lg rounded-bl-lg py-8" @click="toggleSide">
                    <v-icon size="40" color="white">mdi-chevron-right</v-icon>
                  </div>
                </div>
                <div
                  class="pa-3 scrollable fill-height transparent blur-bg rounded-tl-lg rounded-bl-lg"
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
            </v-expand-x-transition>
            <!-- slider end -->
          </div>
        </div>
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
          :task="pool"
        >
        </BountyCarouselItem>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { MissionType } from '@/models/TaskModel'
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
  showSide = true
  toggleSide() {
    this.showSide = !this.showSide
  }

  get poolTypeText() {
    return (type) => {
      switch (type) {
        case MissionType.APP_TRIAL:
          return 'App Trial mission'
        case MissionType.LEARN:
          return 'Learn mission'
        case MissionType.BOUNTY:
          return 'Social mission'
        default:
          return 'Mission'
      }
    }
  }

  get poolTypeTextStyle() {
    return (type) => {
      switch (type) {
        case MissionType.BOUNTY:
          return 'white--text blue'
        case MissionType.LEARN:
          return 'white--text purple'
        case MissionType.APP_TRIAL:
          return 'white--text blue'
        default:
          return 'Mission'
      }
    }
  }
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

.blur-bg {
  background: rgba(255, 255, 255, 0.42) !important;
  backdrop-filter: blur(6px);
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

.z-index-0 {
  z-index: 0;
}

.z-index-1 {
  z-index: 1;
}
.backdrop-shadow {
  background: linear-gradient(
    2.56deg,
    rgba(0, 0, 0, 0.9) 3.01%,
    rgba(0, 0, 0, 0.85) 17.56%,
    rgba(0, 0, 0, 0) 60.76%
  ) !important;
  filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.15));
}
</style>

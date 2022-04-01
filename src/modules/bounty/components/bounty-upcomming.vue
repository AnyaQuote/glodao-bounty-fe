<template>
  <v-row>
    <v-col cols="12">
      <div class="section-big-title-text font-weight-bold">Upcoming pools</div>
    </v-col>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-col cols="9">
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(pool, index) in upcomingPoolList" :value="index" :key="pool.id">
            <BountyUpcomingCard
              :maxParticipant="pool.maxParticipant"
              :rewardAmount="pool.rewardAmount"
              :startTime="pool.startTime"
              :endTime="pool.endTime"
              :metadata="pool.metadata"
              :chainId="pool.chainId"
              :types="pool.types"
              :name="pool.name"
              :id="pool.id"
            ></BountyUpcomingCard>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col cols="3">
        <div class="d-flex flex-column m-h-560 scrollable pa-2 pb-0 linear-border-blue-main fill-height">
          <BountyUpcomingPreview
            v-for="(pool, index) in upcomingPoolList"
            @onClick="toggleTab"
            :metadata="pool.metadata"
            :name="pool.name"
            :id="pool.id"
            :key="index"
          ></BountyUpcomingPreview>
        </div>
      </v-col>
    </template>
    <template v-else>
      <!-- <v-col cols="12">
        <v-carousel
          delimiter-icon="mdi-minus"
          :hide-delimiter-background="$vuetify.theme.dark"
          show-arrows-on-hover
          height="fit-content"
        >
          <v-carousel-item class="pb-14" v-for="(pool, index) in upcomingPoolList" :key="index" eager>
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
          </v-carousel-item>
        </v-carousel>
      </v-col> -->
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
  },
})
export default class BountyUpcoming extends Vue {
  @Prop({ required: true }) upcomingPoolList!: any[]

  tab = 1
  toggleTab(tabIndex: number) {
    this.tab = tabIndex
  }
}
</script>

<style scoped>
.h-400 {
  min-height: 400px;
}

.m-h-560 {
  max-height: 560px;
}

.scrollable {
  overflow: auto;
}

.linear-border-blue-main {
  border-width: 1px;
  border-style: solid;
  border-image: linear-gradient(to right, #0276f0, #0096ff, #00b3ff, #00cdff, #00e5ff) 1;
}
</style>

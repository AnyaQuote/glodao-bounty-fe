<template>
  <div>
    <v-sheet outlined class="mt-4 overflow-hidden" rounded>
      <v-sheet height="40" color="bluePrimary lighten-1" v-show="$vuetify.breakpoint.smAndUp">
        <v-row class="fill-height" dense no-gutters>
          <v-col cols="8" class="text-center">
            <div class="fill-height d-flex align-center justify-center">@Account</div>
          </v-col>
          <v-col cols="4">
            <div class="fill-height d-flex align-center">Time</div>
          </v-col>
        </v-row>
      </v-sheet>
      <div>
        <v-list flat class="pa-0 ma-0">
          <expandable-list-item
            v-for="(item, index) in applyList"
            :key="item.id"
            :data="item"
            :class="{
              'neutral100--bg': index % 2 === 0,
              neutral15: index % 2 !== 0,
            }"
          />
        </v-list>
      </div>
    </v-sheet>

    <div class="mt-4" v-show="vm.totalPageCount > 1">
      <v-pagination
        v-model="vm.page"
        :length="vm.totalPageCount"
        :total-visible="7"
        color="blue"
        :value="vm.page"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { BountyHistoryDetailViewModel } from '@/modules/bounty-history/viewmodels/bounty-history-detail-viewmodel'

@Observer
@Component({
  components: {
    'expandable-list-item': () => import('@/modules/bounty-history/components/expandable-list-item.vue'),
  },
})
export default class ExpandableListItem extends Vue {
  @Prop({ required: true }) applyList
  @Inject() vm!: BountyHistoryDetailViewModel

  mounted() {
    console.log('ah', this.applyList)
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <v-tabs class="mt-10 outlined rounded-lg neutral100--bg" color="bluePrimary">
    <v-tab>App Description</v-tab>
    <v-tab>App Screenshot</v-tab>
    <v-tab-item class="pa-6">
      Battle the likes of sozzled bearbearians and nuke-addled snotwolves to protect our glowing green world from the
      sweaty hands of the Uberlich! Krumit's Tale involves the same core deck building mechanics as Meteorfall: Journeys
      and the same cast of overly optimistic heroes, but expands the ‘swipe’ mechanic into a dynamic grid based system.
      This means more depth and longevity – our heroes will have to choose perks to complement their deck-building
      strategy and carefully manage the board if they wish to triumph. + A follow-up to the popular mobile solo
      deckbuilding card game - Meteorfall: Journeys! + The brave heroes of Meteorfall return! Play as five different
      heroes - Bruno, Greybeard, Mischief, Muldorf, and Rose - each with their own cards and a distinct playstyle + More
      than 30 achievements to unlock + Feeling competitive? Check out the daily challenge mode! Each day has a different
      set of modifiers which tweak the rules of the game in radical ways. + Mobile optimized gameplay. The game can be
      played one-handed in portrait mode and auto-saves frequently
    </v-tab-item>
    <v-tab-item class="pa-6">
      <v-slide-group center-active show-arrows class="show-prev">
        <v-slide-item v-for="i in 6" :key="i" class="ma-2">
          <v-sheet rounded="lg" width="186" height="330">
            <v-img width="100%" height="100%" contain src="@/assets/images/mock-app-screenshot.png" />
          </v-sheet>
        </v-slide-item>
      </v-slide-group>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Inject, Vue } from 'vue-property-decorator'
import { BountyAppTrialViewModel } from '../../viewmodels/bounty-app-trial-viewmodel'

@Observer
@Component
export default class AppTrialAppInfo extends Vue {
  @Inject() vm!: BountyAppTrialViewModel
}
</script>

<style lang="scss" scoped>
.outlined {
  border: 1px solid var(--v-neutral20-base);
}
</style>

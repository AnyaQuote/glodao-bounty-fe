<template>
  <v-sheet height="320" outlined class="fill-width d-flex justify-center align-center neutral100--bg" rounded>
    <v-sheet class="text-center neutral10--text neutral100--bg" width="400">
      <div class="flex-center-box">
        <v-sheet width="80" height="80" class="flex-center-box neutral100--bg">
          <v-img
            alt="Shiny crown"
            class="shrink fill-width fill-height"
            contain
            :src="require(`@/assets/icons/shiny-crown.svg`)"
            transition="scale-transition"
          />
        </v-sheet>
      </div>
      <div class="card-big-title-text mt-5 font-weight-bold">No items found</div>
      <div class="card-title-text mt-3">Come back soon! Or try to hunt somthing for you on our Bounty Hunter!</div>
      <v-btn
        class="background-blue-diversity white--text rounded text-capitalize mt-3"
        depressed
        @click="goToBountyListScreen"
      >
        Browse Bounty Hunter
      </v-btn>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { Observer } from 'mobx-vue'
import { Component, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {},
})
export default class NoItemsCard extends Vue {
  goToBountyListScreen() {
    this.$router.push('/bounty').catch(() => {
      //
    })
  }
}
</script>

<style lang="scss" scoped>
.neutral10--text {
  color: var(--v-neutral10-base);
}
</style>

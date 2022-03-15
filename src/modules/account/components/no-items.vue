<template>
  <v-sheet height="320" outlined class="fill-width d-flex justify-center align-center">
    <v-sheet class="text-center neutral10--text" width="400">
      <div class="flex-center-box">
        <v-sheet width="80" height="80" class="flex-center-box">
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
      <v-btn class="background-blue-diversity white--text rounded-0 text-capitalize mt-3" depressed>
        Browse Bounty Hunter
      </v-btn>
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.neutral10--text {
  color: var(--v-neutral10-base);
}
</style>

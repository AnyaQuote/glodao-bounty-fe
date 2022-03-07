<template>
  <div class="pa-1 token-icon d-flex justify-center align-center">
    <v-img :src="url" :max-width="`${maxWidth}`" contain></v-img>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    maxWidth: String,
  },
}
</script>

<style scoped>
.token-icon {
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 14px;
}
</style>

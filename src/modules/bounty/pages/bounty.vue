<template>
  <div>Bounty</div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'

@Observer
@Component({
  components: {},
})
export default class Staking extends Vue {}
</script>

<style scoped lang="scss"></style>

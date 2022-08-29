<template>
  <v-container>
    
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import { DonateViewModel } from '@/modules/donate/viewmodels/donate-viewmodel'
import moment from 'moment'

@Observer
@Component({
  components: {},
})
export default class DonatePage extends Vue {
  @Provide() vm = new DonateViewModel()
  walletStore = walletStore
  authStore = authStore
  moment = moment
}
</script>
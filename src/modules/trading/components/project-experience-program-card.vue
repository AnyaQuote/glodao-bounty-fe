<template>
  <div>
    <kyber-bridge v-if="data.taskType === 'bridge'" :data="data" />
    <kyber-liquidity v-if="data.taskType === 'liquidity'" :data="data" />
    <kyber-swap v-if="data.taskType === 'swap'" :data="data" />
  </div>
</template>

<script lang="ts">
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { KyberTaskController } from '../controllers/kyber-task-controller'

@Component({
  components: {
    'kyber-bridge': () => import('@/modules/trading/components/kyber-task/kyber-bridge.vue'),
    'kyber-liquidity': () => import('@/modules/trading/components/kyber-task/kyber-liquidity.vue'),
    'kyber-swap': () => import('@/modules/trading/components/kyber-task/kyber-swap.vue'),
  },
})
export default class ProjectExperienceProgramCard extends Vue {
  @Prop({ required: true }) data!: KyberTaskController
  // verify() {
  //   if (this.data.id === 5) {
  //     const config = {
  //       icon: 'mdi-information-outline',
  //       title: 'Verification failed',
  //       message: 'We are unable to verify this task. Please check and try again later',
  //       color: '#000000',
  //       timeout: 5000,
  //     }
  //     snackController.config = config
  //     snackController.show = true
  //     this.isError = true
  //   } else {
  //     this.isVerify = true
  //     this.isError = false
  //   }
  // }
}
</script>

<style scoped>
.greenSenamatic--bg {
  background: var(--v-greenSenamatic-base);
}
.unqualify-msg {
  color: var(--v-redSenamatic-base);
  font-size: 12px;
}
</style>

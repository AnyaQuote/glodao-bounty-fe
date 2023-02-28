<template>
  <div>
    <v-sheet v-if="!authStore.jwt" color="#06032B" class="px-6 white--text mt-10" rounded="lg" outlined>
      <v-row align="center">
        <v-col cols="2"> <v-img :src="require('@/assets/images/lock.png')"></v-img></v-col>
        <v-col cols="8">
          <div class="font-weight-bold text-h5">You're not signed in</div>
          <div class="text-subtitle-1">Get access to this Bounty by sign in Glodao</div></v-col
        >
        <v-col cols="2">
          <v-btn
            depressed
            class="linear-background-blue-main white--text text-none rounded text-h6 font-weight-bold"
            x-large
            @click="authStore.changeTwitterLoginDialog(true)"
            >Log in</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet
      v-else-if="!controller.isUserStartMission"
      color="#06032B"
      class="px-6 white--text mt-10"
      rounded="lg"
      outlined
    >
      <v-row align="center">
        <v-col cols="2"> <v-img :src="require('@/assets/images/lock.png')"></v-img></v-col>
        <v-col cols="8">
          <div class="font-weight-bold text-h5">You have not participated in this mission yet</div>
          <div class="text-subtitle-1">Participate now for a chance to earn reward</div></v-col
        >
        <v-col cols="2">
          <v-btn
            depressed
            class="linear-background-blue-main white--text text-none rounded text-h6 font-weight-bold"
            x-large
            :disabled="!controller.isMissionStartable"
            @click="controller.startHunting"
            :loading="controller.loading"
          >
            Start
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet
      v-else-if="controller.isCompleted"
      color="#06032B"
      class="pa-6 d-flex justify-space-between white--text mt-10"
      rounded="lg"
      outlined
    >
      <div class="font-weight-bold text-h5">
        You have completed {{ controller.taskFinishedCount }}/{{ controller.taskTotalCount }} missions. Claim reward now
      </div>
      <div class="font-weight-bold text-h5">{{ controller.taskCompletePercentage }}% quest</div>
    </v-sheet>

    <v-sheet v-if="controller.isCompleted" class="mt-6 transparent">
      <div v-if="controller.apply.status === 'processing'">
        <v-btn
          elevation="0"
          color="bluePrimary"
          class="white--text text-none linear-background-blue-main text-caption"
          @click="controller.masterController.submitTaskConfirmation()"
        >
          Confirm to complete
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { authStore } from '@/stores/auth-store'
import { MissionStateController } from '../controllers/mission-state-controller'
import { reaction } from 'mobx'

@Component({
  components: {
    'community-program-card': () => import('../components/community-program-card.vue'),
    'project-experience-program-card': () => import('../components/project-experience-program-card.vue'),
    'snack-bar': () => import('@/components/snack-bar/snack-bar.vue'),
    countdown: () => import('@/modules/bounty/components/countdown.vue'),
  },
})
export default class extends Vue {
  @Prop() controller!: MissionStateController

  authStore = authStore
  disposer: any[] = []

  mounted() {
    this.disposer = [
      // reaction(
      //   () => this.controller.isCompleted,
      //   () => {
      //     console.log(this.controller.isCompleted)
      //     console.log(this.controller.apply)
      //     if (!this.controller.apply) return
      //     if (this.controller.isCompleted && this.controller.apply.status === 'processing') {
      //       console.log('abc')
      //       this.controller.masterController.submitTaskConfirmation()
      //     }
      //   },
      //   { fireImmediately: true }
      // ),
    ]
  }
  beforeDestroy() {
    this.disposer.forEach((d) => d())
  }
}
</script>

<style scoped lang="scss"></style>

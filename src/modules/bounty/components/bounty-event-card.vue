<template>
  <router-link tag="div" :to="`/bounty/${id}`" class="cursor-pointer">
    <v-card
      class="mx-auto overflow-hidden border-radius-16 neutral100 fill-height cursor-pointer"
      elevation="3"
      outlined
    >
      <div class="position-relative">
        <v-img :src="coverImage" :aspect-ratio="1.5"></v-img>
        <div class="position-absolute" style="top: 10px; left: 10px">
          <v-sheet
            class="border-radius-8 font-weight-bold flex-center-box text-center px-2 white--text"
            height="25"
            color="blue"
            >Event mission #{{ task | _get('missionIndex', 0) }}</v-sheet
          >
        </div>
      </div>
      <div class="pa-4">
        <div class="d-flex align-center">
          <v-sheet class="rounded-circle neutral100--bg flex-center-box pa-3" outlined>
            <v-icon :color="spareIconColor" size="40">{{ spareIcon }}</v-icon>
          </v-sheet>
          <div class="text-h5 bluePrimary--text font-weight-bold ml-3">
            {{ task | _get('name') }}
          </div>
        </div>
      </div>
    </v-card>
  </router-link>
</template>

<script lang="ts">
import { get } from 'lodash'
import { Observer } from 'mobx-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Observer
@Component({
  components: {
    ProjectLogo: () => import('@/components/project-logo.vue'),
  },
})
export default class BountyCard extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) task!: any
  missionTypeText = get(this.task, 'type', '') === 'learn' ? 'Learn mission' : 'Social mission'
  coverImage = get(this.task, 'metadata.coverImage', '')
  spareIcon = get(this.task, 'metadata.spareIcon', '')
  spareIconColor = get(this.task, 'metadata.spareIconColor', '')

  openLink() {
    this.$router.push(`/bounty/${this.id}`)
  }
}
</script>

<style scoped lang="scss">
.border-radius-16 {
  border-radius: 16px;
}
</style>

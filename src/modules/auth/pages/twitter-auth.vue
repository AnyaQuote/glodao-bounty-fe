<template>
  <v-row class="fill-height">
    <v-col class="text-center flex-center-box fill-height">
      <div>
        <div class="flex-center-box">
          <v-progress-circular indeterminate size="100" class="mb-8" color="bluePrimary"></v-progress-circular>
        </div>
        <div class="title-text font-weight-bold">Please wait a minute!</div>
        <div class="title-text font-weight-bold">We are trying to sign you in</div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue } from 'vue-property-decorator'
import { authStore } from '@/stores/auth-store'
import { localdata } from '@/helpers/local-data'

@Observer
@Component({
  components: {},
})
export default class TwitterAuthenticationPage extends Vue {
  authStore = authStore

  mounted() {
    const access_token = this.$route.query.access_token as string
    const access_secret = this.$route.query.access_secret as string
    const callback_url = localdata.callback_url
    if (access_token && access_secret) {
      if (callback_url) {
        localdata.resetCallbackUrl()
        window.open(`${callback_url}?access_token=${access_token}&access_secret=${access_secret}`, '_self')
      } else {
        this.authStore.fetchUser(access_token, access_secret)
        localdata.resetCallbackUrl()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.title-text {
  font-size: 30px;
}
</style>

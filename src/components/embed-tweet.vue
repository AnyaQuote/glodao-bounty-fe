<template>
  <div class="fill-width ma-1">
    <div
      class="fill-width justify-center"
      v-show="$vuetify.theme.dark"
      :class="{
        'd-flex': $vuetify.theme.dark,
      }"
    >
      <blockquote class="twitter-tweet" data-theme="dark">
        <a :href="`${link}?ref_src=twsrc%5Etfw`" target="_blank">
          Loading tweet data <v-progress-circular indeterminate color="primary" size="24"></v-progress-circular>
        </a>
      </blockquote>
    </div>
    <div
      class="fill-width justify-center"
      v-show="!$vuetify.theme.dark"
      :class="{
        'd-flex': !$vuetify.theme.dark,
      }"
    >
      <blockquote class="twitter-tweet" data-theme="light">
        <a :href="`${link}?ref_src=twsrc%5Etfw`" target="_blank">
          Loading tweet data <v-progress-circular indeterminate color="primary" size="24"></v-progress-circular>
        </a>
      </blockquote>
    </div>
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Observer
@Component({
  components: {},
})
export default class EmbedTweet extends Vue {
  @Prop({ required: true }) link!: any

  beforeCreate() {
    const embedTweetScript = document.createElement('script')
    embedTweetScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    embedTweetScript.setAttribute('id', 'embedTweetScript')
    document.head.appendChild(embedTweetScript)
  }

  destroyed() {
    if (document.getElementById('embedTweetScript'))
      document.head.removeChild(document.getElementById('embedTweetScript') as Node)
  }
}
</script>
<style scoped></style>

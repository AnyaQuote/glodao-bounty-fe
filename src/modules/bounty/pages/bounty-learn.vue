<template>
  <v-container class="pa-4">
    <v-row class="mt-6" dense no-gutters>
      <v-col cols="12">
        <router-link to="/company-profile" class="d-flex align-center">
          <v-icon color="primary">mdi-arrow-left</v-icon>
          <div class="text-h6 bluePrimary--text font-weight-bold ml-7">Back to mission</div>
        </router-link>
      </v-col>
      <v-col cols="12">
        <v-sheet
          class="neutral100--bg blue lighten-3 pa-6 pr-0 d-flex justify-space-between bluePrimary--text border-radius-8 rounded-b-0 mt-8"
          :class="{
            'text-h5': $vuetify.breakpoint.smAndUp,
            'text-body-1': $vuetify.breakpoint.xsOnly,
          }"
        >
          <div class="font-weight-bold d-flex align-center">
            <!-- <project-logo :size="$vuetify.breakpoint.xsOnly ? 24 : 48" class="mr-3"></project-logo> -->
            <div
              class="align-center"
              :class="{
                'd-flex': $vuetify.breakpoint.smAndUp,
              }"
            >
              <div>abc</div>
              <v-sheet
                v-show="$vuetify.breakpoint.smAndUp"
                width="10"
                height="10"
                class="rounded-circle mx-4"
                color="bluePrimary"
              ></v-sheet>
              <span class="text-none">
                Mission No.
                <!-- {{ vm.task | _get('missionIndex', 0) }} -->
              </span>
            </div>
          </div>
          <v-sheet
            class="d-flex align-center bluePrimary--text text-body-1 pa-4 font-weight-600 neutral100--bg"
            style="clip-path: polygon(7% 0, 100% 0%, 100% 100%, 7% 100%, 0% 50%)"
            height="56"
          >
            <v-icon :size="$vuetify.breakpoint.xsOnly ? 20 : 24" color="bluePrimary">mdi-school</v-icon>
            <div class="ml-3">Learn to earn mission</div>
          </v-sheet>
        </v-sheet>
        <v-sheet class="pa-7 neutral100--bg">
          <v-row>
            <v-col cols="12" md="7">
              <div class="text-h4 font-weight-bold">What Is Peaky Blinder (PBB)?</div>
              <div class="text-body-1 neutral10--text font-weight-600 mt-4">
                Peaky Blinder is a blockchain project that stands out due to its built-in governance mechanism for
                upgrading the network.
              </div>
              <div class="d-flex mt-4 align-center">
                <v-chip class="text-caption mr-2"> FINANCE </v-chip>
                <v-chip class="text-caption mr-2"> FINANCE </v-chip>
                <v-chip class="text-caption mr-2"> FINANCE </v-chip>
                <div class="ml-4 text-body-1 font-weight-600">10 min read</div>
              </div>
              <v-btn class="linear-background-blue-main font-weight-bold text-none rounded white--text mt-8" depressed
                >Start the quest!</v-btn
              >
            </v-col>
            <v-col cols="12" md="4" class="px-0 ml-md-auto">
              <v-img
                src="https://api.glodao.io/uploads/BANNER_HUNTING_v1_1_1f3ca51e43.png"
                aspect-ratio="1.5"
                height="100%"
                class="rounded"
              />
            </v-col>
          </v-row>
        </v-sheet>
        <v-divider></v-divider>
        <v-sheet class="pa-7 neutral100--bg">
          <markdown-component :description="markdownData"> </markdown-component>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import { walletStore } from '@/stores/wallet-store'
import { authStore } from '@/stores/auth-store'
import * as _ from 'lodash-es'

@Observer
@Component({
  components: {
    'markdown-component': () => import('@/components/markdown-component.vue'),
  },
})
export default class BountyLearnPage extends Vue {
  walletStore = walletStore
  authStore = authStore
  mouseoverEvent = new Event('mouseleave')

  @Watch('$route.params.id', { immediate: true }) onIdChanged(val: string) {
    if (val) {
      console.log(val)
    }
  }

  @Watch('$route.query', { immediate: true }) onRefChanged(val: string) {
    if (val) {
      if (_.isEmpty(val)) this.$router.back()
      console.log(val)
    }
  }

  mounted() {
    // this.vm.initReaction()
  }

  beforeDestroy() {
    // this.vm.destroyReaction()
  }

  markdownData = `
  # Dillinger
## _The Last Markdown Editor, Ever_

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,
AngularJS-powered HTML5 Markdown editor.

- Type some Markdown on the left
- See HTML in the right
- ✨Magic ✨

## Features

- Import a HTML file and watch it magically convert to Markdown
- Drag and drop images (requires your Dropbox account be linked)
- Import and save files from GitHub, Dropbox, Google Drive and One Drive
- Drag and drop markdown and HTML files into Dillinger
- Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Tech


## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |

## Development

Want to contribute? Great!

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>

  `
}
</script>

<style scoped lang="scss">
.font-size-28 {
  font-size: 28px;
}
.font-size-18 {
  font-size: 18px;
}
</style>

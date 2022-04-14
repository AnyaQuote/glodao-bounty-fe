<template>
  <div>
    <div
      :class="{
        footer: $vuetify.breakpoint.smAndUp,
        neutral15: $vuetify.theme.dark,
        white: !$vuetify.theme.dark,
      }"
    >
      <v-container class="px-6 py-4">
        <v-row>
          <v-col cols="12" sm="6" class="d-flex flex-column">
            <div class="d-flex align-center cursor-pointer" @click="openLink('https://cyberk-glodao.netlify.app/')">
              <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                :src="
                  $vuetify.theme.dark
                    ? require(`@/assets/images/glodao-logo-dark.svg`)
                    : require(`@/assets/images/glodao-logo.svg`)
                "
                transition="scale-transition"
                width="75"
              />
              <div class="neutral10--text text-caption">
                Global Decentralized <br />
                autonomous organization
              </div>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="d-flex align-center"
            :class="{
              'justify-end': $vuetify.breakpoint.smAndUp,
              'justify-start': $vuetify.breakpoint.xs,
            }"
          >
            <a href="">
              <v-icon> fab fa-medium-m </v-icon>
            </a>
            <a href="" class="ml-8">
              <v-icon> fab fa-telegram </v-icon>
            </a>
            <a href="" class="ml-8">
              <v-icon> fab fa-twitter </v-icon>
            </a>
            <a href="" class="ml-8">
              <v-icon> fab fa-telegram-plane </v-icon>
            </a>
            <v-btn icon class="ml-6" @click="changeTheme">
              <v-icon>
                {{ $vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div
      class="flex-center-box py-1 text-caption"
      :class="{
        neutral100: $vuetify.theme.dark,
        'bluePrimary lighten-1': !$vuetify.theme.dark,
      }"
    >
      Copyright © 2022 GLO DAO. All rights reserved.
    </div>
  </div>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Vue, Inject } from 'vue-property-decorator'
import { AppProvider } from '@/app-providers'

@Observer
@Component
export default class Footer extends Vue {
  @Inject() providers!: AppProvider
  changeTheme() {
    this.providers.toggleLightMode(this.$vuetify)
  }
  openLink(url) {
    window.open(url, '_blank')
  }
}
</script>

<style lang="scss">
.footer {
  max-height: 124px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>

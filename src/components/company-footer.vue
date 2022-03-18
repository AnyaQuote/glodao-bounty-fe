<template>
  <div>
    <div
      class="footer-background"
      :class="{
        footer: $vuetify.breakpoint.smAndUp,
      }"
    >
      <v-container class="px-6 py-7">
        <v-row>
          <v-col cols="12" sm="6" class="d-flex flex-column">
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              :src="require(`@/assets/images/glodao-logo.svg`)"
              transition="scale-transition"
              width="75"
            />
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
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="flex-center-box neutral15 py-3">Copyright © 2022 GLO DAO. All rights reserved.</div>
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
}
</script>

<style lang="scss">
.footer {
  max-height: 124px;
}
.theme--dark {
  .footer-background {
    background: var(--v-primary-lighten1) !important;
    border-top: 1px solid rgba(255, 255, 187, 0.1) !important;
  }
}
</style>

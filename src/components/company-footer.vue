<template>
  <div
    class="footer-background"
    :class="{
      footer: $vuetify.breakpoint.smAndUp,
    }"
  >
    <v-container class="px-6 py-8">
      <v-row>
        <v-col cols="12" sm="6" class="d-flex flex-column">
          <!-- <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="require(`../assets/waggle-logo.${providers.themeType}.svg`)"
            transition="scale-transition"
            width="160"
          /> -->
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

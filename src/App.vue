<template>
  <v-app class="page-bg">
    <snack-bar />
    <alert />
    <global-loading />
    <navigation-drawer />
    <navigation-bar v-if="$vuetify.breakpoint.mdAndUp" />
    <mobile-navigation-bar v-else />
    <v-main class="d-flex flex-column">
      <router-view></router-view>
    </v-main>
    <v-divider></v-divider>
    <company-footer />
  </v-app>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue } from 'vue-property-decorator'
import { AppProvider, appProvider } from './app-providers'
import { walletStore } from './stores/wallet-store'

@Observer
@Component({
  components: {
    'snack-bar': () => import('@/components/snack-bar/snack-bar.vue'),
    alert: () => import('@/components/alert/alert.vue'),
    'global-loading': () => import('@/components/global-loading/global-loading.vue'),
    'navigation-drawer': () => import('@/components/navigation-drawer.vue'),
    'navigation-bar': () => import('@/components/navigation-bar.vue'),
    'company-footer': () => import('./components/company-footer.vue'),
    'mobile-navigation-bar': () => import('@/components/mobile-navigation-bar.vue'),
  },
})
export default class App extends Vue {
  @Provide() providers: AppProvider = appProvider
  wallet = this.providers.wallet

  mounted() {
    this.providers.router = this.$router
    walletStore.start()
  }

  drawer = false

  changeTheme() {
    this.providers.toggleLightMode(this.$vuetify)
  }
}
</script>
<style lang="scss">
.theme--light {
  .markdown-li a {
    color: black !important;
  }
  .black-bg {
    background: transparent !important;
  }
  .light-black-bg {
    background: #201f22 !important;
  }
  .card-bg {
    background: linear-gradient(179.93deg, rgba(255, 255, 255, 1) 2.53%, rgba(255, 255, 255, 0.3) 113.97%) !important;
  }
  .dialog-bg {
    background: white;
  }
  .white-bg {
    background: white !important;
  }
  .background-1 {
    background-attachment: fixed;
    background-position: top center;
    background-size: cover;
  }
  .background-2 {
    width: 100%;
    background-position: top center;
    background-size: cover;
  }
  .v-tabs-items {
    background-color: transparent !important;
  }
  .v-app-bar.v-toolbar.v-sheet {
    background-color: #fff !important;
  }
  .v-toolbar__content {
    border-bottom: 1px solid var(--v-primary-base) !important;
    padding: 0 !important;
  }
  .index {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 24px;
    min-width: 64px;
  }
  .info-card {
    background: #ffffff;
  }
  .time {
    background: rgba(255, 255, 255, 0.9);
  }
  .big-primary-border {
    border: 2px solid var(--v-primary-base) !important;
  }
}
.fill-width {
  width: 100%;
}

.theme--dark {
  .markdown-li a {
    color: white !important;
  }
  .black-bg {
    background: var(--v-background-base) !important;
  }
  .light-black-bg {
    background: #201f22 !important;
  }
  .card-bg {
    background: var(--v-background-lighten1) !important;
  }
  .background-1 {
    background: #181718 !important;
  }
  .background-2 {
    width: 100%;
    background-repeat: no-repeat;
    background-position: top right;
    background-size: contain;
  }
  input[type='date']::-webkit-calendar-picker-indicator {
    filter: invert(1);
    margin-left: 0 !important;
    padding: 0;
  }
  .v-toolbar__content {
    box-shadow: 0 4px 8px -1px rgba(255, 255, 187, 0.1);
    padding: 0 !important;
  }
  .v-tabs-items {
    background-color: transparent !important;
  }
  .v-app-bar.v-toolbar.v-sheet {
    background-color: var(--v-primary-lighten1) !important;
  }
  .v-application--wrap {
    background: var(--v-primary-lighten1) !important;
  }
  .v-btn:not(.v-btn--outlined).primary {
    color: black !important;
  }
  .index {
    background: linear-gradient(112.72deg, rgba(255, 199, 73, 0.05) -28.85%, rgba(255, 255, 255, 0.1) 107.2%);
    border-radius: 24px;
    min-width: 64px;
  }
  .info-card {
    background: #1b0e17;
  }
  .time {
    background: linear-gradient(112.72deg, rgba(255, 199, 73, 0.05) -28.85%, rgba(255, 255, 255, 0.1) 107.2%);
  }
  .big-primary-border {
    border: 1px solid var(--v-primary-base) !important;
  }
}

.container {
  max-width: 1250px !important;
}

.v-application {
  a {
    text-decoration: none;
    color: inherit;
  }
}
.v-sheet.v-card.rounded-lg {
  border-radius: 16px !important;
}
.v-dialog {
  border-radius: 24px !important;
}
.full-width {
  width: 100% !important;
}
.full-height {
  height: 100% !important;
}

.border-radius-8 {
  border-radius: 8px !important;
}
.border-radius-16 {
  border-radius: 16px !important;
}
.border-radius-24 {
  border-radius: 24px !important;
}

.btn-text {
  font-style: normal;
  font-weight: bold !important;
  font-size: 16px !important;
  line-height: 24px;
  letter-spacing: -0.1px !important;
}
.nav-btn-text {
  font-style: normal;
  font-weight: bold !important;
  font-size: 16px !important;
  line-height: 24px;
}
.table-header table > tr > th {
  font-style: normal;
  font-weight: normal;
  font-size: 12px !important;
  line-height: 20px;
  color: #969696 !important;
}

.v-pagination .v-icon.v-icon {
  font-size: 16px;
}
.v-pagination__item {
  font-size: 20px !important;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: transparent !important;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: transparent !important;
}
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: var(--v-subtitle-base);
}

.theme--dark .filter-btn {
  .v-text-field--outlined > .v-input__control > .v-input__slot {
    background: #bcabc7;
  }
}
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
.cursor-pointer {
  cursor: pointer;
}
.overflow-hidden {
  overflow: hidden !important;
}
.font-family-proxima {
  font-family: 'Proxima Nova';
}
.font-family-poppins {
  font-family: 'Poppins';
}
.card-title-text {
  font-size: 16px;
  line-height: 24px;
}
.card-big-title-text {
  font-size: 20px;
  line-height: 24px;
}
.background-blue-diversity {
  background-color: var(--v-bluePrimary-base) !important;
}
.background-neutral {
  background-color: var(--v-neutral20-base) !important;
}
.section-big-title-text {
  font-size: 24px;
  line-height: 36px;
}
.custom-dash-divider {
  border-top: 1px dashed var(--v-neutral20-base);
}
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute;
}
.card-text {
  font-size: 9px;
}
.line-height-6 {
  line-height: 24px;
}
.line-height-3 {
  line-height: 12px;
}
.font-weight-600 {
  font-weight: 600;
}

@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-Black.ttf) format('truetype');
  font-weight: 900;
  font-style: normal;
}
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-BlackIt.ttf) format('truetype');
  font-weight: 900;
  font-style: italic;
}
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-Bold.ttf) format('truetype');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-BoldIt.ttf) format('truetype');
  font-weight: 700;
  font-style: italic;
}
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-Semibold.ttf) format('truetype');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-SemiboldIt.ttf) format('truetype');
  font-weight: 500;
  font-style: italic;
}
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-Regular.ttf) format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-RegularIt.ttf) format('truetype');
  font-weight: 400;
  font-style: italic;
}
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-Light.ttf) format('truetype');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-LightIt.ttf) format('truetype');
  font-weight: 300;
  font-style: italic;
}
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-Thin.ttf) format('truetype');
  font-weight: 100;
  font-style: normal;
}
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'), url(./assets/fonts/proximanova/ProximaNovaA-ThinIt.ttf) format('truetype');
  font-weight: 100;
  font-style: italic;
}
</style>

<template>
  <v-app class="page-bg">
    <snack-bar />
    <alert />
    <global-loading />
    <twitter-login-dialog />
    <attach-wallet-dialog />
    <v-app-bar app>
      <navigation-bar v-if="$vuetify.breakpoint.mdAndUp" />
    </v-app-bar>
    <navigation-drawer />
    <mobile-navigation-bar v-if="$vuetify.breakpoint.smAndDown" />
    <v-main app class="neutral15">
      <router-view></router-view>
    </v-main>
    <v-divider></v-divider>
    <company-footer />
  </v-app>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
import { AppProvider, appProvider } from './app-providers'
import { walletStore } from './stores/wallet-store'
import { localdata } from '@/helpers/local-data'
import { get } from 'lodash'

@Observer
@Component({
  components: {
    'snack-bar': () => import('@/components/snack-bar/snack-bar.vue'),
    alert: () => import('@/components/alert/alert.vue'),
    'global-loading': () => import('@/components/global-loading/global-loading.vue'),
    'navigation-drawer': () => import('@/components/navigation-drawer.vue'),
    'navigation-bar': () => import('@/components/navigation-bar.vue'),
    'company-footer': () => import('@/components/company-footer.vue'),
    'mobile-navigation-bar': () => import('@/components/mobile-navigation-bar.vue'),
    'twitter-login-dialog': () => import('@/components/twitter-login-dialog.vue'),
    'attach-wallet-dialog': () => import('@/components/attach-wallet-dialog.vue'),
  },
})
export default class App extends Vue {
  @Provide() providers: AppProvider = appProvider
  wallet = this.providers.wallet

  @Watch('$route.query', { immediate: true }) onRefChanged(val: string) {
    if (val) {
      const ref = get(val, 'ref', '')
      if (ref && !localdata.referralCode) localdata.referralCode = ref
    }
  }

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
.task-detail-twitter-share-data-table {
  &.v-data-table {
    thead {
      background: var(--v-bluePrimary-lighten1);
    }
    tbody {
      tr:nth-child(even) {
        background-color: var(--v-neutral15-base);
      }
      tr:nth-child(odd) {
        background-color: var(--v-neutral100-base) !important;
        background: var(--v-neutral100-base) !important;
      }
    }
  }
}
.theme--dark {
  .task-detail-twitter-share-data-table {
    &.v-data-table {
      thead {
        background: var(--v-neutral20-base);
      }
    }
  }
}

.neutral100--bg {
  background-color: var(--v-neutral100-base) !important;
}
.v-sheet--outlined {
  border: thin solid var(--v-neutral20-base);
}
.theme--dark {
  .v-sheet--outlined {
    border: thin solid var(--v-neutral20-base) !important;
  }
}
.link-submit-custom-input {
  .v-input__control {
    .v-input__slot {
      background: transparent !important;
    }
  }
}
.custom-tabs-bar-bounty-detail {
  background: transparent;
  .v-tabs-bar {
    border-bottom-right-radius: 0;
    border-bottom: 1px solid var(--v-neutral20-base);
    background: transparent !important;
  }
}
.linear-background-blue-main {
  background-image: linear-gradient(to right, #0276f0, #0096ff, #00b3ff, #00cdff, #00e5ff);
}
.fill-width {
  width: 100%;
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
  font-family: 'Proxima Nova' !important;
}
.font-family-poppins {
  font-family: 'Poppins';
}
.card-title-text {
  font-size: 16px;
  line-height: 24px;
}
.card-subtitle-1 {
  font-size: 14px;
  line-height: 21px;
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
.blue-diversity--text {
  color: var(--v-bluePrimary-base) !important;
}
.flex-center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.background-transparent {
  background: transparent !important;
}
.bluePrimary--border {
  border: thin solid var(--v-bluePrimary-base) !important;
}
.redSenamatic--border {
  border: thin solid var(--v-redSenamatic-base) !important;
}
.mt-20 {
  margin-top: 80px;
}
.pt-20 {
  padding-top: 80px;
}
.linear-background-blue-main {
  background-image: linear-gradient(to right, #0276f0, #0096ff, #00b3ff, #00cdff, #00e5ff);
}
.text-overflow-ellipsis {
  text-overflow: ellipsis;
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

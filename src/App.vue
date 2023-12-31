<template>
  <v-app class="page-bg">
    <snack-bar />
    <alert />
    <global-loading />
    <twitter-login-dialog />
    <attach-wallet-dialog />
    <attach-solana-wallet-dialog />
    <overlay-question-dialog />
    <navigation-bar v-if="$vuetify.breakpoint.mdAndUp" />
    <navigation-drawer />
    <mobile-navigation-bar v-if="$vuetify.breakpoint.smAndDown" />
    <v-main app class="neutral15 pb-6">
      <router-view></router-view>
    </v-main>
    <v-divider></v-divider>
    <company-footer />
    <customer-support-btn />
  </v-app>
</template>

<script lang="ts">
import { localdata } from '@/helpers/local-data'
import { get } from 'lodash'
import { Observer } from 'mobx-vue'
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
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
    'company-footer': () => import('@/components/company-footer.vue'),
    'mobile-navigation-bar': () => import('@/components/mobile-navigation-bar.vue'),
    'twitter-login-dialog': () => import('@/components/twitter-login-dialog.vue'),
    'overlay-question-dialog': () => import('@/components/overlay-question-dialog.vue'),
    'attach-wallet-dialog': () => import('@/components/attach-wallet-dialog.vue'),
    'attach-solana-wallet-dialog': () => import('@/components/attach-solana-wallet-dialog.vue'),
    'customer-support-btn': () => import('@/components/customer-support-btn.vue'),
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
    const APP_VERSION = process.env.VUE_APP_VERSION
    if (!APP_VERSION || !localdata.lastVersion) {
      localdata.lastVersion = '1.0'
    } else if (localdata.lastVersion !== APP_VERSION) {
      localdata.reset()
      window.location.reload()
      localdata.lastVersion = APP_VERSION
    }
    walletStore.start()
  }

  drawer = false

  changeTheme() {
    this.providers.toggleLightMode(this.$vuetify)
  }
}
</script>
<style lang="scss">
.events-disabled {
  pointer-events: none;
}
.router-link-exact-active {
  .filter-neutral10 {
    filter: none !important;
  }
}
.theme--dark {
  .date-picker-dialog-custom {
    .v-date-picker-header {
      background-color: var(--v-neutral100-base);
    }
    .v-date-picker-table {
      background-color: var(--v-neutral100-base);
    }
  }
}
.theme--light {
  .filter-neutral10 {
    filter: invert(40%) sepia(9%) saturate(256%) hue-rotate(178deg) brightness(93%) contrast(93%);
  }
}
.theme--dark {
  .filter-neutral10 {
    filter: invert(87%) sepia(10%) saturate(123%) hue-rotate(179deg) brightness(86%) contrast(85%);
  }
}
.theme--light {
  .filter-bluePrimary {
    filter: invert(35%) sepia(67%) saturate(4915%) hue-rotate(199deg) brightness(98%) contrast(98%);
  }
}
.theme--dark {
  .filter-bluePrimary {
    filter: invert(61%) sepia(60%) saturate(1070%) hue-rotate(141deg) brightness(105%) contrast(105%);
  }
}
.v-slide-group__prev {
  display: none !important;
}
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
  .v-data-footer {
    background: var(--v-neutral100-base);
    .v-btn--icon.v-size--default {
      width: 20px;
      height: 20px;
    }
    .v-btn--icon.v-size--default .v-icon {
      font-size: 16px;
    }
    .v-data-footer__pagination {
      margin-right: 24px;
    }
  }
}
.v-menu__content.theme--dark {
  background: var(--v-neutral100-base);
  .v-sheet {
    background: var(--v-neutral100-base);
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
  &.no-padding {
    .v-input__control {
      .v-input__slot {
        padding: 0 !important;
      }
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
.linear-background-blue-light {
  background: linear-gradient(90deg, rgba(2, 118, 240, 0.2) 0%, rgba(0, 229, 255, 0.2) 113.65%);
}
.fill-width {
  width: 100%;
}
.container {
  max-width: 1090px !important;
}

.v-application {
  a {
    text-decoration: none;
    color: inherit;
  }
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
  font-family: 'Montserrat' !important;
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
  font-size: 26px;
  line-height: 36px;
}
.custom-dash-divider {
  border-top: 1px dashed var(--v-neutral20-base);
}
.position-relative {
  position: relative !important;
}
.position-absolute {
  position: absolute !important;
}
.card-text {
  font-size: 9px;
}
.line-height-6 {
  line-height: 24px !important;
}
.line-height-3 {
  line-height: 12px !important;
}
.font-weight-600 {
  font-weight: 600 !important;
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
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.v-item-group {
  background: transparent !important;
}
.show-prev {
  .v-slide-group__prev {
    display: flex !important;
  }
}
</style>

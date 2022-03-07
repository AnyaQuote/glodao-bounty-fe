// <template>
//   <v-dialog
//     :value="walletStore.showConnectDialog"
//     @input="walletStore.changeShowConnectDialog"
//     width="500"
//     scrollable
//     :retain-focus="false"
//   >
//     <template v-slot:activator="{ on, attrs }">
//       <div v-bind="attrs" v-on="on">
//         <v-btn
//           v-if="!walletStore.account"
//           depressed
//           rounded
//           color="primary"
//           large
//           outlined
//           :block="$vuetify.breakpoint.xs"
//           >Connect Wallet</v-btn
//         >
//         <div v-else class="d-flex address-container align-center justify-center">
//           <img width="24" :src="require(`@/assets/icons/${walletStore.chainIcon}`)" />
//           <div class="align-center ml-2 caption py-1 primary--text font-weight-medium">
//             {{ walletStore.shortAccount }}
//             <v-btn icon x-small @click="copyAddress()"><v-icon color="primary">mdi-autorenew</v-icon></v-btn>
//           </div>
//         </div>
//       </div>
//     </template>

//     <v-card class="pa-0" :class="$vuetify.theme.dark ? 'primary lighten-2' : 'primary lighten-3'">
//       <v-card-title class="d-flex justify-space-between pa-4 pb-0">
//         <v-img
//           alt="Vuetify Logo"
//           class="shrink mr-2"
//           contain
//           :src="require(`../assets/waggle-logo.${providers.themeType}.svg`)"
//           transition="scale-transition"
//           width="140"
//         />
//         <v-btn icon small @click="walletStore.changeShowConnectDialog(false)">
//           <v-icon>mdi-close</v-icon>
//         </v-btn>
//       </v-card-title>
//       <v-card-text class="pa-4 pt-0">
//         <div class="d-flex flex-column align-center mb-4">
//           <div class="text-h6 font-weight-medium">Connect Wallet</div>
//           <div class="subtitle-1">To start using Waggle</div>
//         </div>

//         <div class="text-h6" v-if="!walletStore.requestingChain || walletStore.requestingChain === 'sol'">
//           SOLANA Chain
//         </div>
//         <span
//           v-if="walletStore.solanaConnected && (!walletStore.requestingChain || walletStore.requestingChain === 'sol')"
//         >
//           <span class="caption">Connected to</span>
//           <address-copy-board
//             :index="0"
//             :address="walletStore.account || 'TBA'"
//             class="success--text caption font-weight-medium"
//             :iconColor="'green'"
//           />
//         </span>
//         <v-list
//           style="background-color: transparent"
//           v-if="!walletStore.requestingChain || walletStore.requestingChain === 'sol'"
//         >
//           <template v-for="(wallet, index) in walletStore.solWalletItems">
//             <v-list-item :key="wallet.name" @click="connectSolana(wallet)">
//               <div class="d-flex align-center mr-6">
//                 <img width="24" :src="wallet.icon" />
//               </div>
//               <v-list-item-content>
//                 <v-list-item-title class="subtitle-1 d-flex flex-column flex-sm-row justify-space-between">
//                   <span>{{ wallet.name }} </span>
//                   <v-btn v-if="walletStore.selectedWallet === wallet" x-small color="error">
//                     Click to Disconnect
//                   </v-btn>
//                 </v-list-item-title>
//               </v-list-item-content>
//               <v-list-item-icon class="d-flex align-self-center my-2">
//                 <v-icon>mdi-chevron-right</v-icon>
//               </v-list-item-icon>
//             </v-list-item>
//             <v-divider v-if="index < walletStore.solWalletItems.length - 1" :key="index"></v-divider>
//           </template>
//         </v-list>
//         <div class="mt-4 text-h6" v-if="!walletStore.requestingChain || walletStore.requestingChain !== 'sol'">
//           ETH/BSC Chain
//         </div>
//         <span
//           v-if="
//             walletStore.solidityConnected && (!walletStore.requestingChain || walletStore.requestingChain !== 'sol')
//           "
//         >
//           <span class="caption">Connected to</span>
//           <address-copy-board
//             :index="1"
//             :address="walletStore.account || 'TBA'"
//             class="success--text caption font-weight-medium"
//             :iconColor="'green'"
//           />
//         </span>
//         <v-list-item
//           @click="walletStore.connectSolidity()"
//           v-if="!walletStore.requestingChain || walletStore.requestingChain !== 'sol'"
//         >
//           <div class="d-flex align-center mr-6">
//             <img width="24" :src="require('@/assets/icons/metamask-fox.svg')" />
//           </div>
//           <v-list-item-content>
//             <v-list-item-title class="subtitle-1 d-flex justify-space-between">
//               <span>MetaMask </span>
//               <span v-if="walletStore.solidityConnected" class="success--text caption font-weight-medium caption">
//                 Connected
//               </span>
//             </v-list-item-title>
//           </v-list-item-content>
//           <v-list-item-icon class="d-flex align-self-center my-2">
//             <v-icon>mdi-chevron-right</v-icon>
//           </v-list-item-icon>
//         </v-list-item>
//         <div class="ledger-notice mx-auto pa-3">
//           <div class="text-center normal-caption-text subtitle--text font-weight-bold">
//             Currently, Waggle does not support sign message with Ledger Nano X/ Ledger Nano S on Solana Network to join
//             whitelist. <br />
//             Please use other wallet!
//           </div>
//         </div>
//       </v-card-text>
//     </v-card>
//   </v-dialog>
// </template>

// <script lang="ts">
// import { Component, Provide, Vue } from 'vue-property-decorator'
// import { AppProvider, appProvider } from '../app-providers'
// import { walletStore } from '@/stores/wallet-store'
// import { Observer } from 'mobx-vue'

// @Observer
// @Component
// export default class extends Vue {
//   @Provide() providers: AppProvider = appProvider
//   @Provide() walletStore = walletStore

//   copyAddress() {
//     navigator.clipboard.writeText(this.walletStore?.account || '')
//   }

//   connectSolana(wallet) {
//     if (wallet === walletStore.selectedWallet) {
//       walletStore.disconnectSolana()
//     } else {
//       walletStore.connectSolana(wallet)
//     }
//   }
// }
// </script>

// <style scoped lang="scss">
// .address-container {
//   border-radius: 20px;
//   border: 1px solid var(--v-primary-base);
//   padding: 8px 14px;
// }
// .ledger-notice {
//   max-width: 440px;
//   border: 1px solid var(--v-error-base);
//   border-radius: 16px;
// }
// </style>

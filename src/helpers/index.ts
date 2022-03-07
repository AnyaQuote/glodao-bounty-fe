// import { ChainId } from '@pancakeswap-libs/sdk-v2'

// const BSCSCAN_PREFIXES: { [chainId in ChainId]: string } = {
//   56: '',
//   97: 'testnet.',
// }

// export function getBscScanLink(chainId: ChainId, data: string, type: 'transaction' | 'token' | 'address'): string {
//   const prefix = `https://${BSCSCAN_PREFIXES[chainId] || BSCSCAN_PREFIXES[ChainId.MAINNET]}bscscan.com`

//   switch (type) {
//     case 'transaction': {
//       return `${prefix}/tx/${data}`
//     }
//     case 'token': {
//       return `${prefix}/token/${data}`
//     }
//     case 'address':
//     default: {
//       return `${prefix}/address/${data}`
//     }
//   }
// }

// export function strEquals(str1: any, str2: any) {
//   return str1?.toString().toLowerCase() === str2?.toString().toLowerCase()
// }

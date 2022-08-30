import { Erc20Contract } from '@/blockchainHandlers/erc20-contract'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { walletStore } from '@/stores/wallet-store'
import { get, isEmpty, isEqual, toNumber, toString } from 'lodash-es'
import { action, computed, IReactionDisposer, observable } from 'mobx'

const BUSD_CONTRACT_ADDRESS = process.env.VUE_APP_BUSD_CONTRACT
const CHAIN_ID = process.env.VUE_APP_DONATION_CHAIN_ID
const DESTINATION_ADDRESS = process.env.VUE_APP_DONATION_DESTINATION_ADDRESS

export class DonateViewModel {
  _disposers: IReactionDisposer[] = []
  @observable walletStore = walletStore
  @observable amountList = ['1', '5', '10', '20']
  @observable amount = '1'

  constructor() {
    //
  }

  @action changeDonationAmount(amount: string) {
    this.amount = amount
  }

  @action donate = async () => {
    if (!BUSD_CONTRACT_ADDRESS || !CHAIN_ID || !DESTINATION_ADDRESS) return

    if (isEmpty(this.account) || isEmpty(this.web3)) {
      snackController.error('Please connect to Metamask')
      return
    }
    if (isEmpty(this.amount)) {
      snackController.error('Please choose donation amount')
    }
    if (!isEqual(toString(this.chainId), CHAIN_ID)) {
      walletStore.switchNetwork('eth', toNumber(CHAIN_ID))
      return
    }
    try {
      await this.sendDonation(
        walletStore.account,
        DESTINATION_ADDRESS,
        BUSD_CONTRACT_ADDRESS,
        this.amount,
        walletStore.web3
      )
    } catch (error: any) {
      console.log(error)
      snackController.error(error.message)
    }
  }

  @action sendDonation = async (from: string, to: string, tokenAddress: string, amount: string, web3) => {
    if (isEmpty(from)) throw new Error('Sender address is empty')
    const ercContract = new Erc20Contract(tokenAddress, web3)
    const res = await ercContract.transfer(from, to, amount)
    console.log(res)
  }

  @computed get account() {
    return get(walletStore, 'account', '')
  }

  @computed get web3() {
    return get(walletStore, 'web3', {})
  }

  @computed get chainId() {
    return get(walletStore, 'web3.chainId', '')
  }

  @computed get shouldDisableDonate() {
    return isEmpty(this.account) || isEmpty(this.web3) || isEmpty(this.amount)
  }
}

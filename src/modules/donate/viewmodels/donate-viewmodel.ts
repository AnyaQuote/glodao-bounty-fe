import { Erc20Contract } from '@/blockchainHandlers/erc20-contract'
import { loadingController } from '@/components/global-loading/global-loading-controller'
import { snackController } from '@/components/snack-bar/snack-bar-controller'
import { apiService } from '@/services/api-service'
import { walletStore } from '@/stores/wallet-store'
import { get, isEmpty, isEqual, toLower, toNumber, toString, orderBy, sum } from 'lodash-es'
import { action, computed, IReactionDisposer, observable, reaction } from 'mobx'
import moment from 'moment'

const BUSD_CONTRACT_ADDRESS = process.env.VUE_APP_BUSD_CONTRACT
const CHAIN_ID = process.env.VUE_APP_DONATION_CHAIN_ID
const DESTINATION_ADDRESS = process.env.VUE_APP_DONATION_DESTINATION_ADDRESS

export class DonateViewModel {
  _disposers: IReactionDisposer[] = []
  @observable walletStore = walletStore
  @observable amountList = ['50', '100', '250', '500']
  @observable amount = this.amountList[0]
  @observable baseAllDonations: any[] = []
  @observable dialog = false
  @observable nftUsername = ''

  constructor() {
    //
    this.loadData()
    this._disposers = [
      reaction(
        () => this.account,
        () => this.loadData()
      ),
    ]
  }

  @action.bound changeNFTUsername(value: string) {
    this.nftUsername = value
  }

  @action destroyReaction() {
    //
    this._disposers.forEach((d) => d())
  }

  @action loadData = async () => {
    try {
      this.baseAllDonations = await apiService.donationTransactions.find({}, { _limit: -1, _sort: 'amount:DESC' })
    } catch (error: any) {
      snackController.error(error)
      this.baseAllDonations = []
    }
  }

  @action.bound changeDonationAmount(amount: string) {
    this.amount = amount
  }

  @action donate = async () => {
    if (!BUSD_CONTRACT_ADDRESS || !CHAIN_ID || !DESTINATION_ADDRESS) {
      snackController.error('Donate is not supported! If you continue to see this error, please contact site admin.')
      return
    }

    if (isEmpty(this.account) || isEmpty(this.web3)) {
      snackController.error('Please connect to Metamask')
      return
    }
    if (isEmpty(this.amount)) {
      snackController.error('Please choose donation amount')
      return
    }
    if (isEmpty(this.nftUsername)) {
      snackController.error('Please enter your name for NFT')
      return
    }
    if (!isEqual(toString(this.chainId), CHAIN_ID)) {
      walletStore.switchNetwork('eth', toNumber(CHAIN_ID))
      return
    }
    try {
      loadingController.increaseRequest()
      const { transactionHash } = await this.sendDonation(
        walletStore.account,
        DESTINATION_ADDRESS,
        BUSD_CONTRACT_ADDRESS,
        this.amount,
        walletStore.web3
      )
      const res = await apiService.recordDonation(transactionHash, this.nftUsername)
      this.baseAllDonations.push(res)
      this.dialog = true
      snackController.success('Donation sent! Thank you for your donation!')
    } catch (error: any) {
      snackController.error(error.message)
    } finally {
      loadingController.decreaseRequest()
    }
  }

  @action sendDonation = async (from: string, to: string, tokenAddress: string, amount: string, web3) => {
    if (isEmpty(from)) throw new Error('Sender address is empty')
    const ercContract = new Erc20Contract(tokenAddress, web3)
    return await ercContract.transfer(from, to, amount)
  }

  @computed get totalDonationAmount() {
    return sum(this.allDonations.map((donation: any) => toNumber(donation.amount)))
  }

  @computed get allDonations() {
    return orderBy(this.baseAllDonations, ['amount', 'date'], ['desc', 'desc']).map((x: any) => ({
      ...x,
      date: moment(x.date).format('lll'),
    }))
  }

  @computed get myDonations() {
    return this.allDonations.filter((donation: any) => isEqual(toLower(donation.wallet), toLower(this.account)))
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

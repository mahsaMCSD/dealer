import restAPI from '../httpClient'
import apiUrls from '../apiUrls'

export const getPaymentsTransactionsServices = (params) =>
    restAPI({url: apiUrls.payments.transactions._get, params, isProtected: true}),

  getPaymentsWalletsBalanceTransactionsServices = () =>
    restAPI({url: apiUrls.payments.wallets.balance._get, isProtected: true}),

  getCashableWalletsBalanceServices = () =>
    restAPI({url: apiUrls.payments.wallets.cashable_balance._get, isProtected: true}),

  chargeWalletServices = (body) =>
    restAPI({url: apiUrls.payments.wallets.charge._post, isProtected: true, body, method: 'POST'}),

  getDataPaymentBySlug = (slug) =>
    restAPI({url: apiUrls.payments.by_slug._get.format(slug), isProtected: true}),

  postPayPrePayment = (body) =>
    restAPI({url: apiUrls.payments.gateway.pay._post, isProtected: true, body, method: 'POST'}),

  getAmountPresets = () =>
    restAPI({url: apiUrls.payments.wallets.amount_presets._get, isProtected: true}),

  getAmountPresetsStep = () =>
    restAPI({url: apiUrls.payments.wallets.amount_presets_step._get, isProtected: true}),

  getListGatewayServices = () =>
    restAPI({url: apiUrls.payments.gateway._get, isProtected: true}),

  postOfflineChargeServices = (body) =>
    restAPI({url: apiUrls.payments.wallets.offline_charge._post, isProtected: true, body, method: 'POST'}),

  postRefundDepositServices = (body) =>
    restAPI({url: apiUrls.payments.wallets.refund_deposit._post, isProtected: true, body, method: 'POST'}),

  getDepositBalanceInfoServices = () =>
    restAPI({url: apiUrls.payments.wallets.deposit_info._get, isProtected: true}),
  postWithdrawServices = (body) =>
    restAPI({url: apiUrls.payments.wallets.withdraw._post, isProtected: true, body, method: 'POST'}),

  getPaymentInfoService = (payment_id) =>
    restAPI({url: apiUrls.payments.payment_info._get.format(payment_id), isProtected: true}),

  postPayment = (body) =>
    restAPI({url: apiUrls.payments.payment._post, isProtected: true, body, method: 'POST'}),

  postFinalizePayment = (body) =>
    restAPI({url: apiUrls.payments.finalize_payment._post, isProtected: true, body, method: 'POST'}),

  postAuctionDeposit = (body) => restAPI({
    url: apiUrls.payments.auction_deposit._get,
    isProtected: true,
    body,
    method: 'POST'
  }),

  deletedTransactionsService = (tracking_code) =>
    restAPI({url: apiUrls.payments.transactions._delete.format(tracking_code), isProtected: true, method: 'DELETE'}),

  getAuctionMembershipInfoService = () =>
    restAPI({url: apiUrls.payments.auction_membership_info._get, isProtected: true})

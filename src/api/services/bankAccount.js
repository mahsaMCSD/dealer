import restAPI from '../httpClient'
import apiUrls from '../apiUrls'

export const postBankAccountService = (body) =>
  restAPI({url: apiUrls.bank_account._post, body, isProtected: true, method: 'POST'})

export const getListBankAccountService = (body) =>
  restAPI({url: apiUrls.bank_account._get, body, isProtected: true})

export const deleteBankAccountService = (slug) =>
  restAPI({url: apiUrls.bank_account._delete.format(slug), isProtected: true, method: 'DELETE'})

export const getListWithdrawAccountService = (body) =>
  restAPI({url: apiUrls.bank_account.withdraw_accounts._get, body, isProtected: true})

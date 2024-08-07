import restAPI from '../httpClient'
import apiUrls from '../apiUrls'

export const createNotaryService = (body) =>
  restAPI({url: apiUrls.dealer_notary._post, isProtected: true, body, method: 'POST'})

export const getNotaryService = (params) =>
  restAPI({url: apiUrls.dealer_notary._get, params, isProtected: true})

export const deleteNotaryService = (id) =>
  restAPI({url: apiUrls.dealer_notary._delete.format(id), isProtected: true, method: 'DELETE'})

export const createContractService = (body) =>
  restAPI({url: apiUrls.contract_template._post, isProtected: true, body, method: 'POST'})

export const getContractService = (params) =>
  restAPI({url: apiUrls.contract_template._get, params, isProtected: true})

export const deleteContractService = (id) =>
  restAPI({url: apiUrls.contract_template._delete.format(id), isProtected: true, method: 'DELETE'})

export const getContractByIdService = (id) =>
  restAPI({url: apiUrls.contract_template._get_by_id.format(id), isProtected: true})

export const postSelectTransactionService = (body) =>
  restAPI({url: apiUrls.pre_contract.select_transaction._post, body, isProtected: true, method: 'POST'})

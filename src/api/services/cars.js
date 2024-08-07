import restAPI from '../httpClient'
import apiUrls from '../apiUrls'

export const auctionsService = (params) =>
  restAPI({url: apiUrls.auctions._get, params, isProtected: true, version: 'v2'})

export const bidDetailService = (id) =>
  restAPI({url: apiUrls.auctions.bid._get.format(id), isProtected: true, version: 'v2'})

export const bidListDetailService = (params) =>
  restAPI({url: apiUrls.auctions.bids._get, params, isProtected: true, version: 'v2'})

export const getOffersAuctionService = (params) =>
  restAPI({url: apiUrls.auctions.mine._get,params, isProtected: true, version: 'v2'})

export const getOffersInventoryService = (params) =>
  restAPI({url: apiUrls.inventory.mine._get,params, isProtected: true, version: 'v2'})

export const getOrdersService = (page) =>
  restAPI({url: apiUrls.auctions.winner._get.format(page), isProtected: true, version: 'v2'})

export const getOrdersNegotiationService = () =>
  restAPI({url: apiUrls.auctions.negotiation._get, isProtected: true, version: 'v2'})
export const inspectionsService = () =>
  restAPI({url: apiUrls.inspection_dealer._get, isProtected: true})

export const inspectionDealerService = (id) =>
  restAPI({url: apiUrls.inspection_dealer.inspection_id._get.format(id), isProtected: true, version: 'v2'})

export const bidService = (auctionId, data) =>
  restAPI({
    url: apiUrls.auctions.bid._post.format(auctionId),
    body: data,
    isProtected: true,
    method: 'Post',
    version: 'v2'
  })

export const segmentsDataService = (inspectionId, id) =>
  restAPI({
    url: apiUrls.inspection_dealer.segments._get.format(inspectionId, id),
    isProtected: true,
    version: 'v2'
  })

export const segmentsDataServiceV2 = (inspectionId, id) =>
  restAPI({
    url: apiUrls.inspection_dealer.segments._get.format(inspectionId, id),
    isProtected: true,
    version: 'v2'
  })

export const getPositiveCommentsService = (inspectionId) =>
  restAPI({url: apiUrls.inspection_dealer.positive_comments._get.format(inspectionId), isProtected: true})

export const getImageTokenService = (imageId) =>
  restAPI({url: apiUrls.images.get_token._get.format(imageId), isProtected: true})

export const inventoryService = (params) =>
  restAPI({url: apiUrls.inventory._get, params, isProtected: true, version: 'v3'})

export const bidInventoryDetailService = (id) =>
  restAPI({url: apiUrls.inventory.bid._get.format(id), isProtected: true, version: 'v2'})

export const bidListInventoryDetailService = (params) =>
  restAPI({url: apiUrls.inventory.bids._get, params, isProtected: true, version: 'v2'})

export const getDetailInventoryById = (id) =>
  restAPI({url: apiUrls.inventory.detail._get.format(id), isProtected: true, version: 'v2'})

export const bidInventoryService = (auctionId, data) =>
  restAPI({
    url: apiUrls.inventory.bid._post.format(auctionId),
    body: data,
    isProtected: true,
    method: 'Post',
    version: 'v2'
  })

export const getDetailAuctionById = (id) =>
  restAPI({url: apiUrls.auctions.detail._get.format(id), isProtected: true, version: 'v2'})

export const getCommonCount = () =>
  restAPI({url: apiUrls.common.count, isProtected: true})

export const getWaitSettlement = () =>
  restAPI({url: apiUrls.auctions.wait_settlement._get, isProtected: true, version: 'v2'})

export const getContractsTransactionSelectionService = () =>
  restAPI({url: apiUrls.contracts.transaction_selection._get, isProtected: true})

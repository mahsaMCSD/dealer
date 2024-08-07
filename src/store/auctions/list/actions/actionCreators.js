import * as actionTypes from '../actionTypes'

export const addAuctionList = (data) => ({type: actionTypes.CHANGE_LIST, data})
export const changeBidsList = (data) => ({type: actionTypes.CHANGE_BIDS, data})
export const onToggleIsGetting = (status) => ({type: actionTypes.TOGGLE_IS_GETTING_DATA, data: status})
export const onToggleIsLoop = (status) => ({type: actionTypes.TOGGLE_IS_LOOP, data: status})
export const onToggleIsRequest = (data) => ({type: actionTypes.TOGGLE_IS_REQUEST, data})
export const onChangeFilterAuction = (data) => ({type: actionTypes.CHANGE_FILTER, data})
export const onChangeBrandsAuction = (data) => ({type: actionTypes.CHANGE_BRANDS, data})
export const onToggleIsGettingBrands = (status) => ({type: actionTypes.TOGGLE_IS_GETTING_BRANDS, data: status})
export const onChangeModelsAuction = (data) => ({type: actionTypes.CHANGE_MODELS, data})
export const resetAuctionList = () => ({type: actionTypes.RESET_THIS_STORE})

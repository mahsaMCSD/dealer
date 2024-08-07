import * as actionTypes from '../actionTypes'


export const changePreviewedImage = () => ({type: actionTypes.CHANGE_PREVIEWED_IMAGE})
export const changePreviewedAlert = () => ({type: actionTypes.CHANGE_PREVIEWED_ALERT})
export const changePreviewedDetails = () => ({type: actionTypes.CHANGE_PREVIEWED_DETAILS})
export const changeInspectionComments = (data) => ({type: actionTypes.CHANGE_INSPECTION_COMMENTS, data})
export const changeCarInfo = (data) => ({type: actionTypes.CHANGE_CAR_INFO, data})
export const changeCarDetails = (data) => ({type: actionTypes.CHANGE_CAR_DETAILS, data})
export const changeLoading = (data) => ({type: actionTypes.CHANGE_LOADING, data})
export const changeIndexActiveImage = (data) => ({type: actionTypes.CHANGE_INDEX_ACTIVE_IMAGE, data})

export const resetAuctionsDetails = () => ({type: actionTypes.RESET_THIS_STORE})

import * as types from '../actionTypes'

export const onChangeInspectionList = list => ({type: types.CHANGE_INSPECTION_LIST, data: list})
export const onToggleIsGettingData = status => ({type: types.TOGGLE_IS_GETTING_DATA, data: status})
export const onResetThisStore = () => ({type: types.RESET_THIS_STROE})

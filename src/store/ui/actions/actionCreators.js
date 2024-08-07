import * as types                      from './actionTypes'

export const onChangeCountCompeting = (count) => ({type: types.CHANGE_COUNT_COMPETING, data: count})
export const onChangeModalConnection = (boolean) => ({type: types.IS_CONNECTED, data: boolean})
export const onChangeCities = (boolean) => ({type: types.LIST_CITY, data: boolean})
export const onChangeCategories = (boolean) => ({type: types.LIST_CATEGORY, data: boolean})
export const onresetAuctionsCategories = () => ({type: types.RESET_STORE})


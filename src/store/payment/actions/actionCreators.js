import * as types from './actionTypes'

export const onChangeDataFinalPay = (count) => ({type: types.DATA_FINAL_PAY, data: count}),
  onResetPayment = (count) => ({type: types.RESET_STORE, data: count})

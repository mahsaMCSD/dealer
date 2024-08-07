import * as types from './actions/actionTypes'

export default (state = initialState, action) => {
  switch (action.type) {
    case types.DATA_FINAL_PAY:
      return {...state, data_final_pay: action.data}
    case types.RESET_STORE:
      return {...initialState}
    default:
      return {...state}
  }
}

const initialState = {
  data_final_pay: '',
}

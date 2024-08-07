import * as types from './actions/actionTypes'

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AMOUNT_PRESET_STEP:
      return {...state, amount_preset_step: action.data}
    case types.AMOUNT_PRESET:
      return {...state, amount_preset: action.data}

    case types.CHANGE_BALANCE: {
      return {...state, balance: action.data}
    }

    case types.CHANGE_AUCTION_MEMBERSHIP_INFO: {
      return {...state, auction_membership_info: action.data}
    }

    case types.CHANGE_AUCTION_MEMBERSHIP: {
      return {...state, auction_membership: action.data}
    }

    case types.RESET_STORE:
      return {...initialState}
    default:
      return {...state}
  }
}

const initialState = {
  amount_preset_step: '',
  amount_preset: [],
  balance: 0,
  auction_membership: null,
  auction_membership_info: null
}

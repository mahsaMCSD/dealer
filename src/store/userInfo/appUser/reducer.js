import {
  LOGIN,
  ADDLOGS,
  TOGGLE_IS_CONFIRMED,
  TOGGLE_IS_HAVING_MEMBERSHIP,
  RESET_STORE
} from './actions/actionTypes'

const initialState = {
  is_confirmed: null,
  is_having_membership: false,
  info: null,
  auction_membership_info: null,
  logs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_CONFIRMED:
      return {...state, is_confirmed: action.payload}

    case TOGGLE_IS_HAVING_MEMBERSHIP:
      return {...state, is_having_membership: action.payload}

    case LOGIN:
      return {...state, info: action.payload}

    case RESET_STORE:
      return {...initialState}

    case ADDLOGS:
      return {...state, logs: action.payload}

    default:
      return state
  }
}

import * as actionTypes from './actions/actionTypes'

export default (state = initialState, action) => {
  switch (action.type) {
    case  actionTypes.ADD_BID:
      return {...state, [action.id]: action.data}
    case  actionTypes.ADD_ALL_BID:
      return action.data
    case actionTypes.DELETE_BID:
      delete state[action.id]
      return {...state}
    case  actionTypes.RESET_THIS_STORE:
      return {...initialState}
    default:
      return {...state}
  }
}

const initialState = {}
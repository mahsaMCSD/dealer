import * as types from './actions/actionTypes'

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_COUNT_COMPETING:
      return {...state, countCompeting: action.data}
    case types.IS_CONNECTED:
      return {...state, modal_connection: action.data}

    case types.LIST_CITY:
      return {...state, data: {...state.data, cities: action.data}}

    case types.LIST_CATEGORY:
      return {...state, data: {...state.data, categories: action.data}}

    case types.RESET_STORE:
      return {...initialState}
    default:
      return {...state}
  }
}

const initialState = {
  countCompeting: {},
  modal_connection: false,
  data: {
    cities: [],
    categories: []
  },
  scroll: {}
}

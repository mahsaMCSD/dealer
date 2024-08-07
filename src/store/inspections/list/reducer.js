import * as types from './actionTypes'

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_INSPECTION_LIST:
      return {...state, inspection_list: action.data}
    case types.TOGGLE_IS_GETTING_DATA:
      return {...state, is_getting_data: action.data}
    case types.RESET_THIS_STROE:
      return {...initialState}
    default:
      return {...state}
  }
}

const initialState = {
  inspection_list: [],
  is_getting_data: false,
}

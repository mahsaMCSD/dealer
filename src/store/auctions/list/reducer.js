import * as actionTypes  from './actionTypes'
import schemaStoreFilter from 'src/pages/dashboard/contents/competing/filters/schemsStoreFilter'

export default (state = initialState, action) => {
  switch (action.type) {
    case  actionTypes.CHANGE_LIST:
      return {...state, auction_list: action.data}
    case  actionTypes.CHANGE_BIDS:
      return {...state, bids: action.data}
    case  actionTypes.TOGGLE_IS_GETTING_DATA:
      return {...state, is_getting_data: action.data}
    case  actionTypes.TOGGLE_IS_LOOP:
      return {...state, is_loop: action.data}
    case  actionTypes.TOGGLE_IS_REQUEST:
      return {...state, is_request: action.data}
    case  actionTypes.CHANGE_FILTER:
      return {...state, filters: {...state.filters, ...action.data}}
    case actionTypes.CHANGE_BRANDS:
      return {...state, data: {...state.data, brands: action.data}}
      case actionTypes.TOGGLE_IS_GETTING_BRANDS:
      return {...state, data: {...state.data, is_getting_brands: action.data}}
    case actionTypes.CHANGE_MODELS:
      return {...state, data: {...state.data, models: {...state.data.models, ...action.data}}}
    case actionTypes.RESET_THIS_STORE:
      return {...initialState, is_loop: state.is_loop, bids: state.bids, filters: state.filters, data: state.data}
    default:
      return {...state}
  }
}

const initialState = {
  auction_list: [],
  bids: [],
  is_getting_data: false,
  is_loop: false,
  is_request: true,
  filters: {
    ...schemaStoreFilter.auctions.initialStateFilter
  },
  data: {
    is_getting_brands: false,
    brands: [],
    models: {}
  }
}

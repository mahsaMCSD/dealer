import * as actionTypes from './actionTypes'

export default (state = initialState, action) => {
  switch (action.type) {
    case  actionTypes.CHANGE_INSPECTION_COMMENTS:
      return {...state, inspectionComments: action.data}
    case actionTypes.CHANGE_CAR_INFO:
      return {...state, car_info: action.data}
    case actionTypes.CHANGE_CAR_DETAILS:
      return {...state, car_details: action.data}
    case  actionTypes.CHANGE_LOADING:
      return {...state, loading: !state.loading}
    case  actionTypes.CHANGE_PREVIEWED_ALERT:
      return {...state, previewed_alert: true}
    case  actionTypes.CHANGE_PREVIEWED_DETAILS:
      return {...state, previewed_details: true}
    case  actionTypes.CHANGE_PREVIEWED_IMAGE:
      return {...state, previewed_image: true}
    case actionTypes.CHANGE_INDEX_ACTIVE_IMAGE:
      return {...state, index_active_image: action.data}
    case actionTypes.RESET_THIS_STORE:
      return {...initialState}
    default:
      return {...state}
  }
}

const initialState = {
  inspectionComments: null,
  car_info: null,
  car_details:[],
  loading: true,
  previewed_image: false,
  previewed_details: false,
  previewed_alert: false,
  index_active_image: 0
}

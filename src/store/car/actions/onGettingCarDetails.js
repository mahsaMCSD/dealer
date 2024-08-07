import {segmentsDataService} from 'src/api/services/cars'
import {changeCarDetails}    from './actionCreators'

const onGettingCarDetails = (inspectionId) => (dispatch,getState) => {
  const car_details = getState().car.car_details;
  if (car_details.length === 0) {
    segmentsDataService(inspectionId, 12)
      .then((res) => {
        dispatch(changeCarDetails(res.questions))
      })
  }
}

export default onGettingCarDetails

export const onGettingCarDetailsMore = (inspectionId) => (dispatch,getState) =>{
  const car_details = getState().car.car_details;
  segmentsDataService(inspectionId, 13)
    .then((res) => {
      dispatch(changeCarDetails([...car_details].concat(res.questions)))
    })
}
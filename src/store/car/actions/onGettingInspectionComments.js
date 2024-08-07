import {inspectionDealerService}  from 'src/api/services/cars'
import {parseRefsDots}            from 'src/utility/inspectionFormatters'
import {changeInspectionComments} from './actionCreators'

const onGettingInspectionComments = (inspectionId) => (dispatch,getState) => {
  const {inspectionComments} = getState().car
  if(!inspectionComments){
    inspectionDealerService(inspectionId)
      .then((res) => {
        dispatch(changeInspectionComments({
          ...res, parseRefsDots: parseRefsDots(res.additional_images),
          is_problem: res.additional_images && Object.keys(res.additional_images).length > 0
        }))
      })
  }

}

export default onGettingInspectionComments
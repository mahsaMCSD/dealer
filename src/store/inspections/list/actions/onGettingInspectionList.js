import {batch}              from 'react-redux'
import {inspectionsService} from 'src/api/services/cars'
import {
  onChangeInspectionList,
  onResetThisStore,
  onToggleIsGettingData,
}                           from './actionCreators'

const getList = () => (dispatch) => {

  batch(() => {
    dispatch(onResetThisStore())
    dispatch(onToggleIsGettingData(true))
  })
  inspectionsService()
    .then((res) => {
      batch(() => {
        dispatch(onChangeInspectionList(res))
        dispatch(onToggleIsGettingData(false))
      })
    })
    .catch(() => {
      dispatch(onToggleIsGettingData(false))
    })
}

export default getList


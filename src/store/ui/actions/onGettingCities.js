import {onChangeCities} from './actionCreators'
import {cityService}    from 'src/api/services/appUser'

export const onGettingCities = () => (dispatch, getState) =>
  getState().ui?.data.cities.length === 0 &&
  cityService()
    .then((res) => {
      dispatch(onChangeCities(res))
    })



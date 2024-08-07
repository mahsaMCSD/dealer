import {getCategoriesService} from 'src/api/services/appUser'
import {onChangeCategories}   from './actionCreators'

export const onGettingCategories = () => (dispatch, getState) => getState().ui.data.categories.length === 0 &&
  getCategoriesService()
    .then((res) => {
      dispatch(onChangeCategories(res.results))
    })

import {getBrandsService}                                 from 'src/api/services/appUser'
import {onChangeBrandsInventory, onToggleIsGettingBrands} from './actionCreators'

export const onGettingBrandsInventory = () => (dispatch, getState) => {
  if (!getState().inventory?.list.data.is_getting_brands &&
    getState().inventory?.list.data.brands?.length === 0) {
    dispatch(onToggleIsGettingBrands(true))
    getBrandsService()
      .then((res) => {
        dispatch(onChangeBrandsInventory(res.brands))
      })
      .finally(() => dispatch(onToggleIsGettingBrands(false)))
  }
}

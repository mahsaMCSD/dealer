import {onChangeBrandsAuction, onToggleIsGettingBrands} from './actionCreators'
import {getBrandsService}                               from 'src/api/services/appUser'

export const onGettingBrandsAuction = () => (dispatch, getState) => {
  if (!getState().auctions?.list.data.is_getting_brands &&
    getState().auctions?.list.data.brands?.length === 0) {
    dispatch(onToggleIsGettingBrands(true))
    getBrandsService()
      .then((res) => {
        dispatch(onChangeBrandsAuction(res.brands))
      })
      .finally(() => dispatch(onToggleIsGettingBrands(false)))
  }
}

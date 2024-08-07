import {onChangeModelsAuction} from './actionCreators'
import {getModelsService}      from 'src/api/services/appUser'

export const onGettingModelsAuction = ({brand_url_slug, brand_id}) => (dispatch, getState) => {
  const findUrlSlug = getState()
    .auctions
    ?.list
    .data
    .brands
    .find(brandItem => brandItem.id === brand_id)?.url_slug
  if (!brand_url_slug) {
    brand_url_slug = findUrlSlug.toLowerCase()
  }
  if (brand_url_slug && !getState().auctions?.list.data.models[brand_url_slug]) {
    getModelsService({brand_url_slug})
      .then((res) =>
        dispatch(onChangeModelsAuction({[brand_url_slug]: res}))
      )
  }
}

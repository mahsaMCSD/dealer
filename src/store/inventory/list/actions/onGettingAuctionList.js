import {batch}                                           from 'react-redux'
import {inventoryService, bidListInventoryDetailService} from 'src/api/services/cars'
import {
  addAuctionList,
  onToggleIsGetting,
  onToggleIsGettingMore,
  onToggleIsLoop,
  resetAuctionList
}                                                        from './actionCreators'
import {changeBidsList}                                  from 'src/store/inventory/list/actions/actionCreators'
import {convertParamsFilter}                             from 'src/utility/helpers'
import {onGettingCountCompeting}                         from '../../../ui/actions/onGettingCountCompeting'


const onGettingAuctionList = (nextPageNumber, hasNotReset) => (dispatch, getState) => {
  const {is_loop, auction_list, filters} = getState().inventory.list
  batch(() => {
    if (!nextPageNumber) {
      if (auction_list.length === 0) {
        dispatch(onToggleIsGetting(true))
      }
      if (!hasNotReset) dispatch(resetAuctionList())
    } else {
      dispatch(onToggleIsGettingMore(true))
    }
  })
  const overrideFilter = convertParamsFilter(filters)
  const page = nextPageNumber ? nextPageNumber : 1
  inventoryService(
    {
      page,
      ...overrideFilter
    }
  )
    .then((res) => {
      batch(() => {
        if (nextPageNumber) {
          dispatch(addAuctionList([...auction_list].concat(res)))
          dispatch(onToggleIsGettingMore(false))
        } else {
          dispatch(addAuctionList(res))
        }
        if (!is_loop) {
          dispatch(onToggleIsLoop(true))
          dispatch(onGetBids())
        }
      })
    })
    .catch(() => {
      dispatch(onToggleIsGetting(false))
    })
}
export default onGettingAuctionList

export const onGetBids = () => (dispatch, getState) => {
  const {is_loop, auction_list, is_getting_data, filters} = getState().inventory.list
  if (is_loop) {
    const overrideFilter = convertParamsFilter(filters)

    bidListInventoryDetailService(overrideFilter)
      .then(result => {
        const {is_loop} = getState().inventory.list
        if (is_loop) {
          dispatch(changeBidsList(result))
          const sortKeyBids = ((Object.keys(result)).map(id => parseInt(id))).filter(item => !!item)
            .sort()
          const sortKeyAuctions = (auction_list.map(item => item.id)).sort()
          if (JSON.stringify(sortKeyBids) !== JSON.stringify(sortKeyAuctions)) {
            dispatch(onGettingAuctionList(0, true))
            dispatch(onGettingCountCompeting())
          }
          setTimeout(() => dispatch(onGetBids()), result.interval ? result.interval * 1000 : 30000)
        }
        if (is_getting_data) {
          dispatch(onToggleIsGetting(false))
        }
      })
  }
}

export const loadMore = nextPageUrl => dispatch => {
  const nextPageNumber = nextPageUrl.split('page=')
    .pop()
    .split('&')[0]
  dispatch(onGettingAuctionList(nextPageNumber))
}


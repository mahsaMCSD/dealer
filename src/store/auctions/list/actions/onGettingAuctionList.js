import {batch}                   from 'react-redux'
import {
  auctionsService,
  bidListDetailService
}                                from 'src/api/services/cars'
import {
  addAuctionList,
  changeBidsList,
  onToggleIsGetting,
  onToggleIsLoop,
  resetAuctionList,
  onToggleIsRequest
}                                from './actionCreators'
import {onGettingCountCompeting} from '../../../ui/actions/onGettingCountCompeting'
import {convertParamsFilter}     from 'src/utility/helpers'

const onGettingAuctionList = (hasNotReset, isShallowGetting) => (dispatch, getState) => {
  const {is_loop, bids, filters} = getState().auctions.list

  batch(() => {
    if (hasNotReset !== true) {
      dispatch(resetAuctionList())
    }
    if (!isShallowGetting) {
      dispatch(onToggleIsGetting(true))
    }
  })

  const overrideFilter = convertParamsFilter(filters)

  auctionsService(overrideFilter)
    .then((res) => {
      const sortKeyList = res.map(item_actions => parseInt(item_actions.id))
        .filter(item => !!item)
        .sort()
      const sortKeyBids = ((Object.keys(bids)).map(id => parseInt(id))).filter(item => !!item)
        .sort()
      dispatch(addAuctionList(res))
      if (is_loop && JSON.stringify(sortKeyBids) !== JSON.stringify(sortKeyList)) {
        setTimeout(() => {
          dispatch(onGettingAuctionList(true, true))
          dispatch(onToggleIsRequest(true))
        }, 30000)
        dispatch(onToggleIsRequest(false))
      } else {
        batch(() => {
          dispatch(onGettingCountCompeting())
          if (!is_loop) {
            dispatch(onToggleIsLoop(true))
            dispatch(onGetBids())
          }
        })
      }
    })
    .catch(() => {
      dispatch(onToggleIsGetting(false))
    })


}

export default onGettingAuctionList

export const onGetBids = () => (dispatch, getState) => {
  const {is_loop, is_request, is_getting_data, filters} = getState().auctions.list

  if (is_loop) {
    const overrideFilter = convertParamsFilter(filters)
    bidListDetailService(overrideFilter)
      .then(result => {
        const {auction_list, is_loop} = getState().auctions.list
        if (is_loop) {
          dispatch(changeBidsList(result))
          const sortKeyBids = ((Object.keys(result)).map(id => parseInt(id))).filter(item => !!item)
            .sort()
          const sortKeyAuctions = (auction_list.map(item => item.id)).sort()
          if (JSON.stringify(sortKeyBids) !== JSON.stringify(sortKeyAuctions)) {
            if (is_request) {
              dispatch(onGettingAuctionList(true, true))
            }
          }
          setTimeout(() => dispatch(onGetBids()), 5000)
        }
        if (is_getting_data) {
          dispatch(onToggleIsGetting(false))
        }
      })
      .catch((error) => {
        if (error?.status === 402) {
          dispatch(onToggleIsGetting(false))
          dispatch(changeBidsList([]))
          dispatch(onToggleIsLoop(false))
        }
      })
  }
}

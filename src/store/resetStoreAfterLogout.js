import {resetAuctionList}              from './auctions/list/actions/actionCreators'
import {onresetBid}                    from './auctions/bid/actions/actionCreators'
import {resetAuctionsDetails}          from './car/actions/actionCreators'
import {onresetAuctionsMembershipInfo} from './wallet/actions/actionCreators'
import {onresetAuctionsCategories}     from './ui/actions/actionCreators'
import {onResetPayment}                from './payment/actions/actionCreators'
import {onresetBidInventory}           from './inventory/bid/actions/actionCreators'
import {onResetThisStore}              from './inspections/list/actions/actionCreators'
import {onResetAppUser}                from './userInfo/appUser/actions'
import {batch}                         from 'react-redux'

export const onResetStoreAfterLogout = () => (dispatch) =>
  batch(() => {
    dispatch(onResetAppUser())
    dispatch(resetAuctionList())
    dispatch(resetAuctionsDetails())
    dispatch(onresetAuctionsMembershipInfo())
    dispatch(onresetAuctionsCategories())
    dispatch(onResetPayment())
    dispatch(onresetBidInventory())
    dispatch(onResetThisStore())
    dispatch(onresetBid())
  })

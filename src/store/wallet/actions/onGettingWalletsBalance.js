import {getPaymentsWalletsBalanceTransactionsServices} from 'src/api/services/payment'
import {onChangeBalance, onChangeAuctionMembership}    from './actionCreators'
import {batch}                                         from 'react-redux'

export const onGettingWalletsBalance = () => async (
  dispatch) => await getPaymentsWalletsBalanceTransactionsServices()
  .then((res) =>
    batch(() => {
      dispatch(onChangeBalance(res?.balance))
      dispatch(onChangeAuctionMembership(res?.auction_membership))
    })
  )

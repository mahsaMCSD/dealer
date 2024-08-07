import {getAuctionMembershipInfoService} from 'src/api/services/payment'
import {onChangeAuctionMembershipInfo}   from './actionCreators'

export const onGettingAuctionMembershipInfo = () => async (dispatch) => {
  await getAuctionMembershipInfoService()
    .then((res) =>
      dispatch(onChangeAuctionMembershipInfo(res))
    )
}

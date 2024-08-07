import {getDetailAuctionById, getDetailInventoryById} from 'src/api/services/cars'
import {changeCarInfo, changeLoading}                 from './actionCreators'

const onGettingCarInfo = (auctionId, is_inventory) => (dispatch) => {
  if (is_inventory) {
    getDetailInventoryById(auctionId)
      .then((res) => {
        dispatch(changeCarInfo(res))
      })
      .finally(() => {
        dispatch(changeLoading())
      })
  } else {
    getDetailAuctionById(auctionId)
      .then((res) => {
        dispatch(changeCarInfo(res))
      })
      .finally(() => {
        dispatch(changeLoading())
      })
  }

}

export default onGettingCarInfo

import {bidInventoryDetailService} from 'src/api/services/cars'
import * as actionTypes            from './actionTypes'

export const addBidInventory = async (idAuction, data) => {
  try {
    const result = data ? data : await bidInventoryDetailService(idAuction)
    if (result) {
      return ({
        type: actionTypes.ADD_BID,
        data: result,
        id: idAuction
      })
    }
  } catch (err) {
    return ({
      type: actionTypes.ADD_BID,
      data: {finished: true},
      id: idAuction
    })
  }

}

export const deleteBid = (idAuction) => ({type: actionTypes.DELETE_BID, id: idAuction})
export const onresetBidInventory = ()=> ({type: actionTypes.RESET_THIS_STORE})

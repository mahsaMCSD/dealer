import {bidDetailService, bidListDetailService} from 'src/api/services/cars'
import * as actionTypes                         from './actionTypes'

export const addBid = async (idAuction, data) => {
  try {

    const result = data ? data : await bidDetailService(idAuction)
    if (result) {
      return ({
        type: actionTypes.ADD_BID,
        data: result,
        id: idAuction
      })
    }
  }
  catch(err) {
    return ({
      type: actionTypes.ADD_BID,
      data: {ended:true},
      id: idAuction
    })
  }
}

export const addAllBid = () => dispatch => {
  return bidListDetailService()
    .then(result => dispatch({type: actionTypes.ADD_ALL_BID, data: result}))
}

export const deleteBid = (idAuction) => ({type: actionTypes.DELETE_BID, id: idAuction})
export const onresetBid =()=>({type: actionTypes.RESET_THIS_STORE})

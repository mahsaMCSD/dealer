import {getPaymentInfoService} from 'src/api/services/payment'
import {onChangeDataFinalPay}  from './actionCreators'

export const gettingFinalPay = (paymentSlug) => (dispatch) => {
  getPaymentInfoService(paymentSlug)
    .then((res) => dispatch(onChangeDataFinalPay(res)))
}

import React, {memo, useCallback, useEffect, useState} from 'react'
import styled                                          from 'styled-components'
import {Link, useParams}                               from 'react-router-dom'
import {connect}                                       from 'react-redux'

import FinalPayDealAppointment from 'src/components/dashboard/order/final-pay/FinalPayDealAppointment'
import FinalPayFooter          from 'src/components/dashboard/order/final-pay/FinalPayFooter'
import FinalPayDetails         from 'src/components/dashboard/order/final-pay/FinalPayDetails'
import FinalPayUpload          from 'src/components/dashboard/order/final-pay/FinalPayUpload'
import ui                      from 'src/assets/dictionaries/ui'
import ModalPage               from 'src/ui-kit/modal-page/ModalPage'
import Loading                 from 'src/components/loading/Loading'
import {gettingFinalPay}       from 'src/store/payment/actions/onGettingFinalPay'
import {onResetPayment}        from 'src/store/payment/actions/actionCreators'
import {postFinalizePayment}   from 'src/api/services/payment'
import Modal                   from 'src/ui-kit/modal/Modal'
import Icon                    from 'src/ui-kit/Icon'
import Formatter               from 'src/utility/Formatter'

const _Formatter = new Formatter()



const FinalPay = (props) => {
  const {paymentSlug} = useParams()
  const getPaymentInfo = useCallback(() => {props.onGettingFinalPay(paymentSlug)})
  const [showModalMessage, onChangeShowModalMessage] = useState(false)
  useEffect(() => {
    getPaymentInfo()
    return () => {
      props.onResetStorePayment()
    }
  }, [])


  const onSubmit = async (e) => {
    e.preventDefault()
    const result = await postFinalizePayment({payment_slug: paymentSlug})
    result && onChangeShowModalMessage(true)
  }


  return <ModalPage header={
    {
      title: ui.final_pay.title_header,
      is_back: true
    }
  }>
    <MainFinalPay>

      {
        !props.data_final_pay ?

        <Loading fullScreen/>
                              : <form onSubmit={onSubmit} className="final-pay-body position-relative">
          <div className="final-pay-body--details">
            <FinalPayDealAppointment/>
            <FinalPayDetails/>

            <FinalPayUpload/>
          </div>

          <FinalPayFooter/>
        </form>

      }
    </MainFinalPay>
    <Modal openModal={showModalMessage}
           style={{content: {backgroundColor: '#FFFFF'}}}
           closeModal={() => onChangeShowModalMessage(false)} title={ui.final_pay.verify_final_pay}
    >
      <MainModalMessageRequest className="d-flex flex-column justify-content-center align-items-center  px-3 mb-4">
        <div className="bg-black-50 radius-8 py-2 px-5 d-flex align-items-center flex-column mt-4 mb-3">
          <Icon className={'text-green final-page--icon-success'} type={'checked'}/>
          <h6 className="text-black-800 text-14 mt-3">{ui.final_pay.title_modal_message}</h6>
        </div>
        <h6 className="text-12 text-black-800 mb-1">{ui.final_pay.price_payment}</h6>
        <h6 className="font-weight-bold text-black text-16 my-1">
          {_Formatter.commaSeparateNumber(props.data_final_pay.paid)} <span className='ml-1'>{ui.toman}</span>
        </h6>
        <Link to={'/dashboard/myOrders/readyToPay?status=wait-settlement-and-settlement'}
              className={'border border-yellow-orange text-yellow-orange text-center py-2 text-16 w-100 mt-3 radius-4'}>{ui.final_pay.back_my_order}</Link>
      </MainModalMessageRequest>
    </Modal>
  </ModalPage>

}
const mapStateToProps = state => ({data_final_pay: state.payment.data_final_pay})

const mapDispatchToProps = dispatch => ({
  onGettingFinalPay: (data) => dispatch(gettingFinalPay(data)),
  onResetStorePayment: () => dispatch(onResetPayment())
})

export default connect(mapStateToProps, mapDispatchToProps)(FinalPay)

const MainFinalPay = styled.div`
  .final-pay-body {
    padding-bottom: 165px;
    height: 100%;
  }

  .final-pay-body--details {
    padding: 0px 16px;
  }
`

const MainModalMessageRequest = styled.div`
  .final-page--icon-success {
    font-size: 64px;
  }
`

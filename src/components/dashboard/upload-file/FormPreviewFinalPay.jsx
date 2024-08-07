import ui                              from 'src/assets/dictionaries/ui'
import InputNumber                     from 'src/ui-kit/input/InputNumber'
import React, {useState}               from 'react'
import Icon                            from 'src/ui-kit/Icon'
import {postPayment}                   from 'src/api/services/payment'
import {useParams}                     from 'react-router-dom'
import FinalPayPriceAmountAndRemaining from '../order/final-pay/FinalPayPriceAmountAndRemaining'
import {connect}                       from 'react-redux'
import {gettingFinalPay}               from 'src/store/payment/actions/onGettingFinalPay'
import {priceRangeChargeWallet}        from 'src/utility/consts'

const FormPreviewFinalPay = ({image, handlePrice, closeModal, ...props}) => {
  const {paymentSlug} = useParams()
  const [price, onChangePrice] = useState()

  const handleInput = (value) => {
    if (value) {
      onChangePrice(parseInt(value))
    }
  }


  const uploadImage = async () => {
    closeModal()
    const result = await postPayment({
      payment_slug: paymentSlug,
      amount: price,
      image
    })
    result && props.onGettingFinalPay(paymentSlug)
  }

  return <>

    <div className="d-flex flex-column align-items-center">
      <img src={image} className="upload-file--image-receipt"/>
      <div className="w-100">
        <InputNumber label={ui.price_deposit}
                     type="price"
                     isRequired
                     value={price}
                     maxNumber={props.data_final_pay.remaining}
                     handleChange={(e) => handleInput(e.value)}
        />
      </div>
    </div>
    <FinalPayPriceAmountAndRemaining/>
    <button
      onClick={() => price > priceRangeChargeWallet.minimumPriceUploadReceipt && uploadImage()}
      className={`${price > priceRangeChargeWallet.minimumPriceUploadReceipt && 'bg-orange-crayola' || 'bg-charcoal-400'}  btn text-white w-100 text-16 radius-4 py-1`}>{ui.final_pay.submit_modal}</button>
  </>
}

const mapStateToProps = state => ({data_final_pay: state.payment.data_final_pay})

const mapDispatchToProps = dispatch => ({
  onGettingFinalPay: (data) => dispatch(gettingFinalPay(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FormPreviewFinalPay)

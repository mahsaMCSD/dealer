import React, {useState} from 'react'
import styled            from 'styled-components'
import {connect}         from 'react-redux'
import {useParams}       from 'react-router-dom'

import Formatter                    from 'src/utility/Formatter'
import ui                           from 'src/assets/dictionaries/ui'
import Icon                         from 'src/ui-kit/Icon'
import {deletedTransactionsService} from 'src/api/services/payment'
import {gettingFinalPay}            from 'src/store/payment/actions/onGettingFinalPay'
import Modal                        from 'src/ui-kit/modal/Modal'
import {NotificationManager}        from 'src/ui-kit/notifications'
import Ui                           from 'src/assets/dictionaries/ui'
import UploadFile                   from '../../upload-file/UploadFile'

const _Formatter = new Formatter()

const FinalPayUpload = (props) => {
  const {paymentSlug} = useParams()
  const [showModalDeleted, onChangeShowModalDeleted] = useState()

  const transactionDelete = async () => {
    deletedTransactionsService(showModalDeleted)
      .then(() => {
        props.onGettingFinalPay(paymentSlug)
        NotificationManager.warning(Ui.wallet_charge_page.delete_image)
      })
      .finally(() => {
        onChangeShowModalDeleted(null)
      })
  }


  return <MainFinalPayUpload className="d-flex justify-content-center">
    {props.data_final_pay.transaction_payment?.map(transaction =>
      <div className="image-card position-relative mb-3" key={transaction.image}>
        <div className="image-card--background position-absolute top-0 left-0 w-100 h-100"/>
        <div className="position-absolute transaction-delete"
             onClick={() => onChangeShowModalDeleted(transaction.tracking_code)}>
          <Icon type={'trash'} className='final-pay--icon'/>
        </div>
        <img className="w-100 h-100 radius-8 " src={transaction.image}/>
        <div
          className="image-card--price text-14 pb-2 w-100 radius-8 position-absolute bottom-0 text-center text-white">
          {_Formatter.commaSeparateNumber(transaction.amount)}
          <span> {ui.toman}</span>
        </div>
      </div>)}
    {
      props.data_final_pay.remaining !== 0 && <div className="image-card mb-3">
        <UploadFile type={'final-pay'} className={'image-card--upload'}/>
      </div>
    }
    <Modal openModal={showModalDeleted}
           style={{content: {backgroundColor: '#FFFFF'}}}
           postion='bottom'
           closeModal={() => onChangeShowModalDeleted(null)}
    >
      <MainModalDelete className="d-flex flex-column justify-content-center align-items-center  px-3 mb-4">
        <div className="bg-black-50 radius-8 py-3 px-5 d-flex align-items-center flex-column mb-3">
          <div className="final-page--icon-deleted" onClick={() => onChangeShowModalDeleted(null)}>
            <Icon className={'text-green '} type={'times1'}/>
          </div>
          <h6 className="text-black-800 text-14 mt-3">{ui.final_pay.title_modal_deleted}</h6>
        </div>
        <h6 className="text-12 text-black-800">{ui.price_payment}</h6>
        <button onClick={transactionDelete}
                className={'border btn bg-yellow-orange text-white text-center py-2 text-16 w-100 mt-3 radius-4'}>
          {ui.final_pay.verify_deleted}
        </button>
      </MainModalDelete>
    </Modal>
  </MainFinalPayUpload>
}


const mapStateToProps = state => ({data_final_pay: state.payment.data_final_pay})
const mapDispatchToProps = dispatch => ({
  onGettingFinalPay: (data) => dispatch(gettingFinalPay(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FinalPayUpload)

const MainFinalPayUpload = styled.div`
  margin-top: 40px;
  flex-wrap: wrap;

  .image-card, .image-card--upload {
    min-width: auto;
    width: calc((100vw / 2) - 40px) !important;
    height: calc((100vw / 2) - 40px) !important;
    @media (min-width: 992px) {
      width: 150px !important;
      height: 150px !important;
    }
    overflow: hidden;
  }

  .image-card:nth-child(odd) {
    margin-left: 8px;
  }

  .image-card:nth-child(even) {
    margin-right: 8px;
  }

  .image-card--price {
    background: linear-gradient(180deg, rgba(82, 87, 92, 0) 15.1%, #52575C 100%);
  }

  .transaction-delete {
    top: 10px;
    left: 10px;
  }

  .image-card--background {
    background: linear-gradient(180deg, rgba(82, 87, 92, 0.33) 15.1%, rgba(82, 87, 92, 0.78) 100%);
  }
  
  .final-pay--icon:before {
    color: var(--red-800) !important;
    font-size: 25px;
  }
`
const MainModalDelete = styled.div`
  .final-page--icon-deleted {
    font-size: 64px;
  }
`
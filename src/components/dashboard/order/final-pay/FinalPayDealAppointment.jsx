import React, {useState}  from 'react'
import styled             from 'styled-components'
import ui                 from 'src/assets/dictionaries/ui'
import Formatter          from 'src/utility/Formatter'
import Icon               from 'src/ui-kit/Icon'
import {connect}          from 'react-redux'
import ModalContractImage from './ModalContractImage'

const _Formatter = new Formatter()

const FinalPayDealAppointment = (props) => {
  const [openModalContract, onChangeOpenModalContract] = useState(false)
  return <MainFinalPayDealAppointment className={'my-3'}>
    <h6 className="text-16 justify-content-center text-black d-flex mb-3">
      <span className="mx-1">{props.data_final_pay.car_properties.brand}</span>
      <span className="mx-1">{props.data_final_pay.car_properties.model}</span>
      {props.data_final_pay.car_properties.trim &&
      <span className="mx-1">({props.data_final_pay.car_properties.trim})</span>}
      <span className="mx-1">{props.data_final_pay.car_properties.year}</span>
    </h6>
    <div className="final-pay-details--card border border-gray-300 d-flex flex-column align-items-center">
      <h6 className="text-16 text-black-800">{ui.final_pay.price_trade}:</h6>
      <h6 className="final-pay-details--card--price font-weight-bold text-orange-crayola">
        {_Formatter.commaSeparateNumber(props.data_final_pay.amount)} <span className="text-18 font-weight-normal">
      {ui.toman} </span>
      </h6>
      <h6 className="font-weight-bold text-black-800">
        {ui.code_appointment}: {props.data_final_pay.appointment}
      </h6>
      <a
        href={props.data_final_pay.signed_contract}
        target="_blank"
        className="btn mt-2 border-orange-crayola text-orange-crayola radius-4 d-flex align-items-center final-pay-details--card--button"
        >
        <Icon type={'document'} className={'ms-2'}/>
        {ui.final_pay.view_contract}
      </a>
    </div>
    <ModalContractImage openModal={openModalContract} closeModal={() => onChangeOpenModalContract(false)}/>
  </MainFinalPayDealAppointment>
}

const mapStateToProps = state => ({data_final_pay: state.payment.data_final_pay})

export default connect(mapStateToProps)(FinalPayDealAppointment)

const MainFinalPayDealAppointment = styled.div`

  .final-pay-details--card {
    border-radius: 8px;
    padding: 12px 0 16px 0;
  }

  .final-pay-details--card--price {
    font-size: 21px;
    margin: 8px 0 16px 0;
  }

  .final-pay-details--card--button:hover {
    color: white;
  }
`

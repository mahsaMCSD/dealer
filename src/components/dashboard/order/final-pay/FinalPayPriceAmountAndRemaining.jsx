import React                 from 'react'
import ui                    from 'src/assets/dictionaries/ui'
import Formatter             from 'src/utility/Formatter'
import styled                from 'styled-components'
import {connect}             from 'react-redux'
import {getPercentTwoNumber} from 'src/utility/helpers'

const _Formatter = new Formatter()

const getProgressBar = (remaining, paid) => {
  if (remaining && paid) {
    if (remaining === paid) {
      return 50
    } else if (paid > remaining) {
      return 100 - getPercentTwoNumber(paid, remaining)
    } else {
      return getPercentTwoNumber(remaining, paid)
    }
  } else if (paid === 0) {
    return 0
  } else {
    return 100
  }
}

const FinalPayPriceAmountAndRemaining = (props) =>
  <MainFinalPayPriceAmountAndRemaining
    className="w-100 d-flex flex-column">
    <div className="final-pay-footer--progress-bar d-flex bg-yellow ">
    <span className="bg-green h-100"
          style={{width: `${getProgressBar(props.data_final_pay.remaining, props.data_final_pay.paid)}%`}}/>
    </div>
    <div className="d-flex justify-content-between">
      <h5
        className="text-12 text-black-800 final-pay-footer--title-price final-pay-footer--title-price__success">{ui.final_pay.payments}</h5>
      <h6 className="text-10">
        <span
          className="font-weight-bold text-14 ms-1">{_Formatter.commaSeparateNumber(props.data_final_pay?.paid)}</span> {ui.toman}
      </h6>
    </div>
    <div className="d-flex justify-content-between">
      <h5
        className="text-12 text-black-800 final-pay-footer--title-price final-pay-footer--title-price__yellow">{ui.final_pay.remaining}</h5>
      <h6 className="text-10"><span
        className="font-weight-bold text-14 ms-1">{_Formatter.commaSeparateNumber(props.data_final_pay.remaining)}</span> {ui.toman}
      </h6>
    </div>
  </MainFinalPayPriceAmountAndRemaining>

const mapStateToProps = state => ({data_final_pay: state.payment.data_final_pay})

export default connect(mapStateToProps)(FinalPayPriceAmountAndRemaining)

const MainFinalPayPriceAmountAndRemaining = styled.div`
  margin-bottom: 16px;

  .final-pay-footer--title-price {
    position: relative;
    padding-right: 16px;
  }

  .final-pay-footer--progress-bar {
    border-radius: 2px;
    overflow: hidden;
    height: 8px;
    margin-bottom: 14px;
  }

  .final-pay-footer--title-price:before {
    position: absolute;
    right: 0;
    top: 2px;
    border-radius: 2px;
    height: 8px;
    width: 8px;
    background: red;
    content: '';
  }

  .final-pay-footer--title-price__success:before {
    background-color: var(--bs-green);
  }

  .final-pay-footer--title-price__yellow:before {
    background-color: var(--bs-yellow);
  }
`

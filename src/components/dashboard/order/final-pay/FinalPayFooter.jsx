import React                           from 'react'
import styled                          from 'styled-components'
import ui                              from 'src/assets/dictionaries/ui'
import FinalPayPriceAmountAndRemaining from './FinalPayPriceAmountAndRemaining'
import {connect}                       from 'react-redux'

const FinalPayFooter = (props) => <MainFinalPayFooter
  className="position-fixed border border-black-200 bottom-0 left-0 right-0 final-pay--footer bg-white w-desktop">
  <FinalPayPriceAmountAndRemaining/>
  <button
    type='submit'
    className={`${props.data_final_pay.remaining === 0
                  ? 'bg-orange-crayola'
                  : ' bg-charcoal-400'} text-white btn w-100  radius-4 text-center`}>{ui.final_pay.submit_payment}</button>
</MainFinalPayFooter>

const mapStateToProps = state => ({data_final_pay: state.payment.data_final_pay})

export default connect(mapStateToProps)(FinalPayFooter)

const MainFinalPayFooter = styled.div`
  box-shadow: 0px -1px 16px rgba(0, 0, 0, 0.06);
  padding: 16px 16px 24px 16px;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
`

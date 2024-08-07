import React                 from 'react'
import styled                from 'styled-components'
import ui                    from 'src/assets/dictionaries/ui'
import {getPercentTwoNumber} from 'src/utility/helpers'
import BasicButton           from 'src/ui-kit/button/BasicButton'
import Formatter             from 'src/utility/Formatter'

const _Formatter = new Formatter()

const PrePaymentFooter = ({prepayment, onlinePrice, onSubmit}) => <MainPrePayFooter
  className="px-3 bg-white py-4 bottom-0 right-0 left-0 position-fixed w-desktop">
  <div className="footer-order--progress d-flex justify-content-end bg-gray-300 mb-3">
    <div className={`bg-yellow footer-order--progress--line d-flex position-relative`} style={{
      width: `${prepayment.remainingAmount
                ? getPercentTwoNumber(
          prepayment?.data?.amount - prepayment?.data?.paid_amount,
          prepayment.useWallet ?
          onlinePrice + prepayment.walletPrice : onlinePrice
        )
                : 100}%`
    }}>
    </div>

  </div>
  <div className="d-flex justify-content-between mb-1">
    <div className="d-flex align-items-center text-black-800">
      <div className="square bg-yellow"></div>
      <div className="text-16 font-weight-400 me-2"> {prepayment?.data?.paid_amount > 0
                                                      ? ui.prepayment_page.paid_amount_this_step
                                                      : ui.prepayment_page.paid_amount}</div>

    </div>
    <div className="d-flex align-items-center text-black-800">
      <div
        className="text-18 font-weight-700">
        {_Formatter.commaSeparateNumber(prepayment.paidAmount)}

        <span className="text-12 font-weight-400 me-1">{ui.toman}</span>
      </div>
    </div>
  </div>
  <div className="d-flex justify-content-between mb-3">
    <div className="d-flex align-items-center text-black-800">
      <div className="square bg-black-100"></div>
      <div className="text-16 font-weight-400 me-2">{ui.prepayment_page.remaining_prepayment}</div>

    </div>
    <div className="d-flex align-items-center text-black-800">
      <div
        className="text-18 font-weight-700">{_Formatter.commaSeparateNumber(prepayment.remainingAmount)}  </div>
      <span className="text-12 font-weight-400 me-1">{ui.toman}</span>
    </div>

  </div>
  <BasicButton isLoading={prepayment.submitLoading} onClick={() => onSubmit()}
               className="radius-4 bg-yellow-orange w-100 text-white">
                <span
                  className="text-18 font-weight-400 me-lg-2">{(prepayment.useWallet && prepayment.data?.amount && prepayment.data.wallet_balance && prepayment.data.wallet_balance >= prepayment.data.amount - prepayment.data.paid_amount) || onlinePrice === 0
                                                               ? ui.get
                                                               : ui.prepayment_page.online_charge}
                </span>
    <><span
      className="text-18 font-weight-700 me-1">{_Formatter.commaSeparateNumber((prepayment.useWallet && prepayment.data?.amount && prepayment.data.wallet_balance && prepayment.data.wallet_balance >= prepayment.data.amount - prepayment.data.paid_amount) || onlinePrice === 0
                                                                               ? prepayment.walletPrice
                                                                               : onlinePrice)}
                </span> <span
      className="text-12 font-weight-400">{ui.toman}</span></>
  </BasicButton>
</MainPrePayFooter>

export default React.memo(PrePaymentFooter)

const MainPrePayFooter = styled.div`
  .footer-order--progress {
    border-radius: 2px;
    height: 5px;
    overflow: hidden;
  }

  .footer-order--progress--line {
    height: 100%;
  }

  .square {
    border-radius: 2px;
    height: 8px;
    width: 8px;
  }
`

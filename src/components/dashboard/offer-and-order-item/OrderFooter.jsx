import React, {useCallback, useState} from 'react'
import {useNavigate}                  from 'react-router-dom'
import styled                         from 'styled-components'
import CountDownLine                  from 'src/ui-kit/count-down-time/CountDownLine'
import useDownTime                    from 'src/utility/useDownTime'
import PreviewTransfer                from 'src/components/dashboard/order/PreviewTransfer'
import {checkType}                    from 'src/utility/helpers'

const OrderFooter = ({valid_until, status, payment_slug}) => {
  const history = useNavigate()
  const timeCountDown = useDownTime(valid_until, true)
  const [isOpenModalPreContract, onToggleOpenModalPreContract] = useState(false)
  const [dataPreContract, onChangeDataPreContract] = useState()
  const handleClick = () => {
    if (payment_slug) {
      switch (status.status) {
        case -1:
          history(`/dashboard/myOrders/readyToPay/PrePayment/${payment_slug}`)
          break
        case 0:
          history(`/dashboard/myOrders/readyToPay/PrePayment/${payment_slug}`)
          break
        case 1:
          history(`/dashboard/myOrders/finalPay/${payment_slug}`)
          break
        case 2:
        default:
          break
      }
    }
  }

  const onCloseModalPreContract = useCallback(() => {
    onToggleOpenModalPreContract(false)
    onChangeDataPreContract(undefined)
  }, [isOpenModalPreContract])

  return <OrderFooterMain className="mt-2 pt-1 d-flex flex-column">
    <div className="border-bottom border-charcoal-100"/>
    <CountDownLine valid_until={valid_until} timeCountDown={timeCountDown} type={status.status}/>
    <div className="d-flex align-items-center">
      <button
        className={`btn d-block w-100 text-white text-16 py-2 mt-1 radius-8 footer-order--btn ${checkType(status.status)}`}
        onClick={handleClick}
      >
        {status.title}

      </button>
    </div>
    <PreviewTransfer selectedPreview={isOpenModalPreContract}
                     onCloseModal={onCloseModalPreContract}
                     typeModal={'settlementPreviewPreContract'}
                     data={dataPreContract}/>
  </OrderFooterMain>
}
export default OrderFooter

const OrderFooterMain = styled.div`

  .text-success::before {
    color: var(--success);
  }

  .submit-icon {
    margin-left: 12px;
    margin-right: 20px;
  }
`

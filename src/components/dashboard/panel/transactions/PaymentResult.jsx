import React        from 'react'
import styled       from 'styled-components'
import Icon         from 'src/ui-kit/Icon'
import ui           from 'src/assets/dictionaries/ui'
import PropTypes    from 'prop-types'

const statuses = {
  success: {
    title: 'پیش پرداخت با موفقیت انجام شد',
    icon: 'checkCircle',
    iconClass: 'text-success'
  }, reject: {
    title: 'پرداخت شما نا موفق بود',
    icon: 'timesCircle',
    iconClass: 'text-danger'
  }
}

const PaymentResult = ({type}) => <MainPaymentResult>
  <div className="bg-gray-100 result--section--message flex flex-column align-items-center">
    <Icon className={`result--section--message--icon ${statuses[type].iconClass}`} type={statuses[type].icon}/>
    <h6 className="text-14 text-center">{statuses[type].title}</h6>
  </div>
  <h6 className="text-14 text-center result--price mb-4">مبلغ پیش پرداخت</h6>
  <h6 className="text-14 text-center font-weight-bold">50,000,000 {ui.toman}</h6>
  <button className="btn btn-outline-orange result--link">بازگشت به جزییات خودرو</button>
</MainPaymentResult>
PaymentResult.defaultProps = {
  type: 'reject'
}
PaymentResult.prototype = {
  type: PropTypes.string
}
export default PaymentResult

const MainPaymentResult = styled.div`
  .result--section--message {
    display: flex;
    justify-content: center;
    padding: 16px 0;
    margin-bottom: 16px;
  }

  .result--section--message--icon {
    margin-bottom: 16px;

    &::before {
      font-size: 64px;
    }
  }

  .result--price {
    margin-bottom: 16px;
  }

  .result--link {
    width: 100%;
    margin-top: 11px;

    &.result--link:hover {
      color: white;
    }
  }
`
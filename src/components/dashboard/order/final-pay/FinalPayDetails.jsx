import React     from 'react'
import styled    from 'styled-components'
import ui        from 'src/assets/dictionaries/ui'
import Formatter from 'src/utility/Formatter'
import {connect} from 'react-redux'

const _Formatter = new Formatter()

const finalPayDetailList = (data) => [
  {
    id: 1,
    title: ui.final_pay.price_payment,
    render: () => <> <span
      className="final-pay--price font-weight-bold text-green">{_Formatter.commaSeparateNumber(data.sell_price)}</span>
      <span className="text-16 me-1 text-green">{ui.toman}</span> </>
  }, {
    id: 2,
    title: ui.final_pay.name_account,
    value: data.issuer_name
  }, {
    id: 3,
    title: ui.final_pay.national_code,
    value: data.national_code

  }, data.payment_method !== 1 && {
    id: 4,
    title: ui.final_pay.number_sheba,
    value: data.iban
  }, {
    id: 5,
    title: ui.final_pay.bank_name,
    value: data.bank
  }
]

const FinalPayDetails = (props) => {
  return <MainFinalPayDetails
    className="bg-black-50 py-3 d-flex flex-column align-items-center text-black-800 border-black-100">
    {finalPayDetailList(props.data_final_pay)
      .map(detail => detail &&
        <h6 className="final-pay-detail-row" key={detail.id}><span className="text-14">{detail.title}</span>: {
          detail.render ? detail.render() :
          <span className="text-16 font-weight-bold">{detail.value}</span>
        }
        </h6>
      )}
  </MainFinalPayDetails>
}


const mapStateToProps = state => ({data_final_pay: state.payment.data_final_pay})

export default connect(mapStateToProps)(FinalPayDetails)

const MainFinalPayDetails = styled.div`
  border-radius: 8px;

  .final-pay--price {
    font-size: 21px;
  }

  .final-pay-detail-row {
    margin-bottom: 12px;
  }

  final-pay-detail-row:last-child {
    margin-bottom: 0;
  }
`

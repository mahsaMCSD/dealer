import React            from 'react'
import styled           from 'styled-components'
import {Link}           from 'react-router-dom'
import ui               from 'src/assets/dictionaries/ui'
import NumberWithCommas from 'src/utility/NumberWithCommas'
import OrderFooter      from '../offer-and-order-item/OrderFooter'

const ReadyToPayCard = ({data, getData}) => {

  return <StyledReadyToPayCard
    className={'border radius-8 my-2 border-charcoal-200 '}>
    <Link to={data?.inspection && data?.id ? `/dashboard/myOrders/details/${data?.inspection}/${data?.id}` : ''}
          className="d-flex justify-content-between">
      {data.main_image && data.main_image.file_high &&
        <img className="rounded ready-to-pay-card--image" alt="cover" src={data.main_image.file_high}/>}


      <div className="d-flex flex-column align-items-center w-100 justify-content-center">
        <h6 className="text-14 text-charcoal-600  justify-content-center d-flex mb-3 font-weight-700">
          <span className="mx-1 text-black">{data.car_properties.brand}</span>
          {' | '}
          <span className="mx-1 text-black">{data.car_properties.model}</span>
          {' | '}
          <span className="mx-1 text-black">{data.car_properties.year}</span>
        </h6>
        {
          data?.status?.status === 1 ? <><h6
                                       className="mt-1 pt-2 text-black-800 mb-0 text-12">{ui.final_pay.price_trade}:</h6>
                                       <h6
                                         className="mt-1 pt-2 text-black font-weight-700 mb-0 text-12">{NumberWithCommas(data.buy_price || data.bid?.buy_price) + ' ' + ui.toman}</h6></>
                                     : ''
        }
      </div>

    </Link>

    {data?.status?.status !== 1 && <div>
      <div className="d-flex justify-content-between">
        <h6
          className="mt-1 pt-2 text-black-800 mb-0 text-12">{ui.prepayment_page.dealed_car_price}: </h6>
        <h6
          className="mt-1 pt-2 text-black font-weight-700 mb-0 text-12">{NumberWithCommas(data?.bid?.buy_price)} {ui.toman}</h6>
      </div>
      <div className="d-flex justify-content-between">
        <h6
          className="mt-1 pt-2 text-black-800 mb-0 text-12">{ui.prepayment}: </h6>
        <h6
          className="mt-1 pt-2 text-black font-weight-700 mb-0 text-12">{NumberWithCommas(data?.amount)} {ui.toman}</h6>
      </div>
      {data?.status?.status === -1 && <div className="d-flex justify-content-between text-red">
        <h6 className="mt-1 pt-2 mb-0 text-12">{ui.prepayment_page.remaining_prepayment}:</h6>
        <h6
          className="mt-1 pt-2 font-weight-700 mb-0 text-12">{NumberWithCommas(data?.remaining)} {ui.toman}</h6>
      </div>}
    </div>
    }
    {data.status ? <OrderFooter getData={getData}  {...data}/> : <Link
      className={'text-16 text-yellow-orange d-block text-center bg-yellow-orange-50 border-yellow-orange radius-8 border footer-link'}
      to={`/dashboard/myOrders/transfer-contract?slug=${data.slug}`}>{ui.order_page.transfer.title}</Link>}
  </StyledReadyToPayCard>
}

export default ReadyToPayCard

const StyledReadyToPayCard = styled.div`
  padding: 12px;

  .ready-to-pay-card--image {
    aspect-ratio: 4 / 2.5;
    max-height: 85px;
  }

  .footer-link {
    padding: 12px;
    margin-top: 12px;
  }
`

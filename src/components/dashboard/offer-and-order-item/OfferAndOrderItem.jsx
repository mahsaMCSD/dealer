import React               from 'react'
import {useSelector}       from 'react-redux'
import {Link, useLocation} from 'react-router-dom'

import ui               from 'src/assets/dictionaries/ui'
import NumberWithCommas from 'src/utility/NumberWithCommas'
import 'react-image-gallery/styles/css/image-gallery.css'

import styled from 'styled-components'

import OrderFooter from './OrderFooter'

const OfferAndOrderItem = ({data}) => {
  const {user_latest, remaining_second, highest, buy_price} = data.bid
  const location = useLocation()

  const {is_having_membership} = useSelector(state => state.userInfo.appUser)

  const id_ready_to_pay = location.pathname.includes('readyToPay')

  const myOffers = location.pathname.includes('myOffers')
  const is_inventory = location.pathname.includes('inventory')
  return (
    <OfferAndOrderItemMain>
      <Link to={`/dashboard/${myOffers ? 'myOffers' : 'myOrders'}${
        is_inventory ? '/inventory' : ''}/details/${data.inspection}/${data.id}`}>
        <div className="d-flex w-100 px-3 py-1">
          <div className="col-3 p-0 position-relative">
            {data.main_image && data.main_image.file_high &&
            <img className="rounded w-100 h-100" alt="cover" src={data.main_image.file_high}/>}
            {remaining_second === 0 && <div
              className="rounded row--image--text position-absolute top-0 right-0 left-0 bottom-0 d-flex  align-items-center justify-content-center text-center "
            >
              <small className="font-weight-bold text-white">{ui.auction_end}</small>
            </div>}
          </div>
          <div className="col-9 pe-3 ps-1 pt-2">
            <h6 className="text-16 justify-content-start d-flex mb-3 font-weight-bold">
              <span className="mx-1">{data.car_properties.brand}</span>
              {' | '}
              <span className="mx-1">{data.car_properties.model}</span>
              {' | '}
              <span className="mx-1">{data.car_properties.year}</span>
            </h6>
            <div className="d-flex justify-content-between">
              <h6 className="text-right mb-0 text-14 text-purple">{ui.odometer}:</h6>
              <h6 dir="ltr" className="text-14 text-purple">{NumberWithCommas(data.car_specifications.klm)} km</h6>
            </div>
            {id_ready_to_pay && <div className="d-flex justify-content-between">
              <h6 className="text-right mb-0 text-14 text-purple">{ui.code_appointment}:</h6>
              <h6 dir="ltr" className="text-14 text-purple">{data.appointment}</h6>
            </div>}
            <div className="d-flex flex-wrap justify-content-between">
              <h6 className="text-right mb-0 text-14 text-purple"> {ui[id_ready_to_pay
                                                                       ? 'agreed_price'
                                                                       : 'my_offer']}:</h6>
              <h6 className="text-14 text-purple">{is_having_membership
                                                   ? NumberWithCommas(id_ready_to_pay
                                                                      ? buy_price
                                                                      : user_latest) + ' ' + ui.toman
                                                   : <span className="text-10 mt-2 text-ellipsis">{ui.ability_to_view_after_deposit_pre_payment}</span>}</h6>
            </div>
          </div>
        </div>
      </Link>

      {myOffers
       ? <Link
         to={`/dashboard/${myOffers ? 'myOffers' : 'myOrders'}${
           is_inventory ? '/inventory' : ''}/details/${data.inspection}/${data.id}`}
         className="d-flex box-shadow mb-2 bg-gray ps-3 p-2 d-flex justify-content-between">
         <h6 className="text-purple mb-0 text-12">{is_inventory ? ui.inventory_status : ui.auction_status}:</h6>
         {user_latest < highest
          ? <h6 className="font-weight-bold mb-0 text-danger text-14"> {ui.loser} </h6>
          : <h6 className="font-weight-bold mb-0 text-success text-14">{data.finished ? ui.winner : ui.highest_bid}</h6>
         }
       </Link>
       : <div className="box-shadow w-100 mb-2 row--box-shadow"/>
      }


    </OfferAndOrderItemMain>
  )
}


export default OfferAndOrderItem

const OfferAndOrderItemMain = styled.div`
  .row--image--text {
    background: rgba(0, 0, 0, .5)
  }

  .row--box-shadow {
    height: 7px
  }
`

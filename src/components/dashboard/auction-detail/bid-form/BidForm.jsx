import React, {useState}                                                              from 'react'
import CountDownTimeComponent
                                                                                      from 'src/components/count-down-time/CountDown'
import Formatter                                                                      from 'src/utility/Formatter.js'
import Icon                                                                           from 'src/ui-kit/Icon'
import Ui                                                                             from 'src/assets/dictionaries/ui'
import AuctionProgress
                                                                                      from '../auction-progress/AuctionProgress'
import {useDispatch, useSelector}                                                     from 'react-redux'
import {bidDetailService, bidService, bidInventoryService, bidInventoryDetailService} from 'src/api/services/cars'
import {addBid}                                                                       from 'src/store/auctions/bid/actions/actionCreators'
import {addBidInventory}                                                              from 'src/store/inventory/bid/actions/actionCreators'
import PropTypes                                                                      from 'prop-types'
import {sendAmplitudeData}                                                            from 'src/utility/amplitude'
import styled                                                                         from 'styled-components'
import BasicButton
                                                                                      from 'src/ui-kit/button/BasicButton'
import NotificationManager
                                                                                      from 'src/ui-kit/notifications/NotificationManager'


const BidForm = ({bidInfo, inspectionId, auctionId, close, title, is_inventory, accepted_price}) => {
  const _Formatter = new Formatter()
  const [bidCount, setBidCount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const {highest, step, user_latest} = bidInfo
  const [bidOffer, setBidOffer] = useState(step)

  const dispatch = useDispatch()

  const incBid = (val) => {
    setBidOffer(bidOffer + val)
    setBidCount(bidCount + 1)
  }

  const decBid = (val) => {
    let price = highest + bidOffer
    if (price - val > highest) {
      setBidOffer(bidOffer - val)
      setBidCount(bidCount - 1)
    }
  }
  const setBid = (val) => {
    setBidOffer(val)
  }
  const responseSuccessful = (res) => {
    NotificationManager.success(Ui.message_success_bid)
    if (is_inventory) {
      setTimeout(async () => dispatch(await addBidInventory(auctionId, res)), 500)
    } else {
      setTimeout(async () => dispatch(await addBid(auctionId, res)), 500)
    }
    close()
    sendAmplitudeData('SuccessfulBid', {
      car: title,
      newBid: bidOffer + bidInfo.highest,
      from: bidInfo.highest
    })
  }
  const responseError = (er) => {
    if (er?.data?.non_field_errors || er?.non_field_errors) {
      NotificationManager.error(Ui.message_unsuccess_bid_highest_price)
      sendAmplitudeData('UnsucessBid_UserBid_is_Highest', {
        car: title,
        newBid: bidOffer + bidInfo.highest,
        from: bidInfo.highest
      })
    } else if (er?.data?.price) {
      NotificationManager.error(Ui.message_unsuccess_bid_lowest_price)

      sendAmplitudeData('UnsucessBid_lessPrice', {
        car: title,
        newBid: bidOffer + bidInfo.highest,
        from: bidInfo.highest
      })
    } else {
      NotificationManager.error(Ui.message_unsuccess_bid)

      sendAmplitudeData('UnsucessBid_unkhown', {
        car: title,
        newBid: bidOffer + bidInfo.highest,
        from: bidInfo.highest
      })
    }
    close()
  }

  function postBid (agreeWithTheCustomer) {

    let last_Highest = bidInfo.highest
    if (is_inventory) {
      bidInventoryService(
        auctionId,
        agreeWithTheCustomer
        ? {last_price: last_Highest, accepted_price, bid_count: 1, step: step}
        : {last_price: last_Highest, step: step, bid_count: bidCount}
      )
        .then((res) => responseSuccessful(res))
        .catch((er) => responseError(er))
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      bidService(auctionId, {price: last_Highest, step: bidOffer})
        .then((res) => responseSuccessful(res))
        .catch((er) => responseError(er))
        .finally(() => {
          setIsLoading(false)
        })
    }

  }

  const responseDetailBid = (res, agreeWithTheCustomer) => {
    if (res.remaining_second === 0) {
      NotificationManager.error(Ui.message_ended_bid)
      close()

      sendAmplitudeData('UnsucessBid_Time', {
        car: title,
        newBid: bidOffer + bidInfo.highest,
        from: bidInfo.highest
      })
      setIsLoading(false)

    } else {
      if (bidInfo.highest !== res.highest) {
        NotificationManager.error(Ui.a_higher_price_was_recorded_try)
        setIsLoading(false)

      } else {
        postBid(agreeWithTheCustomer)
      }
    }
  }
  const submit = (agreeWithTheCustomer) => {
    if (!isLoading) {
      setIsLoading(true)
      if (inspectionId) {
        if (is_inventory) {
          bidInventoryDetailService(auctionId)
            .then((res) => responseDetailBid(res, agreeWithTheCustomer))
        } else {
          bidDetailService(auctionId)
            .then((res) => responseDetailBid(res))
        }
      }
    }
  }
  const {counter} = bidInfo && bidInfo.times_left ? bidInfo.times_left : {}

  React.useEffect(() => {
    if (NotificationManager.listNotify && NotificationManager.listNotify.length >= 1) {
      NotificationManager.listNotify.forEach(n => NotificationManager.remove({id: n.id}))
    }

  }, [])
  return (
    <Main className="position-relative">
      <div className={`bid-form--progress ${is_inventory && !counter && 'bid-form--progress__inventory ' || ''}`}>
        {bidInfo && <CountDownTimeComponent className="d-inline font-weight-bold text-orange small"
                                            is_inventory={is_inventory}
                                            bidinfo={bidInfo}/>}
        {(!is_inventory || counter) && <div className="position-absolute w-100 left-0 top-0">
          <AuctionProgress is_inventory={is_inventory} start={is_inventory ? 3600 : bidInfo.start}
                           end={is_inventory ? counter : bidInfo.end}/>
        </div>}
      </div>

      <div className="me-3 ms-3 pb-2">
        <div className="d-flex flex-column text-black-800">
          {is_inventory && <div className="d-flex py-1 px-2">
            <div className="col-8">
              <h6 className="text-14 mb-0">{Ui.proposed_price}</h6>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <h6 className="text-left text-14 mb-0 ms-1 ">
                {_Formatter.commaSeparateNumber(accepted_price)}
              </h6>
              <h6 className="text-10 mb-0"> {Ui.toman}</h6>
            </div>
          </div>}

          <div className={`d-flex py-1 mb-2 highest-price ${!user_latest
                                                            ? 'bg-black-50 text-black-800'
                                                            : (highest > user_latest ? 'bg-red-light text-danger' :
                                                               'bg-green-light text-success')}`}>
            <div className="col-8">
              <h6 className=" mb-0 line-height-24 text-16 font-weight-bold">{Ui.price_now}</h6>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <h6 className="text-left ms-1 mb-0 line-height-24 text-16 font-weight-bold">
                {_Formatter.commaSeparateNumber(highest)}
              </h6>
              <h6 className="mb-0 line-height-24 text-10 font-weight-bold"> {Ui.toman}</h6>
            </div>
          </div>

          <div className="d-flex px-2 text-black-800">
            <div className="col-8">
              <h6 className="text-14 mb-0">{Ui.at_least_price_increase}</h6>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <h6 className="text-left text-14  mb-0">
                {_Formatter.commaSeparateNumber(step)} <span className="ms-1 text-10">{Ui.toman}</span>
              </h6>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn d-flex p-0" onClick={() => incBid(step)} disabled={is_inventory && bidCount === 10}>
            <Icon type="addSquare" className="text-black-800"/>
          </button>

          <div
            className="border d-flex btn-change-price input-change-price text-16 mx-2 font-weight-bold text-black
            align-items-center justify-content-center text-black border-charcoal-200">
            {_Formatter.commaSeparateNumber(bidOffer + highest)} <span className="pe-1 text-10">{Ui.toman}</span>
          </div>

          <button onClick={() => decBid(step)} className="btn d-flex p-0" disabled={bidCount === 1}>
            <Icon type="minusSquare" className="text-black-800"/>
          </button>

        </div>

        <div className="d-flex mt-3">
          {[3, 2, 1].map(index =>
            <div key={index} onClick={() => {
              setBidCount(index)
              setBid(step * index)
            }} className="col-4  px-1">
              <button
                className="btn text-14 text-black w-100 disable-scroll-body bg-charcoal-50 d-flex flex-column align-items-center justify-content-center border-charcoal-200 radius-4 text-center h6 lh-base py-1">
                {_Formatter.commaSeparateNumber(highest + step * index)}
                <span className="text-10 py-1 pe-1">
                  {Ui.toman}
                </span>
              </button>
            </div>
          )}
        </div>
        <h6 className="text-center lh-base text-black-600 text-12 my-2">
          {Ui.alert_before_submit}
        </h6>
        <div className="d-flex my-2">
          <BasicButton
            className={`btn border-yellow-orange py-2 text-16 font-weight-bold w-100 text-white ${is_inventory && (bidOffer + highest < accepted_price) && 'ms-3'}  radius-4 bg-yellow-orange`}
            isLoading={isLoading}
            onClick={() => submit(false)}>
            <span className="app-text">{Ui.submit_a_proposal}</span>
          </BasicButton>

          {is_inventory && (bidOffer + highest < accepted_price) &&
          <BasicButton className={`btn btn-block border-yellow-orange py-2 radius-4 w-100 text-16`}
                       isLoading={isLoading}
                       onClick={() => submit(true)}>
            <span className="text-16 font-weight-bold text-yellow-orange ">{Ui.agree_with_the_customer}</span>
          </BasicButton>
          }

        </div>
      </div>
    </Main>
  )
}
BidForm.prototype = {
  inspectionId: PropTypes.string.isRequired,
  auctionId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  bidInfo: PropTypes.shape({
    end: PropTypes.number,
    highest: PropTypes.number,
    remaining_second: PropTypes.number,
    start: PropTypes.number,
    step: PropTypes.number,
    user_latest: PropTypes.number
  })
}

export default BidForm

const Main = styled.div`
  margin-top: 60px;

  .highest-price {
    padding: 2px 8px;
    border-radius: 4px;
  }

  .line-height-24 {
    line-height: 24px !important;
  }

  .bid-form--progress {
    display: flex;
    width: 80px;
    margin-right: auto;
    position: relative;
    margin-top: -37px;
    height: 29px;

    .custom-progress-bar {
      margin-right: 38px;
    }
  }

  .bid-form--progress__inventory {
    width: fit-content;
    margin-left: 20px;
  }


  .input-change-price {
    height: 40px;
    width: calc(100% - 116px);
    border-radius: 2px;
  }
`

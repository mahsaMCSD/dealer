import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react'
import {connect}                                                  from 'react-redux'
import {useParams, Link, useLocation, useNavigate}                from 'react-router-dom'
import {CopyToClipboard}                                          from 'react-copy-to-clipboard'
import styled                                                     from 'styled-components'

import AuctionProgress        from 'src/components/dashboard/auction-detail/auction-progress/AuctionProgress.jsx'
import BidForm                from 'src/components/dashboard/auction-detail/bid-form/BidForm.jsx'
import InspectionScreen       from 'src/components/dashboard/auction-detail/inspection-screen/InspectionScreen'
import Ui                     from 'src/assets/dictionaries/ui'
import CountDownTimeComponent from 'src/components/count-down-time/CountDown.jsx'
import TabBar                 from 'src/components/dashboard/tab-bar/TabBar'
import Icon                   from 'src/ui-kit/Icon'
import Loading                from 'src/components/loading/Loading'
import OverviewTab            from 'src/components/dashboard/auction-detail/overview-tab/OverviewTab'
import Modal                  from 'src/ui-kit/modal/Modal'
import {addBid, deleteBid}    from 'src/store/auctions/bid/actions/actionCreators'
import {sendAmplitudeData}    from 'src/utility/amplitude'
import {addBidInventory}      from 'src/store/inventory/bid/actions/actionCreators'
import {
  changePreviewedAlert,
  resetAuctionsDetails
}                             from 'src/store/car/actions/actionCreators'
import onGettingCarInfo       from 'src/store/car/actions/onGettingCarInfo'
import onGettingCarDetails    from 'src/store/car/actions/onGettingCarDetails'
import ModalPage              from 'src/ui-kit/modal-page/ModalPage'
import {NotificationManager}  from 'src/ui-kit/notifications'
import alarmImg               from 'src/assets/images/inspect.svg'
import AuctionInspectionSkeleton
                              from 'src/components/dashboard/auction-detail/auction-inspection-skeleton/AuctionInspectionSkeleton'
import BottomSheetDeposit     from './BottomSheetDeposit'

const styles = {
  topBar: {
    zIndex: 2,
    top: '50px'
  },
  main: {},
  footer: {
    bottom: 0,
    zIndex: 9,
    borderRadius: '24px 24px 0 0'
  },
  iconOutOfTIME: {
    fontSize: 64
  }
}


const AuctionDetail = ({
                         detailsStore,
                         userInfo,
                         bidsInventory,
                         bidsAuction,
                         fetchBid,
                         fetchBidInventory,
                         resetDetails,
                         deleteBidStore,
                         onChangePreviewedAlert,
                         gettingCarInfo,
                         car_info,
                         loading,
                         gettingCarDetails,
                         ...props
                       }) => {
  const location = useLocation()
  const is_inventory = location.pathname.includes('inventory')

  const myOffers = location.pathname.includes('myOffers')
  const myOrders = location.pathname.includes('myOrders')


  const [backLink,onChangeBackLink] = useState('')

  const containerRef = useRef(null)
  const [openModal, setOpenModal] = useState({})
  const [isOpenBottomSheetDeposit, onToggleIsOpenBottomSheetDeposit] = useState(false)
  const [tab, setTab] = useState('0')
  const {inspectionId, auctionId} = useParams()
  const [bid, onChangeBid] = useState(is_inventory ? bidsInventory[auctionId] : bidsAuction[auctionId])

  const [bidInfo, setBidInfo] = useState({})
  const {remaining_second} = bidInfo

  const title = car_info && <><span
    className="mx-1">{car_info.car_properties.brand}</span> | <span className="mx-1 d-flex"
                                                                    style={{flexWrap: 'nowrap'}}>{car_info.car_properties.model}</span> | <span
    className="mx-1">{car_info.car_properties.year}</span></>

  const tabList = {
    0: {
      title: 'بررسی کلی'
    }, 1: {
      title: 'گزارش کارشناسی'
    }
  }

  function changeTab (id) {
    // containerRef.current.scrollIntoView()
    setTab(id)
    if (id === '1' && !userInfo.appUser.is_having_membership) {
      onToggleIsOpenBottomSheetDeposit(true)
    }
  }

  function getBid () {
    clearIntervals()
    setInterval(() => is_inventory ? fetchBidInventory(auctionId) : fetchBid(auctionId), 5000)
  }

  useEffect(() => {
    if (bidInfo.interval) {
      clearIntervals()
      setInterval(() => fetchBidInventory(auctionId), 5000)
    }
  }, [bidInfo.interval])


  useEffect(() => {
    resetDetails()
    sendAmplitudeData('Detail_Page_View')
    checkIsAlarm()
    gettingCarInfo(auctionId, is_inventory)
    if (is_inventory) {
      fetchBidInventory(auctionId)
    } else {
      fetchBid(auctionId)
    }
    getBid()
    gettingCarDetails(inspectionId)
    return () => {
      clearIntervals()
      resetDetails()
      onChangeBackLink('')
    }
  }, [])

  useEffect(() => {
    onChangeBid(is_inventory ? bidsInventory[auctionId] : bidsAuction[auctionId])
    if (((is_inventory && bidsInventory[auctionId]?.ended) || bidsAuction[auctionId]?.ended)) clearIntervals()
  }, [bidsAuction, bidsAuction])

  function clearIntervals () {
    var killId = setTimeout(() => {
      for (var i = killId; i > 0; i--) clearInterval(i)
    }, 1)
  }

  useEffect(() => {
      if (bid !== undefined || bid?.finished) {
        setBidInfo(bid)
        if (bid.remaining_second === 0 || (bid && bid.finished)) {
          clearIntervals()
          setTimeout(() => deleteBidStore(auctionId), 500)
        }
      }
    }
    , [bid])
  const get_auction_alarm = localStorage.getItem('auction_alarm')
  const auction_alarm = get_auction_alarm ? JSON.parse(get_auction_alarm) : []


  function checkIsAlarm () {
    if (auction_alarm.length > 0 && auction_alarm.includes(auctionId)) {
      onChangePreviewedAlert()
    }
  }

  function handleModal (name_modal, close) {
    if (close) {
      setOpenModal({})
      if (name_modal === 'bid') {
        onChangePreviewedAlert()
      }

    } else {
      setOpenModal({[name_modal]: true})
    }
  }

  useEffect(() => {
    if (detailsStore.previewed_alert) {
      if (!auction_alarm.includes(auctionId)) {
        auction_alarm.push(auctionId)
        localStorage.setItem('auction_alarm', JSON.stringify(auction_alarm))
      }

    }
  }, [detailsStore.previewed_alert])

  useEffect(() => {
    if (detailsStore.previewed_image && detailsStore.previewed_details) {
      onChangePreviewedAlert()
    }
  }, [detailsStore.previewed_image, detailsStore.previewed_details])

  const tab_zero = useMemo(
    () => <OverviewTab car_info={car_info} auctionId={auctionId} bidInfo={bidInfo} is_inventory={is_inventory}
    />,
    [car_info]
  )


  function renderTab () {
    switch (tab) {
      case '0':
        return tab_zero
      case '1': {
        if (userInfo.appUser.is_having_membership) {
          return <InspectionScreen carTitle={title} is_inventory={is_inventory} inspectionId={inspectionId}/>
        } else {
          return <AuctionInspectionSkeleton/>
        }
      }
      default:
        break
    }
  }


  const onClickShare = (link) => {
    const carInfo = car_info.car_properties
    const shareData = {
      title: `${carInfo?.brand} ${carInfo?.model} ${carInfo?.trim} | ${carInfo?.year}`,
      text: `${carInfo?.brand} ${carInfo?.model} ${carInfo?.trim} ${carInfo?.year}`,
      url: link
    }
    if (navigator?.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .then(() => {
          NotificationManager.success(Ui.profile.share_success_message)
        })
        .catch((error) => console.log('Sharing failed', error))
    } else {
      NotificationManager.success(is_inventory
                                  ? Ui.inventory_copy_to_clipboard
                                  : Ui.auction_copy_to_clipboard)
    }
  }
  const {counter} = bidInfo && bidInfo.times_left ? bidInfo.times_left : {}

  const getBackLink = useCallback(() => {
    let link = '/dashboard/'
    if (myOffers) {
      link += is_inventory ? 'myOffers/inventory' : 'myOffers'
    } else if (myOrders) {
      link += 'myOrders/readyToPay?status=wait-settlement-and-settlement'
    } else if (is_inventory) {
      link += 'competing/inventory/'
    } else {
      link += 'competing/auctions/'
    }
    return link
  }, [myOffers, myOrders, is_inventory])

  return <ModalPage header={{
    title,
    is_back: true,
    back_link: getBackLink(),
    transparent: true,
    children: <CopyToClipboard text={window.location.href} onCopy={onClickShare}>
      <span><Icon type="share1" className="text-white text-20"/></span>
    </CopyToClipboard>
  }}>
    <MainAuctionDetail>

      {
        loading ?
        <Loading fullScreen/> :
        <div className="d-flex col-12 flex-column" ref={containerRef}>
          <div className="position-relative w-desktop" style={styles.topBar}>
            <TabBar classes="auction--detail--tab-bar" changeTab={changeTab} list={tabList} activeTab={tab}/>
          </div>
          <div className="main">
            {renderTab()}
          </div>

          <div className="position-fixed bg-white border border-black-200 left-0 pb-4 pt-3 right-0 w-desktop"
               style={styles.footer}>
            {!((myOffers && bidInfo.finished) || myOrders)
             ? bidInfo?.remaining_second !== 0 &&
               <>
                 {bidInfo && remaining_second !== 0 &&
                   <>

                     {(bidInfo && !bidInfo.suspended && !bid?.ended) &&
                       <div className="d-flex justify-content-center align-items-center  px-2" style={{}}>
                         {<CountDownTimeComponent className="text-center d-inline pt-1 text-14 text-orange-crayola h6"
                                                  is_inventory={is_inventory}
                                                  bidinfo={bidInfo}/>
                         }

                         {(!is_inventory || counter) &&
                           <AuctionProgress is_inventory={is_inventory} end={is_inventory ? counter : bidInfo.end}
                                            start={is_inventory ? 3599 : bidInfo.start}/>
                         }
                       </div>}
                   </>
                 }
                 <div className="w-100 px-2 mt-3">
                   <button
                     className={`btn btn-block border-0 p-2 text-16 w-100 text-white radius-4 ${
                       userInfo.appUser.is_having_membership && (remaining_second === 0 || !(remaining_second || (bidInfo?.times_left?.days_left || bidInfo?.times_left?.counter)) || bidInfo && bidInfo.suspended || !props.is_confirmed)
                       ? 'bg-gray-800'
                       : 'bg-orange-crayola'
                     }`}
                     onClick={() =>
                       userInfo.appUser.is_having_membership ?
                       props.is_confirmed && (!(remaining_second === 0 || !(remaining_second || (bidInfo?.times_left?.days_left || bidInfo?.times_left?.counter)) || (bidInfo && bidInfo.suspended))
                           && handleModal('bid')) :

                       onToggleIsOpenBottomSheetDeposit(true)
                     }>
                     {
                       userInfo.appUser.is_having_membership ?
                       (remaining_second === 0 || !(remaining_second || (bidInfo?.times_left?.days_left || bidInfo?.times_left?.counter))
                        ? Ui.ended_submit_a_proposal
                        : bidInfo && bidInfo.suspended
                          ? Ui.trading
                          : Ui.submit_a_proposal)
                                                             :
                       Ui.membership_fee.title
                     }
                   </button>
                 </div>
               </>
             :
             <div className="w-100 p-2">
               <button className={'btn btn-block border-0 p-2 text-16 w-100 text-white radius-4 bg-gray-800'}>
                 {Ui.ended_submit_a_proposal}
               </button>
             </div>
            }
          </div>

          <Modal openModal={openModal.bid && detailsStore.previewed_alert}
                 postion="bottom"
                 closeModal={() => handleModal('bid', true)}
                 title={'ثبت قیمت خودرو'}>
            {bidInfo &&
              <BidForm close={() => handleModal('bid', true)}
                       bidInfo={bidInfo}
                       inspectionId={inspectionId}
                       accepted_price={bidInfo && bidInfo.accepted_price}
                       is_inventory={is_inventory}
                       auctionId={auctionId}
                       title={title}
                       style={{color: 'red'}}/>
            }
          </Modal>

          <Modal openModal={openModal.bid && !detailsStore.previewed_alert}
                 closeModal={() => handleModal('bid', true)} title={'اخطار'}>
            <div className="d-flex flex-column justify-content-center align-items-center mb-4">
              <img src={alarmImg} alt={'alert'} width={72} height={72} className="mt-3 pt-3"/>
              <h6 className="text-black-800 mt-3 text-14 lh-base font-weight-bold text-center pt-2 lh-base">
                لطفا قبل از اعلام قیمت، گزارش کارشناسی و
                <br/>
                عکس های خودرو را مشاهده و بررسی کنید!
              </h6>
            </div>
          </Modal>

          <Modal openModal={!(myOffers
            || myOrders) && bidInfo.finished}
                 header={false}
                 title={''}
                 postion="center">
            <div className="d-flex flex-column justify-content-center align-items-center py-5">
              <Icon type="outOfTime" className="text-orange" style={styles.iconOutOfTIME}/>

              <h6 className="text-purple lh-base font-weight-bold h5 text-center mx-0 text-14 my-4">{is_inventory
                                                                                                     ? Ui.text_ended_depo
                                                                                                     : Ui.text_ended_auction}</h6>
              <Link to={`/dashboard/competing/${is_inventory ? 'inventory' : 'auctions'}/`}>
                <button className="btn-gray rounded text-14 font-weight-bold btn box-shadow py-3 px-4 mt-3">
                  بازگشت به لیست {is_inventory ? 'دپو' : 'مزایده'}
                </button>
              </Link>
            </div>
          </Modal>
          <BottomSheetDeposit isOpen={isOpenBottomSheetDeposit}
                              handleIsOpen={(isOpen) => onToggleIsOpenBottomSheetDeposit(isOpen)}/>
        </div>
      }
    </MainAuctionDetail>

  </ModalPage>
}
const mapStateToProps = state => ({
  detailsStore: state.car,
  userInfo: state.userInfo,
  bidsInventory: state.inventory.bid,
  bidsAuction: state.auctions.bid,
  car_info: state.car.car_info,
  loading: state.car.loading,
  is_confirmed: state.userInfo.appUser.is_confirmed
})
const mapDispatchToProps = (dispatch) => ({
  fetchBid: async (auctionId) => dispatch(await addBid(auctionId)),
  fetchBidInventory: async (auctionId) => dispatch(await addBidInventory(auctionId)),
  resetDetails: () => dispatch(resetAuctionsDetails()),
  deleteBidStore: (auctionId) => dispatch(deleteBid(auctionId)),
  onChangePreviewedAlert: () => dispatch(changePreviewedAlert()),
  gettingCarInfo: (auctionId, is_inventory) => dispatch(onGettingCarInfo(auctionId, is_inventory)),
  gettingCarDetails: (inspectionId) => dispatch(onGettingCarDetails(inspectionId))
})
export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetail)

const MainAuctionDetail = styled.div`
  .main {
    margin-top: 3.5rem;
    margin-bottom: 5.5rem;
  }

  .auction--detail--tab-bar {
    top: 54px !important;
  }
`

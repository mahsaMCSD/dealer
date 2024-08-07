import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {connect, useDispatch}                             from 'react-redux'
import {useParams, useNavigate, useLocation}              from 'react-router-dom'
import PropTypes                                          from 'prop-types'
import styled                                             from 'styled-components'

import Ui                                             from 'src/assets/dictionaries/ui'
import {breakpointsPX}                                from 'src/assets/js/consts'
import CountDownTimeComponent                         from 'src/components/count-down-time/CountDown'
import GalleryInPage                                  from 'src/components/general/gallery/GalleryInPage'
import GalleryList                                    from 'src/components/general/gallery/GalleryList'
import GalleryInModal                                 from 'src/components/general/gallery/GalleryInModal'
import {getPositiveCommentsService}                   from 'src/api/services/cars'
import Formatter                                      from 'src/utility/Formatter.js'
import Icon                                           from 'src/ui-kit/Icon'
import Modal                                          from 'src/ui-kit/modal/Modal'
import {changeIndexActiveImage, changePreviewedImage} from 'src/store/car/actions/actionCreators'
import Moon                                           from 'src/assets/images/moon.svg'

import tag             from 'src/assets/images/dashboard/inventory/tag.png'
import tag2            from 'src/assets/images/dashboard/inventory/tag2.png'
import 'react-image-gallery/styles/css/image-gallery.css'
import AuctionProgress from '../auction-detail/auction-progress/AuctionProgress'
import stylesScss      from 'src/assets/styles/style.scss'

const styles = {
  sliderCounterBox: {
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.13)'
  },
  contentImagesingle: {
    bottom: '3.1rem'
  },
  iconTachometer: {
    fontSize: '100px'
  },
  imageDefault: {
    aspectRatio: '4/3'
  },
  positiveCommentRows: {
    boxShadow: '0 0 3px darkGray'
  },
  recommendedTag: {
    background: `url(${tag}) center center`,
    width: '110px',
    backgroundSize: 'cover',
    height: '30px'
  },
  guaranteeTag: {
    background: `url(${tag2})`,
    width: '110px',
    backgroundSize: 'cover',
    height: '30px'
  },
  tags: {
    zIndex: 1
  },
  bgGlasses: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    top: '10px'
  },
  bgGlassesText: {
    transform: 'rotate(-39deg)',
    fontSize: 35
  },
  bgEnded: {
    zIndex: 1,
    backgroundColor: '#616161',
    opacity: 0.85
  }
}

const AuctionItem = ({
                       bidInfo,
                       data,
                       type,
                       is_inventory,
                       bidStore,
                       bidsStore,
                       onChangeIndexActiveImage,
                       index_active_image,
                       ...props
                     }) => {
  const [state, setState] = useState({
    index: 0,
    nav: false,
    images: [],
    imagesHighest: [],
    inspectData: null
  })
  const history = useNavigate()
  const location = useLocation()
  const {auctionId} = useParams()
  const [openModal, setOpenModal] = useState(false)
  const [openModalKlm, setOpenModalKlm] = useState(false)
  const [positiveComments, setPositiveComments] = useState([])
  const [isShowGalleryList, setToggleGalleryList] = useState(false)
  const [isShowGalleryModal, setToggleGalleryModal] = useState(false)

  const [bid, setBid] = useState(type === 'single'
                                 ? bidStore[auctionId] ? (bidStore[auctionId] || {}) : (bidInfo || {})
                                 : (bidsStore[data.id] || {}))
  const _Formatter = new Formatter()

  const checkEndedTime = useCallback(() => (type !== 'single' &&
    ((props.is_having_membership
      ? (data?.finished || Object.keys(bid).length === 0)
      : data?.finished) || bid?.remaining_second === 0)
  ), [props.is_having_membership, data?.finished, bid?.remaining_second])

  const [showWaterMarkEnded, onChangeShowWaterMarkEnded] = useState(checkEndedTime())


  useEffect(() => {
    onChangeShowWaterMarkEnded(checkEndedTime())
  }, [data?.finished, type, bid, props.is_having_membership])

  const dispatch = useDispatch()

  useEffect(() => {
    setBid(type === 'single'
           ? bidStore[auctionId] ? (bidStore[auctionId] || {}) : (bidInfo || {})
           : (bidsStore[data.id] || {}))
  }, [bidsStore, bidStore])

  const myOffers = location.pathname.includes('myOffers')
  const myOrders = location.pathname.includes('myOrders')

  function getPositiveComments () {
    if (data.positive_comment === 0) {
      setOpenModal(true)
    } else {

      getPositiveCommentsService(data.inspection)
        .then((res) => {
          let arr = []
          res.positive_comments.map(i => {
            i.answers.map(ii => {
              if (ii.default && ii.title === 'بلی') {
                arr.push(i.title)
              }
            })
          })
          setPositiveComments(arr)
          setOpenModal(true)
        })
    }
  }

  function handleOpenModal () {
    if (openModal) {
      setOpenModal(false)
    } else {
      getPositiveComments()
    }
  }


  useEffect(() => {
    if (data) {
      var imageList = data.main_images

      if (imageList && imageList.length > 0) {
        let scop = []
        let scopHighest = []

        imageList.map((element, i) => {
          scop.push({
            'original': element.file,
            'thumbnail': element.file,
            key: data.id + i,
            id: element.id
          })
          scopHighest.push({'original': element.file_high, 'thumbnail': element.file, key: data.id + i, id: element.id})

          if (scop.length === imageList.length) {
            setState(prevState => ({...prevState, images: scop, imagesHighest: scopHighest}))
          }
        })
      }
    }

  }, [data])

  function klmModal (close) {
    if (close) {
      setOpenModalKlm(false)
    } else {
      setOpenModalKlm(true)
    }
  }

  function handleShowGalleryList () {
    setToggleGalleryList(false)
    history(-1)
  }

  useEffect(() => {
    if (location.pathname.includes('toggle-gallery-List')) {
      setToggleGalleryList(true)
      dispatch(changePreviewedImage())
    } else {
      setToggleGalleryList(false)
    }

    if (location.pathname.includes('toggle-gallery-modal')) {
      setToggleGalleryModal(true)
    } else {
      setToggleGalleryModal(false)
    }
  }, [location])

  useEffect(() => {
    if (type === 'single' && !isShowGalleryList && !isShowGalleryModal && state.images.length < index_active_image) {
      onChangeIndexActiveImage()
    }

  }, [isShowGalleryList])

  function handleToggleGalleryModal (id_image, show) {
    if (show) {
      setToggleGalleryModal(true)
      history(`toggle-gallery-modal?id=${id_image}`)
    } else {
      history(-1)
    }
  }

  const onClickImage = () => {
    if (type === 'single' && state.images.length > 0) {
      history(`toggle-gallery-List`)
    } else if (type !== 'single') {
      history(`details/${data.inspection}/${data.id}`)
    }
  }

  let {highest, user_latest} = bid
  const onChangeSlideImage = (i) => {
    if (props.is_having_membership) {
      setState(prevState => ({
        ...prevState,
        index: i
      }))
      if (type === 'single') {
        onChangeIndexActiveImage(i)
      }
    }
  }
  return (
    data ? <Main className={`${type === 'single' ? 'pb-2 ' : ''}`}
    >
      <div className="position-relative">
        {
          (is_inventory && bid.suspended) &&
          <div
            className="position-absolute d-flex justify-content-center align-items-center  top-0 bottom-0 right-0 left-0 "
            style={styles.bgGlasses}><h4 className="text-white w-auto text-center"
                                         style={styles.bgGlassesText}>{Ui.trading}</h4>
          </div>
        }
        {showWaterMarkEnded &&
        <div
          className="position-absolute d-flex justify-content-center align-items-center  top-0 bottom-0 right-0 left-0 "
          style={styles.bgEnded}>
          <div className="border border-white py-2 px-4 rounded">
            <h4 className="text-white  w-auto mx-1 text-center mb-0"
            > {is_inventory ? Ui.inventory_end : Ui.ended}</h4>
          </div>

          </div>
        }
        <div>
          {(data.recommended || data.guarantee || data.night_mode) &&
            <div style={styles.tags} className="position-absolute  left-0">
              {
                data?.night_mode &&
                  <div className="d-flex align-items-center justify-content-center p-2 mt-2 box-badge">
                    <h6
                    className="text-14 text-white text-center mb-0 ps-2 font-weight-bold">{Ui.night_auction}</h6>
                    <img src={Moon} alt=''/>
                  </div>
                }
              {data.recommended && <div className="mt-2" style={styles.recommendedTag}><h6
                className="text-14 text-white text-center p-2 pr-3 font-weight-bold">{Ui.recommended}</h6></div>}
              {data.guarantee && <div className="mt-2" style={styles.guaranteeTag}><h6
                className="text-14 text-white text-center p-2 pr-3 font-weight-bold">{Ui.guarantee}</h6></div>}
            </div>}
          {state.images && state.images.length > 0 ?
           <GalleryInPage items={state.images}
                          originalClass={'test'}
                          galleryClass={`${type === 'single'
                                           ? 'main-gallery-single'
                                           : 'main-gallery'}`}
                          settings={{
                            showThumbnails: type === 'single',
                            additionalClass: 'gallery',
                            onClick: onClickImage,
                            isRTL: true,
                            infinite: true,
                            startIndex: state.images.length > index_active_image ? parseInt(index_active_image) : 0,
                            onSlide: onChangeSlideImage
                          }}/> :
           <div className="bg-gray w-100" style={styles.imageDefault} onClick={onClickImage}/>
          }
        </div>
        {isShowGalleryList &&
        <GalleryList
          title={`${data.car_properties.brand} | ${data.car_properties.model} | ${data.car_properties.year}`}
          images={state.images}
          onClickImage={(props) => handleToggleGalleryModal(props, true)}
          onCloseModal={handleShowGalleryList}/>
        }

        {isShowGalleryModal &&
        <GalleryInModal
          title={`${data.car_properties.brand} | ${data.car_properties.model} | ${data.car_properties.year}`}
          images={state.imagesHighest}
          onCloseModal={() => handleToggleGalleryModal(null, false)}
        />
        }

        {state.images.length > 0 &&
        <div className="position-absolute px-2 number-images d-flex">
          {type === 'single' ?
           <Icon type="expand" className="text-white py-2 text-16"/> :
           <h6 className="text-white text-12 m-0">{`${state.index + 1}/${state.images.length}`}</h6>
          }
        </div>
        }

        <div className={`position-absolute right-0 left-0 d-flex justify-content-between content-image py-1 px-4
          ${type === 'single' && state.images && state.images.length > 0 ? '' : 'bottom-0'}`}>
          <h6 className="d-flex align-items-center mb-0 text-14 text-white">
            <Icon type="documentText" className=" ms-1"/>
            <span className="ms-1">{data.car_specifications && data.car_specifications.document}</span>
            <span>{Ui.document}</span>
          </h6>
          <h6 className="d-flex align-items-center mb-0 text-14 text-white ">
            <Icon type="eye1" className=" ms-1"/>
            <span className=" ms-1">{bid.views}</span>
            <span>{Ui.visit}</span>
          </h6>
          <h6 className="d-flex text-14 text-white mb-0 align-items-center pointer"
              onClick={handleOpenModal}>
            <Icon type="addCircle" className="text-success h4 mb-0 ms-1"/>
            <span> {Ui.positive_points}</span>
          </h6>
        </div>
      </div>
      {
        useMemo(() =>
            <div className="pt-3 mt-1">
              <div className="px-2">
                <div className="d-flex justify-content-between mb-2 px-1">
                  <div className="col-auto d-flex align-items-center p-0">
                    <h5 className="font-weight-bold mb-0 text-16 text-black-dark d-flex"
                        onClick={() => type !== 'single' && !showWaterMarkEnded &&
                          history(`details/${data.inspection}/${data.id}`)
                        }>
                      {data.car_properties.brand}
                      <span className={'text-black-800 mx-1'}>|</span>
                      <span className="d-flex text-nowrap">{data.car_properties.model}</span>
                      <span className={'text-black-800 mx-1'}>|</span>
                      {data.car_properties.year}
                    </h5>
                  </div>
                  <div className="col-auto text-left p-0">
                  <span className="d-flex align-items-center" dir="ltr">
                    {
                      type !== 'single' && bid.suspended ?
                      <>
                        <Icon type="writing" className="text-orange h3 mb-0"/>

                        <h6 className="text-14 ms-2 mb-0 text-orange-crayola">{Ui.trading}</h6>
                      </>
                                                         : type === 'single'
                                                           ? <h6
                                                             className="text-14">{data.car_properties.trim}</h6>
                                                           : props.is_having_membership && <>
                                                           {(!is_inventory || bid?.times_left?.counter) && bid?.remaining_second !== 0 &&
                                                           <AuctionProgress is_inventory={is_inventory}
                                                                            end={is_inventory
                                                                                 ? bid?.times_left?.counter
                                                                                 : bid?.end}
                                                                            start={is_inventory
                                                                                   ? 3599
                                                                                   : bid?.start}/>}
                                                           {bid &&
                                                           <CountDownTimeComponent
                                                             className="text-center d-inline ms-2 ps-1 pt-1 text-orange-crayola text-14"
                                                             is_inventory={is_inventory}
                                                             bidinfo={bid}/>}
                                                         </>
                    }
                  </span>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-1 px-1">
                  <div className="p-0">
                    <h6 className="text-black-800 text-right text-14 mb-0">
                      <span>{data.branch.city}</span>
                      <span className="text-black-800 mx-1">|</span>
                      <span>{data.branch.branch}</span>
                    </h6>
                  </div>
                  <div className=" p-0 text-left">
                    <h6 className="text-black-800 text-16 d-flex align-items-center mb-0">
                      {data.car_specifications.is_klm_matched === false &&
                      <div className="pointer" onClick={() => klmModal()}>
                        <Icon type="infoCircle" className="text-red me-2 h4"/>
                      </div>
                      }
                      {_Formatter.commaSeparateNumber(data.car_specifications.klm)}
                      <span className="text-10 me-1">{Ui.km}</span>
                    </h6>
                  </div>
                </div>

                <hr className="bg-black-200 break-line"/>

                <div className="d-flex justify-content-between align-items-center mb-2 px-1">
                  <div className="p-0">
                    <h6 className="text-black-800 lh-base text-16 mb-0">{
                      !is_inventory ? Ui.fair_market_value : Ui.proposed_price
                    }</h6>
                  </div>
                  {props.is_having_membership ? <h6
                                                className="col-auto text-black-800 lh-base text-16 mb-0 text-left p-0 ">
                                                {_Formatter.commaSeparateNumber(is_inventory ? (bid.accepted_price
                                                                                                ? bid.accepted_price
                                                                                                : data.accepted_price) : data.price)}
                                                <span className="text-10 font-weight-normal me-1">{Ui.toman}</span>
                                              </h6>
                                              : <h6
                     className="font-weight-bold mb-0 lh-base text-yellow-orange text-10 text-left p-0">
                     {Ui.ability_to_view_after_deposit_pre_payment}                   </h6>
                  }
                </div>
              </div>
              <div>
                {highest && (highest === user_latest) &&
                  <div className="d-flex flex-wrap justify-content-between highest-price bg-green-light ">
                    <h6
                      className="text-success text-16 line-height-24 font-weight-bold mb-0">{Ui.my_suggestion} | {Ui.highest_bid}</h6>
                    <h6 className="text-success text-16 text-left p-0 line-height-24 font-weight-bold mb-0">
                      {props.is_having_membership
                       ? <>
                         {_Formatter.commaSeparateNumber(highest)}
                         <span className="text-10 font-weight-normal me-1">{Ui.toman}</span>
                       </>
                       : <span className="text-10 "> {Ui.ability_to_view_after_deposit_pre_payment}</span>
                      }
                    </h6>
                  </div>
                }
                {(user_latest && highest > user_latest) &&
                  <div className="d-flex flex-wrap justify-content-between highest-price bg-red-light py-2">
                    <h6
                      className="text-danger text-18 line-height-24 font-weight-bold mb-0">{Ui.a_higher_price_was_recorded}</h6>
                    <h6 className="text-18 text-danger text-left p-0 line-height-24 font-weight-bold mb-0">
                      {props.is_having_membership
                       ? <>
                         {_Formatter.commaSeparateNumber(highest)}
                         <span className="text-10 font-weight-normal me-1">{Ui.toman}</span>
                       </>
                       : <span className="text-10">{Ui.ability_to_view_after_deposit_pre_payment}</span>
                      }
                    </h6>
                  </div>
                }

                {showWaterMarkEnded
                 ? <h6
                   className="border border mb-0 text-gray-400 text-15 border-gray-400 py-2 text-center rounded">{Ui.negotiating}</h6>
                 : !user_latest &&
                   <div className="d-flex justify-content-between bg-gray-50 highest-price py-2">
                     <div className="p-0">
                       <h6 className="text-black text-16 mb-0 line-height-24 font-weight-bold">{Ui.highest_bid}</h6>
                     </div>
                     {props.is_having_membership
                      ? <h6 className="text-black text-18 text-left p-0 mb-0 line-height-24 font-weight-bold">
                        {_Formatter.commaSeparateNumber(!(myOffers || myOrders) ? highest : data.bid.highest)}
                        <span className="text-10 font-weight-normal me-1">{Ui.toman}</span>
                      </h6>
                      :
                      <h6 className="text-orange-crayola text-left p-0 line-height-24 mb-0 text-10 font-weight-bold">
                        {Ui.ability_to_view_after_deposit_pre_payment}
                      </h6>
                     }
                   </div>
                }
              </div>
            </div>
          , [bid, props.is_having_membership])
      }
      <Modal openModal={openModal} closeModal={handleOpenModal} title={Ui.car_positive_points}>
        <MainModalPositivePoints className="px-3 pb-3  pt-4 mb-1">


          {positiveComments.length > 0
           ? <div className="radius-4 bg-black-50 positive_points px-5 py-1">
             {
               positiveComments.map(item => <h6
                 className="text-center text-14 py-1 mx-1 text-black-800 border-bottom border-charcoal-200 lh-base mb-1">{item}</h6>)
             }

           </div>
           : <h6
             className="text-center text-14 lh-base d-flex align-items-center justify-content-center radius-4 bg-black-50 text-black-600 positive_points_empty">
             <Icon type={'warning1'} className={'ms-2'}/>
             <span>{Ui.no_case_registered}</span>
           </h6>
          }
        </MainModalPositivePoints>
      </Modal>

      <Modal openModal={openModalKlm} closeModal={() => klmModal(true)} title={'اخطار'} headerColor="bg-transparent"
             postion="center">
        <div className="d-flex flex-column align-items-center my-5 py-5">
          <Icon type={'tachometer'} className="text-black-800" style={styles.iconTachometer}/>
          <h6 className="font-weight-bold mt-2 text-14 pe-2 lh-base text-center">کیلومتر این خودرو با ظاهر این
            <br/>
            خودرو مطابقت ندارد!</h6>
        </div>
      </Modal>
    </Main> : ''
  )
}

const mapStateToProps = (state, ownProps) => ({
  bidAuction: state.auctions.bid,
  bidsAuction: state.auctions.list.bids,
  bidStore: ownProps.is_inventory ? state.inventory.bid : state.auctions.bid,
  bidsStore: ownProps.is_inventory ? state.inventory.list.bids : state.auctions.list.bids,
  is_having_membership: state.userInfo.appUser.is_having_membership,
  index_active_image: state.car.index_active_image
})
const mapDispatchToProps = (dispatch) => ({
  onChangeIndexActiveImage: (index) => dispatch(changeIndexActiveImage(index))
})
export default connect(mapStateToProps, mapDispatchToProps)(AuctionItem)
AuctionItem.defaultProps = {
  is_inventory: false
}
AuctionItem.prototype = {
  data: PropTypes.object.isRequired,
  bidInfo: PropTypes.object,
  is_inventory: PropTypes.bool.isRequired
}

const Main = styled.div`
  .main-gallery-single {
    aspect-ratio: 4/3;
  }

  .box-badge {
    border-radius: 0px 4px 4px 0px;
    background: linear-gradient(265.1deg, #002447 0%, #003B72 100%);
  }

  .main-gallery {
    aspect-ratio: 4/3;
    height: 75vw;
  }

  .highest-price {
    padding: 2px 12px;
  }

  .line-height-24 {
    line-height: 24px !important;
  }

  .content-image {
    background: rgba(${stylesScss.charcoal}, 0.3);
    top: calc(75vw - 25px);
  }

  .number-images {
    top: 10px;
    right: 10px;
    background: rgba(${stylesScss.charcoal}, 0.3);

    h6 {
      line-height: 21px;
    }
  }

  .break-line {
    margin-top: 12px;
    margin-bottom: 8px;
  }

  .main-gallery__blur img {
    filter: blur(7.5px);
  }

  @media (min-width: ${breakpointsPX.lg}) {
    .main-gallery {
      min-height: 234px;
      height: auto;
    }

    .content-image {
      top: 230px;
    }

  }
`

const MainModalPositivePoints = styled.div`
  .positive_points {
    h6:last-child {
      border-bottom: 0 !important;
    }
  }

  .positive_points_empty {
    padding: 40px 0;
  }
`
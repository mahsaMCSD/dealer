import React, {useState, useEffect} from 'react'
import PropTypes                    from 'prop-types'
import Icon                         from 'src/ui-kit/Icon'
import RenderQuestion               from 'src/components/dashboard/auction-detail/render-question/RenderQuestion'
import AuctionItem                  from '../../auction-item/AuctionItem'
import {useParams}                  from 'react-router-dom'
import {
  onGettingCarDetailsMore
}                                   from 'src/store/car/actions/onGettingCarDetails'
import {connect}                    from 'react-redux'

const carDetailList = ['شماره پذیرش', 'آپشن', 'تریم خودرو', 'گیربکس', 'بیمه', 'سال تخفیف بیمه']


const OverviewTab = ({car_details, car_info, auctionId, bidInfo, is_inventory, gettingCarDetailsMore, ...props}) => {
  const {inspectionId} = useParams()
  const [showMoreDetails, setShowMoreDetails] = useState(false)

  function renderDetails (more) {
    return car_details && car_details.filter((e) =>
      more || carDetailList.includes(e.title))
      .map((item) =>
        <div key={item.title} className="py-3 px-1 mx-3 border-bottom border-gray-200">
          <RenderQuestion question={item}/>
        </div>
      )
  }

  useEffect(() => {
    if (showMoreDetails && car_details.length < 16) {
      gettingCarDetailsMore(inspectionId)
    }
  }, [showMoreDetails])
  return (<>
      <AuctionItem type={'single'} data={car_info} bidInfo={bidInfo} auctionId={auctionId} is_inventory={is_inventory}/>

      {props.is_having_membership &&
      <div className="d-flex flex-column w-100 align-items-center pe-1 ps-1 justify-content-center ">
        <div className="col-12 p-2 rounded-1 bg-gray-300 mb-2">
          <div className="p-2">
            <h6 className="font-weight-bold mb-0 text-16 text-purple ">جزیيات خودرو</h6>
          </div>
          <div className="bg-white">
            {renderDetails(showMoreDetails)}
          </div>
          {<div className={`d-flex pe-2 pointer ${showMoreDetails ? 'pt-5' : 'pt-3'} `}
                onClick={() => {setShowMoreDetails(!showMoreDetails)}}>
            {!showMoreDetails && <>
              <div className="col-6 p-0">
                <small className="font-weight-bold text-orange text-14">مشاهده جزییات بیشتر</small>
              </div>
              <div className="col-6 d-flex flex-row-reverse">
                <Icon type={'angleLeft'} className={' h4 text-orange'}/>
              </div>
            </>}
          </div>}

        </div>
      </div>}
    </>
  )
}
OverviewTab.defaultProps = {
  detail: [],
  is_inventory: false
}
OverviewTab.prototype = {
  detail: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      value: PropTypes.string
    })),
  car_info: PropTypes.object,
  auctionId: PropTypes.string,
  is_inventory: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
  car_details: state.car.car_details,
  is_having_membership: state.userInfo.appUser.is_having_membership
})

const mapDispatchToProps = (dispatch) => ({
  gettingCarDetailsMore: (inspectionId) => dispatch(onGettingCarDetailsMore(inspectionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab)

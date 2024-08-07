import React, {useEffect}                from 'react'
import Pullable                          from 'src/ui-kit/pullable/Pullable'
import {connect}                         from 'react-redux'
import AuctionSvg                        from 'src/assets/images/dashboard/auction.svg'
import EmptyMessage                      from 'src/components/dashboard/empty-message/EmptyMessage'
import Loading                           from 'src/components/loading/Loading'
import {onToggleIsLoop}                  from 'src/store/auctions/list/actions/actionCreators'
import onGettingAuctionList, {onGetBids} from 'src/store/auctions/list/actions/onGettingAuctionList'
import AuctionList                       from '../AuctionList'
import {sendAmplitudeData}               from 'src/utility/amplitude'
import Filters                           from './filters/Filters'

const emptyMessageData = {
  image: AuctionSvg,
  title: 'در حال حاضر خودرویی‌ برای مزایده وجود ندارد',
  content: 'برای شرکت در مزایده‌ها و مشاهده خودروهای جدید، صفحه را بروزرسانی کنید.'
}

const Auctions = ({...props}) => {
  useEffect(() => {
    sendAmplitudeData('Dashboard')

    if (props.auctions.length !== 0) {
      props.onToggleIsLoop(true)
      props.onGetBids()
    }
    return () => props.onToggleIsLoop(false)
  }, [])

  useEffect(() => {
    if (props.auctions.length === 0) {
      props.onGettingAuctionList(true, false)
    }
  }, [props.filters])

  return <>
    <Filters/>
    {
      props.isGettingData ?
      <Loading fullScreen/> :
      <Pullable onRefresh={props.onGettingAuctionList}>

        {props.auctions.length > 0
         ? <AuctionList auctions={props.auctions}/>
         : <EmptyMessage heightDifference={13} enableBtnRefresh refresh={props.onGettingAuctionList}
                         {...emptyMessageData} />
        }
      </Pullable>
    }
  </>

}

const mapStateToProps = state => ({
  auctions: state.auctions.list.auction_list,
  isGettingData: state.auctions.list.is_getting_data,
  filters: state.auctions.list.filters
})
const mapDispatchToProps = dispatch => ({
  onGettingAuctionList: (hasNotReset, isShallowGetting) =>
    dispatch(onGettingAuctionList(
      hasNotReset,
      isShallowGetting
    )),
  onGetBids: () => dispatch(onGetBids()),
  onToggleIsLoop: (status) => dispatch(onToggleIsLoop(status))
})
export default connect(mapStateToProps, mapDispatchToProps)(Auctions)

import React, {useEffect}                          from 'react'
import {connect}                                   from 'react-redux'
import InventorySvg                                from 'src/assets/images/dashboard/garage.svg'
import EmptyMessage                                from 'src/components/dashboard/empty-message/EmptyMessage'
import Loading                                     from 'src/components/loading/Loading'
import {onToggleIsLoop}                            from 'src/store/inventory/list/actions/actionCreators'
import onGettingAuctionList, {onGetBids, loadMore} from 'src/store/inventory/list/actions/onGettingAuctionList'
import Pullable                                    from 'src/ui-kit/pullable/Pullable'
import InventoryList                               from '../InventoryList'
import Filters                                     from './filters/Filters'


const emptyMessageData = {
  image: InventorySvg,
  title: 'در حال حاضر خودرویی در دپو وجود ندارد!',
  content: <>برای مشاهده جدیدترین خودرو های موجود در دپو، صفحه را<br/> بروزرسانی کنید.</>,
  enableBtnRefresh: true
}

const Inventory = ({...props}) => {
  React.useEffect(() => {
    if (props.inventory.length !== 0) {
      props.onToggleIsLoop(true)
      props.onGetBids()
    }
    return () => {
      props.onToggleIsLoop(false)
    }
  }, [])


  const observer = React.useRef(null)
  const showEnded = React.useCallback(node => {
    if (!node) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (props.nextPage) {
          props.loadMore(props.nextPage)
        }
      }
    })
    if (node) observer.current.observe(node)
  })


  useEffect(() => {props.onGettingAuctionList(0, true)}, [props.filters])

  return <>
    <Filters/>
    {
      props.isGettingData ?
      <Loading fullScreen/> :
      <Pullable>
        {props.inventory.length > 0
         ? <>
           <InventoryList inventory={props.inventory}/>
           {
             props.isGettingMoreData
             ? <div className="my-3"><Loading/></div>
             : <div ref={showEnded}/>
           }
         </>
         : <EmptyMessage refresh={props.onGettingAuctionList} heightDifference={13} {...emptyMessageData} />
        }
      </Pullable>
    }
  </>
}

const mapStateToProps = state => (
  {
    inventory: state.inventory.list.auction_list,
    isGettingData: state.inventory.list.is_getting_data,
    nextPage: state.inventory.list.next_page,
    isGettingMoreData: state.inventory.list.is_getting_more_data,
    filters: state.inventory.list.filters
  }
)
const mapDispatchToProps = dispatch => (
  {
    onGettingAuctionList: (page, hasNotReset) => dispatch(onGettingAuctionList(page, hasNotReset)),

    loadMore: (data) => dispatch(loadMore(data)),
    onGetBids:
      () => dispatch(onGetBids()),
    onToggleIsLoop: (status) => dispatch(onToggleIsLoop(status))
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(Inventory)

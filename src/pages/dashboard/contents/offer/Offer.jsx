import React, {useEffect, useRef, useState} from 'react'
import PropTypes                            from 'prop-types'
import {useLocation, useNavigate}           from 'react-router-dom'
import {ElementScroller, WindowScroller}    from 'react-scroll-manager'

import {getOffersAuctionService, getOffersInventoryService} from 'src/api/services/cars'
import Loading                                              from 'src/components/loading/Loading'
import TabBar                                               from 'src/components/dashboard/tab-bar/TabBar'
import OfferSvg                                             from 'src/assets/images/dashboard/offers.svg'

import OffersAndOrdersSubTab from 'src/components/dashboard/offers-and-orders-sub-tab/OffersAndOrdersSubTab'
import useScrollPosition     from 'src/hooks/useScrollPosition'
import styled                from 'styled-components'

const tabList = [
  {
    title: 'مزایده',
    link: '/dashboard/myOffers/auction',
    key: 'myOffers_auction',
    service: getOffersAuctionService
  },
  {
    title: 'دپو',
    link: '/dashboard/myOffers/inventory',
    key: 'myOffers_inventory',
    service: getOffersInventoryService
  }
]
const dataEmptyMessage = {
  0: {
    image: OfferSvg,
    title: 'قیمت پیشنهادی برای خودرویی ثبت نکرده اید!',
    content: 'برای مشاهده‌ جدیدترین پیشنهادات و خودروها، صفحه را بروزرسانی کنید.'
  }, 1: {
    image: OfferSvg,
    title: 'قیمت پیشنهادی برای خودرویی ثبت نکرده اید!',
    content: 'برای مشاهده‌ جدیدترین پیشنهادات و خودروها، صفحه را بروزرسانی کنید.'
  }
}
const Offer = () => {
  const history = useNavigate()
  const location = useLocation()
  const myRef = useRef()
  const tabIndex = tabList.findIndex(tab => tab.link.includes(location.pathname))

  const defaultState = {
    count: null,
    results: [],
    tab: tabIndex > 0 ? tabIndex : 0,
    loading: true,
    page: 1
  }
  const [state, setState] = useState(defaultState)
  const scrollCurrentPosition = useScrollPosition({id: `offer_${state.tab}`})


  function checkScroll () {
    const ScrollManager = window.sessionStorage.getItem('ScrollManager') && (JSON.parse(window.sessionStorage.getItem(
      'ScrollManager')).positions.initial[`offer_${state.tab}`])?.scrollTop

    let loading

    if (ScrollManager && ScrollManager >= 300 && state.count >= 10 && (scrollCurrentPosition <= ScrollManager)) {
      loading = true
    } else {
      loading = false
    }

    return loading
  }

  function getData (notFirstFetch) {

    const page = !notFirstFetch ? defaultState.page : ++state.page
    tabList[state.tab].service({page, page_size: 10})
      .then((res) => {
        const loading = checkScroll()
        setState({
          ...state,
          count: res.count,
          results: !notFirstFetch ? res.results : [...state.results, ...res.results],
          page,
          nextUrl: res.next,
          isLoadMore: false
        })

        setTimeout(() => {
          setState(prevState => ({...prevState, loading}))
        }, 1000)

      })
  }


  useEffect(() => {getData()}, [state.tab])


  function changeTab (tab) {
    history(tabList[tab].link)
    setState({...defaultState, tab: parseInt(tab)})
  }

  return (<StyledOffer>
      <TabBar classes="pt-2" changeTab={changeTab} list={tabList} activeTab={state.tab.toString()}/>
      <WindowScroller>
        <ElementScroller scrollKey={`offer_${state.tab}`}>
          <div className={`main__body offer_${state.tab} position-relative`} id={`offer_${state.tab}`} ref={myRef}>
            {state.loading
              && <div
                className="offer-loading-bg bg-white">
                <Loading fullScreen/></div>}
            <OffersAndOrdersSubTab results={state.results}
                                   count={state.count}
                                   loading={state.loading}
                                   isLoadMore={state.isLoadMore}
                                   next={state.nextUrl}
                                   refresh={() => getData()}
                                   nextPage={() => getData(state.nextUrl)}
                                   tabIndex={state.tab}
                                   dataEmptyMessage={dataEmptyMessage}/>
          </div>
        </ElementScroller>
      </WindowScroller>
    </StyledOffer>
  )
}

export default Offer

Offer.prototype = {
  type: PropTypes.string.isRequired
}

const StyledOffer = styled.div`
  .offer-loading-bg {
    z-index: 200;
    width: 100%;
    height: calc(100% + 10px);
  }
`

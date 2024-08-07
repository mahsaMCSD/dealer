import React, {useCallback, useEffect, useRef, useState} from 'react'
import Pullable                                          from 'react-pullable'

import EmptyMessage       from 'src/components/dashboard/empty-message/EmptyMessage'
import BoughtSvg          from 'src/assets/images/dashboard/bought.svg'
import {getOrdersService} from 'src/api/services/cars'
import getParameterByName from 'src/utility/getParameterByName'
import Loading            from 'src/components/loading/Loading'
import OfferAndOrderItem  from 'src/components/dashboard/offer-and-order-item/OfferAndOrderItem'

const emptyMessage = {
  image: BoughtSvg,
  title: 'تاکنون خودرویی خریداری نکرده اید!',
  content: 'برای ثبت سفارش و خرید خودرو، به بخش خودروها مراجعه کنید.'
}

const initialData = {
  list: [],
  nextUrl: null,
  count: 0,
  loading: false,
  isGettingData: false
}

const Paid = () => {
  const [data, onChangeData] = useState(initialData)

  const observer = useRef(null)
  const showEnded = useCallback(node => {
    if (!node) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (data.nextUrl) {
          getData(true)
        }
      }
    })
    if (node) observer.current.observe(node)
  })
  const resetList = (nextPage) => {
    let page = 1
    if (nextPage) {
      page = getParameterByName('page', data.nextUrl)
    }
    onChangeData(prevState => ({
      ...prevState,
      loading: !nextPage
    }))
    return page
  }

  const getData = (nextPage) => {
    if (!data.isGettingData) {

      onChangeData(prevState => ({
        ...prevState,
        isGettingData: true
      }))
      getOrdersService(resetList(nextPage))
        .then((res) =>
          onChangeData({
            count: res.count,
            list: !nextPage ? res.results : [...data.list, ...res.results],
            nextUrl: res.next,
            loading: false,
            isGettingData: false
          })
        )
        .catch(() => onChangeData(prevState => ({
              ...prevState,
              loading: false,
              isGettingData: false
            })
          )
        )
    }

  }

  useEffect(() => getData(), [])

  return <Pullable disabled={data.loading} onRefresh={getData}>
    {
      data.loading ? <Loading fullScreen/> :
      data.list.length === 0
      ? <EmptyMessage heightDifference={14} enableBtnRefresh={true} refresh={() => getData()} {...emptyMessage} />
      : data.list.map((item, i) =>
        <div key={i}>
          <OfferAndOrderItem data={item}/>
          {data.list.length < data.count && i === data.list.length - 2 &&
            <div ref={showEnded}/>
          }
        </div>
      )
    }
  </Pullable>

}

export default Paid

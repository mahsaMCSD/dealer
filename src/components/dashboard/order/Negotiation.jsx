import React, {useCallback, useEffect, useState} from 'react'
import Pullable                                  from 'src/ui-kit/pullable/Pullable'
import EmptyMessage                              from 'src/components/dashboard/empty-message/EmptyMessage'
import OfferAndOrderItem                         from 'src/components/dashboard/offer-and-order-item/OfferAndOrderItem'
import {getOrdersNegotiationService}             from 'src/api/services/cars'
import NegotiateSvg                              from 'src/assets/images/dashboard/negotiate.svg'
import Loading                                   from 'src/components/loading/Loading'


const emptyMessage = {
  image: NegotiateSvg,
  title: 'قیمت پیشنهادی برای خودرویی ثبت نکرده‌اید!',
  content: <> برای ثبت قیمت پیشنهادی و مذاکره خودرو،<br/> به بخش خودروها مراجعه کنید.</>
}

const Negotiation = () => {

  const [data, onChangeData] = useState({
    list: [],
    loading: false
  })

  const getData = useCallback(async () => {
      const result = await getOrdersNegotiationService()
      if (result) {
        onChangeData({
          list: result,
          loading: false
        })
      } else {
        onChangeData({
          loading: false
        })
      }
    }, []
  )


  useEffect(() => {
    getData()
  }, [])

  return <Pullable disabled={data.loading} onRefresh={getData}>
    {
      data.loading ? <Loading fullScreen/> :
      data.list.length === 0
      ? <EmptyMessage heightDifference={14} enableBtnRefresh={true}
                      refresh={getData} {...emptyMessage} />
      : data.list.map((item, i) => <div key={i}>
          <OfferAndOrderItem data={item}/>
        </div>
      )
    }
  </Pullable>

}

export default Negotiation

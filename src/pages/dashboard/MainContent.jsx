import React           from 'react'
import {Route, Routes} from 'react-router-dom'

import AuctionDetail   from './contents/AuctionDetail'
import Competing       from './contents/Competing'
import Offers          from './contents/offer/Offer'
import FinalPay        from './contents/order/final-pay/FinalPay'
import Orders          from './contents/order/Order'
import Profile         from './contents/Profile/Profile'

const pathname = '/dashboard'

const MainContent = () => {
  return <Routes>
    <Route path={`${pathname}/competing/:type/details/:inspectionId/:auctionId`} exact={false}
           element={<AuctionDetail />}/>
    <Route path={`${pathname}/competing/:page?`} exact={false} element={<Competing />}/>

    <Route path={`${pathname}/inventory/:type/details/:inspectionId/:auctionId`} exact={false}
           element={<AuctionDetail />}/>
      <Route path={`${pathname}/:type/details/:inspectionId/:auctionId`} exact={false} element={<AuctionDetail />}/>
    <Route path={`${pathname}/:type/:typeAuction/details/:inspectionId/:auctionId`} exact={false}
           element={<AuctionDetail />}/>
    <Route path={`${pathname}/myOffers`} exact={false} element={<Offers />}/>

    <Route path={`${pathname}/myOrders/finalPay/:paymentSlug`} exact={false} element={<FinalPay />}/>

    <Route path={`${pathname}/myOrders/:page?`} exact={false} element={<Orders />}/>
    <Route path={`${pathname}/userPanel/:page?`} exact={false} element={<Profile />}/>
  </Routes>
}

export default MainContent

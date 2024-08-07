import React       from 'react'
import AuctionItem from 'src/components/dashboard/auction-item/AuctionItem'

const AuctionList = ({auctions}) =>
  auctions.map((item) =>
    <div className={'radius-8 overflow-hidden border border-charcoal-200 m-2'}>
      <AuctionItem key={item.id} data={item}/>
    </div>
  )

export default AuctionList

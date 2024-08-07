import React, {useEffect} from 'react'
import {connect}          from 'react-redux'
import {Link}             from 'react-router-dom'

import ui                               from 'src/assets/dictionaries/ui'
import {onGettingAuctionMembershipInfo} from 'src/store/wallet/actions/onGettingAuctionMembershipInfo'
import Icon                             from 'src/ui-kit/Icon'
import Formatter                        from 'src/utility/Formatter'
import styled                           from 'styled-components'


const detailsData = [
  {
    key: 'deposit_membership',
    key_service: 'amount',
    label: ui.transaction_page.details_data.deposit_membership,
    type: 'price'
  }, {
    key: 'limit_auctions',
    key_service: 'count',
    label: ui.transaction_page.details_data.limit_auctions,
    type: 'number',
    icon: {
      increase: 'points',
      decrease: 'pointsMinus'
    },
    link: {
      increase: '/membership-fee/on-boarding',
      decrease: '/membership-fee/withdrawing'
    },
    suffix: ui.car
  }
]

const _Formatter = new Formatter()


const CardWalletDetails = (props) => {

  useEffect(() => {
    props.onGettingAuctionMembershipInfo()
  }, [])

  const isShowDecreseMembershipFeeButton = props.auction_membership_info?.policy_amount * props.auction_membership_info?.minimum_auction_membership_number < props.auction_membership?.amount

  return <StyledCardWalletDetails
    className={'border radius-8 border-charcoal-100 pb-3 mx-4'}>
    {
      detailsData.map(detailsDataItem => <div key={detailsDataItem.key}
                                              className="card-wallet-details--column d-flex justify-content-center  flex-column border-charcoal-100 align-items-center">
        <h6
          className="text-charcoal-800 card-wallet-details--column--label line-height-20 text-12">{detailsDataItem.label}</h6>

        <div className="d-flex align-items-center">
          {detailsDataItem.icon?.increase &&
            <Link to={detailsDataItem.link.increase} state={'dashboard'} className="d-flex align-items-center">
              <Icon type={detailsDataItem.icon.increase} className="text-yellow-orange text-20"/>
            </Link>}
          <h6
            className="mb-0 font-weight-700 text-14 text-charcoal line-height-20 mx-2">
            {
              props.auction_membership && _Formatter.commaSeparateNumber(props.auction_membership[detailsDataItem.key_service])
            }
            <span className="card-wallet-details--currency text-10">
              {detailsDataItem.type === 'price' && ui.toman}
            </span>
            {detailsDataItem.suffix && <span>{detailsDataItem.suffix}</span>}        </h6>
          {detailsDataItem.icon?.decrease && isShowDecreseMembershipFeeButton &&
            <Link to={detailsDataItem.link.decrease} state={'dashboard'} className="d-flex align-items-center">
              <Icon type={detailsDataItem.icon.decrease} className="text-yellow-orange text-20"/>
            </Link>}
        </div>

      </div>)
    }
  </StyledCardWalletDetails>
}


const mapStateToProps = (state) => ({
  auction_membership: state.wallet.auction_membership,
  auction_membership_info: state.wallet.auction_membership_info
})


const mapDispatchToProps = (dispatch) => ({
  onGettingAuctionMembershipInfo: () => dispatch(onGettingAuctionMembershipInfo())
})


export default connect(mapStateToProps, mapDispatchToProps)(CardWalletDetails)

const StyledCardWalletDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 32px;

  .card-wallet-details--column {
    border-bottom: 1px solid;

    .card-wallet-details--column--label {
      margin-bottom: 10px;
    }

    &:nth-child(odd) {
      border-left: 1px solid;
    }

    &:nth-last-child(-n+2) {
      border-bottom: none !important;
    }

    &:nth-child(-n+2) {
      margin-top: 1rem;
    }

    .card-wallet-details--currency {
      margin-right: 2px;
    }
  }
`

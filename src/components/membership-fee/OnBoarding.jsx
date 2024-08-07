import React, {useEffect} from 'react'
import styled             from 'styled-components'

import ui                               from 'src/assets/dictionaries/ui'
import ImageMemberShip                  from 'src/assets/images/membership-fee/membership-fee.png'
import {Link}                           from 'react-router-dom'
import {connect}                        from 'react-redux'
import BasicButton                      from 'src/ui-kit/button/BasicButton'
import Loading                          from '../loading/Loading'
import {onGettingAuctionMembershipInfo} from 'src/store/wallet/actions/onGettingAuctionMembershipInfo'

const PriceConvertToMillion = (price, count) => (price / 1000000) * count
const OnBoarding = ({type, ...props}) => {

  useEffect(() => {
    !props.auction_membership_info && props.onGettingAuctionMembershipInfo()
  }, [])

  return props.auction_membership_info ? <OnBoardingStyled className={`position-relative d-flex
    flex-column justify-content-center align-items-center`}>
    <div className="wrapper position-relative">
      <div
        className="wrapper__count position-absolute text-orange-crayola">{props.auction_membership_info?.minimum_auction_membership_number}</div>
      <img className="h-100 w-100" src={ImageMemberShip}/>
    </div>
    <div className="content-style text-black text-15 text-center mb-5 pb-5">
      <div> {props.userInfo?.first_name} {ui.membership_fee.content.slice_one}</div>
      <span>{ui.membership_fee.content.slice_two}</span>
      <span className="font-weight-700">{ui.membership_fee.content.slice_three}</span>
      {props.auction_membership_info?.policy_amount && <span>{ui.membership_fee.content.slice_four.format(
        PriceConvertToMillion(
          props.auction_membership_info?.policy_amount,
          props.auction_membership_info?.minimum_auction_membership_number
        ),
        props.auction_membership_info?.minimum_auction_membership_number
      )}</span>}
    </div>
    <footer
      className='mb-4 text-16 position-fixed bottom-0 d-flex w-desktop flex-column px-3 w-100'>

      <Link to={'/membership-fee/settlement'} className='text-white w-100'>
        <BasicButton
          className='bg-orange-crayola on-boarding--footer--link text-center radius-8 text-white  text-16 w-100'>
          {ui.membership_fee.button_membership_fee}
        </BasicButton>

      </Link>


    </footer>

  </OnBoardingStyled> : <OnBoardingStyled className={type === 'bottom-sheet' ? 'membership-fee--loading' : ''}><Loading
    fullScreen/></OnBoardingStyled>
}


const mapStateToProps = state => ({
  userInfo: state.userInfo.appUser.info,
  auction_membership_info: state.wallet.auction_membership_info
})

const mapDispatchToProps = (dispatch) => ({
  onGettingAuctionMembershipInfo: () => dispatch(onGettingAuctionMembershipInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding)

const OnBoardingStyled = styled.div`
  height: 85vh;

  .content-style {
    padding: 0 25px;
    line-height: 22px;
    margin-top: 60px;
  }


  .on-boarding--footer--link {
    padding: 10px 0;
    left: 16px;
    right: 16px;
  }

  .wrapper {
    width: 285px;
    height: 156px;

    &__count {
      font-size: 150px;
      position: absolute;
      left: 52px;
      bottom: -16px;
    }
  }

  &.membership-fee--loading {
    height: 400px;
  }
`

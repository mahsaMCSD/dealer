import React, {useEffect, useState}     from 'react'
import {Outlet}                         from 'react-router-dom'
import {withLocation, withOutlet}       from 'src/utility/routerHooks'
import ModalPage                        from 'src/ui-kit/modal-page/ModalPage'
import membershipFeeRoutes              from './membershipFeeRoutes'
import {connect}                        from 'react-redux'
import {onGettingAuctionMembershipInfo} from 'src/store/wallet/actions/onGettingAuctionMembershipInfo'
import {onGettingWalletsBalance}        from 'src/store/wallet/actions/onGettingWalletsBalance'
import {onGettingConfirm}               from 'src/store/userInfo/appUser/actions/onGettingConfirm'

const OutletMembershipFee = (props) => {
  if (!props?.outlet) {
    return null
  }

  const [isReferrerGateways, onToggleIsReferrerGateways] = useState(!!document.referrer.includes('gateways'))

  useEffect(() => {
    onToggleIsReferrerGateways(!!document.referrer.includes('gateways'))
  }, [document.referrer, props.location.pathname])


  let pathname = props.location.pathname
  if (props.location.pathname.includes('/?')) {
    pathname.replace('/?', '')
  }
  const thisRoute = pathname.split('/')
    .reverse()[0]
    || props.location.pathname.split('/')
      .reverse()[1]

  const foundRoute = membershipFeeRoutes.find(item => item?.path === thisRoute)

  useEffect(() => {
    props.onGettingAuctionMembershipInfo()
    if (isReferrerGateways) {
      props.onGettingWalletsBalance()
    }
    props.onGettingConfirm()
  }, [])


  return <ModalPage isShowLogOut={!props.is_confirmed} {...foundRoute} {...props}>
    <Outlet isBlockPage={!props.is_confirmed}/>
  </ModalPage>
}

const mapStateToProps = (state) => ({
  is_having_membership: state.userInfo.appUser.is_having_membership,
  is_confirmed: state.userInfo.appUser.is_confirmed
})

const mapDispatchToProps = (dispatch) => ({
  onGettingAuctionMembershipInfo: () => dispatch(onGettingAuctionMembershipInfo()),
  onGettingWalletsBalance: () => dispatch(onGettingWalletsBalance()),
  onGettingConfirm: () => dispatch(onGettingConfirm())
})

export default withOutlet(withLocation(connect(mapStateToProps, mapDispatchToProps)(OutletMembershipFee)))

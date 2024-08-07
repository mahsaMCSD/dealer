import React, {useCallback, useEffect, useState} from 'react'
import ui                                        from 'src/assets/dictionaries/ui'
import Icon                                      from 'src/ui-kit/Icon'
import styled                                    from 'styled-components'
import InputPlusMinus                            from 'src/ui-kit/input-plus-minus/InputPlusMinus'
import BasicButton                               from 'src/ui-kit/button/BasicButton'
import Formatter                                 from 'src/utility/Formatter'
import {connect}                                 from 'react-redux'
import PropTypes                                 from 'prop-types'
import Loading                                   from '../loading/Loading'
import BottomSheetMessage                        from 'src/ui-kit/bottom-sheet-message/BottomSheetMessage'
import {useSearchParams}                         from 'react-router-dom'
import {postAuctionDeposit}                      from 'src/api/services/payment'
import {NotificationManager}                     from 'src/ui-kit/notifications'
import {onGettingWalletsBalance}                 from 'src/store/wallet/actions/onGettingWalletsBalance'
import userAgentDetection                        from 'src/utility/userAgentDetection'

const infoPage = {
  step: 1000000,
  maximum: 49000000
}

const _Formatter = new Formatter()


const schemaResultSuccess = {
  isSuccess: true,
  isActiveOnClose: false,
  submitButton: [
    {
      key: 'enter-auctions',
      link: '/dashboard/competing/auctions',
      isOnClose: '',
      title: ui.membership_fee.result.title_submit_success,
      classes: 'text-yellow-orange bg-white'
    }
  ]
}

const schemaResultSuccessFirstLogin = {
  isSuccess: true,
  isActiveOnClose: false,
  submitButton: [
    {
      key: 'enter-auctions',
      link: userAgentDetection(window.navigator.userAgent) === 'ios'
            ? '/add-to-on-boarding-screen'
            : '/terms-condition',
      isOnClose: '',
      title: ui.membership_fee.result.title_submit_success,
      classes: 'text-yellow-orange bg-white'

    }
  ]
}

const schemaResultUnSuccess = {
  isSuccess: false,
  isActiveOnClose: false,
  submitButton: [
    {
      key: 'enter-membership-fee',
      link: '',
      isOnClose: true,
      title: ui.membership_fee.result.title_submit_un_success,
      classes: 'text-yellow-orange bg-white'
    }
  ]
}

const schemaResult = {
  'online': {
    '1': {
      titleMessage: ui.membership_fee.result.success_message,
      ...schemaResultSuccess
    },
    '0': {
      titleMessage: ui.membership_fee.result.un_success_message,
      ...schemaResultUnSuccess
    },
    '2': {
      titleMessage: ui.membership_fee.result.success_message,
      ...schemaResultSuccessFirstLogin
    }
  },
  'use_wallet': {
    '1': {
      titleMessage: ui.membership_fee.result.success_message_use_wallet,
      ...schemaResultSuccess
    },
    '0': {
      titleMessage: ui.membership_fee.result.un_success_message_use_wallet,
      ...schemaResultUnSuccess
    }
  }
}

const MembershipFee = ({type, ...props}) => {
  const [searchParams] = useSearchParams()
  const [isLoading, onChangeIsLoading] = useState(false)
  const [price, onChangePrice] = useState(props?.membershipInfo
                                          ? props?.membershipInfo?.policy_amount * props?.membershipInfo?.minimum_auction_membership_number
                                          : 0)
  const [isDisableOnSubmit, onToggleIsDisableOnSubmit] = useState(!!(type !== 'online' && (props?.balance < price)))
  const [isOpenBottomSheetMessage, onToggleIsOpenBottomSheetMessage] = useState(!!searchParams.get('bottom-sheet'))

  const [dataBottomSheet, onChangeDataBottomSheet] = useState(searchParams.get('bottom-sheet'))
  const [isFirstLogin, onChangeIsFirstLogin] = useState(!!searchParams.get('is_first_login'))

  const handleChange = useCallback((e) => {
    onChangePrice(e.target.value)
  }, [])

  useEffect(() => {
    props.membershipInfo && onChangePrice(props.membershipInfo.policy_amount * props.membershipInfo.minimum_auction_membership_number)
  }, [props.membershipInfo])

  useEffect(() => {
    onToggleIsDisableOnSubmit(!!(type !== 'online' && (props?.balance < price)))
  }, [props, price])

  useEffect(() => {
    if (schemaResult[type][searchParams.get('bottom-sheet')]) {
      onToggleIsOpenBottomSheetMessage(!!searchParams.get('bottom-sheet'))
      let statusResultMessage = searchParams.get('bottom-sheet')
      if (searchParams.get('bottom-sheet') === '1' && isFirstLogin) {
        statusResultMessage = '2'
      }
      onChangeDataBottomSheet(schemaResult[type][statusResultMessage])
    }
    onChangeIsFirstLogin(!!searchParams.get('is_first_login'))
  }, [searchParams, props.is_confirmed])

  const onSubmit = useCallback(() => {
    if (isDisableOnSubmit) return false
    onChangeIsLoading(true)
    let body = {
      amount: price,
      use_wallet: type !== 'online',
      platform: 11,
      route: `membership-fee/settlement?bottom-sheet={status}${!props.is_confirmed && '&is_first_login=true' || ''}`
    }

    if (type !== 'online') {
      body = {
        ...body,
        wallet_balance: props.balance
      }
    }
    postAuctionDeposit(body)
      .then((res) => {
        if (res.redirect_to_gateway) {
          window.location.replace(res.url)
        } else {
          props.onGettingWalletsBalance()
          onToggleIsOpenBottomSheetMessage(true)
          onChangeDataBottomSheet(schemaResult[type]['1'])
        }
      })
      .catch(() => {
        NotificationManager.error('error')
      })
      .finally(() => {
        onChangeIsLoading(false)
      })
  }, [price, type, isDisableOnSubmit])

  const onCloseBottomSheetMessage = useCallback(() => {
    onToggleIsOpenBottomSheetMessage(false)
  }, [price])


  useEffect(() => {
    ((!props.balance && type !== 'online') || (isOpenBottomSheetMessage && !props.auction_membership)) && props.onGettingWalletsBalance()
  }, [type, isOpenBottomSheetMessage])

  return <StyledMembershipFee className={'position-relative w-desktop d-flex flex-column overflow-auto'}>
    {
      props.membershipInfo ?
      <>
        <div className="d-flex flex-column align-items-center pt-4 mx-3">
          <h6 className="line-height-24 text-14 text-center">
            {props.userInfo?.first_name} {ui.membership_fee.settlement.dear}
            <br/>
            {ui.membership_fee.settlement.description}
            <span
              className="font-weight-700">{ui.membership_fee.settlement.description_1.format(props.membershipInfo?.minimum_auction_membership_number)}</span>
            {ui.membership_fee.settlement.description_2}
          </h6>
        </div>
        {
          type === 'online' ?

          <Icon type={'card2'} className={'membership-fee--icon d-block text-charcoal text-center'}/>
                            :
          <div
            className="mx-21px my-4 bg-black-50 d-flex flex-column align-items-center border border-black-100 radius-8 membership-fee--offline">
            <h6 className="text-black-800 text-14 mb-2 line-height-24">
              {ui.membership_fee.settlement.cash_wallet}
            </h6>
            <h5 className="text-yellow-orange text-22 ">
                    <span className="font-weight-700 ms-1">

          {_Formatter.commaSeparateNumber(props.balance)}
                    </span>
              {ui.toman}
            </h5>
          </div>
        }

        <InputPlusMinus className={'mx-21px'}
                        step={infoPage.step}
                        value={price}
                        minimum={props.membershipInfo?.minimum_auction_membership_number * props.membershipInfo?.policy_amount}
                        maximum={infoPage.maximum}
                        initialCounter={props.membershipInfo?.minimum_auction_membership_number * props.membershipInfo?.policy_amount}
                        handleChange={handleChange}
                        label={ui.membership_fee.settlement.membership_deposit}/>
        <h6
          className="border-charcoal-200 border-bottom d-block mx-auto mt-3 text-center text-black-800 membership-fee--count-auction text-15">
          <span>{ui.membership_fee.settlement.limitation_auction}</span> : {price / props.membershipInfo?.policy_amount}
        </h6>
        {isOpenBottomSheetMessage &&
        <BottomSheetMessage title={ui.membership_fee.result.title}
                            isOpen={isOpenBottomSheetMessage}
                            onClose={onCloseBottomSheetMessage}
                            {...dataBottomSheet}
        >
          {dataBottomSheet?.isSuccess && <div className="text-center mb-4">
            <p className="mb-2 text-12">{ui.transaction_page.details_data.limit_auctions}: <span
              className="font-weight-700 text-16">{props.auction_membership?.count} {ui.car}</span>
            </p>
            <p className="mb-1 text-12">{ui.transaction_page.details_data.deposit_membership}: <span
              className="font-weight-700 text-16">{_Formatter.commaSeparateNumber(props.auction_membership?.amount)}</span>
              <span className="text-10 me-1">{ui.toman}</span>
            </p>
          </div>
          }
        </BottomSheetMessage>
        }
        <footer className="bottom-0 right-0 w-desktop position-fixed left-0 px-3 pb-4">
          <BasicButton isLoading={isLoading} onClick={onSubmit}
                       className={`radius-8  radius-8 membership-fee--btn-submit ${isDisableOnSubmit
                                                                                   ? 'bg-charcoal-200'
                                                                                   : 'bg-orange-crayola'} d-flex text-white w-100 text-16 justify-content-center align-items-center`}>
            {type === 'online' ? <>
              {ui.membership_fee.settlement.settlement}
              <span className="mx-1">{_Formatter.commaSeparateNumber(price)}</span>
              <span className="text-10">{ui.toman}</span>
            </> : <>
               {
                 isDisableOnSubmit
                 ? ui.membership_fee.settlement.withdraw
                 : ui.membership_fee.settlement.withdraw_from_the_wallet
               }
             </>}
          </BasicButton>
        </footer>
      </>
                           : <div className="membership-fee--loading"><Loading fullScreen/></div>

    }
  </StyledMembershipFee>
}

MembershipFee.defaultProps = {
  type: 'online'
}

MembershipFee.prototype = {
  type: PropTypes.oneOf(['online', 'use_wallet']).isRequired
}

const mapStateToProps = state => ({
  userInfo: state.userInfo.appUser.info,
  membershipInfo: state.wallet.auction_membership_info,
  balance: state.wallet.balance,
  auction_membership: state.wallet.auction_membership,
  is_confirmed: state.userInfo.appUser.is_confirmed
})

const mapDispatchToProps = (dispatch) => ({
  onGettingWalletsBalance: () => dispatch(onGettingWalletsBalance())
})


export default connect(mapStateToProps, mapDispatchToProps)(MembershipFee)

const StyledMembershipFee = styled.div`
  padding-bottom: 30px;

  .membership-fee--loading {
    height: calc(100vh - 200px);
    width: 100vw;
  }

  .membership-fee--icon {
    font-size: 102px;
    margin-top: 55px;
    margin-bottom: 77px;
  }

  .membership-fee--btn-submit {
    padding: 10px 0;
    width: inherit;
  }

  .membership-fee--count-auction {
    width: calc(100% - 150px);
    padding-bottom: 12px;
    margin-bottom: 32px;
  }

  .mx-21px {
    margin-left: 21px;
    margin-right: 21px;
  }

  .membership-fee--offline {
    padding: 12px;
  }
`

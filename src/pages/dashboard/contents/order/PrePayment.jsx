import React, {useCallback, useEffect, useState} from 'react'
import styled                                    from 'styled-components'
import {useNavigate, useParams}                  from 'react-router-dom'
import ui                                        from 'src/assets/dictionaries/ui'
import ModalPage                                 from 'src/ui-kit/modal-page/ModalPage'
import {getDataPaymentBySlug, postPayPrePayment} from 'src/api/services/payment'
import Icon                                      from 'src/ui-kit/Icon'
import Formatter                                 from 'src/utility/Formatter'
import SwitchFilter                              from '../competing/filters/SwitchFilter'
import LabelFilter                               from '../competing/filters/LabelFilter'
import InputPlusMinus                            from 'src/ui-kit/input-plus-minus/InputPlusMinus'
import CountDownLine                             from 'src/ui-kit/count-down-time/CountDownLine'
import Loading                                   from 'src/components/loading/Loading'
import {NotificationManager}                     from 'src/ui-kit/notifications'
import PrePaymentFooter                          from 'src/components/dashboard/order/pre-payment/PrePaymentFooter'

const _Formatter = new Formatter()

const infoPage = {
  step: 1000000, minimum: 10000000, maximum: 49000000, is_secondary_payment: false
}
const initialPrepayment = {
  data: {},
  isLoading: true,
  submitLoading: false,
  useWallet: false,
  paidAmount: 0,
  remainingAmount: 0,
  walletPrice: 0
}

const PrePayment = () => {
  const {paymentSlug} = useParams()
  const history = useNavigate()
  const [prepayment, setPrepayment] = useState(initialPrepayment)
  const [onlinePrice, onChangeOnlinePrice] = useState()
  const [isWalletDisabled, onChangeIsWalletDisabled] = useState(true)
  const dataSlug = useCallback(() => {
    getDataPaymentBySlug(paymentSlug)
      .then((res) => {
        setPrepayment(prevState => ({...prevState, data: res, isLoading: false}))
        res?.amount && res?.paid_amount && onChangeOnlinePrice(res.amount - res.paid_amount)
        onChangeIsWalletDisabled(!!!res?.wallet_balance)
      })
      .catch(() => setPrepayment(prevState => ({...prevState, data: null, isLoading: false})))
  }, [paymentSlug])

  useEffect(() => {
    paymentSlug && dataSlug()
    return () => {
      setPrepayment(initialPrepayment)
    }
  }, [])

//amount can only be prepayment for first payment, so we need to consider paid_amount for nth prepayment -> amount-paid_amount
  const changeOnlinePrice = () => {
    let {amount, wallet_balance, paid_amount} = prepayment?.data
    let newOnlinePrice
    if (prepayment.useWallet) {
      if (wallet_balance >= amount - paid_amount) {
        newOnlinePrice = 0
      } else if (((amount - paid_amount) - wallet_balance) > infoPage.maximum) {
        newOnlinePrice = infoPage.maximum
      } else {
        newOnlinePrice = (amount - paid_amount) - wallet_balance
      }
    } else if (amount - paid_amount > infoPage.maximum) {
      newOnlinePrice = infoPage.maximum
    } else {
      newOnlinePrice = amount - paid_amount
    }
    onChangeOnlinePrice(newOnlinePrice)

  }

  useEffect(() => {
    changeOnlinePrice()
  }, [prepayment.useWallet, prepayment?.data?.amount, prepayment?.data?.paid_amount])

  useEffect(() => {
    checkPaymentPrice()
  }, [prepayment.useWallet, prepayment?.data?.amount, prepayment?.data?.paid_amount, onlinePrice])

  const checkPaymentPrice = useCallback(() => {
    let {amount, wallet_balance, paid_amount} = prepayment?.data
    let newData = {}
    if (prepayment && prepayment.useWallet) {
      if (wallet_balance >= amount - paid_amount) {
        newData = {
          paidAmount: amount - paid_amount,
          remainingAmount: wallet_balance === amount - paid_amount ? amount - paid_amount : 0,
          walletPrice: amount - paid_amount
        }
      } else {
        newData = {
          paidAmount: wallet_balance + onlinePrice,
          remainingAmount: (amount - paid_amount) - (wallet_balance + onlinePrice),
          walletPrice: wallet_balance
        }
      }
    } else {
      newData = {
        paidAmount: onlinePrice, remainingAmount: (amount - paid_amount) - onlinePrice
      }
    }

    setPrepayment(prevState => ({...prevState, ...newData}))

  }, [prepayment.useWallet, onlinePrice])
  const checkMaximum = useCallback(() => {
    let {amount, wallet_balance, paid_amount} = prepayment?.data
    if (amount - paid_amount > infoPage.maximum) {
      if (prepayment.useWallet) {
        if (wallet_balance < amount - paid_amount) {
          return infoPage.maximum
        } else {
          return 0
        }
      } else {
        return infoPage.maximum
      }
    } else if (prepayment.useWallet) {
      if (wallet_balance < amount - paid_amount) {
        return ((amount - paid_amount) - wallet_balance)
      } else {
        return 0
      }
    } else {
      return (amount - paid_amount)
    }
  }, [prepayment?.data?.amount, prepayment?.data?.paid_amount, prepayment.useWallet])

  const checkMinimum = useCallback(() => {
    let {wallet_balance} = prepayment?.data
    if (prepayment.useWallet && wallet_balance >= infoPage.minimum) {
      return 0
    } else if (prepayment && prepayment.useWallet && wallet_balance < infoPage.minimum) {
      return infoPage.minimum - wallet_balance
    } else {
      return infoPage.minimum
    }
  }, [prepayment?.data?.amount, prepayment?.data?.wallet_balance, prepayment.useWallet])

  const checkPaymentType = () => {
    if (prepayment.useWallet) {
      if (onlinePrice) {
        return 'onlineWallet'
      } else {
        return 'use_wallet'
      }
    } else {
      return 'online'
    }
  }

  const onSubmit = () => {
    if (!prepayment.submitLoading) {
      setPrepayment(prevState => ({...prevState, submitLoading: true}))
      postPayPrePayment({
        payment_slug: paymentSlug,
        route: `dashboard/myOrders/readyToPay/?status=wait-settlement-and-settlement&bottom-sheet={status}&type=${checkPaymentType()}&slug=${paymentSlug}`,
        platform: 11,
        use_wallet: prepayment.useWallet,
        amount: prepayment.useWallet ? prepayment.walletPrice + onlinePrice : onlinePrice,
        wallet_balance: prepayment?.data?.wallet_balance
      })
        .then((res) => {
          if (res.redirect_to_gateway) {
            window.location.replace(res.url)
          } else {
            history(`/dashboard/myOrders/readyToPay/?status=wait-settlement-and-settlement&bottom-sheet=1&type=${checkPaymentType()}&slug=${paymentSlug}`)
          }
        })
        .catch((errors) => {
          errors.data.map(error => NotificationManager.error(error))
        })
        .finally(() => setPrepayment(prevState => ({...prevState, submitLoading: false})))
    }
  }

  const handleChange = useCallback((e) => {
    onChangeOnlinePrice(e.target.value)
  }, [onlinePrice])

  return <ModalPage header={{
    title: ui.on_boarding_payment?.title, is_back: true
  }}>
    <MainPaymentTabs
      className="d-flex flex-column align-items-center justify-content-center">
      {!prepayment.isLoading ? <div className="w-100 position-relative">
        <>
          <div className="mx-3">
            {prepayment?.data?.paid_amount > 0 && <div>
              <CountDownLine valid_until={prepayment.data.valid_until}
                             type={0}/>
              <label className="text-15 text-black-800">{ui.prepayment_page.maximum_prepayment_time_until_24}</label>
            </div>}
            <div
              className={`d-flex ${prepayment?.data?.paid_amount > 0
                                   ? 'justify-content-center gap-4'
                                   : 'flex-column justify-content-center'} w-100  align-items-center  bg-black-50 border border-charcoal-100 total-price`}>
              <Icon className="mb-2 text-46" type={'iconCreditCard1'}/>
              <div className="d-flex flex-column align-items-center">
                <h6 className="mb-2 text-18">{prepayment?.data?.paid_amount > 0
                                              ? ui.prepayment_page.remaining_prepayment
                                              : ui.prepayment_page.total_prepayment}</h6>
                <h6
                  className="font-weight-bold text-18">{_Formatter.commaSeparateNumber(
                  prepayment?.data?.amount - prepayment?.data?.paid_amount)} {ui.toman}</h6>
              </div>

            </div>

            <SwitchFilter icon={'emptyWallet'}
                          label={ui.filter.wallet_credit}
                          name="best_condition"
                          isChecked={prepayment.useWallet}
                          isDisable={isWalletDisabled}
                          className={`mx-0 py-0 ${isWalletDisabled ? 'opacity-50' : ''}`}
                          handleChange={(e) => setPrepayment({
                            ...prepayment, useWallet: e.isChecked
                          })}/>
            <span
              className={`text-black-600 text-15 me-5 ${isWalletDisabled
                                                        ? 'opacity-50'
                                                        : ''}`}> {_Formatter.commaSeparateNumber(prepayment?.data?.wallet_balance)} {ui.toman}</span>
            <div className="my-3 border border-charcoal-100"/>
            <LabelFilter className="text-xl-24 text-28" label={ui.prepayment_page.online_charge} icon="card2"/>
            <InputPlusMinus className={'mx-21px mb-2'}
                            step={infoPage.step}
                            minimum={checkMinimum()}
                            maximum={checkMaximum()}
                            initialCounter={onlinePrice}
                            value={onlinePrice}
                            handleChange={handleChange}
                            label={ui.toman}/>
            {onlinePrice >= infoPage.maximum &&
            <label
              className="text-12 text-black-800 line-height-24">{ui.prepayment_page.there_is_no_possibility_for_more_than_49_million_due_to_limitations_of_bank}</label>}
          </div>
          <PrePaymentFooter prepayment={prepayment} onlinePrice={onlinePrice} onSubmit={onSubmit}/>
        </>

      </div> : <Loading fullScreen/>}
    </MainPaymentTabs>
  </ModalPage>
}

export default PrePayment

const MainPaymentTabs = styled.div`
  padding-bottom: 165px;

  .total-price {
    border-radius: 8px;
    padding: 12px 0;
    margin-bottom: 16px;
    margin-top: 16px;
  }


`

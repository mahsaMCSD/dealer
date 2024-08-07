import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled                                            from 'styled-components'

import {getDepositBalanceInfoServices, postRefundDepositServices} from 'src/api/services/payment'
import ui                                                         from 'src/assets/dictionaries/ui'
import Loading                                                    from 'src/components/loading/Loading'
import BottomSheetMessage
                                                                  from 'src/ui-kit/bottom-sheet-message/BottomSheetMessage'
import BasicButton                                                from 'src/ui-kit/button/BasicButton'
import MatInput                                                   from 'src/ui-kit/mat-input/MatInput'
import Modal                                                      from 'src/ui-kit/modal/Modal'
import Formatter                                                  from 'src/utility/Formatter.js'

import MembershipFeeBalanceCard from './membership-fee-balance-card/MembershipFeeBalanceCard'
import MembershipFeeWithdrawConfirmModalContent
                                from './membership-fee-withdraw-confirm-modal-content/MembershipFeeWithdrawConfirmModalContent'

const _Formatter = new Formatter()

const MODAL_TYPE = {
  CONFIRM: 'confirm',
  SUCCESS: 'success'
}

const MembershipFeeWithdrawing = () => {
  const [isConfirmLoading, setIsConfirmLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [membershipFeeBalance, setMembershipFeeBalance] = useState({})
  const [modalType, setModalType] = useState(null)
  const [priceInputErrorMessage, setPriceInputErrorMessage] = useState('')
  const [priceInputValue, setPriceInputValue] = useState('')

  const hasInputError = useRef(false)

  const priceInputValidation = useCallback(
    (value) => value == 0 || !Number.isInteger(value / 1000000)
               ? ui.money_transfer_amount_coefficient_error_message.format(`۱ ${ui.million}`)
               : value > membershipFeeBalance.cachable_deposit ? ui.less_membership_fee_balance_error_message : ''
    ,
    [membershipFeeBalance]
  )

  const onPriceInputChange = useCallback(
    (event) => {
      hasInputError.current = event.error
      const normalizedValue = Number(event.target.value.replaceAll(',', '')) ? Number(event.target.value.replaceAll(
        ',',
        ''
      )) : event.target.value
      setPriceInputValue(normalizedValue)
      setPriceInputErrorMessage(false)
    },
    [setPriceInputValue]
  )

  const closeModal = useCallback(
    () => {
      if (modalType === MODAL_TYPE.SUCCESS) {
        setPriceInputValue('')
        getDepositBalanceInfo()
      }
      setModalType(null)
    },
    [setModalType]
  )

  const onConfirm = useCallback(
    () => {
      setIsConfirmLoading(true)
      postRefundDepositServices({amount: priceInputValue})
        .then((res) => {
          setModalType(MODAL_TYPE.SUCCESS)
        })
        .finally(() => { setIsConfirmLoading(false) })
    },
    [priceInputValue]
  )

  const onClickHandler = useCallback(
    () => {
      const errorMessage = priceInputValidation(priceInputValue)

      if (errorMessage) {
        setPriceInputErrorMessage(errorMessage)
      } else {
        setPriceInputErrorMessage('')
        setModalType(MODAL_TYPE.CONFIRM)
      }
    },
    [priceInputValidation, priceInputValue]
  )

  const getDepositBalanceInfo = () => {
    getDepositBalanceInfoServices()
      .then((res) => {
        setMembershipFeeBalance(res)
        setLoading(false)
      })
  }

  useEffect(() => {
    getDepositBalanceInfo()
  }, [])


  const getModal = () => {
    switch (modalType) {
      case MODAL_TYPE.CONFIRM:
        return <Modal closeModal={closeModal} openModal={modalType === MODAL_TYPE.CONFIRM}
                      title={ui.transfer_money_to_wallet}>
          <MembershipFeeWithdrawConfirmModalContent
            data={{amount: priceInputValue}}
            loading={isConfirmLoading}
            onConfirm={onConfirm}
            setModalType={setModalType}
          />
        </Modal>

      case MODAL_TYPE.SUCCESS:
        return <BottomSheetMessage title={ui.money_transfer}
                                   isOpen={modalType === MODAL_TYPE.SUCCESS}
                                   onClose={closeModal}
                                   submitButton={[
                                     {
                                       key: 'back-link',
                                       link: '/dashboard/userPanel/wallet',
                                       title: ui.back_to_wallet
                                     }
                                   ]}
                                   titleMessage={ui.money_transfer_to_wallet_success_message}
        >
          <p
            className="text-16 font-weight-700 text-center py-2">{ui.transfer_amount} : {_Formatter.commaSeparateNumber(
            priceInputValue)} {ui.toman}</p>
        </BottomSheetMessage>
    }
  }

  const isButtondisabled = hasInputError.current || !priceInputValue

  return loading ? <Loading fullScreen/> : (
    <StyledMembershipFeeWithdrawing>
      <div className="h-100 d-flex flex-column justify-content-between px-3 pt-4">
        <MembershipFeeBalanceCard
          className="mx-3"
          data={membershipFeeBalance}

        />
        <MatInput
          classNameInput="m-0"
          label={`${ui.transfer_amount} (${ui.toman})`}
          onChange={onPriceInputChange}
          type={'price'}
          value={priceInputValue}
        />
        <p className="text-12 font-weight-700 text-red-800">{priceInputErrorMessage}</p>
      </div>

      <footer className="bottom-0 right-0 w-desktop position-fixed left-0 px-3 pb-4">
        <BasicButton
          className={`btn ${isButtondisabled
                            ? 'bg-charcoal-200'
                            : 'bg-yellow-orange-dark'}
                            submit-footer
                            d-flex text-white w-100 text-16 justify-content-center align-items-center
                            `}
          disabled={isButtondisabled}
          onClick={onClickHandler}
        >
          {ui.transfer_money_to_wallet}
        </BasicButton>
      </footer>

      {getModal()}
    </StyledMembershipFeeWithdrawing>
  )
}

export default (MembershipFeeWithdrawing)

const StyledMembershipFeeWithdrawing = styled.div`
  .submit-footer {
    padding: 10px 0;
    width: inherit;
  }

`

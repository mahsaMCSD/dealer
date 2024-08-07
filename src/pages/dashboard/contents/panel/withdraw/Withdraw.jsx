import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled                                            from 'styled-components'

import {getListWithdrawAccountService}                           from 'src/api/services/bankAccount'
import {getCashableWalletsBalanceServices, postWithdrawServices} from 'src/api/services/payment'
import ui                                                        from 'src/assets/dictionaries/ui'
import Loading                                                   from 'src/components/loading/Loading'
import CardAccount
                                                                 from 'src/pages/dashboard/contents/Profile/ManagementProfile/bank-accounts/CardAccount'
import BottomSheetMessage
                                                                 from 'src/ui-kit/bottom-sheet-message/BottomSheetMessage'
import MatInput                                                  from 'src/ui-kit/mat-input/MatInput'
import Modal                                                     from 'src/ui-kit/modal/Modal'
import {NotificationManager}                                     from 'src/ui-kit/notifications'
import WalletBalanceCard                                         from 'src/ui-kit/wallet-balance-card/WalletBalanceCard'
import Formatter                                                 from 'src/utility/Formatter.js'
import ButtonFixedBottom                                         from 'src/ui-kit/ButtonFixedBottom'

import WithdrawConfirmModalContent from './withdraw-confirm-modal-content/WithdrawConfirmModalContent'


const _Formatter = new Formatter()

export const MODAL_TYPE = {
  CONFIRM: 'confirm',
  SUCCESS: 'success'
}

const Withdraw = () => {
  const [modalType, setModalType] = useState(null)
  const [isConfirmLoading, setIsConfirmLoading] = useState(false)
  const [accountList, setAccountList] = useState([])
  const [balance, setBalance] = useState({})
  const [isAccountListLoading, setIsAccountListLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [priceInputErrorMessage, setPriceInputErrorMessage] = useState('')
  const [priceInputValue, setPriceInputValue] = useState('')
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0)

  const hasInputErrorRef = useRef(false)

  const getAccountList = useCallback(() => {
    setIsAccountListLoading(true)
    getListWithdrawAccountService()
      .then((res) => {
        setAccountList(res)
      })
      .finally(() => setIsAccountListLoading(false))
  }, [])

  const getBlance = useCallback(
    () => {
      setIsLoading(true)
      getCashableWalletsBalanceServices()
        .then((res) => {
          setBalance(res)
          if (res.cashable <= 1000000) {
            if (res.cashable < 1000) {
              hasInputErrorRef.current = true
              setPriceInputValue(res.cashable)
              setPriceInputErrorMessage(ui.error_message_of_amount_below_one_thousand)
            } else {
              setPriceInputValue(res.cashable)
              setPriceInputErrorMessage(ui.withdraw_under_one_million_error_message)
            }
          }
          setIsLoading(false)
        })
    },
    [getCashableWalletsBalanceServices]
  )


  useEffect(() => {
    getBlance()
    getAccountList()
  }, [getAccountList, getBlance])

  const priceInputValidation = useCallback(
    (value) => value > 20000000
               ? ui.withdraw_limit_daily_error_message
               : value > balance.cashable
                 ? ui.withdraw_less_wallet_balance_error_message
                 : balance.cashable > 1000000 && value < 1000000
                   ? ui.error_message_of_amount_below_one_million
                   : ''
    ,
    [setPriceInputErrorMessage, balance.cashable]
  )

  const onPriceInputChange = useCallback(
    (event) => {
      if (priceInputErrorMessage) {
        setPriceInputErrorMessage('')
      }
      hasInputErrorRef.current = event.error
      const normalizedValue = Number(event.target.value.replaceAll(',', '')) ? Number(event.target.value.replaceAll(
        ',',
        ''
      )) : event.target.value
      setPriceInputValue(normalizedValue)
    },
    [setPriceInputValue, priceInputErrorMessage]
  )

  const onButtonClick = useCallback(
    () => {
      const errorMessage = priceInputValidation(priceInputValue)

      if (errorMessage) {
        setPriceInputErrorMessage(errorMessage)
      } else {
        balance.cashable > 1000000 && setPriceInputErrorMessage('')
        setModalType(MODAL_TYPE.CONFIRM)
      }
    },
    [priceInputValidation, priceInputValue]
  )

  const closeModal = useCallback(
    () => {
      if (modalType === MODAL_TYPE.SUCCESS) {
        setPriceInputValue('')
        getBlance()
      }
      setModalType(null)
    },
    [setModalType, modalType, getBlance]
  )

  const onConfirm = useCallback(
    () => {
      setIsConfirmLoading(true)
      postWithdrawServices({amount: priceInputValue, bank_account: accountList[selectedAccountIndex].slug})
        .then(() => setModalType(MODAL_TYPE.SUCCESS))
        .catch((res) => {
          NotificationManager.error(res.data?.result?.message || ui.message_status_error.default)
          setModalType(null)
        })
        .finally(() => setIsConfirmLoading(false))

    },
    [setModalType, accountList, selectedAccountIndex, priceInputValue]
  )

  const getModal = () => {
    switch (modalType) {
      case MODAL_TYPE.CONFIRM:
        return <Modal closeModal={closeModal} openModal={modalType === MODAL_TYPE.CONFIRM}
                      title={ui.cash_withdraw}>
          <WithdrawConfirmModalContent
            data={{
              amount: priceInputValue,
              nameOfUser: accountList[selectedAccountIndex]?.full_name,
              bankName: accountList[selectedAccountIndex]?.bank.title
            }}
            loading={isConfirmLoading}
            onConfirm={onConfirm}
            onCancel={closeModal}
          />
        </Modal>

      case MODAL_TYPE.SUCCESS:
        return <BottomSheetMessage title={ui.cash_withdraw}
                                   isOpen={modalType === MODAL_TYPE.SUCCESS}
                                   onClose={closeModal}
                                   titleMessage={ui.withdraw_success_message}
        >
          <p
            className="text-16 font-weight-700 text-center py-2">{ui.amountـwithdrawn} : {_Formatter.commaSeparateNumber(
            priceInputValue)} {ui.toman}</p>
          <p className="text-14 text-black-800 text-center pb-2">{ui.withdraw_success_info_message}</p>

        </BottomSheetMessage>
    }
  }

  const isInputDisabled = accountList.length === 0 || balance.cashable <= 1000000
  const isButtonDisabled = accountList.length === 0 || hasInputErrorRef.current || !priceInputValue

  return isLoading ? <Loading fullScreen/> : (
    <RootWithdraw className="pt-4">
      <div className="d-flex withdraw-main flex-column px-3">

        <WalletBalanceCard
          className="mx-3 mb-4"
          nonwithdrawable={{
            title: ui.nonwithdrawable,
            amount: balance.blocked
          }} walletBalance={{
          title: ui.wallet_balance,
          amount: balance.balance
        }} withdrawable={{
          title: ui.withdrawable,
          amount: balance.cashable
        }}/>
        <p className="text-14">{accountList.length === 0
                                ? ui.not_exist_confirmed_account_number
                                : `${ui.confirmed_accounts_number}:`}</p>
        <div className="account-list--wrapper">
          <div className="account-list">
            {isAccountListLoading ? <Loading/> : accountList.map((account, index) => <div
              className={`${selectedAccountIndex === index ? 'selected' : ''}`}
              key={account.card_number || account.iban}
              onClick={() => { setSelectedAccountIndex(index) }}>
              <CardAccount
                numberAccount={account.card_number || account.iban}
                key={account.slug}
                logo={account.bank.logo}
                detailAccount={`${account.bank.title ? `${account.bank.title} - ` : ''}  ${account.full_name}`}
                showOnly
              />
            </div>)}
          </div>
          {accountList.length > 2 && <div className="account-list--shadow"/>}
        </div>

        <div className="input-wrpper mb-3">
          <MatInput label={`${ui.amountـwithdrawn} (${ui.toman})`}
                    type={'price'}
                    onChange={onPriceInputChange}
                    value={`${priceInputValue}`}
                    classNameInput="m-0"
                    disabled={isInputDisabled}
          />
          {priceInputErrorMessage
           ? <p className="text-12 font-weight-700 text-red-800">{priceInputErrorMessage}</p>
           : ''}
        </div>
      </div>

      <ButtonFixedBottom isDisable={isButtonDisabled} onClick={onButtonClick}
                         errorMessage={!accountList.length && !isAccountListLoading && ui.no_account_in_withdraw_error_message}>
        {ui.withdraw}
      </ButtonFixedBottom>
      {getModal()}
    </RootWithdraw>
  )
}

export default Withdraw

const RootWithdraw = styled.div`
  .withdraw-main {
    height: calc(100vh - 110px);
    overflow-y: scroll;
    padding-bottom: 70px;
  }

  .account-list--wrapper {
    height: auto;
    max-height: 140px;
    position: relative;

    .account-list {
      height: 100%;
      overflow: scroll;
    }

    .account-list--shadow {
      width: 100vw;
      height: 1px;
      box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.08);
      position: absolute;
      top: 140px;
      right: -16px;
    }
  }

  .selected {
    & > div {
      border: 1px solid var(--yellow-orange-dark) !important;

      & > div {
        &:last-child {
          background: var(--yellow-orange-50) !important;
        }
      }
    }
  }

  .input-wrapper {
    & > div {
      margin-bottom: 0.5rem !important;
    }
  }

`

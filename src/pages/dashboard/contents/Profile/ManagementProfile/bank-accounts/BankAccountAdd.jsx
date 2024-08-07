import React, {useEffect, useMemo, useState} from 'react'
import styled                                from 'styled-components'

import ui                       from 'src/assets/dictionaries/ui'
import Icon                     from 'src/ui-kit/Icon'
import InputNumber              from 'src/ui-kit/input/InputNumber'
import {postBankAccountService} from 'src/api/services/bankAccount'
import BasicButton              from 'src/ui-kit/button/BasicButton'
import {NotificationManager}    from 'src/ui-kit/notifications'
import BankAccountSuccess       from './BankAccountSuccess'

const typeAccounts = [
  {
    id: 0,
    title: ui.bank_account.add_page.type_accounts.iban.label,
    placeholder: ui.bank_account.add_page.type_accounts.iban.placeholder,
    key_input: 'iban',
    length: 24,
    message_validation: ui.bank_account.add_page.type_accounts.iban.validation
  },
  {
    id: 1,
    title: ui.bank_account.add_page.type_accounts.card_number.label,
    placeholder: ui.bank_account.add_page.type_accounts.card_number.placeholder,
    key_input: 'card_number',
    length: 16,
    message_validation: ui.bank_account.add_page.type_accounts.card_number.validation
  }
]

const InputBankAccount = ({activeType, value, handleValid, ...props}) => {
  const selectedType = useMemo(() =>
      typeAccounts.find(type_account => type_account.id === activeType)
    , [activeType])

  const [error, onChangeError] = useState()

  useEffect(() => {
    const isError = value && value.length !== selectedType.length
    onChangeError(isError ? selectedType.message_validation : '')
    if (value && !isError) {
      handleValid(true)
    } else {
      handleValid(false)
    }
  }, [value, selectedType])

  return <InputNumber type={selectedType.key_input}
                      label={selectedType.title}
                      placeholder={selectedType.placeholder}
                      error={error}
                      value={value}
                      {...props}/>
}

const BankAccountAdd = () => {
  const [activeType, onChangeActiveType] = useState(0)
  const [number, onChangeNumber] = useState()
  const [isValid, onChangeIsValid] = useState()
  const [isLoading, onChangeIsLoading] = useState(false)
  const [showSuccess, onChangeShowSuccess] = useState(false)

  const handleNumber = (e) => {
    onChangeNumber(e.value)
  }

  useEffect(() => onChangeNumber(''), [activeType])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (isValid) {
      const body = {}
      onChangeIsLoading(true)

      if(activeType === 0) {
        body.iban = 'IR'+number;
      }else {
        body.card_number = number;
      }


      postBankAccountService(body)
        .then((res) => {
          if(res.iban){
            onChangeNumber(res.iban)
          }
          onChangeShowSuccess(true)
          onChangeIsLoading(false)
        })
        .catch((e) => {
          if (e.data.type === 'field_validation_error' && typeof e.data.result === 'object') {
              Object.values(e.data.result)
                .map(val =>
                  NotificationManager.error(val?.message)
                )
          } else if ((e.data.type === 'general' || e.data.type === 'field_validation_error') && e?.data?.result) {
            NotificationManager.error(e.data.result.message)
          }
          onChangeIsLoading(false)
        })

    }
  }

  const InputNumber = useMemo(() => <InputBankAccount
    activeType={activeType}
    value={number}
    handleChange={handleNumber}
    handleValid={onChangeIsValid}
    enableLtr={true}/>, [
    activeType,
    number
  ])

  return <MainBankAccountAdd
    className={'MainBankAccountAdd d-flex flex-column px-3 pt-3 position-relative overflow-hidden'}>
    {
      !showSuccess ?

      <>
        <h6 className="text-16 text-black-800 mb-3">{ui.bank_account.add_page.title}</h6>
        <div className="d-flex justify-content-between align-items-center  mb-3">
          <div className="d-flex">
            <Icon type={'receipt'}/>
            <h6 className="mb-0 text-black-800 text-14 me-2 pe-1">{ui.bank_account.add_page.type_account}</h6>
          </div>
          <div className="radius-4 bank-account-add--switch-type border-charcoal-200 d-flex p-2 border">
            {
              typeAccounts.map((type_account) => <span key={type_account.id}
                                                       onClick={() => type_account.id !== activeType && onChangeActiveType(
                                                         type_account.id)}
                                                       className={`mx-3 text-14 pointer
            ${type_account.id === activeType
              ? 'text-yellow-orange border-bottom border-yellow-orange'
              : 'text-charcoal '}`}>
            {type_account.title}</span>)
            }
          </div>
        </div>

        {InputNumber}

        <BasicButton type="submit"
                     isLoading={isLoading}
                     className={`position-absolute radius-4 text-16 justify-content-center  submit text-white ${isValid
                                                                                                                ? 'bg-yellow-orange'
                                                                                                                : ' bg-charcoal-200'}`}
                     onClick={!isLoading && onSubmit}
        >
          {ui.bank_account.add_page.submit}
        </BasicButton>
      </>
                   :
      <BankAccountSuccess activeType={activeType} numberAccount={number}/>

    }


  </MainBankAccountAdd>
}

export default BankAccountAdd

const MainBankAccountAdd = styled.form`
  height: calc(100vh - 80px);

    @media all and (display-mode: browser) {
      height: calc(100vh - 150px);
    }
  
  
  .bank-account-add--switch-type {
    border-radius: 2px;
  }

  .submit {
    border: 0;
    padding: 10px;
    bottom: 0;
    width: calc(100% - 2rem);
  }
`

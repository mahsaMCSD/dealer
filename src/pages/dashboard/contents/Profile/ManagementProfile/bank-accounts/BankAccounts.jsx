import React, {useCallback, useEffect, useState} from 'react'
import styled                                    from 'styled-components'
import {Link}                                    from 'react-router-dom'

import ui                          from 'src/assets/dictionaries/ui'
import Icon                        from 'src/ui-kit/Icon'
import {getListBankAccountService} from 'src/api/services/bankAccount'
import {showCardNumber, showIban}  from 'src/utility/helpers'
import CardAccount                 from './CardAccount'
import Loading                     from 'src/components/loading/Loading'


const EmptyMessage = () => <div className="d-flex empty-message align-items-center flex-column justify-content-center">
  <Icon className={'mb-3'} type="accountsEmpty"/>
  {
    ui.bank_account.empty_list.map(empty_text => <h6 className="text-black-800 text-16 mt-3">{empty_text}</h6>)
  }
</div>


const BankAccounts = () => {
  const [listAccount, onChangeListAccount] = useState([])
  const [isLoading, onToggleIsLoading] = useState(true)

  const getList = useCallback(() => {
    onToggleIsLoading(true)
    getListBankAccountService()
      .then((res) => onChangeListAccount(res.results))
      .finally(() => onToggleIsLoading(false))
  }, [])

  useEffect(() => {getList()}, [])

  return <MainBanksAccounts>
    {
      isLoading ? <Loading fullScreen/> :
      <>
        {
          listAccount.length === 0 ? <EmptyMessage/> : listAccount.map(account => <CardAccount
            numberAccount={(account.card_number
                            ? showCardNumber(account.card_number)
                            : account.iban && showIban(account.iban))}
            key={account.slug}
            logo={account.bank.logo}
            detailAccount={`${account.bank.title ? `${account.bank.title} - ` : ''}  ${account.full_name}`}
            statusId={account.account_status.value}
            slug={account.slug}
            disapproval_reason={account.disapproval_reason}
            statusMessage={account.account_status.title}
            handleGettingData={getList}
          />)
        }
        <Link
          to="bank-account-add"
          className="btn--add-account text-charcoal d-flex align-items-center radius-4 bg-charcoal-50 border-0 text-14 me-3 position-fixed">
          <Icon type="cardAdd" className={'ms-2 ps-1'}/>
          {ui.bank_account.create_new_bank_account}
        </Link>
      </>
    }


  </MainBanksAccounts>
}

export default BankAccounts

const MainBanksAccounts = styled.div`
  margin: 30px 16px;

  .empty-message {
    margin-top: 117px;
  }

  .btn--add-account {
    padding: 18px 20px;
    box-shadow: 0 3px 12px 1px rgba(0, 0, 0, 0.15);
    bottom: 16px;
    @supports (-webkit-touch-callout: none) {
      @media all and (display-mode: standalone) {
        bottom: 24px;
      }
    }
  }
`

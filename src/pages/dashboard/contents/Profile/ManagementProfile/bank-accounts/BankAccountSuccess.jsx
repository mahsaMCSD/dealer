import React                      from 'react'
import Icon                       from 'src/ui-kit/Icon'
import ui                         from 'src/assets/dictionaries/ui'
import styled                     from 'styled-components'
import {Link}                     from 'react-router-dom'
import {showCardNumber, showIban} from 'src/utility/helpers'

const activeTypes = ['iban', 'card_number']

const BankAccountSuccess = ({numberAccount, activeType}) => {
  return <MainBankAccountSuccess className={'d-flex  flex-column align-items-center position-relative overflow-hidden'}>
    <Icon type="success"/>
    <h5 className="text-black text-16 mt-5 mb-3">{activeTypes[activeType] === 'card_number'
                                                  ? ui.bank_account.success.title_card_number
                                                  : ui.bank_account.success.title_iban}</h5>
    <p className="text-14 text-black-800 d-flex  mb-4 pb-1">{activeTypes[activeType] === 'card_number' ? showCardNumber(
      numberAccount) :
                                                             showIban(numberAccount)}
    </p>
    <h6 className="text-14 text-black-600 text-center mt-2">
      {ui.bank_account.success.description}
    </h6>

    <Link to="bank-accounts"
          className="position-absolute radius-4 w-100 bottom-0 text-16 d-flex justify-content-center submit  text-white bg-yellow-orange">
      {ui.bank_account.success.back_to_list}
    </Link>
  </MainBankAccountSuccess>
}

export default BankAccountSuccess

BankAccountSuccess.defaultProps = {
  numberAccount: ''
}


const MainBankAccountSuccess = styled.div`
  height: 100%;

  h6 {
    line-height: 1.8;
  }
`

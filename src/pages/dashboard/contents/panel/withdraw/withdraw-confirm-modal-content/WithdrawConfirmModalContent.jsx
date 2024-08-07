import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'

import ui                             from 'src/assets/dictionaries/ui'
import {ReactComponent as WalletIcon} from 'src/assets/images/icons/wallet.svg'
import BasicButton                    from 'src/ui-kit/button/BasicButton'
import Formatter                      from 'src/utility/Formatter.js'

const _Formatter = new Formatter()


const WithdrawConfirmModalContent = ({data, loading, onConfirm, onCancel}) => {
  return (
    <RootWithdrawConfirmModalContent className="d-flex flex-column align-items-center p-4">
      <WalletIcon className="mb-4 "/>
      <p className="text-14 font-weight-700 text-black-800">{ui.withdraw_confirm_message}</p>
      <p
        className="text-16 font-weight-700">{ui.amountـwithdrawn} : {_Formatter.commaSeparateNumber(data.amount)} {ui.toman}</p>
      <p className="text-12 text-black-800">{data.bankName} - {data.nameOfUser}</p>
      <div className="w-100 d-flex justify-content-between">
        <BasicButton className="btn bg-yellow-orange-dark text-white button"
                     onClick={onCancel}
        >
          {ui['opt-out']}
        </BasicButton>
        <BasicButton className="btn border-charcoal-600 text-charcoal-600 button"
                     disabled={loading}
                     isLoading={loading}
                     onClick={onConfirm}
        >
          {ui.cash_withdraw}
        </BasicButton>
      </div>
    </RootWithdrawConfirmModalContent>
  )
}

WithdrawConfirmModalContent.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default WithdrawConfirmModalContent

const RootWithdrawConfirmModalContent = styled.div`
  padding-top: 50px;

  .button {
    width: 45%;
  }
`

import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'

import ui                             from 'src/assets/dictionaries/ui'
import {ReactComponent as WalletIcon} from 'src/assets/images/icons/wallet.svg'
import BasicButton                    from 'src/ui-kit/button/BasicButton'
import Formatter                      from 'src/utility/Formatter.js'

const _Formatter = new Formatter()

const MembershipFeeWithdrawConfirmModalContent = ({data, loading, onConfirm, setModalType}) => (
  <MembershipFeeWithdrawConfirmModalContentRoot className="d-flex flex-column align-items-center p-4">
    <WalletIcon className="mb-4 "/>

    <p className="text-14 font-weight-700 text-black-800">{ui.money_transfer_confirmation_message}</p>

    <p
      className="text-16 font-weight-700">{ui.transfer_amount} : {_Formatter.commaSeparateNumber(data.amount)} {ui.toman}</p>

    <div className="w-100 d-flex justify-content-between">
      <BasicButton className="btn bg-yellow-orange-dark text-white button"
                   onClick={() => { setModalType(null) }}
      >
        {ui['opt-out']}
      </BasicButton>

      <BasicButton className="btn border-charcoal-600 text-charcoal-600 button"
                   isLoading={loading}
                   onClick={onConfirm}
      >
        {ui.money_transfer}
      </BasicButton>
    </div>
  </MembershipFeeWithdrawConfirmModalContentRoot>
)

MembershipFeeWithdrawConfirmModalContent.propTypes = {
  data: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  setModalType: PropTypes.func.isRequired
}

export default MembershipFeeWithdrawConfirmModalContent

const MembershipFeeWithdrawConfirmModalContentRoot = styled.div`
  padding-top: 50px;

  .button {
    width: 45%;
  }
`

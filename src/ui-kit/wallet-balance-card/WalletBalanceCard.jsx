import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'

import Cost    from 'src/ui-kit/cost/Cost'
import Divider from 'src/ui-kit/divider/Divider'

const WalletBalanceCard = ({className, nonwithdrawable, walletBalance, withdrawable}) => (
  <WalletBalanceCardRoot
    className={`d-flex flex-column p-3 radius-4 text-black-600 text-12 wallet-balance ${className}`}>
    <Cost classes={{value: 'text-yellow-orange-dark'}} title={walletBalance.title} value={walletBalance.amount}/>
    <Divider className="my-3" orientation="horizontal" size={1} type="dashed" color="var(--bs-gray-300)"/>
    <div className="d-flex justify-content-around">
      <Cost classes={{value: 'text-black'}} title={withdrawable.title} value={withdrawable.amount}/>
      <Divider className="mx-3" orientation="vertical" size={1} type="dashed" color="var(--bs-gray-300)"
               length={50}/>
      <Cost classes={{value: 'text-black'}} title={nonwithdrawable.title} value={nonwithdrawable.amount}/>
    </div>
  </WalletBalanceCardRoot>
)

WalletBalanceCard.defaultProps = {
  className: ''
}

WalletBalanceCard.propTypes = {
  className: PropTypes.string,
  nonwithdrawable: PropTypes.object.isRequired,
  walletBalance: PropTypes.object.isRequired,
  withdrawable: PropTypes.object.isRequired
}

export default WalletBalanceCard

const WalletBalanceCardRoot = styled.div`
  border: 1px dashed var(--bs-gray-300);
`
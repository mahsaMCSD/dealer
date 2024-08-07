import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'

import ui      from 'src/assets/dictionaries/ui'
import Cost    from 'src/ui-kit/cost/Cost'
import Divider from 'src/ui-kit/divider/Divider'

const MembershipFeeBalanceCard = ({className, data}) => (
  <MembershipFeeBalanceCardRoot
    className={`d-flex flex-column p-3 radius-4 text-black-600 text-12 wallet-balance ${className}`}>
    <Cost classes={{root: 'align-start', value: 'text-yellow-orange-dark'}} title={ui.membership_deposit_balance}
          value={data.total_deposit}/>

    <Divider className="my-3" orientation="horizontal" size={1} type="dashed" color="var(--bs-gray-300)"/>

    <Cost classes={{root: 'align-start', value: 'text-black'}} title={ui.transferable_to_wallet}
          value={data.cachable_deposit}/>

    <Divider className="my-3" orientation="horizontal" size={1} type="dashed" color="var(--bs-gray-300)"/>

    <p className="">{ui['non-transferable']}</p>

    <div className="d-flex ">
      <Cost classes={{root: 'align-start', title: 'text-10'}} title={`${ui.minimum_deposit_balance} :`}
            value={data.min_deposit_amount}/>

      <Cost classes={{root: 'align-start me-4', title: 'text-10'}} title={`${ui.blocked_in_auction} :`}
            value={data.blocked}/>
    </div>
  </MembershipFeeBalanceCardRoot>
)

MembershipFeeBalanceCard.defaultProps = {
  className: ''
}

MembershipFeeBalanceCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired
}

export default MembershipFeeBalanceCard

const MembershipFeeBalanceCardRoot = styled.div`
  border: 1px dashed var(--bs-gray-300);

  .align-start {
    align-items: start !important;
  }
`

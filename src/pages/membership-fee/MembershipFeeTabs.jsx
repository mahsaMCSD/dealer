import React, {useCallback} from 'react'
import TabBar               from 'src/components/dashboard/tab-bar/TabBar'
import styled               from 'styled-components'
import ui                   from 'src/assets/dictionaries/ui'
import {useNavigate}        from 'react-router-dom'

const tabList = {
  0: {
    key: 'settlement_online',
    title: ui.membership_fee.settlement_online,
    link: '/membership-fee/settlement'
  }, 1: {
    key: 'use_wallet',
    title: ui.membership_fee.use_wallet,
    link: '/membership-fee/use-wallet'
  }
}


const MembershipFeeTabs = ({children}) => {
  let history = useNavigate()

  const handleChangeTab = useCallback((e) => {
    history(tabList[e].link, {replace: true})
  }, [history])

  return <MainSettlementTabs>
    <TabBar classes="settlement--tab-bar" changeTab={handleChangeTab} list={tabList} activeTab={Object.keys(tabList)
      .find(ind => location.pathname.includes(tabList[ind].link))}/>
    {children}
  </MainSettlementTabs>
}

export default MembershipFeeTabs


const MainSettlementTabs = styled.div`
  .settlement--tab-bar {
    padding-top: 3.3rem;
  }

  padding-top: 3.3rem;
`

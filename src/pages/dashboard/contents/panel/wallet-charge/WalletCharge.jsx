import React                      from 'react'
import styled                     from 'styled-components'
import {useLocation, useNavigate} from 'react-router-dom'

import ui     from 'src/assets/dictionaries/ui'
import TabBar from 'src/components/dashboard/tab-bar/TabBar'

const listTab = {
  1: {
    title: ui.online_payment,
    path: '/dashboard/userPanel/wallet/wallet-charge-online',
    key: 'wallet-charge-online'
  }, 2: {
    title: ui.deposit_price,
    path: '/dashboard/userPanel/wallet/wallet-charge-offline',
    key: 'wallet-charge-offline'
  }
}

const WalletCharge = ({children}) => {
  const history = useNavigate()
  const location = useLocation()

  return <MainWalletCharge>
    <TabBar list={listTab}
            classes="wallet--tab-bar"
            changeTab={(key) => history(listTab[key].path, {replace: true})}
            activeTab={Object.keys(listTab)
              .find(key => listTab[key].path.toLowerCase() === location.pathname.toLowerCase())}/>
    {children}
  </MainWalletCharge>
}

export default WalletCharge

const MainWalletCharge = styled.div`
  .wallet--tab-bar {
    padding-top: 3.3rem;
  }

  padding-top: 3.3rem;

`

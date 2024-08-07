import React                      from 'react'
import styled                     from 'styled-components'
import {useNavigate, useLocation} from 'react-router-dom'

import ui   from 'src/assets/dictionaries/ui'
import Icon from 'src/ui-kit/Icon'

const tabsData = [
  {index: 0, key: 'competing', url: 'competing', icon: 'car2', text: ui.cars},
  {index: 1, key: 'myOffers', url: 'myOffers', icon: 'judge', text: ui.suggestions},
  {
    index: 2,
    key: 'myOrders',
    url: 'myOrders/readyToPay?status=wait-settlement-and-settlement',
    icon: 'bag2',
    text: ui.orders
  },
  {index: 3, key: 'userPanel', url: 'userPanel', icon: 'user', text: ui.panel}
]
const styles = {
  root: {
    zIndex: 3
  }
}

const checkSelected = (location, tabKey) => {
  const locationKey = location.pathname.split('/')[2]
  return locationKey === tabKey
}

const findSelectedTab = (location) => {
  const locationKey = location.pathname.split('/')[2]
  return tabsData.find(item => item.key === locationKey)
}

const navigateToPage = (history, url) => {
  history(`/dashboard/${url}`)
}

const NavigationBar = () => {
  const location = useLocation()
  const history = useNavigate()

  return <MainNavigationBar className="position-fixed right-0 left-0 bottom-0 bg-gray w-desktop" style={styles.root}>
    {tabsData.map(tab =>
      <div key={tab.key} id={tab.key} className={'tabItem'} onClick={() => navigateToPage(history, tab.url)}>
        <div className={`navigation-bar--icon ${
          checkSelected(location, tab.key) ? 'text-charcoal navigation-bar--icon_selected' : 'text-charcoal-800'
        }`}>
          <Icon className="m-0"
                type={checkSelected(location, tab.key) ? `${tab.icon}Selected` : `${tab.icon}Deselected`}/>
        </div>
        <span className={`navigation-bar--text text-black-800 ${
          checkSelected(location, tab.key) ? 'text-14 font-weight-bold' : 'text-12'
        }`}>{tab.text}</span>
      </div>
    )}
    <div className="horizontal-line bg-charcoal" data-tab-index={findSelectedTab(location)?.index}/>
  </MainNavigationBar>
}
export default NavigationBar

const MainNavigationBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 4px;
  height: 56px;

  @supports (-webkit-touch-callout: none) {
    @media all and (display-mode: standalone) {
      padding-bottom: 14px;
      height: 70px;
    }
  }

  .tabItem {
    padding: 0 10px;
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    cursor: pointer;
  }

  .navigation-bar--text {
    line-height: 18px;
  }

  .navigation-bar--icon {
    margin: 0 auto 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    transition: 150ms ease-in;

    &_selected {
      font-size: 24px;
    }
  }

  .horizontal-line {
    position: absolute;
    top: 0;
    right: 10px;
    width: calc((100% / 4) - 20px);
    height: 2px;
    border-radius: 0 0 8px 8px;
    transition: 150ms ease;

    &[data-tab-index = '1'] {
      right: calc(25% + 10px);
    }

    &[data-tab-index = '2'] {
      right: calc(50% + 10px);
    }

    &[data-tab-index = '3'] {
      right: calc(75% + 10px);
    }
  }
`

import React               from 'react'
import PropTypes           from 'prop-types'
import ui                  from 'src/assets/dictionaries/ui'
import {Link, useNavigate} from 'react-router-dom'
import Icon                from 'src/ui-kit/Icon'
import TabBar              from './tab-bar/TabBar'

const tabList = {
  0: {
    key: 'online_payment',
    title: ui.online_payment,
    link: '/online_payment'
  },
  1: {
    key: 'deposit_price',
    title: ui.deposit_price,
    link: '/online_payment'
  }
}
const renderHeaderText = (index) => {
  switch (index) {
    case 0:
    case 4:
      return ui.cars
    case 1:
      return ui.suggestions
    case 2:
      return ui.orders
    case 3:
      return ui.panel
    case 5:
      return ui.final_pay.title_header
    case 7:
      return ui.frequently_asked_questions
    case 8:
      return ui.guide
    case 9:
      return ui.transactions
    case 10:
    case 11:
      return ui.wallet_charge
    case 12:
      return ui.user_account
    case 13:
      return ui.about_us
    default:
      return ui.dashboard
  }
}
const styles = {
  header: {
    zIndex: 2
  }
}
const Header = ({selectedIndex, prevPage}) => {
  const history = useNavigate()

  const onChangeTab = (tab) =>
    history(tab === '0' ? '/dashboard/userPanel/walletCharge' : '/dashboard/userPanel/walletChargeCash')

  return <div className="position-fixed bg-white top-0 left-0 right-0 w-desktop" style={styles.header}>
    <div className="d-flex justify-content-center">
      <h6
        className="text-center text-purple-800 text-14 font-weight-bold pt-2">{renderHeaderText(selectedIndex)}</h6>
      {prevPage && <Link to={prevPage} className="position-absolute left-0 pt-2 ps-2">
        <Icon type="angleLeft" className={'h3'}/>
      </Link>}
    </div>
    {
      (selectedIndex === 10 || selectedIndex === 11) && <div>
        <TabBar changeTab={onChangeTab} list={tabList} activeTab={selectedIndex === 10 ? '0' : '1'}/>

      </div>
    }
  </div>
}

export default React.memo(Header)
Header.defaultProps = {
  selectedIndex: 0,
  prevPage: ''
}
Header.propTypes = {
  selectedIndex: PropTypes.number,
  prevPage: PropTypes.string
}

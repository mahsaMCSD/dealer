import React, {useEffect, useState}      from 'react'
import {connect}                         from 'react-redux'
import {ElementScroller, WindowScroller} from 'react-scroll-manager'

import TabBar                             from 'src/components/dashboard/tab-bar/TabBar'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'

const tabList = [
  {
    title: 'در حال مذاکره',
    link: '/dashboard/myOrders/negotiation',
    key: 'negotiation'
  },
  {
    title: 'تسویه نشده',
    link: '/dashboard/myOrders/readyToPay?status=wait-settlement-and-settlement',
    key: 'readyToPay'
  },
  {
    title: 'خریده شده',
    link: '/dashboard/myOrders/paid',
    key: 'paid'
  }
]

const Order = () => {
  const location = useLocation()
  const [tab, onChangeTab] = useState(tabList.findIndex(tab => tab.link.includes(location.pathname)))
  const history = useNavigate()

  const changeTab = (newTab) => {
    onChangeTab(newTab)
    tabList[newTab].link && history(tabList[newTab].link)
  }

  useEffect(() => {
    onChangeTab(tabList.findIndex(tab => tab.link.includes(location.pathname)))
  }, [location?.pathname])

  return (
    <>
      <TabBar classes="pt-2" changeTab={changeTab} list={tabList} activeTab={tab?.toString()}/>
      <WindowScroller>
        <ElementScroller scrollKey={`order_${tab}`}>
          <div className={`main__body order_${tab}`}>
            <Outlet/>
          </div>
        </ElementScroller>
      </WindowScroller>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.userInfo.appUser.info
})
export default connect(mapStateToProps)(Order)

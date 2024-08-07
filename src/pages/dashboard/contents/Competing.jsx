import React                              from 'react'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import {connect}                          from 'react-redux'
import {ElementScroller, WindowScroller}  from 'react-scroll-manager'

import TabBar                    from 'src/components/dashboard/tab-bar/TabBar'
import {onGettingCountCompeting} from 'src/store/ui/actions/onGettingCountCompeting'

const tabList = {
  0: {
    key: 'auctions',
    title: 'مزایده زنده',
    link: '/auctions'
  },
  1: {
    key: 'inspections',
    title: 'کارشناسی',
    link: '/inspections'
  },
  2: {
    key: 'inventory',
    title: 'دپو خودرو',
    link: '/inventory/'
  }
}


const thisPathname = '/dashboard/competing'

const Competing = (props) => {
  const history = useNavigate()
  const location = useLocation()

  const activeTab = (Object.keys(tabList)).find(ind => location.pathname.includes(tabList[ind].link))
  const changeTab = id => history(thisPathname + tabList[id].link)
  const is_auctions = location.pathname.includes('auctions')
  Object.values(tabList)
    .map(item => {
      if (item.key === 'auctions') {
        item.count = props.countCompetingStore.auctions
      } else if (item.key === 'inspections') {
        item.count = props.countCompetingStore.inspections
      } else if (item.key === 'inventory') {
        item.count = props.countCompetingStore.inventories
      } else {
        item.count = 0
      }
    })
  React.useEffect(() => {
    if (!is_auctions) {
      props.getCountCompeting()
    }
  }, [])
  return (
    <>
      <TabBar classes="pt-2" changeTab={changeTab} list={tabList} activeTab={activeTab}/>
      <WindowScroller>
        <ElementScroller scrollKey={`competing_${activeTab}`}>
          <div className={`main__body competing_${activeTab}`}>
            <Outlet/>
          </div>
        </ElementScroller>
      </WindowScroller>
    </>
  )
}

const mapStateToProps = state => ({
  countCompetingStore: state.ui.countCompeting
})
const mapDispatchToProps = dispatch => ({
  getCountCompeting: () => dispatch(onGettingCountCompeting())
})
export default connect(mapStateToProps, mapDispatchToProps)(Competing)

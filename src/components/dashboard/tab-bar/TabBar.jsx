import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'


const TabBar = ({list, activeTab, changeTab, classes}) =>
  <MainTabBar className={`bg-white top-0 position-fixed w-100 w-desktop ${classes}`}>
    <div className="d-flex rounded justify-content-around tab-main text-white">{
      Object.keys(list)
        .map(key => <h6 onClick={() => changeTab(key)} key={key}
                        className={`w-100 mb-0 pointer text-14 d-flex align-items-center text-center tab-bar text-black-600 py-3 justify-content-center ${
                          (activeTab === key) ? 'text-black font-weight-bold border-black' : ''
                        }`}>

          {list[key].title} {list[key].count > 0 && `(${list[key].count})`}
        </h6>)}

    </div>
  </MainTabBar>
TabBar.defaultProps = {
  list: [],
  changeTab: () => {},
  classes: ''
}
TabBar.prototype = {
  list: PropTypes.object.isRequired,
  changeTab: PropTypes.func,
  classes: PropTypes.string
}

export default TabBar

const MainTabBar = styled.div`
  z-index: 2;

  .tab-bar {
    border-bottom: 2px solid var(--charcoal-100);
    border-radius: 0;
  }
`

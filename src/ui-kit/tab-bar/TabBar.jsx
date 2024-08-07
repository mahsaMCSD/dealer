import React, {useState} from 'react'
import styled            from 'styled-components'
import {useNavigate}     from 'react-router-dom'

const TabBar = ({list, activeTab}) => {

  const [tab, onChangeTab] = useState(activeTab)
  const history = useNavigate()
  const handleChangeTab = (item) => {
    if (item.path) {
      history(`${item.path}`)
    } else {
      onChangeTab(item.id)
    }
  }

  return <MainTabBar className={'py-2 border-bottom border-charcoal-100'}>
    {
      list.map(item => <div key={item.id}
                            onClick={() => handleChangeTab(item)}
                            className={`tab-bar--btn text-16 ${item.id === tab && 'bg-charcoal-100 text-black' || 'text-black-600'} text-center radius-4`}>
        {item.title}
      </div>)
    }
  </MainTabBar>
}

TabBar.defaulProps = {
  activeTab: 1,
  handleChangeTab: () => {}
}

TabBar.propTypes = {}

export default TabBar

const MainTabBar = styled.div`
  display: grid;
  padding: 0 24px;
  grid-template-columns: 50% 50%;

  .tab-bar--btn {
    cursor: pointer;
    padding: 4px 24px;
  }
`
import React from 'react'
import styled from 'styled-components'
import ui     from 'src/assets/dictionaries/ui'

const types = {'jalali': {label: ui.filter.jalali}, 'gregorian': {label: ui.filter.gregorian}}

const SwitchYearMode = ({activeKey,handleChange}) => {
  return <MainSwitchYear className={'d-flex'}>
    {
      Object.keys(types)
        .map(key => <span key={key} onClick={()=>handleChange(key)} className={`text-12 pointer tab-switch  border-bottom ${activeKey === key
                                                                 ? 'text-yellow-orange border-yellow-orange'
                                                                 : 'text-charcoal border-charcoal-200'}`}>{types[key].label}</span>)
    }

  </MainSwitchYear>
}

export default SwitchYearMode

SwitchYearMode.defaultProps = {
  activeKey: 'jalali',
  handleChange: () => {},
}

const MainSwitchYear = styled.div`
  width: fit-content;

  .tab-switch {
    padding: 2px 4px;
  }
`

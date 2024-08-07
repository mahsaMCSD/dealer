import React       from 'react'
import styled      from 'styled-components'
import LabelFilter from './LabelFilter'
import Chips       from 'src/ui-kit/chips/Chips'

const ChipsSelectedFilter = ({label, icon, list, active, handleSelect}) => <MainChipsSelectedFilter
  className={'d-flex flex-column'}>
  <div className="d-flex flex-column">

    <LabelFilter label={label} icon={icon}/>

    <div className="d-flex py-1 overflow-auto flex-nowrap mt-2">
      {list.map(item => <Chips
        key={item.id}
        className="ms-2"
        onClick={() => handleSelect(item.id)}
        isActive={active?.some(x => parseInt(x) === item.id)}
        label={item.title}/>)}
    </div>
  </div>
</MainChipsSelectedFilter>


export default ChipsSelectedFilter

ChipsSelectedFilter.defaultProps = {
  label: '',
  icon: '',
  list: []
}

const MainChipsSelectedFilter = styled.div`
  padding: 18px 24px 18px 0;
`

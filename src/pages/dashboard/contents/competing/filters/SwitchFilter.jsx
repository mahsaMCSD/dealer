import React       from 'react'
import LabelFilter from './LabelFilter'
import Switch      from 'src/ui-kit/switch/Switch'

const SwitchFilter = ({label, icon, handleChange, name, isChecked, className, isDisable}) => <div
  className={`d-flex form-check form-switch justify-content-between ${className ? className : ''}`}>
  <LabelFilter label={label} icon={icon}/>
  <Switch handleChange={handleChange}
          name={name}
          isDisable={isDisable}
          isChecked={isChecked}/>
</div>

SwitchFilter.defaultProps = {
  label: '',
  icon: '',
  handleChange: () => {},
  name: '',
  isChecked: ''
}

export default SwitchFilter

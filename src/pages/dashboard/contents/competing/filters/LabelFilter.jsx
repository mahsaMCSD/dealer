import React from 'react'
import Icon  from 'src/ui-kit/Icon'

const LabelFilter = ({icon, label, isDisable, className}) => <div className="d-flex align-items-center">
  {icon && <Icon className={`${isDisable ? 'text-charcoal-200' : 'text-charcoal-800'} ${className ? className : ''}`}
                 type={icon}/>}
  <span className={`${isDisable ? 'text-charcoal-200' : 'text-charcoal-800'}  text-14 me-3`}>
        {label}
      </span>
</div>


const areEqual = (prevProps, nextProps) => (prevProps.isDisable === nextProps.isDisable)

export default React.memo(LabelFilter, areEqual)

LabelFilter.defaultProps = {
  label: '',
  icon: '',
  isDisable: false,
  list: []
}

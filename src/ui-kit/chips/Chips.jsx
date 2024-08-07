import React     from 'react'
import styled    from 'styled-components'
import PropTypes from 'prop-types'

const classNames = {
  lighter: {
    defaultActive: 'bg-yellow-orange-50 text-yellow-orange border-yellow-orange',
    defaultInactive: 'bg-charcoal-50 text-black-600 border-charcoal-400'
  },
  darker: {
    defaultActive: 'bg-yellow-orange-50 text-yellow-orange border-yellow-orange',
    defaultInactive: 'bg-charcoal-50 text-black-800 border-charcoal-800'
  }
}

const Chips = ({after, before, label, onClick, className, isActive, theme}) => {
  return <MainChip onClick={onClick}
                   className={`border text-12 pointer d-flex align-middle align-items-center ${
                     !(before || after) ? 'chips-normal' : ''
                   } ${
                     isActive ? classNames[theme].defaultActive : classNames[theme].defaultInactive
                   } ${className}`}>
    {before}
    <span className={`font-weight-700 ${before ? 'title--before' : ''} ${after ? 'title--after me-1' : ''}`}>
      {label}
    </span>
    {after}
  </MainChip>
}

const areEqual = (
  prevProps,
  nextProps
) => prevProps.isActive === nextProps.isActive && prevProps.label === nextProps.label

export default React.memo(Chips, areEqual)

Chips.defaultProps = {
  after: '',
  before: '',
  label: '',
  onClick: () => {},
  className: '',
  isActive: false,
  theme: 'lighter'
}
Chips.propTypes = {
  after: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  before: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  theme: PropTypes.oneOf(['lighter', 'darker'])
}

const MainChip = styled.div`
  border-radius: 50px;
  white-space: nowrap;
  padding: 8px 7px 8px 10px;

  &.chips-normal {
    padding: 8px 12px;
  }
  
  .title--before {
    margin-right: 6.5px;
  }

  .title--after {
    margin-left: 10px;
  }
`

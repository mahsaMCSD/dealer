import React     from 'react'
import styled    from 'styled-components'
import PropTypes from 'prop-types'

const CheckBox = ({
                    label,
                    checked,
                    disabled,
                    onChange
                  }) => <MainCheckBox className={'d-flex pointer align-items-center'}
                                      onClick={() => !disabled && onChange({
                                        currentTarget: {
                                          checked: !checked
                                        }
                                      })}>

  <input checked={checked} disabled={disabled} onChange={onChange} hidden type="checkbox"/>
  <div
    className={`check-box--square  ${checked && ' position-relative check-box--square__active' || ''} 
    border 
    ${disabled?  'border-gray-400': 'border-purple-800'}`}/>
  <h6 className={`${disabled?  'text-gray-400': 'text-gray-800'} text-12`}>{label}</h6>
</MainCheckBox>


export default CheckBox

const MainCheckBox = styled.div`
  width: fit-content;

  .check-box--square {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    margin-left: 4px;
  }

  .check-box--square__active {
    justify-content: center;
    align-items: center;
    display: flex;

    ::before {
      content: '';
      width: 8px;
      height: 8px;
      background-color: var(--bs-orange);
      border-radius: 1px;
      margin: 0 auto;
    }
  }
`

CheckBox.defaultProps = {
  label: '',
  checked: false,
  disabled: false,
  onChange: () => {}
}
CheckBox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

import React, {useEffect, useState} from 'react'
import PropTypes                    from 'prop-types'
import NumberFormat                 from 'react-number-format'
import styled                       from 'styled-components'

import {validationDataPickerJallali} from 'src/utility/validation'
import InputLabel                    from '../source/InputLabel'
import InputBase                     from './BaseInputDate'
import Icon                          from 'src/ui-kit/Icon'
import InputErrorMessage             from '../source/InputErrorMessage'
import ui                            from 'src/assets/dictionaries/ui'

const InputDate = ({label, onChange, name, value, className}) => {

  const [stateValue, onChangeStateValue] = useState('')
  const [isValid, toggleIsValid] = useState(true)

  const onChangeDate = (e) => {
    const newValue = e.value
    onChangeStateValue(newValue)
    if (validationDataPickerJallali(e.formattedValue, true)) {
      onChange({
        target: {
          value: newValue,
          name,
          isValid: true
        },
        error: false
      })
      toggleIsValid(true)
    } else {
      onChange({
        target: {
          value: '',
          name,
          isValid: false
        },
        error: true
      })
      toggleIsValid(false)
    }
  }

  useEffect(() => {
    if (value !== stateValue) {
      onChangeStateValue(value)
    }
  }, [value])

  return <div className={className}>
    <MainDatePicker>
      <NumberFormat
        autoComplete="off" value={stateValue}
        onValueChange={(values, d) => {
          onChangeDate({
            name: name,
            value: values.value,
            formattedValue: values.formattedValue
          })
        }}
        customInput={InputBase} name={name} isNumericString format={'####/##/##'} error={isValid}/>
      <InputLabel label={label} value={stateValue}/>
      <div className="icon-date-picker position-absolute text-22"><Icon type="calendar2"/></div>
    </MainDatePicker>
    {
      !isValid && <InputErrorMessage message={ui.error_validate_date}/>
    }
  </div>
}

InputDate.defaultProps = {
  label: '',
  name: '',
  onChange: () => {},
  isValid: true,
  className: 'my-4'
}
InputDate.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  className: PropTypes.string
}

export default InputDate

const MainDatePicker = styled.div`
  position: relative;
  height: 54px;

  .icon-date-picker {
    left: 20px;
    top: 50%;
    transform: translate(0px, -50%);
  }
`

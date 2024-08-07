import ui                            from 'src/assets/dictionaries/ui'
import React, {useEffect, useState}  from 'react'
import {validationDataPickerJallali} from 'src/utility/validation'
import PropTypes                     from 'prop-types'
import NumberFormat                  from 'react-number-format'
import styled                        from 'styled-components'
import InputLabel                    from './input-label/InputLabel'
import InputError                    from './input-error/InputError'
import InputBase                     from './InputBase'

const DatePicker = ({label, handleChange, value, name, error, isRequired}) => {

  const [stateValue, onChangeStateValue] = useState()
  const [isValid, onChangeIsValid] = useState()

  const onChangeDate = (e) => {
    const newValue = e.value
    onChangeStateValue(newValue)
    if (validationDataPickerJallali(e.formattedValue, true)) {
      handleChange({
        value: newValue,
        name,
        isValid: true
      })
    } else {
      handleChange({
        value: '',
        name,
        isValid: false
      })
    }
  }

  useEffect(() => {
    onChangeStateValue(value)
    onChangeIsValid(value)
  }, [value])


  return <MainDatePicker>
    <InputLabel text={label} isRequired={isRequired}/>
    <NumberFormat
      autoComplete="off"
      value={stateValue}
      onValueChange={(values, d) => {
        onChangeDate({
          name: name,
          value: values.value,
          formattedValue: values.formattedValue
        })
      }}
      customInput={InputBase}
      error={error}
      name={name}
      placeholder={ui.placeholder_date}
      isNumericString
      format={'####/##/##'}
    />
    <InputError text={error}/>
  </MainDatePicker>
}

DatePicker.defaultProps = {
  label: '',
  name: '',
  placeholder: '',
  isValid: true,
  handleChange: () => {},
  error: '',
  isRequired: false
}
DatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  error: PropTypes.string,
  isRequired: PropTypes.bool
}

export default DatePicker

const MainDatePicker = styled.div`
`

import React, {useCallback, useEffect, useState} from 'react'
import styled                                    from 'styled-components'
import PropTypes                                 from 'prop-types'

import InputErrorMessage from './source/InputErrorMessage'
import InputIcon         from './source/InputIcon'
import Input             from './source/Input'
import InputLabel        from './source/InputLabel'
import {typeValidation}  from './validation'


const MatInput = ({
                    label,
                    type,
                    placeholder,
                    onChange,
                    name,
                    classNameInput,
                    classNameLabel,
                    classNameIcon,
                    classNameError,
                    icon,
                    required,
                    value,
                    disabled,
                    onChangeRemoveValue
                  }) => {

  const [stateValue, onChangeValue] = useState('')
  const [hasError, toggleHasError] = useState(false)
  const input_type = typeValidation(type)
  const checkValidationInput = (input, item) => {
    if (input.pattern) {
      return !item.target.value.match(input.pattern)
    } else if (input.comparator(item.target.value)) {
      return false
    }
    return true
  }

  const handleChangeInput = (item) => {
    const mockError = checkValidationInput(input_type, item)
    toggleHasError(mockError)

    let newVal = item.target.value
    onChangeValue(newVal)
    onChange({target: {value: newVal, name}, error: mockError})
  }

  const handleRemoveValue = () => {
    onChangeValue('')
    onChange({target: {value: '', name}})
    toggleHasError(false)
    onChangeRemoveValue(name)
  }

  useEffect(() => {
    if (value !== stateValue) {
      onChangeValue(value)
      toggleHasError(false)
    }
  }, [value])

  const reFormatValue = useCallback(() => {
    if (type === 'price') {
      return stateValue.toString()
        .replace(/,/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    return stateValue
  })


  return (
    <FormGroupStyled className="my-4">
      <div className="form-group-inner position-relative w-100">

        <Input type={input_type.type} name={name} value={reFormatValue} newValue={reFormatValue} error={hasError}
               maxLength={input_type.maxLength} required={required} disabled={disabled}
               autocomplete="off"
               className={classNameInput} placeholder={placeholder} handleChange={handleChangeInput}/>

        {
          <InputLabel label={`${label} ${required ? '*' : ''}`} hasError={hasError} value={stateValue}
                      className={classNameLabel}/>
        }

        {(stateValue !== '' && !disabled && stateValue) &&
          <InputIcon error={hasError} icon={icon} handleRemoveValue={handleRemoveValue}
                     className={classNameIcon}/>}
      </div>
      {(hasError && input_type.message) &&
        <InputErrorMessage message={input_type.message} className={classNameError}/>}
    </FormGroupStyled>
  )
}

MatInput.defaultProps = {
  name: '',
  label: '',
  type: 'text',
  placeholder: '',
  onChange: () => {},
  onChangeRemoveValue: () => {},
  classNameInput: 'position-absolute top-0 left-0 right-0',
  classNameLabel: '',
  classNameIcon: '',
  classNameError: '',
  required: false
}

MatInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onChangeRemoveValue: PropTypes.func,
  required: PropTypes.bool,
  classNameInput: PropTypes.string,
  classNameLabel: PropTypes.string,
  classNameIcon: PropTypes.string,
  classNameError: PropTypes.string
}

const areEqual = (prevProps, nextProps) => prevProps.value === nextProps.value &&
  prevProps.onChange === nextProps.onChange && prevProps.disabled === nextProps.disabled


export default React.memo(MatInput, areEqual)

const FormGroupStyled = styled.div`
  .form-group-inner {
    height: 54px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
`

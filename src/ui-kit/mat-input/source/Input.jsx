import React, {useEffect, useState} from 'react'
import styled                       from 'styled-components'
import PropTypes                    from 'prop-types'
import Formatter                    from 'src/utility/Formatter'

const _Formatter = new Formatter()

const Input = ({
                 type,
                 placeholder,
                 handleChange,
                 name,
                 error,
                 className,
                 newValue,
                 maxLength,
                 pattern,
                 required,
                 disabled
               }) => {

  const [value, onChangeValue] = useState('')

  const handleChangeValue = (event) => {
    let newVal = event.target.value
    if (type === 'tel' ||
      type === 'number'
    ) {
      newVal = _Formatter.normalizeToEnglish(event.target.value)
    }
    onChangeValue(newVal)
    handleChange({target: {value: newVal, name}})
  }

  useEffect(() => {
    if (value !== newValue) {
      onChangeValue(newValue)
    }
  }, [newValue])

  return <InputStyled type={type} value={value} maxLength={maxLength}
                      className={`${error ? 'border-red' : disabled ? 'border-charcoal-200 text-black-400' : ''} 
                      ${className} radius-8 bg-transparent w-100 position-relative`}
                      placeholder={placeholder} onChange={handleChangeValue}
                      name={name} pattern={pattern} required={required} disabled={disabled}/>

}

Input.defaultProps = {
  name: '',
  handleChange: () => {},
  type: 'text',
  placeholder: '',
  className: '',
  error: false,
  required: false
}
Input.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.bool,
  maxLength: PropTypes.number,
  required: PropTypes.bool
}

export default Input

const InputStyled = styled.input`
  font-size: 8.4pt;
  font-weight: 400;
  z-index: 1;
  resize: none;
  min-height: 54px;
  padding: 8px 24px 8px 45px;
  border: 1px solid var(--charcoal-800);
  color: var(--black-800);
  transition: all 0.2s ease-in-out;

  &[disabled] {
    -webkit-text-fill-color: var(--black-400);
    opacity: 1;
  }

  &:focus {
    outline: none;
    border: 1px solid var(--yellow-orange);
  }

  &:focus ~ div .form-label {
    top: -1px;
    font-size: 7.2pt;
    color: var(--yellow-orange);
    transition: all 0.2s ease-in-out;
    z-index: 10;
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

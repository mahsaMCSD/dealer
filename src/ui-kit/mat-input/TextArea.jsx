import React, {useEffect, useState} from 'react'
import styled                       from 'styled-components'
import PropTypes                    from 'prop-types'

import InputLabel from './source/InputLabel'
import InputIcon  from './source/InputIcon'

const TextArea = ({className, name, label, placeholder, handleChange, newValue}) => {

  const [value, onChangeValue] = useState('')

  const handleChangeInput = (event) => {
    onChangeValue(event.target.value)
    handleChange({target: {value: event.target.value, name}})
  }

  const handleRemoveValue = () => {
    onChangeValue('')
  }

  useEffect(() => {
    if (value !== newValue) {
      onChangeValue(newValue)
    }
  }, [newValue])

  return (
    <TextAreaStyled className={className}>
      <textarea name={name} value={value} placeholder={placeholder} onChange={handleChangeInput}
                className="position-absolute top-0 left-0 w-100 h-100 radius-8 bg-transparent"/>
      <InputLabel label={label} value={value} className="label-textarea"/>
      {(value !== '' && value) && <InputIcon handleRemoveValue={handleRemoveValue} className="icon-textarea"/>}
    </TextAreaStyled>
  )
}

TextArea.defaultProps = {
  name: '',
  placeholder: '',
  handleChange: () => {},
  className: '',
  label: ''
}

TextArea.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string
}

export default TextArea

const TextAreaStyled = styled.div`
  position: relative;
  height: 144px;

  textarea {
    font-size: 8.4pt;
    resize: none;
    font-weight: 400;
    padding: 16px 24px 16px 45px;
    border: 1px solid var(--charcoal-800);
    color: var(--black-800);
    z-index: 1;

    &:focus {
      outline: none;
      border: 1px solid var(--yellow-orange);
    }

    &:focus ~ div .form-label {
      top: -1px;
      z-index: 10;
      font-size: 7.2pt;
      color: var(--yellow-orange);
      z-index: 10;
      transition: all 0.2s ease-in-out;
    }
  }

  .label-textarea {
    top: 30px;
    transform: translate(0px, -50%);
  }

  .icon-textarea {
    top: 25px;
  }
`

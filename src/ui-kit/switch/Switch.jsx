import React, {useEffect, useState} from 'react'
import styled                       from 'styled-components'

const Switch = ({id, name, handleChange, isChecked,isDisable}) => {
  const [isCheckedLocal, onToggleIsCheckedLocal] = useState(isChecked)

  const handleChangeValue = (event) => {
    onToggleIsCheckedLocal(event.target.checked)
    handleChange({isChecked: event.currentTarget.checked, name})
  }

  useEffect(() => {
    onToggleIsCheckedLocal(isChecked)
  }, [isChecked])

  return <MainSwitch className="form-check-input"
                     type="checkbox"
                     name={name}
                     id={id}
                     checked={isCheckedLocal}
                     disabled={isDisable}
                     onChange={handleChangeValue}/>
}

export default Switch

Switch.defaultProps = {
  id: '',
  name: '',
  handleChange: '',
  isChecked: false
}

const MainSwitch = styled.input`
  &:focus {
    outline: none;
    box-shadow: none;
    border: 0;
  }

  &.form-check-input {
    border-radius: 35px;
    background-color: var(--charcoal-600);
    height: 20px;
    padding: 2.5px;
    background-position: left center;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e") !important;
  }

  &.form-check-input:checked {
    background-color: var(--yellow-orange);
    border: 0;
  }
`

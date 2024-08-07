import React, {useEffect, useState} from 'react'
import styled                       from 'styled-components'
import PropTypes                    from 'prop-types'
import InputLabel                   from './input-label/InputLabel'
import InputError                   from './input-error/InputError'
import InputBase                    from './InputBase'

const Input = ({label, placeholder, readOnly, value, handleChange, name, isRequired, error}) => {

  const [valueState, onChangeValueState] = useState()

  const onChange = (e) => {
    onChangeValueState(e.target.value)
    handleChange({
      name,
      value: e.target.value
    })
  }


  useEffect(() =>
      onChangeValueState(value)
    , [value])

  return <MainInput
    className="w-100"
    readOnly={readOnly}
  >
    <InputLabel text={label} isRequired={isRequired}/>
    <InputBase placeholder={placeholder}
               readOnly={readOnly}
               value={valueState}
               error={error}
               onChange={onChange}
    />
    <InputError text={error}/>
  </MainInput>
}


Input.defaultProps = {
  label: '',
  name: '',
  placeholder: '',
  readOnly: false,
  handleChange: () => {},
  error: '',
  isRequired: false
}
Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  error: PropTypes.string,
  isRequired: PropTypes.bool
}

export default Input

const MainInput = styled.div`


`

import React, {useEffect, useState} from 'react'
import styled                       from 'styled-components'
import PropTypes                    from 'prop-types'
import ui                           from 'src/assets/dictionaries/ui'
import {Num2persian}                from 'src/utility/num2persian'
import InputLabel                   from './input-label/InputLabel'
import InputError                   from './input-error/InputError'
import InputBase                    from './InputBase'
import NumberFormat                 from '../NumberFormat'

const InputNumber = ({label, name, handleChange, value, type, error, isRequired, maxNumber, placeholder}) => {
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

  return <MainInputNumber className="w-100">
    <InputLabel text={label} isRequired={isRequired}/>
    <NumberFormat value={valueState}
                  type={type}
                  className={`bg-gray-50 w-100 d-flex ${error && 'input-not-valid'}`}
                  name={name}
                  placeholder={placeholder}
                  customInput={InputBase}
                  error={error}
                  maxNumber={maxNumber}
                  onChange={onChange}
    />
    {type === 'price' && valueState &&
      <div className='text-12 mt-2 px-2 text-charcoal-600'>{Num2persian(valueState)} {ui.toman}</div>
    }
    <InputError text={error}/>
  </MainInputNumber>
}


InputNumber.defaultProps = {
  label: '',
  name: '',
  value: '',
  type: '',
  handleChange: () => {},
  error: '',
  isRequired: false,
  placeholder: ''
}


InputNumber.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  isRequired: PropTypes.bool
}

export default InputNumber

const MainInputNumber = styled.div``
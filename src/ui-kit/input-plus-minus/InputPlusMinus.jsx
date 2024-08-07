import React, {useCallback, useEffect, useState} from 'react'
import styled                                    from 'styled-components'
import Icon                                      from '../Icon'
import Ui                                        from 'src/assets/dictionaries/ui'
import Formatter                                 from 'src/utility/Formatter'
import PropTypes                                 from 'prop-types'

const _Formatter = new Formatter()

const InputPlusMinus = ({maximum, minimum, step, className, label, initialCounter, handleChange, name, value}) => {
  const [counter, onChangeCounter] = useState(initialCounter)
  useEffect(() => {
    onChangeCounter(value)

  }, [value])
  const onChange = useCallback((type) => {
    let newValue
    if (type === 'plus') {
      newValue = counter + step
    } else {
      newValue = counter - step
    }

    if (newValue <= minimum) {
      newValue = minimum
    }

    handleChange({target: {name, value: newValue >= maximum ? maximum : newValue}})
    onChangeCounter(newValue)
  }, [counter])

  return <StyledInputPlusMinus className={`d-flex justify-content-between align-items-center mt-3 ${className}`}>
    <button className="btn d-flex p-0 disable-scroll-body"
            onClick={() => onChange('plus')}
            disabled={maximum <= counter}>
      <Icon type="addSquare" className="text-charcoal"/>
    </button>
    <div
      className="border radius-8 w-100 d-flex position-relative text-16 input-plus-minus--counter btn-change-price text-16 mx-2 font-weight-bold text-black align-items-center justify-content-center text-black-800 border-charcoal-800">
      {_Formatter.commaSeparateNumber(maximum <= counter ? maximum : counter)}
      <span className="pe-1 text-10">{Ui.toman}</span>
      <span
        className="position-absolute text-12 line-height-20 bg-white p-1 input-plus-minus--counter--label">{label}</span>
    </div>
    <button className="btn d-flex p-0 disable-scroll-body"
            onClick={() => onChange('minus')}
            disabled={minimum >= counter}>
      <Icon type="minusSquare" className="text-charcoal"/>
    </button>
  </StyledInputPlusMinus>
}

const areEqual = (prevProps, nextProps) => prevProps.value === nextProps.value &&
  prevProps.maximum === nextProps.maximum &&
  prevProps.minimum === nextProps.minimum

InputPlusMinus.defaultProps = {
  minimum: null,
  maximum: null,
  step: 0,
  label: '',
  initialCounter: 0,
  handleChange: () => {},
  name: ''
}

InputPlusMinus.prototype = {
  step: PropTypes.number.isRequired,
  label: PropTypes.string,
  initialCounter: PropTypes.number,
  handleChange: PropTypes.func,
  name: PropTypes.string
}

export default React.memo(InputPlusMinus, areEqual)

const StyledInputPlusMinus = styled.div`
  .input-plus-minus--counter {
    padding: 10px;
    line-height: 18px;

    .input-plus-minus--counter--label {
      top: -15px;
      right: 12px;
    }
  }
`

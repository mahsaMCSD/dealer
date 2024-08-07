import NumberFormat   from 'react-number-format'
import React          from 'react'
import * as PropTypes from 'prop-types'
import ui             from 'src/assets/dictionaries/ui'


const format = {
  phone: '####-####-###',
  national_code: '###-######-#',
  iban: 'IR## #### #### #### #### #### ##',
  card_number: '####-####-####-####'
}

const suffix = {
  dollar_price: ' $ ',
  price: ` ${ui.toman} `
}

function NumberFormatCustom (props) {
  const {name, type, inputRef, onChange, maxNumber, ...other} = props
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: name,
            value: values.value
          }
        })
      }}
      autoComplete="off"
      isAllowed={(values) => {
        const {formattedValue, floatValue} = values
        return formattedValue === '' || (!(type === 'price' || type === 'dollar_price') || (type === 'price' || type === 'dollar_price') && floatValue <= maxNumber)
      }}
      dir={props.value ? 'ltr' : 'rtl'}
      allowLeadingZeros={type === 'phone' || type === 'mobile' || type === 'national_code' || type === 'number'}
      thousandSeparator={type === 'price' || type === 'dollar_price'}
      decimalSeparator={!(type === 'price' || type === 'dollar_price')}
      format={!other.maxLength && format[type]}
      isNumericString
      suffix={suffix[type] || ''}
    />
  )
}

NumberFormatCustom.defaultProps = {
  inputRef: {},
  name: '',
  maxNumber: 15000000000,
  onChange: () => {}
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default NumberFormatCustom

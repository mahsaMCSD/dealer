import React     from 'react'
import PropTypes from 'prop-types'

const InputErrorMessage = ({message, className}) =>
  <div className={`text-red text-12 mt-2 mx-4 ${className}`}>{message}</div>

InputErrorMessage.defaultProps = {
  className: '',
  message: ''
}

InputErrorMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired
}

export default InputErrorMessage

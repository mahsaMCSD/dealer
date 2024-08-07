import React     from 'react'
import PropTypes from 'prop-types'

const InputLabel = ({text, isRequired}) => {
  return <h6 className="mb-1 text-14 text-black-600 w-100 text-right">{text} {isRequired && '*'}</h6>
}

InputLabel.defaultProps = {
  text: '',
  isRequired: false
}

InputLabel.propTypes = {
  text: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired

}

export default InputLabel
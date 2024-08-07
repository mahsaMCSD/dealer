import React     from 'react'
import styled    from 'styled-components'
import PropTypes from 'prop-types'

const InputLabel = ({value, label, hasError, className}) =>
  <InputLabelStyled>
    <label className={`form-label position-absolute text-16 bg-white default-position-label ${(value !== '' && value !== null) ?
        'is_active_label text-12' : ''} ${hasError ? 'text-red' : ''} ${className}`}>
      {label}
    </label>
  </InputLabelStyled>

InputLabel.defaultProps = {
  className: '',
  value: '',
  label: '',
  hasError: false
}

InputLabel.propTypes = {
  className: PropTypes.string,
  hasError: PropTypes.bool,
  label: PropTypes.string
}

export default InputLabel

const InputLabelStyled = styled.div`
  .form-label {
    font-weight: 400;
    right: 18px;
    padding: 0 5px;
    transition: all 0s ease;
    color: var(--black-800);
  }

  .is_active_label {
    top: -1px !important;
    z-index: 10;
  }

  .default-position-label {
    transform: translate(0px, -50%);
    top: 50%;
  }
`

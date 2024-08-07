import React     from 'react'
import styled    from 'styled-components'
import PropTypes from 'prop-types'

const InputBase = ({...props}) => <MainInputBase {...props}
                                                 className={`text-right radius-4 w-100 text-field text-16 w-100 bg-charcoal-50 border-1 w-100 d-flex justify-content-center ${props.error && 'input-not-valid' || ''}`}/>

InputBase.defaultProps = {
  error: ''
}
InputBase.propTypes = {
  error: PropTypes.string
}

export default InputBase

const MainInputBase = styled.input`
  padding: 14px 16px;
  border-style: solid;
  border-color: var(--bs-gray-50);
  outline: none;
  width: auto;
  color: var(--bs-gray-700);

  &::placeholder {
    color: var(--black-400);
  }

  ${
          (e) => !e.readOnly && `
                                        &:focus {
                                            border-color: var(--yellow-orange);
                                            caret-color: var(--yellow-orange);
                                         }
                                       `
  }
  &.input-not-valid {
    color: var(--red) !important;
    border-color: var(--red) !important;
    caret-color: var(--red) !important;
  }

`
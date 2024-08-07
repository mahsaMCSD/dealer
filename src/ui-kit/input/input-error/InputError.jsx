import React     from 'react'
import styled    from 'styled-components'
import PropTypes from 'prop-types'

const InputError = ({text}) => {
  return <MainInputError className="mt-1 text-14 me-3 text-red w-100 text-right">
    {text}
  </MainInputError>
}

InputError.defaultProps = {
  text: ''
}

InputError.propTypes = {
  text: PropTypes.string.isRequired
}

export default InputError

const MainInputError = styled.h6`
  min-height: 21px;
`

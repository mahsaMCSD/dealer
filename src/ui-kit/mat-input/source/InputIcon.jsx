import React     from 'react'
import styled    from 'styled-components'
import PropTypes from 'prop-types'

import Icon from '../../Icon'

const InputIcon = ({handleRemoveValue, error, className, icon}) =>
  <InputIconStyled onClick={handleRemoveValue} className={`position-absolute d-flex align-items-center text-22 ${className}`}>
    <Icon type={icon} className={error && 'error_icon'}></Icon>
  </InputIconStyled>

InputIcon.defaultProps = {
  className: '',
  error: false,
  icon: 'closeCircle1',
  handleRemoveValue: () => {}
}

InputIcon.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  icon: PropTypes.string,
  handleRemoveValue: PropTypes.func
}

export default InputIcon

const InputIconStyled = styled.div`
  left: 20px;
  z-index: 10;
  cursor: pointer;
  top: 50%;
  transform: translate(0px, -50%);

  .error_icon {
    &:before {
      color: var(--red);
    }
  }

`

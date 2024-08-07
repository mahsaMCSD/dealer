import React from 'react'

import BootstrapButton from './BootstrapButton'
import SpinnerSvg      from 'src/components/SpinnerSvg'

import PropTypes from 'prop-types'
import styled    from 'styled-components'


const BasicButton = ({className, children, isLoading, ...props}) =>
  <MainButton {...props} className={className}>
    {isLoading
     ? <div
       className="d-block btn-loading m-auto">
       <SpinnerSvg/>
     </div>
     : children}
  </MainButton>

export default BasicButton

BasicButton.defaultProps = {
  isLoading: false
}

BasicButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  color: PropTypes.string,
  isLoading: PropTypes.bool
}

const MainButton = styled(BootstrapButton)`
  .btn-loading {
    width: fit-content;

    .spinner-icon {
      width: 24px;
      height: 19px;

      rect {
        fill: black;
      }
    }
  }
`

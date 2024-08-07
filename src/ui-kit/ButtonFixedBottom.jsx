import React, {memo} from 'react'
import BasicButton   from './button/BasicButton'
import PropTypes     from 'prop-types'
import styled        from 'styled-components'


const ButtonFixedBottom = ({isLoading, onClick, isDisable, children, errorMessage}) => <StyledFooter
  className="bottom-0 right-0 w-desktop position-fixed left-0 bg-white pt-2 px-3 pb-4">
  {
    errorMessage && <p className="text-12 font-weight-700 text-red-800">{errorMessage}</p>
  }
  <BasicButton isLoading={isLoading} onClick={onClick} disabled={isDisable}
               className={`radius-8  radius-8 button-fixed-bottom ${isDisable
                                                                    ? 'bg-charcoal-200'
                                                                    : 'bg-orange-crayola'} d-flex text-white w-100 text-16 justify-content-center align-items-center`}>
    {children}
  </BasicButton>
</StyledFooter>

ButtonFixedBottom.defaultProps = {
  isLoading: false,
  onClick: () => {},
  isDisable: false,
  children: <></>,
  errorMessage: ''
}

ButtonFixedBottom.prototype = {
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  isDisable: PropTypes.bool,
  children: PropTypes.element,
  errorMessage: PropTypes.string
}

export default memo(ButtonFixedBottom)

const StyledFooter = styled.footer`
  z-index: 1000;

  .button-fixed-bottom {
    padding: 10px 0;
    width: inherit;
  }
`

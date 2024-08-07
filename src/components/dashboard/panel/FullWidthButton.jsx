import React  from 'react'
import Icon   from 'src/ui-kit/Icon'
import ui     from 'src/assets/dictionaries/ui'
import styled from 'styled-components'

const FullWidthButton = ({iconName, isComingSoon, text, isExternal, onClick, className, path}) =>

  <MainFullWidthButton className={`row align-items-center text-right btn btn-block px-0 py-2 ${className}`}
                       onClick={
                         isExternal ? () => window.location.href = path :
                         onClick}>

    <div className="p-0 d-flex m-0 justify-content-around align-items-center ">
      <div className="col d-flex align-items-center p-0">
        <Icon type={iconName} className={`ps-2 h6  mb-0 text-center panel-icon ${isComingSoon
                                                                                 ? 'text-charcoal-400'
                                                                                 : 'text-charcoal-600'}`}/>
        <h6 className={`text-14 mb-0  ${isComingSoon ? 'text-black-600' : 'text-black-800'}`}>{text}</h6>
      </div>
      {isComingSoon &&
        <span className="col-auto badge text-12 bg-yellow-orange font-weight-light py-2 px-1 radius-8">
        {ui.profile.coming_soon}
      </span>
      }
    </div>
  </MainFullWidthButton>


export default FullWidthButton


const MainFullWidthButton = styled.button`
  .panel-icon {
    font-size: 24px;
  }

  &.border-top-only {
    border-width: 1px 0 0;
  }
`

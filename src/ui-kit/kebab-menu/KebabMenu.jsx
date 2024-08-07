import React        from 'react'
import PropTypes    from 'prop-types'
import styled       from 'styled-components'
import Icon         from 'src/ui-kit/Icon'
import useKebabMenu from './useKebabMenu'


const KebabMenu = ({classes, divider, menuItems, position, transformOrigin}) => {

  const {
    classHide,
    exitIconOnClickHandler,
    isShow,
    menuIconOnClickHandler,
    menuListRef,
    transformOriginValue
  } = useKebabMenu({position, transformOrigin})

  return (
    <RootKebabMenu transformOrigin={transformOriginValue} className={classes?.root}>


      <Icon type="verticalEllipsis"
            className={`verticalEllipsisIcon p-2 pointer ${isShow ? 'd-none' : ''} ${classes?.menuIcon}`}
            onClick={menuIconOnClickHandler}/>
      <ul className={`d-flex align-items-center radius-4 py-1 px-2 pe-4 bg-charcoal-100 ${isShow
                                                                                          ? 'show'
                                                                                          : classHide}  list ${classes?.list}`}
          ref={menuListRef} style={position}>

        {menuItems.map(({title, onClick}) => <li key={title} onClick={onClick} className={` text-12 px-1 ${divider
                                                                                                   ? 'border-bottom border-gray-400'
                                                                                                   : ''}`}>{title}</li>)}
        <div className="exitIcon d-flex align-items-center" onClick={exitIconOnClickHandler}>

          <Icon type="multiplication" className={`multiplication-icon pointer`}/>
        </div>
      </ul>
    </RootKebabMenu>
  )
}

KebabMenu.defaultProps = {
  classes: undefined,
  divider: false,
  position: {
    bottom: 0,
    left: 0
  },
  transformOrigin: undefined //example=> transformOrigin : 'bottom-left'
}
KebabMenu.propTypes = {
  classes: PropTypes.object,
  divider: PropTypes.bool,
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  position: PropTypes.object,
  transformOrigi: PropTypes.string
}

export default KebabMenu


const RootKebabMenu = styled.div`
  display: inline-flex;
  position: relative;

  .verticalEllipsisIcon {
    font-size: 30px;
    color: #710015;
  }

  .multiplication-icon {
    font-size: 22px;
  }

  .muont {
    display: none !important;
  }

  .hide {
    animation: hide-animation .3s cubic-bezier(.39, .575, .565, 1.000) both
  }

  .show {
    animation: show-animation .3s cubic-bezier(.39, .575, .565, 1.000) both
  }

  .list {
    padding-top: .25rem;
    min-width: 100px;
    position: absolute;
  }

  .border-bottom {
    border-bottom: 1px solid;
  }

  li:last-child {
    border-bottom: none !important;
  }

  @keyframes hide-animation {
    0% {
      transform: scale(1);
      transform-origin: ${props => props.transformOrigin}
    }
    100% {
      transform: scale(0);
      transform-origin: ${props => props.transformOrigin}
    }
  }

  @keyframes show-animation {
    0% {
      transform: scale(0);
      transform-origin: ${props => props.transformOrigin}
    }
    100% {
      transform: scale(1);
      transform-origin: ${props => props.transformOrigin}
    }
  }

`

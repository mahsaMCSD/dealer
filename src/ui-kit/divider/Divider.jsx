import React, {useMemo} from 'react'
import PropTypes        from 'prop-types'
import styled           from 'styled-components'

export const ORIENTATION_TYPE = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
}

const Divider = ({className, color, length, orientation, size, style, type, ...restProps}) => {
  const styleValue = useMemo(() => {
      if (orientation === ORIENTATION_TYPE.VERTICAL) {
        return {
          ...(color && {borderLeftColor: color}),
          ...(type && {borderLeftStyle: type}),
          ...(size && {borderLeftWidth: size}),
          ...(length && {height: length}),
          ...style
        }
      }
      return {
        ...(color && {borderBottomColor: color}),
        ...(type && {borderBottomStyle: type}),
        ...(size && {borderBottomWidth: size}),
        ...(length && {width: length}),
        ...style
      }
    }
    , [color, length, orientation, size, style, type])

  return (
    <RootDivider className={`${orientation} ${className}`} role="separator"
                 style={styleValue} {...restProps}></RootDivider>
  )
}

Divider.defaultProps = {
  className: '',
  color: undefined,
  length: undefined,
  orientation: ORIENTATION_TYPE.HORIZONTAL,
  size: undefined,
  style: undefined,
  type: undefined
}

Divider.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  length: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  orientation: PropTypes.string,
  size: PropTypes.oneOfType(PropTypes.number, PropTypes.string),
  style: PropTypes.object,
  type: PropTypes.string // This is based on border-style
}

export default Divider

const RootDivider = styled.div`
  background: none;
  margin: auto;

  &.horizontal {
    border-bottom: 2px solid black;
    height: 0;
    margin-bottom: .5rem;
    margin-top: .5rem;
    width: 100%;
  }

  &.vertical {
    border-left: 2px solid black;
    height: 100%;
    margin-left: .5rem;
    margin-right: .5rem;
    width: 0;
  }
`

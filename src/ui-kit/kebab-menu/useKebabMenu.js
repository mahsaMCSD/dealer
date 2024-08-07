import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import PropTypes                                           from 'prop-types'
import useOutsideEventListener                             from 'src/hooks/useOutsideEventListener'

const useKebabMenu = ({position, transformOrigin}) => {
  const [isShow, setIsShow] = useState(false)
  const classHideRef = useRef('muont')
  const menuListRef = useRef(null)


  const onOutsideEventHandler = useCallback(
    () => {
      if (isShow) {
        setIsShow(false)
      }
    },
    [isShow]
  )
  const outsideEventList = ['mousedown', 'touchstart']
  outsideEventList.forEach((event) => useOutsideEventListener({
    ref: menuListRef,
    event,
    onEvent: onOutsideEventHandler
  }))

  const transformOriginValue = useMemo(() => {
    if (transformOrigin) {
      return transformOrigin.split('-')
        .join(' ')
    } else {
      return Object.keys(position)
        .join(' ')
    }
  }, [position, transformOrigin])

  useEffect(() => {
    if (isShow) {
      classHideRef.current = 'hide'
    }
  }, [isShow])

  const menuIconOnClickHandler = useCallback(
    (event) => {
      setIsShow((preState) => !preState)
    },
    [setIsShow]
  )

  const exitIconOnClickHandler = (event) => {
    setIsShow(false)
  }

  return {
    classHide: classHideRef.current,
    exitIconOnClickHandler,
    isShow,
    menuIconOnClickHandler,
    menuListRef,
    transformOriginValue
  }
}

useKebabMenu.defaultProps = {
  position: {
    bottom: 0,
    left: 0
  },
  transformOrigin: undefined
}

useKebabMenu.propTypes = {
  position: PropTypes.object,
  transformOrigi: PropTypes.string
}

export default useKebabMenu

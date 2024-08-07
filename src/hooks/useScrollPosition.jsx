import React, {useEffect, useState} from 'react'

const useScrollPosition = ({id}) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      if (id) {
        document.getElementById(id) && setScrollPosition(document.getElementById(id).scrollHeight)
      } else {
        setScrollPosition(window.pageYOffset)
      }
    }
    if (id) {
      document.getElementById(id)
        .addEventListener('scroll', updatePosition)
    } else {
      window.addEventListener('scroll', updatePosition)
    }
    updatePosition()
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}

export default useScrollPosition

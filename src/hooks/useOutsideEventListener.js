import {useEffect} from 'react'
import PropTypes   from 'prop-types'

function useOutsideEventListener ({ref, event, onEvent, capture}) {
  useEffect(() => {
    function onOutsideEventHandler (event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onEvent(event)
      }
    }

    // Bind the event listener
    document.addEventListener(event, onOutsideEventHandler, capture)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener(event, onOutsideEventHandler, capture)
    }
  }, [ref, event, onEvent, capture])
}

useOutsideEventListener.defaultProps = {
  capture: false
}

useOutsideEventListener.propTypes = {
  ref: PropTypes.element.isRequired,
  event: PropTypes.string.isRequired,
  onEvent: PropTypes.func.isRequired,
  capture: PropTypes.bool

}

export default useOutsideEventListener

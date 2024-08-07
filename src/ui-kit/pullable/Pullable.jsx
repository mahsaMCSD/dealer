import React, {useRef} from 'react'
import Pullable        from 'react-pullable'

const PullableCustom = ({onRefresh, disabled, children}) => {
  const ref = useRef()

  return <div>
    <Pullable
      onRefresh={onRefresh}
      shouldPullToRefresh={() => ref.current.getBoundingClientRect().y >= 73}
      disabled={disabled}
    >
      <div ref={ref}>
        {children}
      </div>

    </Pullable>
  </div>
}

PullableCustom.defaultProps = {
  onRefresh: () => {},
  disabled: false
}

export default PullableCustom

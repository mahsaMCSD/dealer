import React from 'react'

const BootstrapButton = ({className, children, ...props}) =>
  <button {...props} className={`${className} btn`}>{children}</button>

export default BootstrapButton

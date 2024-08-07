import React     from 'react'
import PropTypes from 'prop-types'

const styles = {
  input: {
    height: '3.5rem',
    backgroundColor: '#fcfcfc',
    borderRadius: '0.35rem',
    ':placeholder': {
      color: '#000'
    }
  }
}
const TextField = ({input, ...props}) =>
  <div
    className={`d-flex text-16 ${props.error ? 'border-danger border border-2' : ''} ${props.className ? props.className : ''}`}
    style={styles.input}>
    {props.icon && props.isValid &&
    <div className='d-flex align-items-center  justify-content-start me-3 w-25  text-center p-0'>{props.icon}</div>}
    <div className={`p-0  d-flex align-items-center h-100 ${props.icon && props.isValid ? 'w-75' : 'w-100'}`}>
      <input
        id={input.id}
        className={`w-100 text-black h-100 border-0 ms-3 me-3 bg-transparent ${input.className ? input.className : ''}`}
        maxLength={input.maxLength}
        dir={input.dir}
        style={input.style} placeholder={input.placeholder || ''}
        type={input.type} value={input.value} onChange={input.onChange}/>
    </div>
  </div>

export default TextField
TextField.propTypes = {
  input: PropTypes.shape({
    style: PropTypes.object,
    type: PropTypes.string,
    maxLength: PropTypes.number,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    dir: PropTypes.string
  }),
  icon: PropTypes.element,
  isValid: PropTypes.bool,
  className: PropTypes.string
}

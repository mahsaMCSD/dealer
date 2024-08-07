import React     from 'react'
import PropTypes from 'prop-types'

import ui        from 'src/assets/dictionaries/ui'
import Formatter from 'src/utility/Formatter'

const _Formatter = new Formatter()

const Cost = ({classes, currency, title, value}) => (
  <div className={`d-flex flex-column justify-content-center align-items-center p-1 ${classes?.root}`}>
    <div className={`mb-2 ${classes?.title}`}>{title}</div>
    <div className={`${classes?.value}`}><span
      className={`font-weight-700 text-18 ps-1 ${classes?.digit}`}>{_Formatter.commaSeparateNumber(value)}</span>{currency}
    </div>
  </div>
)

Cost.defaultProps = {
  classes: {
    root: '',
    title: '',
    value: '',
    digit: ''
  },
  currency: ui.toman
}

Cost.propTypes = {
  classes: PropTypes.object,
  currency: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

export default Cost

import React     from 'react'
import {Link}    from 'react-router-dom'
import Icon      from '../Icon'
import PropTypes from 'prop-types'
import styled    from 'styled-components'

const ButtonCreate = ({link, label, icon}) => <StyledButtonCreate to={link}
                                                                  className="pointer btn-create radius-16 align-items-center p-3 bg-charcoal-50 d-flex">
  {icon && <Icon className={'text-16 text-charcoal-800'} type={icon}/>}
  <h6 className="text-16 text-black-800 mb-0 me-2">{label}</h6>
</StyledButtonCreate>

ButtonCreate.defaultProps = {
  link: '',
  label: '',
  icon: ''
}

ButtonCreate.propTypes = {
  link: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string
}

export default ButtonCreate

const StyledButtonCreate = styled(Link)`
  width: fit-content;
`

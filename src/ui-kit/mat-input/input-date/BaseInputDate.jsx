import React  from 'react'
import styled from 'styled-components'

const BaseInputDate = ({...props}) =>
  <BaseInputDateStyled {...props}
   className={`position-absolute top-0 px-4 py-2 left-0 w-100 h-100 radius-8 bg-transparent ${!props.error ? 'border-red' : ''}`}/>
export default BaseInputDate

const BaseInputDateStyled = styled.input`
  z-index: 1;
  border: 1px solid var(--charcoal-800);
  color: var(--black-800);
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border: 1px solid var(--yellow-orange);
  }

  &:focus ~ div .form-label {
    top: -1px;
    font-size: 7.2pt;
    color: var(--yellow-orange);
    transition: all 0.2s ease-in-out;
    z-index: 10;
  }
`

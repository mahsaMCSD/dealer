import React, {useCallback, useState} from 'react'
import styled                         from 'styled-components'
import Icon                           from '../Icon'

const Accordion = ({label, headerLeftElement, list, initialIsOpen , listLeftElement}) => {
  const [isOpen, onToggleIsOpen] = useState(initialIsOpen)

  const handleAccordion = useCallback(() => {
    onToggleIsOpen(!isOpen)
  }, [isOpen])

  return <StyledAccordion className='radius-8 border border-charcoal-200 overflow-hidden mb-3'>
    <div className='bg-black-50 accordion-header pointer d-flex justify-content-between' onClick={handleAccordion}>
      <div className='d-flex align-items-center'>
        <Icon type='arrowDown' className={`text-charcoal-800 accordion-header--icon ${isOpen ? 'accordion-header--icon__rotate' : ''}`}/>
        <h6 className='text-black font-weight-700 text-12 mb-0'>{label}</h6>
      </div>
      {headerLeftElement}
    </div>
    {
       <ul className={`d-flex flex-column accordion-list ${isOpen ? 'accordion-list__open' : ''}`}>
        {list.map(listItem => <li className='d-flex justify-content-between text-black-800 text-10 mb-3 accordion-list--item'>{listItem.title}{listLeftElement(listItem.value)}</li>)}
      </ul>
    }
  </StyledAccordion>
}

Accordion.defaultProps = {
  list: [],
  label: '',
  values: '',
  initialIsOpen: false,
  headerLeftElement: <></>,
  listLeftElement: <></>
}

export default Accordion

const StyledAccordion = styled.div`
  .accordion-header {
    border-radius: 8px 8px 0 0;
    padding: 10px 12px;
    .accordion-header--icon {
      transition:all 0.2s ease;
      margin-left: 10px;
      &:before {
        color: var(--charcoal-800);
      }
    }

    .accordion-header--icon__rotate {
      transform:rotate(180deg);
    }
  }
  
  .accordion-list {
    transition-property: height;
    transition-duration: 1s;
    height: 0;

    .accordion-list--item{
      margin: 0 12px;
      &.accordion-list--item:first-child {
        margin-top: 12px;
      }
      &.accordion-list--item:last-child   {
        margin-bottom: 12px !important;
      }
    }
  }
  

  .accordion-list__open {
    height: auto;
  }

  
`

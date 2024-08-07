import React     from 'react'
import styled    from 'styled-components'
import PropTypes from 'prop-types'
import Icon      from './Icon'

const Wizard = ({list, activeIndex, className}) => <StyledWizard className={`d-flex justify-content-between ${className}`}>
  {
    list.map((wizardItem, index) => <div key={wizardItem.key}
                                         className={`d-flex wizard-item ${(activeIndex > index)
                                                                          ? 'wizard-item__before_active'
                                                                          : ''} justify-content-center flex-column align-items-center w-100`}>
      <div className={`rounded-circle bullet  ${activeIndex === index
                                                ? 'bullet__active bg-orange-crayola-100'
                                                : 'bg-charcoal-200'}`}>

        {activeIndex > index && <Icon type={'circleChecked'}/>}

      </div>
      <span className={`${activeIndex === index
                          ? 'text-orange-crayola'
                          : 'text-black-600'} mt-1 text-14 font-weight-bold`}>
        {wizardItem.title}
      </span>
    </div>)
  }
</StyledWizard>

Wizard.defaultProps = {
  list: [],
  activeIndex: 0,
  className: ''
}

Wizard.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })),
  activeIndex: PropTypes.number.isRequired,
  className: PropTypes.string
}


export default Wizard

const StyledWizard = styled.div`

  .wizard-item {
    position: relative;

    &:before {
      position: absolute;
      content: '';
      height: 1px;
      width: calc(100% - 30px);
      right: calc(50% + 18px);
      top: 12px;
      background: var(--charcoal-200);

    }

    &.wizard-item__before_active:before {
      width: calc(100% - 35px);
      right: calc(50% + 15px);
      background: var(--orange-crayola);
    }


    &:last-child:before {
      display: none;
    }
    
    .bullet {
      position: relative;
      width: 16px;
      height: 16px;
      margin: 4px;

      &.bullet__active {
        width: 24px;
        height: 24px;
        margin: 0;

        &:before {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          border-radius: 50%;
          margin: auto;
          width: 12px;
          height: 12px;
          content: '';
          background: var(--orange-crayola);
        }


      }
    }

    &.wizard-item__before_active {
      .bullet {
        background: transparent;
      }
    }
  }


`

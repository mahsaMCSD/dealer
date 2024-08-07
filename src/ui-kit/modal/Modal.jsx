import React, {useEffect} from 'react'
import Modal              from 'react-modal'
import Icon               from 'src/ui-kit/Icon'
import PropTypes          from 'prop-types'
import './modalAnimation.scss'
import styled             from 'styled-components'
import {breakpointsPX}    from 'src/assets/js/consts'

const bottom = {
  top: 'auto',
  bottom: '0',
  right: '0',
  left: '0',
  borderRadius: '24px 24px 0 0',
  maxHeight: '70vh',
  overflowY: 'auto',
  borderColor: 'transparent',
  animation: 'modal-bottom-animate-enter 300ms',
  padding: '0'
}
const center = {
  top: '50%',
  transform: 'translateY(-50%)',
  right: '10%',
  left: '10%',
  bottom: 'unset',
  width: '80%',
  padding: '0',
  borderRadius: '16px'
}

const fullView = {
  right: 0,
  left: 0,
  bottom: 0,
  top: 0,
  width: '100%',
  backgroundColor: '#000',
  borderRadius: 0,
  border: 'unset'
}

const fullWidthStyle = {
  right: '0',
  left: '0',
  width: '100%',
  borderRadius: '2rem 2rem 0 0',
  padding: '0'

}

let customStyles = {
  content: {
    padding: '0',
    width: '100%',
    backgroundColor: '#FFFFFF'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 99999
  }
}
const styles = {
  close: {
    top: '25px',
    right: '18px',
    transform: 'translateY(-50%)',
    zIndex: '10'
  }
}
const Modal45 = ({
                   postion,
                   fullWidth,
                   openModal,
                   closeModal,
                   children,
                   title,
                   header,
                   headerColor,
                   style,
                   forceStyleContent,
                   className
                 }) => {

  useEffect(() => {
    if (openModal) {
      document.body.style.overflowY = 'hidden'

    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [openModal])

  function styleModal () {
    customStyles = {...customStyles, ...style}
    if (postion === 'center') {
      if (fullWidth) {
        return {...customStyles, content: {...customStyles.content, ...center, ...fullWidthStyle}}

      } else {
        return {...customStyles, content: {...customStyles.content, ...center}}
      }
    } else if (postion === 'center_auto') {
      return {...customStyles, content: {...customStyles.content, ...center, ...forceStyleContent}}
    } else if (postion === 'full') {
      return {...customStyles, content: {...customStyles.content, ...fullView}}
    } else {
      return {...customStyles, content: {...customStyles.content, ...bottom, ...forceStyleContent}}
    }
  }

  return <Modal isOpen={openModal}
                onRequestClose={closeModal}
                appElement={document.getElementById('root')}
                style={styleModal()}>
    <MainModal className={className}
               postion={postion}
    >

      {header &&
      <header
        className={`d-flex position-fixed w-desktop bg-white left-0 right-0 justify-content-center text-black mb-1 text-16 py-3 ${headerColor}`}>
        {closeModal && <span onClick={closeModal} className="position-absolute pointer" style={styles.close}>
        <Icon type={'closeCircle'} className="text-black h4"/>
      </span>}

        <h6 className="d-flex text-center lh-base text-16 text-purple font-weight-bold m-0 ">{title}</h6>
      </header>}
      <div className={'modal-main'}>
        {children}
      </div>
    </MainModal>

  </Modal>
}
Modal45.defaultProps = {
  header: true,
  style: {},
  headerColor: '',
  fullWidth: false,
  forceStyleContent: {},
  className: '',
  postion: 'bottom'
}
Modal45.prototype = {
  openModal: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool,
  header: PropTypes.bool,
  headerColor: PropTypes.string.isRequired,
  postion: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  className: PropTypes.string
}

export default Modal45

const MainModal = styled.div`
  header {
    height: 50px;
    z-index: 100;
    border-radius: 24px 24px 0 0;
    @media (min-width: ${breakpointsPX.md}) {
      ${(e) => e.postion === 'center' ? ` width: calc(var(--max-dekstop) - 70px) !important;` : ''}
    }
  }

  .modal-main {
    ${(e) => e.postion === 'center' || e.postion === 'bottom' ? `padding-top: 35px;` : ''}
  }
`

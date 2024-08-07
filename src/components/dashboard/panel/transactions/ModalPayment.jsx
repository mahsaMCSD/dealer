import React         from 'react'
import PropTypes     from 'prop-types'
import styled        from 'styled-components'
import OnBoarding    from './OnBoarding'
import PaymentResult from './PaymentResult'
import ui            from 'src/assets/dictionaries/ui'
import Modal         from 'src/ui-kit/modal/Modal'


const ModalPayment = ({openModal, closeModal, type, title}) => {

  const showPayment = () => {
    switch (type) {
      case 'result':
        return <PaymentResult/>
      case 'OnBoarding':
        return <OnBoarding closeModal={closeModal}/>
      default:
        break
    }
  }
  return <Modal
    openModal={openModal}
    header={{
      onClose: () => closeModal(false)
    }}
    title={title}
    className={'pre-payment'}
    closeModal={() => closeModal(false)}
    style={{
      content: {borderRadius: '8px', padding: '16px'}
    }}
    postion={'center'}>
    <MainModalPayment className="flex flex-column p-3 justify-content-center align-items-center">
      {showPayment()}
    </MainModalPayment>
  </Modal>
}

ModalPayment.defaultProps = {
  openModal: false,
  type: 'tab',
  closeModal: () => {},
  title: ui.on_boarding_payment.title
}
ModalPayment.prototype = {
  openModal: PropTypes.bool.isRequired,
  tab: PropTypes.string,
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  getData: PropTypes.func
}
export default ModalPayment

const MainModalPayment = styled.div`
  .modal-payment--title {
    margin-bottom: 16px;
  }
`

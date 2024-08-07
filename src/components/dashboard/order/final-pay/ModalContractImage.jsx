import React     from 'react'
import Modal     from 'src/ui-kit/modal/Modal'
import ui        from 'src/assets/dictionaries/ui'
import styled    from 'styled-components'
import {connect} from 'react-redux'

const ModalContractImage = ({openModal, closeModal, ...props}) => <Modal title={ui.final_pay.modal_contract_title}
                                                                         openModal={openModal}
                                                                         closeModal={closeModal}>
  <MainModal className={'m-3 pt-1'}>
    <img src={`${props.data_final_pay.signed_contract_image}`} className="mx-3"/>
    <a
      href={`${props.data_final_pay.signed_contract_image}`}
      download={`contract-image-${props.data_final_pay.appointment}.jpg`}
      target={'_blank'}
      className={'mt-5 btn w-100 border-yellow-orange radius-4 text-yellow-orange text-16 text-center '}>{ui.final_pay.modal_contract_save_image}</a>
  </MainModal>
</Modal>

const mapStateToProps = state => ({data_final_pay: state.payment.data_final_pay})

export default connect(mapStateToProps)(ModalContractImage)

const MainModal = styled.div`
  img {
    object-fit: contain;
    width: calc(100vw - 4rem);
    height: auto;
    @media (min-width: 767.98px) {
      width: calc(350px - 4rem);
    }
  }
`

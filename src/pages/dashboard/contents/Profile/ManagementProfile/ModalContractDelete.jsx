import React, {useCallback, useState} from 'react'
import {NotificationManager}          from 'src/ui-kit/notifications'
import Modal                          from 'src/ui-kit/modal/Modal'
import ui                             from 'src/assets/dictionaries/ui'
import Icon                           from 'src/ui-kit/Icon'
import styled                         from 'styled-components'
import {deleteContractService}        from 'src/api/services/notary'
import PropTypes                      from 'prop-types'

const fieldData = [
  {
    key: 'type_advocacy',
    title: ui.notary_and_contract.contract.type_contract,
    value: 'participation_type'
  }, {
    key: 'attorney_type',
    title: ui.notary_and_contract.contract.type_advocacy,
    value: 'attorney_type'
  }, {
    key: 'colleague',
    title: ui.notary_and_contract.contract.colleague,
    value: 'full_name'
  }
]

const ModalContractDelete = ({dataModal, closeModal, getData}) => {
  const [isDisable, onChangeIsDisable] = useState(false)

  const deletedContract = useCallback(() => {
    onChangeIsDisable(true)
    deleteContractService(dataModal.id)
      .then(() => {
        getData()
        NotificationManager.success(ui.notary_and_contract.contract.success_delete)
      })
      .catch((error) =>
        NotificationManager.error(error.data.message))
      .finally(() => {
        closeModal(true)
        onChangeIsDisable(false)
      })
  }, [dataModal.id])


  return dataModal ? <Modal openModal={true} closeModal={closeModal}
                            postion='bottom'
                            title={ui.notary_and_contract.contract.modal_delete.title}>
    <StyledModalContractDelete>
      <div className="d-flex justify-content-center flex-column align-items-center mx-3 my-4">
        <Icon className='receipt-edit-icon text-charcoal' type={'receiptEdit'}/>
        <h5 className="text-black text-14 my-3">{ui.notary_and_contract.contract.modal_delete.description}</h5>
        <div
          className='border w-100 radius-8 p-2 overflow-hidden border-charcoal-200 d-flex justify-content-center align-items-center flex-column'>
          {
            fieldData.map(item => dataModal[item.value] && <h6 key={item.key}
                                                               className='text-14 text-ellipsis py-2 mb-0 mx-2 text-black-800'>{item.title} : <span
              className='font-weight-700 me-1'>{dataModal[item.value]}</span></h6>)
          }
        </div>
        <div className="d-flex justify-content-between w-100 mt-4">
          <div className="text-16 action-btn w-50 radius-8 pointer text-center text-white bg-yellow-orange ms-4"
               onClick={closeModal}>
            {ui.bank_account.delete_modal.close}
          </div>
          <div onClick={!isDisable && deletedContract}
               className="text-16 action-btn w-50 radius-8 pointer text-center border-yellow-orange border text-yellow-orange">
            {ui.notary_and_contract.contract.modal_delete.title}
          </div>
        </div>
      </div>
    </StyledModalContractDelete>
  </Modal> : ''
}

ModalContractDelete.defaultProps = {
  dataModal: {},
  closeModal: () => {},
  getData: () => {}
}

ModalContractDelete.propTypes = {
  dataModal:
    PropTypes.shape({
      participation_type: PropTypes.string.isRequired,
      full_name: PropTypes.string,
      attorney_type: PropTypes.string,
      id: PropTypes.number
    })
  ,
  closeModal: PropTypes.func,
  getData: PropTypes.func
}
export default ModalContractDelete

const StyledModalContractDelete = styled.div`
  .receipt-edit-icon {
    font-size: 48px !important;
    margin-bottom: 20px;
  }

  .action-btn {
    padding: 10px 0;
  }
`

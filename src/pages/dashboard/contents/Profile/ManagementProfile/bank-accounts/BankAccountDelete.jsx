import React, {useState}          from 'react'

import Modal                      from 'src/ui-kit/modal/Modal'
import ui                         from 'src/assets/dictionaries/ui'
import Icon                       from 'src/ui-kit/Icon'
import {deleteBankAccountService} from 'src/api/services/bankAccount'
import {NotificationManager}      from 'src/ui-kit/notifications'
import Ui                         from 'src/assets/dictionaries/ui'

const BankAccountDelete = ({dataModal, closeModal}) => {
  const [isDisable, onChangeIsDisable] = useState(false)

  const deletedBankAccount = async () => {
    onChangeIsDisable(true)
    try {
      await deleteBankAccountService(dataModal.slug)
      NotificationManager.success(Ui.bank_account.delete_modal.delete_success_message)
      closeModal(true)
      onChangeIsDisable(false)
    } catch (e) {
      onChangeIsDisable(false)
    }
  }

  return dataModal ? <Modal openModal={true} closeModal={closeModal} title={ui.bank_account.delete_modal.header}>
    <div className="d-flex justify-content-center flex-column align-items-center mx-3 my-4">
      <Icon type={'trash2'}/>
      <h5 className="text-black text-14 my-4">{ui.bank_account.delete_modal.title}</h5>
      <h6 className="text-14 text-black-800 mb-2 pb-1">{dataModal?.numberAccount}</h6>
      <h6 className="text-12 text-black-600 mb-2 pb-1">
        {dataModal?.detailAccount}
      </h6>
      <div className="d-flex justify-content-between w-100 mt-2">
        <div className="text-16 py-2 w-50 radius-4 pointer text-center text-white bg-yellow-orange ms-4"
             onClick={closeModal}>
          {ui.bank_account.delete_modal.close}
        </div>
        <div onClick={!isDisable && deletedBankAccount}
             className="text-16 py-2 w-50 radius-4 pointer text-center border-charcoal-400 border text-charcoal-600">
          {ui.bank_account.delete_modal.submit_delete}
        </div>
      </div>
    </div>
  </Modal> : ''
}

export default BankAccountDelete

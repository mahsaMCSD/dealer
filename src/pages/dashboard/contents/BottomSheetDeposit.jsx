import React, {memo, useEffect, useState} from 'react'
import Modal                              from 'src/ui-kit/modal/Modal'
import ui                                 from 'src/assets/dictionaries/ui'
import OnBoarding                         from 'src/components/membership-fee/OnBoarding'
import {useNavigate}                      from 'react-router-dom'
import PropTypes                          from 'prop-types'

const BottomSheetDeposit = ({isOpen, handleIsOpen}) => {
  const history = useNavigate()


  function onCloseModalMembershipFee () {
    history('', {replace: true})
    handleIsOpen(false)
  }

  return isOpen && <Modal openModal={isOpen}
                          className="pb-4"
                          closeModal={onCloseModalMembershipFee}
                          forceStyleContent={{maxHeight: '90vh'}}
                          title={ui.membership_fee.title}>
    <div className="pt-5">
      <OnBoarding type={'bottom-sheet'}/>
    </div>
  </Modal>
}

BottomSheetDeposit.defaultProps = {
  isOpen: false,
  handleIsOpen: () => {}
}

BottomSheetDeposit.prototype = {
  isOpen: PropTypes.bool.isRequired,
  handleIsOpen: PropTypes.func.isRequired
}

const areEqual = (prevProps, nextProps) => prevProps.isOpen === nextProps.isOpen

export default memo(BottomSheetDeposit, areEqual)

import React, {useCallback, useEffect, useState} from 'react'
import styled                                    from 'styled-components'
import Modal                                     from 'src/ui-kit/modal/Modal'
import PropTypes                                 from 'prop-types'
import Icon                                      from 'src/ui-kit/Icon'
import ui                                        from 'src/assets/dictionaries/ui'
import {getTipsRateStarService}                  from 'src/api/services/appUser'


const ModalInfoGetStar = ({openModal, closeModal}) => {

  const [tips, onChangeTips] = useState([])

  const getTipsRateStar = useCallback(() => {
    getTipsRateStarService()
      .then(res => onChangeTips(res.sort((a, b) => a.order - b.order)))
  }, [])

  useEffect(() => {openModal && tips.length === 0 && getTipsRateStar()}, [openModal])

  return <Modal
    openModal={openModal}
    title={`نحوه محاسبه رتبه دهی`}
    classes={'modal-out'}
    closeModal={closeModal}
    style={{
      content: {borderRadius: '8px', padding: '16px'}
    }}
    postion={'center'}>
    <MainModalInfoGetStar className={'p-3'}>

      <div className="d-flex justify-content-center align-items-end">
        <Icon type={'starFull'} className={'star-1'}/>
        <Icon type={'starFull'} className={'star-2'}/>
        <Icon type={'starFull'} className={'star-3'}/>
        <Icon type={'starFull'} className={'star-4'}/>
        <Icon type={'starFull'} className={'star-5'}/>
      </div>

      <h6 className="title-body text-13 text-gray-700">{ui.modal_getting_star.title_body}</h6>
      {tips.map(tip => <h6 key={tip.title} className="text-12 text-gray-700 mb-3">- {tip.title}</h6>)}
      <button className="btn w-100 btn-orange text-16 text-white modal-info-get--submit"
              onClick={closeModal}>{ui.modal_getting_star.submit}</button>
    </MainModalInfoGetStar>
  </Modal>
}

ModalInfoGetStar.defaultProps = {
  openModal: false,
  type: 'tab',
  closeModal: () => {}
}
ModalInfoGetStar.prototype = {
  openModal: PropTypes.bool.isRequired,
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired
}

export default ModalInfoGetStar

const MainModalInfoGetStar = styled.div`
  header {
    margin-bottom: 28px;
  }

  .star-1, .star-5 {
    font-size: 24px;
    margin: 0px 14px;
  }

  .star-2, .star-4 {
    font-size: 32px !important;
    margin: 1px 0;
  }

  .star-3 {
    font-size: 48px !important;
    margin: 2px 14px;
  }

  .title-body {
    margin-top: 34px;
    margin-bottom: 24px;
  }

  .modal-info-get--submit {
    margin-top: 38px;
  }
`

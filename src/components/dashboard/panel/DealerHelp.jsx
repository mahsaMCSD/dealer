import React, {useEffect, useState} from 'react'
import PropTypes                    from 'prop-types'
import Icon                         from 'src/ui-kit/Icon'
import styled                       from 'styled-components'
import {connect}                    from 'react-redux'
import ReactStars                   from 'react-rating-stars-component'
import ModalInfoGetStar             from 'src/pages/dashboard/contents/ModalInfoGetStar'
import Modal                        from 'src/ui-kit/modal/Modal'
import ui                           from 'src/assets/dictionaries/ui'
import ListEditProfile              from './modal-profile/ListEditProfile'
import ModalAvatar                  from './modal-profile/ModalAvatar'

const DealerHelp = (props) => {

  const [showStar, toggleShowStar] = useState(false)
  const [openModal, onChangeOpenModal] = useState(false)
  const [modalEditProfile, onChangeModalEditProfile] = useState(false)
  const [modalChooseAvatar, onChangeModalChooseAvatar] = useState(false)

  useEffect(() => {
      toggleShowStar(false)
      const timOut = setTimeout(() => {
        toggleShowStar(true)
      }, 500)

      return () => {
        clearTimeout(timOut)
      }
    }
    , [props.user])

  const handleModalChooseAvatar = () => {
    onChangeModalEditProfile(false)
    onChangeModalChooseAvatar(true)
  }

  return <MainDealerHelp className="d-flex flex-column m-0 bg-charcoal-50 radius-4">
    <div className="d-flex user-info h-100 align-items-center">
      <div onClick={() => onChangeModalEditProfile(true)}>
        {
          props.user?.photo ? <img src={props.user?.photo} width={73} height={73}/> :
          <Icon type={'galleryEdit'} className={'dealer-help--icon'}/>
        }
      </div>
      <div className="d-flex flex-column user-info-data  justify-content-between">
        <h6 className="mb-2 text-black-800 text-14">{props.user.first_name} {props.user.last_name}</h6>
        <h6 className="mb-0 text-black-800 text-14">{props.user.mobile}</h6>
      </div>
    </div>
    <div className="d-flex align-items-center mt-2 pt-1">
      <div className="user-info-stars border radius-4 bg-white border-charcoal-200">

        <div className="d-flex">
          <h6
            className="mb-0 text-14 user-info-rate bg-yellow-orange text-white radius-4"
            onClick={() => onChangeOpenModal(true)}
          >
            {props.user.person_trust === '' || props.user.person_trust === undefined
             ? 'بدون'
             : parseFloat(props.user.person_trust) + 1} امتیاز

          </h6>
          {showStar && <div className="mx-3" dir="ltr"><ReactStars
            halfIcon={<Icon type="starHalf"/>}
            filledIcon={<Icon type="starFull"/>}
            emptyIcon={<Icon type="starEmpty2"/>}
            edit={false}
            classNames="d-flex flex-row-reverse"
            isHalf={true}
            value={props.user.person_trust === '' || props.user.person_trust === undefined
                   ? 0
                   : parseFloat(props.user.person_trust || 0) + 1}
          /></div>}


        </div>

      </div>
    </div>


    <ModalInfoGetStar openModal={openModal} closeModal={() => onChangeOpenModal(false)}/>
    <Modal title={ui.choose_picture} postion="bottom" openModal={modalEditProfile}
           closeModal={() => onChangeModalEditProfile(false)}>
      <ListEditProfile handleModalAvatar={handleModalChooseAvatar} onChangeModalEditProfile={onChangeModalEditProfile}/>
    </Modal>
    <Modal title={ui.choose_picture} postion="bottom" openModal={modalChooseAvatar}
           closeModal={() => onChangeModalChooseAvatar(false)}>
      <ModalAvatar onChangeModalChooseAvatar={onChangeModalChooseAvatar}/>
    </Modal>
  </MainDealerHelp>
}
const mapStateToProps = (state) => ({
  user: state.userInfo.appUser.info
})
export default connect(mapStateToProps, null)(DealerHelp)

DealerHelp.defaultProps = {
  center: null
}
DealerHelp.propTypes = {
  center: PropTypes.object
}

const MainDealerHelp = styled.div`
  padding: 16px;

  .user-info {
    h6 {
      line-height: 24px;
    }
  }

  .user-info-data {
    height: 53px;
    padding-right: 13px;
  }

  .user-info-stars {
    height: 32px;

    .react-stars {
      top: 3px;
    }
  }

  .user-info-rate {
    line-height: 30px;
    padding: 0px 8px;
  }

  .dealer-help--icon {
    font-size: 77px;
  }
`

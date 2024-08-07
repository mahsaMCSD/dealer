import React     from 'react'
import styled    from 'styled-components'
import {connect} from 'react-redux'

import {createDealerImage, editByIdDealerImageProfile, inspectionsDealerSegmentService} from 'src/api/services/appUser'

import Icon                from 'src/ui-kit/Icon'
import ui                  from 'src/assets/dictionaries/ui'
import UploadPicture       from './UploadPicture'
import NotificationManager from 'src/ui-kit/notifications/NotificationManager'
import {SetUser}           from 'src/store/userInfo/appUser/actions'

const ListEditProfile = ({handleModalAvatar, onChangeModalEditProfile, ...props}) => {

  const handleChangePicture = (event) => {
    createDealerImage({type: 0, file: event.target.value})
      .then(res => {
        editByIdDealerImageProfile(props.user.id, {photo: res.id})
          .then(() => {
            NotificationManager.success(ui.message_success_picture_profile)
            inspectionsDealerSegmentService()
              .then(res => {
                props.onChangeUserInfo({
                  ...props.user,
                  ...res,
                  photo: res.photo
                })
              })
              .catch(console.log)
          })
      })
      .catch(() => {
        NotificationManager.error(ui.message_un_success_picture_profile)
      })
      .finally(() => {
        onChangeModalEditProfile(false)
      })
  }

  return (
    <MainListEditProfile>
      <UploadPicture iconType="galleryAdd" className="item-list" title={ui.choose_picture} handleChange={handleChangePicture}/>
      <li className="item-list" onClick={handleModalAvatar}>
        <Icon type="defaultAvatar"/>
        <span className="text-14 text-black mx-3">{ui.choose_default_picture}</span>
      </li>
    </MainListEditProfile>
  )
}

const mapStateToProps = (state) => ({
  user: state.userInfo.appUser.info
})

const mapDispatchToProps = (dispatch) => ({
  onChangeUserInfo: (value) => dispatch(SetUser(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListEditProfile)

const MainListEditProfile = styled.ul`
  padding: 0 19px;
  margin: 10px 0 20px 0;

  .item-list {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0;
    cursor: pointer;
  }
`

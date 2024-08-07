import React, {useMemo, useState} from 'react'
import styled                     from 'styled-components'
import {connect}                  from 'react-redux'

import {createDealerImage, editByIdDealerImageProfile, inspectionsDealerSegmentService} from 'src/api/services/appUser'

import ui                           from 'src/assets/dictionaries/ui'
import {SetUser}                    from 'src/store/userInfo/appUser/actions'
import NotificationManager          from 'src/ui-kit/notifications/NotificationManager'
import {femaleAvatars, maleAvatars} from './avatars'

const ModalAvatar = (props) => {

  const [activeAvatar, setActiveAvatar] = useState({src: null, index: -1})

  const selectedAvatar = useMemo(() =>
      props.user?.gender === 'female' ? femaleAvatars : maleAvatars
    , [props.user?.gender])

  const handleActiveAvatar = (index, src) => {
    setActiveAvatar({index, src})
  }

  const handleSetProfile = () => {
    createDealerImage({type: 0, file: activeAvatar.src})
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
          .catch(() => {
            NotificationManager.error(ui.message_un_success_picture_profile)
          })
      })
      .catch(console.log)
      .finally(() => {
        props.onChangeModalChooseAvatar(false)
      })
  }

  return (
    <MainModalAvatar>
      <div className="inner-modal row justify-content-between">
        {
          selectedAvatar?.length && selectedAvatar.map((item, index) =>
            <div className={`box-avatar my-2 ${activeAvatar.index === index
                                               ? 'box-avatar-active'
                                               : 'box-avatar-not-active'}`}
                 onClick={() => handleActiveAvatar(index, item)}>
              <img src={item} width={64} height={64}/>
            </div>
          )
        }
      </div>
      <button className="radius-4 btn text-white text-16 py-2 mb-4 mt-5 bg-yellow-orange w-100"
              onClick={handleSetProfile}>
        {ui.change_profile_picture}
      </button>
    </MainModalAvatar>
  )
}

const mapStateToProps = (state) => ({
  user: state.userInfo.appUser.info
})

const mapDispatchToProps = (dispatch) => ({
  onChangeUserInfo: (value) => dispatch(SetUser(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalAvatar)

const MainModalAvatar = styled.div`
  padding: 0 19px;

  .inner-modal {
    padding: 0 20px;
  }

  .box-avatar {
    border-radius: 8px;
    width: 30%;
    min-width: 80px;
    display: flex;
    justify-content: center;
    height: 80px;
    align-items: end;
    cursor: pointer;
  }

  .box-avatar-active {
    border: 1px solid var(--yellow-orange);
    background-color: var(--yellow-orange-50);
  }

  .box-avatar-not-active {
    border: 1px solid var(--charcoal-200);
  }
`


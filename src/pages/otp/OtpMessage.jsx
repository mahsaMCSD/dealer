import React, {useEffect} from 'react'
import Logo               from 'src/assets/images/app-icon.png'
import Icon               from 'src/ui-kit/Icon'
import ui                 from 'src/assets/dictionaries/ui'
import {Link}             from 'react-router-dom'
import styled             from 'styled-components'
import {connect}          from 'react-redux'


const OtpMessage = (props) => {

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
  }, [])

  return props.user ? <StyledOtpMessage
    logo={Logo}
    className="d-flex bg-charcoal vh-100 justify-content-center ">
    <main className='otp-message--main--main d-flex flex-column align-items-center text-black-50'>

      <div className='otp-message--logo'/>
      <Icon type={'circleChecked1'} className={'otp-message--main--icon'}/>
      <h6 className='text-16 font-weight-700'>
        {props.user.first_name}{ui.registerMessage.dear}
      </h6>
      <h6
        className="text-16 font-weight-700 lh-base mb-3 mt-5 text-center pb-3 border-bottom w-100 border-charcoal-800 mb-3">
        {ui.registerMessage.title.format(props.user.mobile)}
      </h6>
      <p className='text-14 mx-3 line-height-24 mb-0 text-center'>{ui.registerMessage.description}</p>
      <p className='text-14 mx-3 line-height-24 text-center'>{ui.registerMessage.description2}</p>
    </main>

    <footer
      className='otp-message--footer text-16 position-fixed bottom-0 d-flex w-desktop flex-column px-3 w-100'>
      <Link to={'/membership-fee/on-boarding'}
            className={'bg-orange-crayola py-3 text-center radius-8 text-white mb-2 w-100'}>{ui.registerMessage.membership_fee}</Link>
      <a href={'tel:' + ui.registration_support_contact}
         className='my-3 d-flex text-orange-crayola justify-content-center align-items-center colo'>
        <Icon type={'callCalling'} className={'ms-3'}/>
        {ui.registerMessage.contact_us}</a>
    </footer>

  </StyledOtpMessage> : ''
}

const mapStateToProps = (state) => ({
  user: state.userInfo.appUser.info
})

export default connect(mapStateToProps)(OtpMessage)

const StyledOtpMessage = styled.div`
  .otp-message--logo {
    background-image: url(${Logo});
    background-size: contain;
    height: 68px;
    width: 200px;
    background-position: center center;
    background-repeat: no-repeat
  }

  .otp-message--main--main {
    height: calc(100vh - 170px);
    margin-top: 32px;

    .otp-message--main--logo {
      background-image: url(${Logo});
      background-size: contain;
      height: 68px;
      width: 200px;
      background-position: center center;
      background-repeat: no-repeat
    }

    .otp-message--main--icon {
      font-size: 60px;
      margin-top: 56px;
      margin-bottom: 32px;
    }
  }

  .otp-message--footer {
    margin-bottom: 12px;
  }

  a:hover {
    color: inherit;
  }
`

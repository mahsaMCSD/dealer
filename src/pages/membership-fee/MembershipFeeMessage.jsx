import React, {useEffect} from 'react'
import Logo               from 'src/assets/images/app-icon.png'
import Icon               from 'src/ui-kit/Icon'
import PropTypes          from 'prop-types'
import ui                 from 'src/assets/dictionaries/ui'
import {Link, Navigate}   from 'react-router-dom'
import styled             from 'styled-components'
import {useAuth}          from 'src/hooks/useAuth'

const styles = {
  logo: {
    backgroundImage: `url(${Logo})`,
    backgroundSize: 'contain',
    height: '68px',
    width: '200px',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }
}

const MembershipFeeMessage = () => {
  const {user} = useAuth()
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
  }, [])
  return user.info ? <MembershipFee
    logo={Logo}
    className="bg-charcoal-dark">
    <div className='d-flex justify-content-center '>
      <main className='membership-fee--main--main d-flex flex-column align-items-center text-black-50'>

        <div style={styles.logo}/>
        <Icon type={'circleChecked1'} className={'membership-fee--main--icon'}/>
        <h6 className='text-16 font-weight-700'>
          {user.info.first_name}{ui.registerMessage.dear}
        </h6>
        <h6
          className="text-16 font-weight-700 lh-base mb-3 mt-5 text-center pb-3 border-bottom w-100 border-charcoal-800 mb-3">
          {ui.registerMessage.title.format(user.info.mobile)}
        </h6>
        <p className='text-14 mb-0 text-center'>{ui.registerMessage.description}</p>
        <p className='text-14 text-center'>{ui.registerMessage.description2}</p>
      </main>

      <footer
        className='membership-fee--footer text-16 position-fixed bottom-0 d-flex w-desktop flex-column px-3 w-100'>
        <Link to={'/membership-fee/on-boarding'}
              className={'bg-orange-crayola py-3 text-center radius-8 text-white mb-2 w-100'}>{ui.registerMessage.membership_fee}</Link>
        <a href={'tel:' + ui.registration_support_contact}
           className='my-3 d-flex text-orange-crayola justify-content-center align-items-center colo'>
          <Icon type={'callCalling'} className={'ms-3'}/>
          {ui.registerMessage.contact_us}</a>
      </footer>
    </div>

  </MembershipFee> : <Navigate to={'/app'}/>
}


export default MembershipFeeMessage

const MembershipFee = styled.div`

  background-size: cover;
  padding-bottom: 75px;
  min-height: 100vh;

  .membership-fee--main--main {
    height: calc(100vh - 170px);
    margin-top: 32px;

    .membership-fee--main--logo {
      background-image: url(${e => e.Logo});
      background-size: contain;
      height: 68px;
      width: 200px;
      background-position: center center;
      background-repeat: no-repeat
    }

    .membership-fee--main--icon {
      font-size: 60px;
      margin-top: 56px;
      margin-bottom: 32px;
    }
  }

  .membership-fee--footer {
    margin-bottom: 12px;
  }

  a:hover {
    color: inherit;
  }
`

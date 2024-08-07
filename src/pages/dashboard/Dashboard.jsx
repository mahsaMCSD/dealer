import React, {createRef} from 'react'
import styled             from 'styled-components'
import {connect}          from 'react-redux'
import {withLocation}     from 'src/utility/routerHooks'
import {Navigate, Outlet} from 'react-router-dom'

import NavigationBar       from 'src/components/dashboard/navigation-bar/NavigationBar'
import {LogIn}             from 'src/store/userInfo/appUser/actions'
import {sendAmplitudeData} from 'src/utility/amplitude'
import {breakpointsPX}     from 'src/assets/js/consts'
import {
  inspectionsDealerSegmentService
}                          from 'src/api/services/appUser'

import {NotificationContainer} from 'src/ui-kit/notifications'
import {onGettingConfirm}      from 'src/store/userInfo/appUser/actions/onGettingConfirm'
import Loading                 from 'src/components/loading/Loading'

const routes = ['competing', 'myOffers', 'myOrders', 'userPanel', 'competing/auctions/details', 'finalPay']

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.containerRef = createRef()
    this.state = {
      index: 0,
      nav: false,
      redirect: ''
    }
    this.closeModalOnBoarding = this.closeModalOnBoarding.bind(this)
  }

  getDealer () {
    inspectionsDealerSegmentService()
      .then(data => {
        this.props.LogIn(Object.assign(data, {token: this.props.user.token}))
      })
      .catch(console.log)
  }

  componentDidMount () {
    const {pathname} = this.props.location
    let chooseIndex = 0
    routes.forEach((route, index) => {
      if (pathname.toLowerCase()
        .includes(route.toLowerCase())) {
        chooseIndex = index
      }
    })
    this.setState({index: chooseIndex})

    if (localStorage.getItem('appOpened')) {
      sendAmplitudeData('App-Open')
      localStorage.removeItem('appOpened')
    }
    if (this.props.user && Object.keys(this.props.user).length < 2) {
      this.getDealer()
    }
    this.props.onGettingConfirm()
  }


  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this?.containerRef?.current) {
        const main_body = this?.containerRef?.current?.getElementsByClassName('main__body')[0]
        if (main_body) {
          // main_body.scrollTo({top: 0, behavior: 'auto'})
        }
      }

      this.props.onGettingConfirm()
    }
  }


  closeModalOnBoarding () {
    localStorage.setItem('is_show_on_boarding_payment', 'true')
  }

  render () {
    if (this.props.is_confirmed) {
      return <>
        <Main ref={this.containerRef}>
          <Outlet/>
        </Main>
        <NavigationBar/>
        <NotificationContainer/>
      </>
    } else {
      if (typeof this.props.is_confirmed === 'boolean') {
        return <Navigate to={{pathname: '/membership-fee/on-boarding'}}/>
      } else {
        return <Loading fullScreen/>
      }
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.userInfo.appUser.info,
  is_confirmed: state.userInfo.appUser.is_confirmed
})
const mapDispatchToProps = (dispatch) => ({
  LogIn: (val) => dispatch(LogIn(val)),
  onGettingConfirm: () => dispatch(onGettingConfirm())
})
export default connect(mapStateToProps, mapDispatchToProps)(withLocation(Dashboard))

const Main = styled.main`
  height: 100vmax;
  position: relative;
  overflow: hidden;
  top: 0;

  @media (min-width: ${breakpointsPX.lg}) {
    height: 100vh;
  }

  .main__body {
    margin-top: 56px;
    overflow: auto;
    height: calc(100vh - (56px + 70px));
    padding-bottom: 10px;
  }
`

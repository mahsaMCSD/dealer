import React, {Component}                 from 'react'
import {connect}                          from 'react-redux'
import {Navigate, NavLink}                from 'react-router-dom'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import moment                             from 'moment-jalaali'

import Background                              from 'src/assets/images/background.jpg'
import Logo                                    from 'src/assets/images/app-icon.png'
import {
  logInSMSService,
  smsVerificationService,
  postInfoDevice,
  createDealerServiceByAgent, postOTPRegisterService
}                                              from 'src/api/services/appUser'
import {LogIn}                                 from 'src/store/userInfo/appUser/actions'
import TextField                               from 'src/ui-kit/text-field/TextField.jsx'
import userAgentDetection                      from 'src/utility/userAgentDetection'
import {sendAmplitudeData, setAmplitudeUserId} from 'src/utility/amplitude'
import BasicButton                             from 'src/ui-kit/button/BasicButton'
import {withRouter}                            from 'src/utility/routerHooks'

import 'react-circular-progressbar/dist/styles.css'
import Formatter                               from 'src/utility/Formatter'
import {onResetStoreAfterLogout}               from 'src/store/resetStoreAfterLogout'

const styles = {
  root: {
    height: '100vh',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover'
  },
  input: {
    height: '50px',
    backgroundColor: '#fcfcfc',
    borderRadius: '6px',
    borderStyle: 'solid',
    borderWidth: '2px'
  },
  logo: {
    backgroundImage: `url(${Logo})`,
    backgroundSize: 'contain',
    height: '68px',
    width: '200px',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  },
  validation: {
    fontFamily: 'Yekan',
    fontsize: '14px'
  },
  btnSubmit: {
    borderRadius: '21px',
    boxShadow: 'inset 0 0 3px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#fcfcfc',
    margin: '0 auto',
    display: 'block'
  },
  timer: {
    height: '35px', width: '35px', position: 'relative', padding: 0,
    lineHeight: '35px'
  },
  dashed: {
    backgroundColor: '#212528',
    position: 'absolute',
    zIndex: 1
  },
  dashedTopBottom: {
    left: '49%',
    width: 1,
    height: 4
  },
  dashedTop: {
    top: 0
  },
  dashedRightLeft: {
    top: '49%',
    height: 1,
    width: 4
  },
  dashedLeft: {
    left: 0
  },
  dashedRight: {
    right: 0
  },
  dashedBottom: {
    bottom: 0
  },
  buildStyles: {
    strokeLinecap: 'butt',
    trailColor: '#ababab',
    pathColor: '#f05b27',
    textSize: 40,
    textColor: '#ffffff'
  },
  footer: {
    position: 'fixed',
    height: '10%',
    backdropFilter: 'blur(2px)',
    border: 'solid 1px #383838',
    backgroundColor: 'rgba(33, 37, 40, 0.6)'
  }
}
const navigatorInfo = () => {
  var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return 'IE ' + (tem[1] || '')
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
    if (tem != null) {
      return tem.slice(1)
        .join(' ')
        .replace('OPR', 'Opera')
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
  return M.join(' ')
}

const _Formatter = new Formatter()

class Otp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      code: '',
      nav: false,
      isLoading: false,
      validationMessage: null,
      isValid: false,
      fill: 100,
      timer: 120,
      dateTime: '02:00',
      disableBtn: false,
      type: this.props.location.state?.mobile ? 'login' : 'register',
      redirect: ''
    }
    this.ignate = this.ignate.bind(this)
  }

  componentDidMount () {
    if (this.props.user) {
      this.setState({redirect: '/dashboard/competing'})
    } else if (!(this.props.location.state?.mobile || this.props.inputs?.mobile)) {
      this.setState({redirect: '/'})
    }
    this.ignate(false)
  }


  handleChange (val) {
    const value = val.target.value
    if (value.length === 5) {
      this.setState({isValid: true, validationMessage: null}, () => {
        this.submit()
      })
    } else {
      this.setState({isValid: false, validationMessage: null})
    }
    if (_Formatter.normalizeToEnglish(value) || !value) {
      this.setState({code: _Formatter.normalizeToEnglish(value)})
    }
  }

  ignate (request) {
    this.setState({
      fill: 100,
      timer: 120,
      dateTime: '02:00',
      disableBtn: true
    })

    const IntervalId = setInterval(() => {
      var m = moment(`${this.state.dateTime}`, 'mm:ss')
      if (this.state.timer === 0 || ('mm:ss') === '00:01' || m.format('mm:ss') === '00:00') {
        this.setState({fill: 100, timer: 120, dateTime: '00:00', disableBtn: false})
        clearInterval(IntervalId)
      } else {
        this.setState({
          fill: this.state.fill - 0.83,
          timer: this.state.timer - 1,
          dateTime: m.subtract(1, 'seconds')
            .format('mm:ss')
        })
      }
    }, 1000)
    if (request !== false) {
      if (this.state.type === 'login') {
        logInSMSService(this.props.location.state.mobile)
          .then(() => this.setState({
            disableBtn: true
          }))
          .catch(() => {
            this.setState({isValid: false, validationMessage: 'خطای برقراری ارتباط'})
          })
      } else {
        postOTPRegisterService({
          mobile: this.props.inputs.mobile
        })
          .then(() => this.setState({
            disableBtn: true
          }))
          .catch(() => {
            this.setState({isValid: false, validationMessage: 'خطای برقراری ارتباط'})
          })
      }
    }

  }

  addInfoDevice () {
    const device = navigatorInfo()
    postInfoDevice(new Date(), 1, 1, device, 'web')
  }

  responseSuccess (res) {
    if (this.state.type === 'login') {
      this.props.LogIn(Object.assign(res.user, {token: res.token}))
      setAmplitudeUserId(res.user.id)
    } else {
      this.props.LogIn(res)
      this.setState({redirect: '/otp-message'})

    }
    localStorage.setItem('appOpened', 'true')
    sendAmplitudeData('LogeIn')
    this.addInfoDevice()

    if (this.state.type === 'login') {
      let newObject = {}
      if (res.user.is_confirmed) {
        newObject.nav = true
      } else {
        newObject.redirect = '/membership-fee/on-boarding'
      }
      this.setState(newObject)
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    this.submit()
  }

  submit () {
    if (this.validate(this.state.code)) {
      if (this.state.type === 'login') {
        this.submitLogin()
      } else {
        this.submitRegister()
      }
    }
  }

  submitRegister () {
    createDealerServiceByAgent({
      ...this.props.inputs,
      token: this.state.code
    })
      .then((res) => {
          this.responseSuccess(res)
        }
      )
      .catch((error) => {
        if (error.status === 422) {
          return this.setState({
            redirect: `/login${error?.data?.detail
                               ? `?message=${error?.data?.detail}&mobile=${this.props.inputs.mobile}`
                               : ''}`
          })
        } else {
          return this.setState({validationMessage: error?.data?.detail})
        }
      })
  }


  submitLogin () {
    this.setState({
      isLoading: true
    })
    smsVerificationService(this.state.code, this.props.location.state?.mobile)
      .then((res) => {
        this.responseSuccess(res)
      })
      .catch((er) => {
        if (er?.data[Object.keys(er?.data)[0]]) {
          this.setState({validationMessage: er?.data[Object.keys(er?.data)[0]]})
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  validate (val) {

    if (val.length !== 5) {
      this.setState({isValid: false, validationMessage: 'کد وارد شده صحیح نمی باشد.'})
      return false
    }
    this.setState({validationMessage: null, isValid: true})
    return true

  }


  render () {
    const {nav, isValid, fill, type, redirect} = this.state
    if (nav) {
      if (userAgentDetection(window.navigator.userAgent) === 'ios') {
        return <Navigate to={'/add-to-on-boarding-screen'}/>
      } else {
        return <Navigate to={'/terms-condition'}/>
      }
    }

    if (redirect) {
      return <Navigate to={{
        pathname: redirect
      }}/>
    }

    return (
      <form className="d-flex flex-column justify-content-center align-items-center" style={styles.root}
            onSubmit={this.handleSubmit.bind(this)}>
        <div className="col-10 d-flex flex-column justify-content-center align-items-center">
          <div style={styles.logo}/>
          <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <h5 className="text-center text-16 font-weight-bold mt-4 mb-5 line-height-30 text-white">
              کد ۵
              رقمی از طریق پیام کوتاه برای شما ارسال
              <br/>
              خواهد شد، آن را وارد کنید.
            </h5>

            {this.state.validationMessage &&
              <h6 className="text-danger text-center text-14 mb-3"
                  style={styles.validation}>{this.state.validationMessage}</h6>
            }
            <div className="col-7">
              <TextField error={this.state.validationMessage}
                         input={{
                           id: 'otp-input',
                           type: 'tel',
                           dir: 'ltr',
                           className: 'text-center',
                           maxLength: 5,
                           value: this.state.code,
                           onChange: (val) => this.handleChange(val)
                         }}/>
            </div>
            <BasicButton type="submit" style={styles.btnSubmit} isLoading={this.state.isLoading}
                         id="submit-otp"
                         className={`border-0 py-3 px-5 mt-3 rounded-pill text-16 ${
                           isValid ? 'bg-orange text-white' : 'text-black'
                         }`}>
              ورود
            </BasicButton>
          </div>
          <div className="align-items-center mt-3 d-flex justify-content-center"
               onClick={!this.state.disableBtn ? this.ignate : null}>
            {this.state.timer !== 120 &&
              <div style={styles.timer}>
                <div style={{...styles.dashed, ...styles.dashedTop, ...styles.dashedTopBottom}}/>
                <div style={{...styles.dashed, ...styles.dashedBottom, ...styles.dashedTopBottom}}/>
                <div style={{...styles.dashed, ...styles.dashedLeft, ...styles.dashedRightLeft}}/>
                <div style={{...styles.dashed, ...styles.dashedRight, ...styles.dashedRightLeft}}/>
                <small
                  className="text-white left-0 right-0 top-0 bottom-0  h-100  text-center position-absolute m-0">
                  {moment(`${this.state.dateTime}`, 'mm:ss')
                    .format('m:ss')}
                </small>
                <CircularProgressbar
                  dir="rtl"
                  value={fill}
                  strokeWidth={50}
                  styles={buildStyles(styles.buildStyles)}>
                </CircularProgressbar>

              </div>
            }
            <h6
              className={`text-white text-gray-500 ${!this.state.disableBtn ? 'pointer' : ''} text-14 me-2  mb-0`}
              id="send-again-otp-code">ارسال
              مجدد کد</h6>
          </div>
          <div className="d-flex align-items-center text-14 justify-content-center bottom-0 right-0 left-0 w-desktop"
               style={styles.footer}>
            <p className="text-white mb-0 ms-2">
              کد ارسال نشد؟
            </p>
            {
              type === 'login' ?
              <NavLink to={'/login'} id="change-number-back-to-login">
                <p className="text-orange pointer mb-0">
                  تغییر شماره
                </p>
              </NavLink>
                               :
              <div onClick={() => this.props.handleBackToForm()} id="change-number-back-to-form">
                <p className="text-orange pointer mb-0">
                  تغییر شماره
                </p>
              </div>
            }

          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userInfo.appUser.info
})
const mapDispatchToProps = (dispatch) => ({
  LogIn: (val) => dispatch(LogIn(val)),
  LogOut: () => dispatch(onResetStoreAfterLogout())
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Otp))

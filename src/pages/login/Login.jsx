import React, {Component}  from 'react'
import {NavLink, Navigate} from 'react-router-dom'
import {connect}           from 'react-redux'

import Background                 from 'src/assets/images/background.jpg'
import Logo                       from 'src/assets/images/app-icon.png'
import Icon                       from 'src/ui-kit/Icon'
import TextField                  from 'src/ui-kit/text-field/TextField.jsx'
import Formatter                  from 'src/utility/Formatter'
import {logInSMSService}          from 'src/api/services/appUser'
import BasicButton                from 'src/ui-kit/button/BasicButton'
import {onResetStoreAfterLogout}  from 'src/store/resetStoreAfterLogout'
import {withNavigate, withRouter} from 'src/utility/routerHooks'

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
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  headerText: {
    fontSize: '18px'
  },
  validation: {
    fontFamily: 'Yekan'
  },
  btnSubmit: {
    width: '28%',
    height: '50px',
    boxShadow: 'inset 0 0 3px 0 rgba(0, 0, 0, 0.24)',
    backgroundColor: '#fcfcfc'
  },
  footer: {
    position: 'fixed',
    height: '8%',
    backdropFilter: 'blur(2px)',
    border: 'solid 1px #383838',
    backgroundColor: 'rgba(33, 37, 40, 0.6)'
  }
}

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mobile: '',
      nav: false,
      validationMessage: null,
      paramsMessage: null,
      isValid: false,
      navToDashboard: false,
      errorStatus: null,
      isLoading: false
    }
  }

  componentDidMount () {
    if (this.props?.location?.search) {
      const params = new URLSearchParams(this.props.location.search)
      const message = params.get('message')
      const mobile = params.get('mobile')
      if (message) {
        this.setState({
          paramsMessage: message,
          isValid: true,
          mobile
        })
      }
    }

    if (this.props.user) {
      this.setState({
        navToDashboard: true
      })
    }
  }

  handleChange (val) {
    if (val.target.value.length === 11) {
      this.setState({isValid: true, validationMessage: null, paramsMessage: null})
    } else {
      this.setState({isValid: false, paramsMessage: null})
    }
    if (this.state.paramsMessage) {
      this.props.navigate('/login')
    }
    const _formatter = new Formatter()
    const value = _formatter.normalizeToEnglish(val.target.value)
      .replace(/^[\u0600-\u06FFa-zA-Z\s]+$/gi, '')
    this.setState({mobile: value})
  }

  validate (val) {
    const regexMobile = new RegExp(/^[0][9][0-9]{9}$/)
    if (!regexMobile.test(val)) {
      this.setState({isValid: false, validationMessage: 'لطفا شماره موبایل خود را به صورت صحیح وارد کنید.'})
      return false
    }
    this.setState({validationMessage: null, isValid: true})
    return true
  }

  submit (event) {
    event.preventDefault()
    if (!this.state.isLoading && this.validate(this.state.mobile)) {
      this.setState({
        isLoading: true
      })
      logInSMSService(this.state.mobile)
        .then((res) => {
          this.setState({nav: true})
        })
        .catch((er) => {
          if (er.status === 422) {
            this.setState({
              isValid: false,
              errorStatus: 404,
              validationMessage: 'برای ورود به سیستم ابتدا باید ثبت نام کنید.'
            })
          } else if (er.status === 403) {
            this.setState({
              isValid: false,
              errorStatus: 403,
              validationMessage: 'حساب کاربری شما غیرفعال است. برای پیگیری با خودرو45 تماس بگیرید.'
            })
          } else {
            this.setState({isValid: false, validationMessage: 'خطای برقراری ارتباط'})
          }
        })
        .finally(() => {
          this.setState({
            isLoading: false
          })
        })
    }
  }

  render () {
    const {nav, mobile, isValid, validationMessage, paramsMessage, navToDashboard} = this.state
    if (nav) {
      return <Navigate to={{
        pathname: '/otp'
      }} state={{mobile: mobile}}/>
    }
    if (navToDashboard) {
      return <Navigate to={{
        pathname: '/dashboard/competing',
        state: {index: 0}
      }}/>
    }
    return (
      <form onSubmit={this.submit.bind(this)}>
        <div className=" d-flex flex-column justify-content-center align-items-center" style={styles.root}>
          <div className="col-10 justify-content-center align-items-center d-flex flex-column">
            <div style={styles.logo}/>
            {!this.state.errorStatus ?
             <>
               <h5 className="text-center lh-base mt-4 px-5 text-white text-18 font-weight-bold"
                   style={styles.headerText}>
                 برای دسترسی به لیست خودروها، شماره موبایل خود را وارد کنید
               </h5>
               <div className="w-100 flex-column mt-3">
                 <p className="text-danger text-14" style={styles.validation}>{validationMessage || paramsMessage}</p>
                 <TextField
                   error={validationMessage}
                   isValid={isValid}
                   icon={<Icon className="text-orange" type="checkCircle"/>}
                   input={{
                     id: 'mobile',
                     placeholder: '۰۹۱۲۳۴۵۶۷۸۹',
                     className: 'ms-5 placeholder-gray-500',
                     type: 'tel',
                     maxLength: 11,
                     value: this.state.mobile,
                     dir: 'ltr',
                     onChange: (val) => this.handleChange(val)
                   }}/>
               </div>
               <BasicButton type="submit" style={styles.btnSubmit} isLoading={this.state.isLoading}
                            id='login'
                            className={'border-0 mt-4 text-16 rounded-pill ' + (
                              isValid ? ' bg-orange text-white' : 'btn-white'
                            )}>
                 ورود
               </BasicButton>
             </>
                                     :
             <b className="row pt-5 justify-content-center">
               <span className="text-orange text-center text-14">{this.state.validationMessage}</span>
               {
                 this.state.errorStatus === 404 &&
                 <div className="col-auto mt-4">
                   <NavLink to={'/register'} replace={true}
                            id='register'
                            className="btn btn-orange rounded-pill text-white px-4 py-2">ثبت نام</NavLink>
                 </div>
               }
             </b>
            }
          </div>
          <div className="d-flex align-items-center justify-content-center bottom-0 right-0 left-0 w-desktop"
               style={styles.footer}>
            <p className="text-white ms-2 mb-0 text-14">
              حساب کاربری ندارید؟
            </p>
            <NavLink to={'/register'} id='registerLink'><p className="text-orange text-14 mb-0">ثبت نام کنید</p></NavLink>
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
  LogIn: (val) => dispatch(Login(val)),
  LogOut: () => dispatch(onResetStoreAfterLogout())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withNavigate(Login)))

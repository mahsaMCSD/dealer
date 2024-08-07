import React, {Component}    from 'react'
import {Link, Navigate}      from 'react-router-dom'
import {NotificationManager} from 'src/ui-kit/notifications'
import PropTypes             from 'prop-types'

import Background      from 'src/assets/images/background.jpg'
import Logo            from 'src/assets/images/app-icon.png'
import Formatter       from 'src/utility/Formatter'
import {
  addDealerByAgentService,
  cityService, postOTPRegisterService
}                      from 'src/api/services/appUser'
import TextField       from 'src/ui-kit/text-field/TextField'
import Select          from 'src/ui-kit/select/Select'
import styled          from 'styled-components'
import SmsVerification from 'src/pages/otp/Otp'
import {connect}       from 'react-redux'

const regexMobile = new RegExp(/^[0][9][0-9]{9}$/)

const activities = [
  {title: 'نمایشگاه دار', id: 0},
  {title: 'سرمایه گذار حوزه خودرو', id: 1},
  {title: 'واسطه گر', id: 2}
]

class RegisterForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      validationMessage: {type: '', text: ''},
      mobile: '',
      isNavigate: false,
      isValid: false,
      cityModal: false,
      activityModal: false,
      cities: [],
      loading: false,
      full_name: null,
      inputs: {
        first_name: '',
        last_name: '',
        city: '',
        car_exhibition: '',
        mobile: '',
        activity_type: '',
        address: ''
      },
      redirect: '',
      _registeredBefore: false
    }
  }

  componentDidMount () {
    if (this.props.user) {
      this.setState({redirect: '/'})
    }
    this.loadCity()
  }

  handleChange (value, prop) {
    let scope = {...this.state.inputs}
    scope[prop] = value.target ? scope[prop] = value.target.value : value

    switch (prop) {
      case 'city':
        this.setState({inputs: scope})
        break
      case 'activity_type':
        this.setState({inputs: scope})
        break
      case 'mobile':
        scope[prop] = this.validateMobile(value.target.value)
        this.setState({inputs: scope})
        break
      default:
        this.setState({inputs: scope})
        break
    }
  }

  validateMobile (value) {
    const _formatter = new Formatter()
    return _formatter.normalizeToEnglish(value)
      .replace(/[\u0600-\u06FFa-zA-Z\s]+$/gi, '')
  }

  isNumeric (value) {
    return /^-{0,1}\d+$/.test(value)
  }

  submitValidation () {
    let {inputs} = this.state
    var own = ' خود '
    if (this.props.verifiedPage) {
      own = ''
    }
    if (!this.validate(inputs['first_name'])) {
      this.setState({validationMessage: {type: 'first_name', text: ` نام${own} را وارد کنید.`}})
      return false
    }

    if (!this.validate(inputs['last_name'])) {
      this.setState({validationMessage: {type: 'last_name', text: `نام خانوادگی${own} را وارد کنید.`}})
      return false
    }

    if (inputs['city'] === '') {
      this.setState({validationMessage: {type: 'city', text: `شهر ${own} را انتخاب کنید.`}})
      return false
    }


    if (inputs['activity_type'] === '') {
      this.setState({validationMessage: {type: 'activity_type', text: `نوع فعالیت ${own} را انتخاب کنید.`}})
      return false
    }


    if (inputs['activity_type'].toString() === activities[0].id.toString() && !this.validate(inputs['car_exhibition'])) {
      this.setState({validationMessage: {type: 'car_exhibition', text: 'نام نمایشگاه را وارد کنید'}})
      return false
    }

    inputs['mobile'] = this.validateMobile(inputs['mobile'])
    if (!regexMobile.test(inputs['mobile'])) {
      this.setState({validationMessage: {type: 'mobile', text: `لطفا شماره موبایل ${own} را به صورت صحیح وارد کنید.`}})
      return false
    }

    if (this.props.verifiedPage && inputs['address'] === '') {
      this.setState({validationMessage: {type: 'address', text: 'آدرس را وارد نمایید.'}})
      return false
    }
    this.setState({isValid: true})
    return true
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevState.inputs.activity_type === activities[0].id.toString() && this.state.inputs.activity_type !== activities[0].id.toString()) {
      let scope = {...this.state.inputs}
      scope['car_exhibition'] = ''
      this.setState({inputs: scope})
    }
    return true

  }

  validate (val) {
    if (val.length !== 0) {
      return true
    }
    return false

  }

  loadCity () {
    this.setState({loading: true})
    cityService()
      .then((res) => {
        this.setState({loading: false, cities: res})
      })
  }

  response (res) {
    if (res) {
      if (this.props.verifiedPage) {
        NotificationManager.success('با موفقیت ثبت شد!')
      }
      this.setState({
        validationMessage: {type: '', text: ''},
        mobile: '',
        isNavigate: true,
        isValid: false,
        cityModal: false,
        activityModal: false,
        loading: false,
        full_name: this.state.inputs.first_name + ' ' + this.state.inputs.last_name,
        _registeredBefore: false
      })
    }
  }

  responseError (er) {
    this.setState({loading: false})
    if (er && er.status === 422) {
      this.setState({_registeredBefore: true})
    } else if (er && er.status === 400) {
      if (er?.data && er.data === 'Dealer with this phone number already exist') {
        this.setState({_registeredBefore: true})
      } else if (er?.data?.mobile && er.data.mobile[0] === 'Dealer with this Mobile number already exist') {
        this.setState({
          validationMessage: {
            type: 'mobile', text: `کاربری با این شماره موبایل پیش از این در سیستم ثبت شده.`
          }
        })
      }
    } else {
      console.log(er)
    }
  }

  submit (event) {

    event.preventDefault()
    this.setState({validationMessage: {type: '', text: null}})
    if (!this.submitValidation()) {
      return
    }
    this.setState({loading: true})
    if (this.props.verifiedPage) {
      addDealerByAgentService(this.state.inputs)
        .then((res) => this.response(res))
        .catch((er) => this.responseError(er))
    } else {
      postOTPRegisterService({
        mobile: this.state.inputs.mobile
      })
        .then(() => {
          this.setState({
            isNavigate: true,
            loading: false,
            full_name: this.state.inputs.first_name + ' ' + this.state.inputs.last_name
          })
        })
        .catch((er) => this.responseError(er))

      // createDealerService(this.state.inputs)
      //   .then((res) => {
      //     this.response(res)
      //   })
      //   .catch((er) => this.responseError(er))
    }
  }


  render () {
    const {verifiedPage} = this.props
    const {
      isNavigate, isValid,
      loading,
      inputs,
      cities,
      validationMessage,
      _registeredBefore,
      full_name,
      mobile,
      redirect
    } = this.state

    const isActiveSmsVerification = (isNavigate && !verifiedPage && full_name)


    if (redirect) {
      return <Navigate to={{
        pathname: redirect
      }}/>
    }


    return isActiveSmsVerification ?

           <SmsVerification inputs={inputs} handleBackToForm={() => this.setState({isNavigate: false})}/>
                                   : <StyleRegisterForm className={`w-100 h-100 register-form__bg`}>
             <div
               className="col-10 pt-1  d-flex flex-column me-auto ms-auto justify-content-center align-items-center register-form--form">


               {!loading ?
                <form onSubmit={this.submit.bind(this)}
                      className=" w-100 d-flex flex-column align-items-center justify-content-center">
                  <div className="register-form--logo"/>

                  {!_registeredBefore &&
                    <h5
                      className="text-white text-center my-4 pb-3 text-16 font-weight-bold register-form--header--title">
                      {verifiedPage ?
                       <>ثبت نام کاربر فعال</>
                                    : <>به خودرو۴۵ خوش آمدید، برای
                          <br/>
                          دسترسی به لیست خودرو‌ها،اطلاعات <br/> خود را

                          وارد و ثبت نام کنید.</>}
                    </h5>
                  }
                  {_registeredBefore &&
                    <b className="text-orange text-center text-14 my-3">کاربری با این شماره موبایل پیش از این در سیستم
                      ثبت شده.</b>
                  }
                  {!_registeredBefore &&
                    <div className="w-100 pe-2 ps-2">
                      <h6 className="text-danger text-14">
                        {validationMessage.text}
                      </h6>

                      <TextField error={validationMessage.type === 'first_name'}
                                 className="mb-2"
                                 input={{
                                   id: 'first_name',
                                   type: 'text',
                                   value: inputs['first_name'],
                                   placeholder: 'نام',
                                   onChange: (val) => this.handleChange(val, 'first_name')
                                 }}
                      />
                      <TextField error={validationMessage.type === 'last_name'}
                                 className="mb-2"
                                 input={{
                                   id: 'last_name',
                                   type: 'text',
                                   value: inputs['last_name'],
                                   placeholder: 'نام خانوادگی',
                                   onChange: (val) => this.handleChange(val, 'last_name')
                                 }}
                      />
                      <Select
                        error={validationMessage.type === 'city'}
                        className="mb-2"
                        list={cities}
                        input={{
                          id: 'city',
                          value: inputs['city'],
                          placeholder: 'انتخاب شهر',
                          onChange: (val) => this.handleChange(val, 'city')
                        }}
                      />
                      <Select
                        error={validationMessage.type === 'activity_type'}
                        className="mb-2"
                        list={activities}
                        input={{
                          id: 'activity_type',
                          value: inputs['activity_type'],
                          placeholder: 'نوع فعالیت',
                          onChange: (val) => this.handleChange(val, 'activity_type')
                        }}
                      />

                      {
                        inputs['activity_type'].toString() === activities[0].id.toString() &&
                        <TextField error={validationMessage.type === 'car_exhibition'}
                                   className="mb-2"
                                   input={{
                                     id: 'car_exhibition',
                                     type: 'text',
                                     value: inputs['car_exhibition'],
                                     placeholder: 'نام نمایشگاه',
                                     onChange: (val) => this.handleChange(val, 'car_exhibition')
                                   }}
                        />
                      }
                      <TextField error={validationMessage.type === 'mobile'}
                                 className="mb-2"
                                 input={{
                                   id: 'mobile',
                                   type: 'tel',
                                   maxLength: 11,
                                   value: inputs['mobile'],
                                   placeholder: '۰۹۱۲۳۴۵۶۷۸۹',
                                   onChange: (val) => this.handleChange(val, 'mobile')
                                 }}/>
                      {verifiedPage && <><TextField error={validationMessage.type === 'address'}
                                                    className="mb-2"
                                                    input={{
                                                      id: 'address',
                                                      type: 'text',
                                                      value: inputs['address'],
                                                      placeholder: 'آدرس',
                                                      onChange: (val) => this.handleChange(val, 'address')
                                                    }}/>

                      </>

                      }
                    </div>

                  }
                  {(isNavigate && verifiedPage) &&
                    <div className="test-center text-gray">کاربر با موفقیت ایجاد شد.</div>}
                  {
                    _registeredBefore
                    ? (
                      !verifiedPage
                      ? <Link to="/login" id="login">
                        <button className="btn btn-orange rounded-pill text-white px-4 py-2">ورود</button>
                      </Link>
                      : <Link to="/dashboard/userPanel/dealerInfo" id="backToPage">
                        <button className="btn btn-orange rounded-pill text-white px-4 py-2">بازگشت</button>
                      </Link>
                    )
                    : <button className={`register-submit text-16 ${isValid === true
                                                                    ? ''
                                                                    : 'text-black-800 '}`}
                              id="register-submit"
                              type="submit">
                      {verifiedPage ? 'ثبت کاربر' : 'ثبت نام'}
                    </button>
                  }
                  {verifiedPage
                   ? <div
                     className="register-form--header--footer position-fixed d-flex align-items-center text-14 bottom-0 right-0 left-0 justify-content-center w-desktop"
                   >
                     <Link to={'/dashboard/userPanel/dealerInfo'} id="backRegisterPage"><p
                       className="text-orange">بازگشت</p></Link>
                   </div>
                   : <div
                     className="position-fixed d-flex align-items-center register-form--header--footer text-14 bottom-0 right-0 left-0 justify-content-center w-desktop"
                   >
                     <p className="text-white ms-2 mb-0">حساب کاربری دارید؟</p>
                     <Link to={'/login'} id="login_register_form"><p className="text-orange mb-0">ورود</p></Link>
                   </div>
                  }
                </form>
                         :
                <div className="loadingKit"/>
               }

             </div>

           </StyleRegisterForm>
  }
}

const mapStateToProps = (state) => ({
  user: state.userInfo.appUser.info
})
export default connect(mapStateToProps)(RegisterForm)

RegisterForm.defaultProps = {
  verifiedPage: false
}
RegisterForm.propType = {
  verifiedPage: PropTypes.bool
}

const StyleRegisterForm = styled.div`
  min-height: 100vh;
  background-size: cover;
  overflow-y: auto;
  padding-bottom: 75px;

  &.register-form__bg {
    background-image: url(${Background});
  }

  .register-form--form {
    min-height: 90vh
  }

  .register-form--logo {
    background-image: url(${Logo});
    background-size: contain;
    height: 68px;
    width: 200px;
    background-position: center;
    background-repeat: no-repeat
  }

  .register-form--header--title {
    line-height: 1.8
  }

  .register-form--header--footer {
    height: 10%;
    backdrop-filter: blur(2px);
    border: solid 1px #383838;
    background-color: rgba(33, 37, 40, 0.6)
  }
`

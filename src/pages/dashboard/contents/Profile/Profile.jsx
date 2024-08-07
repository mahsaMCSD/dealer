import React     from 'react'
import {connect} from 'react-redux'
import moment    from 'moment-jalaali'
import styled    from 'styled-components'

import DealerHelp                        from 'src/components/dashboard/panel/DealerHelp'
import FullWidthButton                   from 'src/components/dashboard/panel/FullWidthButton'
import {inspectionsDealerSegmentService} from 'src/api/services/appUser'
import {onResetAppUser, SetUser}         from 'src/store/userInfo/appUser/actions'
import Modal                             from 'src/ui-kit/modal/Modal'
import Icon                              from 'src/ui-kit/Icon'
import {setAmplitudeUserId}              from 'src/utility/amplitude'
import ContactK45                        from 'src/components/dashboard/panel/ContactK45'
import {withNavigate}                    from 'src/utility/routerHooks'
import ProfileRouters                    from './ProfileRouters'
import OutletProfile                     from './OutletProfile'
import {onResetStoreAfterLogout}         from 'src/store/resetStoreAfterLogout'

const styles = {
  iconSignOut: {
    fontSize: 85
  }
}

class Profile extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      inspectorInfo: {},
      loading: true,
      modal: false
    }
    this.goToPage = this.goToPage.bind(this)
    this.signOut = this.signOut.bind(this)
    this.getData = this.getData.bind(this)
    this.logOut = this.logOut.bind(this)
    this.closePage = this.closePage.bind(this)
    this.handelModal = this.handelModal.bind(this)

    this.getData()
  }

  getData () {
    if (!this.state.inspectorInfo.agent_info) {
      inspectionsDealerSegmentService()
        .then(data => {

          this.setState({
            inspectorInfo: {
              ...data,
              date_format: (moment(`${data.date_joined}`, 'YYYY/M/D')).format('jYYYY/jM/jD')
            }
          }, function () {
            this.setState({loading: false}, function () {
            })
          })

          this.props.onChangeUserInfo({
            ...this.props.user,
            ...data,
            date_format: (moment(`${data.date_joined}`, 'YYYY/M/D')).format('jYYYY/jM/jD')
          })

          setAmplitudeUserId(data.id)
        })
        .catch(() => {
          this.setState({loading: false})
        })
    }
  }

  goToPage (link) {
    if (link) {
      this.props.navigate(link)
    }
  }

  closePage () {
    this.props.navigate('/dashboard/userPanel')
  }

  signOut () {
    localStorage.clear()
    this.props.navigate(`/login`)
  }

  logOut () {
    this.props.LogOut(null)
    this.props.navigate(`/login`)
  }

  handelModal () {
    this.setState({modal: !this.state.modal})
  }

  render () {
    return (
      <MainDiv className="d-flex flex-column h-100 pt-3 px-3">
        <div className="px-2 mt-1 mb-3">
          <DealerHelp/>
          <ContactK45/>
        </div>

        <div className="col-12 overflow-auto d-flex flex-column">
          {ProfileRouters.map(item =>
            item.menu && !item.exact && <FullWidthButton key={item.id}
                                                         text={item.menu.text}
                                                         iconName={item.menu.icon}
                                                         path={item.path}
                                                         isExternal={item.menu.isExternal}
                                                         className={item.menu?.className}
                                                         onClick={() => this.goToPage(item.path)}
                                                         isComingSoon={!item.path}/>
          )}
          <FullWidthButton text="خروج از حساب کاربری" onClick={this.handelModal} iconName={'logout'}/>
        </div>
        <Modal openModal={this.state.modal} closeModal={this.handelModal} title={'خروج از حساب کاربری'}
               headerColor="bg-transparent"
               postion="center">
          <div className="d-flex flex-column">
            <div className="my-5">
              <Icon type="signOut" className="text-orange m-3 text-center d-block"
                    style={styles.iconSignOut}/>
              <h5 className="text-center font-weight-bold pb-2 text-16 text-purple">آیا مطمئن هستید؟</h5>
            </div>

            <footer className="d-flex mx-3 d-flex m-2 justify-content-center">
              <button className="btn box-shadow btn-gray text-black font-weight-bold text-14 col-6 ms-3"
                      onClick={this.logOut}>بله
              </button>
              <button className="btn box-shadow btn-gray text-black font-weight-bold text-14 col-6 "
                      onClick={this.handelModal}>خیر
              </button>
            </footer>
          </div>
        </Modal>

        <OutletProfile/>

      </MainDiv>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userInfo.appUser.info
})
const mapDispatchToProps = (dispatch) => ({
  LogOut: () => dispatch(onResetStoreAfterLogout()),
  onChangeUserInfo: (value) => dispatch(SetUser(value))
})
export default connect(mapStateToProps, mapDispatchToProps)(withNavigate(Profile))

const MainDiv = styled.div`
  padding-bottom: 5.5rem;
  overflow-y: auto;
`

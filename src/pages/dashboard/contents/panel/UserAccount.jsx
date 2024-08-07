import React     from 'react'
import {Link}    from 'react-router-dom'
import {connect} from 'react-redux'
import ui        from '../../../../assets/dictionaries/ui'

const UserAccount = (props) => <div className="col-12 p-2">
  <div className="row m-0 py-1 bg-gray rounded justify-content-center align-items-center">
    <div className="col-12 text-center">
      <span className="text-14 text-black">نام کاربری</span>
    </div>
    <div className="col-12 text-center mt-2 text-orange">
      <span className="text-14 text-gray-600">{props.user?.mobile}</span>
    </div>
  </div>

  <div className="row py-3 border-bottom">
    <div className="col-6 text-right">
      <span className="text-14 text-purple">{ui.profile.full_name} :</span>
    </div>
    <div className="col-6 text-left">
      <span className="text-14 text-purple font-weight-bold">{props.user?.first_name} {props.user?.last_name}</span>
    </div>
  </div>

  <div className="row py-3 border-bottom">
    <div className="col-6 text-right">
      <span className="text-14 text-purple">{ui.profile.mobile} :</span>
    </div>
    <div className="col-6 text-left">
      <span className="text-14 text-purple font-weight-bold">{props.user?.mobile}</span>
    </div>
  </div>

  <div className="row py-3 border-bottom">
    <div className="col-6 text-right">
      <span className="text-14 text-purple"> {ui.profile.date_joined} :</span>
    </div>
    <div className="col-6 text-left">
      <span className="text-14 text-purple font-weight-bold">{props.user?.date_format}</span>
    </div>
  </div>

  {props.user?.is_agent && <Link to={'/verified-user-registration'}>
    <button className="btn text-white w-100 mt-2 p-2 btn-orange">
      ثبت کاربر تایید شده
    </button>
  </Link>}
</div>


const mapStateToProps = (state) => ({
  user: state.userInfo?.appUser?.info
})

export default connect(mapStateToProps)(UserAccount)

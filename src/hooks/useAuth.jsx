import React, {useCallback, useEffect, useState} from 'react'
import {createContext, useContext, useMemo}      from 'react'
import {useLocation, useNavigate}                from 'react-router-dom'
import {connect}                                 from 'react-redux'
import {SetUser, toggleIsBackNavigate}           from 'src/store/userInfo/appUser/actions'
import {onResetStoreAfterLogout}                 from 'src/store/resetStoreAfterLogout'

export const AuthContext = createContext(null)

const AuthProvider = ({children, ...props}) => {

  const navigate = useNavigate()
  // call this function when you want to authenticate the user
  const login = async (data) => {
    props.SetUser(data)
    navigate('/dashboard/competing')
  }

  // call this function to sign out logged in user
  const logout = () => {
    props.onResetStoreAfterLogout()
    navigate('/', {replace: true})
  }

  const [value, onChangeValue] = useState({
    user: props.user,
    login,
    is_back_navigate: false,
    logout
  })


  const location = useLocation()
  const [lastLocationKey, setLastLocationKey] = useState(null)

  useEffect(() => {
    if (lastLocationKey !== null && location.key !== lastLocationKey) {
      onChangeValue(prevState => ({...prevState, is_back_navigate: true}))
    }
    setLastLocationKey(location.key)
  }, [location.key, lastLocationKey])

  useEffect(
    () => onChangeValue({
      user: props.user,
      login,
      logout
    }),
    [props.user]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const mapStateToProps = (state) => ({
  user: state.userInfo.appUser
})

const mapDispatchToProps = (dispatch) => ({
  SetUser: (val) => dispatch(SetUser(val)),
  onResetStoreAfterLogout: () => dispatch(onResetStoreAfterLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider)


export const useAuth = () => {
  return useContext(AuthContext)
}

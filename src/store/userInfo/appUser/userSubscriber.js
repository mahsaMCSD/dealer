import {setToken} from 'src/api/httpClient'

export default getState => {
  const {info} = getState.userInfo.appUser
  setToken(info ? info.token : '')
}

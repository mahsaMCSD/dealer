import Axios from 'axios'

import {sendAmplitudeData} from 'src/utility/amplitude'
import apiConfig           from './restConfig'
import ErrorHandler        from './errorHandler'

// const cookies = new Cookies()
let token

export const setToken = (authToken) => {
  token = authToken
}
const request = Axios.create({
  baseURL: apiConfig.api_root,
  timeout: 31000,
  headers: {
    'Content-Type': apiConfig.content_type
  }
})

request.interceptors.request.use(function (config) {
  // const token = cookies.get('access_token')
  if (config.headers) {
    if (token) {
      config.headers['Authorization'] = `Token ${token}`
    }
  }
  return config
})

request.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    const {baseURL, url} = error.config
    if (error.response) {
      sendAmplitudeData('Http_Not_Ok_Event', {address: baseURL + url, error: error.response})
    } else {
      sendAmplitudeData('Http_Network_Error_Event', {address: baseURL + url, error: error})
    }
    ErrorHandler(error.status || error?.response?.status)
    return Promise.reject(error.response)
  }
)

const httpService = ({url, body, params = {}, method = 'GET', version = 'v1'}) => {
  const mainUrl = `${version}${url}`
  return request({
    url: mainUrl,
    method,
    data: body,
    params
  })
}

export default httpService

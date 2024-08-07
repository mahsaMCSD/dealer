import Axios from 'axios'

const httpGetawayMapService = ({url, params = {}}) =>
  Axios.get(
    process.env.REACT_APP_MAP_URL + url,{
      params,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_MAP_IR_KEY
      }
    }
  )
export default httpGetawayMapService

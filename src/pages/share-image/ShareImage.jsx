import React, {useEffect, useState} from 'react'
import {useLocation}                from 'react-router-dom'

import {getSharedImage} from 'src/api/services/appUser'

const ShareImage = () => {
  const location = useLocation()
  const [state, setState] = useState()

  const fetchData = () => {
    const token = location.pathname.split('=')[1]
    getSharedImage(token.replace('/', ''))
      .then(response => {setState(response.file)})
      .catch(response => {setState(response.file)})
  }
  useEffect(() => fetchData(), [])

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {state && <img className="w-100" src={state}></img>}
    </div>
  )
}
export default ShareImage

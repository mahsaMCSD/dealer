import React      from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth}  from 'src/hooks/useAuth'

export const ProtectedRoute = ({children}) => {
  const {user} = useAuth()
  if (!user) {
    // user is not authenticated
    return <Navigate to="/"/>
  }
  return children
}

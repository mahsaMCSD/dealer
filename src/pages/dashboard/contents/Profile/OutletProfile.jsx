import React                      from 'react'
import {Outlet}                   from 'react-router-dom'
import {withLocation, withOutlet} from 'src/utility/routerHooks'
import ModalPage                  from 'src/ui-kit/modal-page/ModalPage'
import profileRouters             from './ProfileRouters'

const OutletProfile = (props) => {
  if (!props?.outlet) {
    return null
  }
  const thisRoute = props.location.pathname.split('/')
    .reverse()[0] || props.location.pathname.split('/')
    .reverse()[1]


  const foundRoute = profileRouters.find(item => item?.path === thisRoute)
  return <ModalPage {...foundRoute} {...props}>
    <Outlet/>
  </ModalPage>
}

export default withOutlet(withLocation(OutletProfile))

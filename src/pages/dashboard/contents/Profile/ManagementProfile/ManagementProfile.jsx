import React                   from 'react'
import FullWidthButton         from 'src/components/dashboard/panel/FullWidthButton'
import ManagementProfileRoutes from './ManagementProfileRoutes'
import {withNavigate}          from 'src/utility/routerHooks'

const ManagementProfile = (props) =>
  <div className={'d-flex flex-column px-3'}>
    {ManagementProfileRoutes.map(item =>
      item.menu && <FullWidthButton key={item.id}
                                    text={item.menu.text}
                                    iconName={item.menu.icon}
                                    className={item.menu?.className}
                                    onClick={() => item.path && props.navigate(item.path)}
                                    isComingSoon={!item.path}/>
    )}
  </div>

export default withNavigate(ManagementProfile)

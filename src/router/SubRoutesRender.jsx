import React                     from 'react'
import {connect}                 from 'react-redux'
import {Route, Routes, useMatch} from 'react-router-dom'
import {routes}                  from './routerConfig'
import {Protected}               from './Router'

const findRouter = (routes, path) => {
  let findRoute = null
  routes.forEach(route => {
    if (!findRoute) {
      if (route.routes && !route.path.includes(path)) {
        findRoute = findRouter(route.routes, path)
      } else if (route.path.includes(path)) {
        findRoute = route
      }
    }
  })
  return findRoute
}

const SubRoutesRender = () => {
  const {path} = useMatch()
  const separatePath = path.split('/')
  const findRoute = findRouter(routes, separatePath[separatePath.length - 1])
  return <Routes>
    {findRoute ? findRoute.routes.map(route =>
                 <Route path={`${path}${route.path}`} key={route.key} exact={route.exact}>
                   <Protected isProtected={route.private}>
                     <route.component/>
                   </Protected>
                 </Route>
               )
               :
     <div className="text-danger text-left m-4">route not found: {path}</div>
    }
  </Routes>
}

const mapStateToProps = state => ({
  userInfo: state.userInfo.appUser.info
})
export default connect(mapStateToProps)(SubRoutesRender)

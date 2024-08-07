import React                  from 'react'
import {
  unstable_HistoryRouter as HistoryRouter, useRoutes
}                             from 'react-router-dom'
import {PWASubDomain, routes} from './routerConfig'
import {ScrollManager}        from 'react-scroll-manager'
import {createBrowserHistory} from 'history'
import AuthProvider           from 'src/hooks/useAuth'


const ELements = () => {
  return useRoutes([
    ...routes
  ])
}

class Router extends React.Component {
  constructor () {
    super()
    this.history = createBrowserHistory()
  }

  render () {
    return <ScrollManager history={this.history}>
      <HistoryRouter basename={PWASubDomain} history={this.history}>
        <AuthProvider>
          <ELements/>
        </AuthProvider>
      </HistoryRouter>
    </ScrollManager>
  }
}

export default Router

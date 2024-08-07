import React          from 'react'
import ReactDOM       from 'react-dom'
import {Integrations} from '@sentry/tracing'
import * as Sentry    from '@sentry/react'

import App                  from './App.jsx'
import * as serviceWorker   from './serviceWorker'
import * as stringFormatter from './utility/stringFormatter'

if (`process.env.NODE_ENV === 'production'`) {
  Sentry.init({
    dsn: 'https://a42b07b0a4ab465d8a8d868625b9ba90@tracking.khodro45.com/5',
    environment: process.env.NODE_ENV,
    autoSessionTracking: true,
    integrations: [
      new Integrations.BrowserTracing()
    ],
    tracesSampleRate: 0
  })
}
ReactDOM.render(<App/>, document.getElementById('root'))

stringFormatter.registerStringFormatter()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()

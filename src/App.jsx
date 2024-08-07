import React           from 'react'
import {Provider}      from 'react-redux'
import {PersistGate}   from 'redux-persist/integration/react'
import Router          from 'src/router/Router'
import configureStore  from 'src/store'
import {initAmplitude} from './utility/amplitude'
import './assets/css/style.css'
import Orientation     from './components/orientation/Orientation'
import ModalConnection from './components/modal-connection/ModalConnection'
import {AuthProvider}  from './hooks/useAuth'

initAmplitude()

const store = configureStore().store
const persistor = configureStore().persistor

const App = () =>
  <div className="center-desktop">
    <Orientation/>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {process.env.NODE_ENV !== 'development' && <ModalConnection/>} <Router/>
      </PersistGate>
    </Provider>
  </div>

export default App

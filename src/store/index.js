import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools}                           from 'redux-devtools-extension'
import {persistStore}                                  from 'redux-persist'
import thunk                                           from 'redux-thunk'
import userInfo                                        from './userInfo'
import auctions                                        from './auctions'
import inspections                                     from './inspections'
import inventory                                       from './inventory'
import car                                             from './car/reducer'
import ui                                              from './ui/reducer'
import wallet                                          from './wallet/reducer'
import payment                                         from './payment/reducer'
import userSubscriber                                  from './userInfo/appUser/userSubscriber'

const rootReducer = combineReducers({
  userInfo,
  auctions,
  inspections,
  inventory,
  car,
  ui,
  wallet,
  payment
})

export default () => {
  let store
  if (process.env.NODE_ENV === 'production') {
    store = createStore(rootReducer, applyMiddleware(thunk))
  } else {
    store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  }

  let persistor = persistStore(store)

  store.subscribe(() => {
    userSubscriber(store.getState())
  })

  return {store, persistor}
}

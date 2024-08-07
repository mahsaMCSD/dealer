import { combineReducers } from 'redux'
import { persistReducer }  from 'redux-persist'
import storage             from 'redux-persist/lib/storage'
import appUser             from './appUser/reducer'

const persistConfig = {
  key: 'userInfo',
  storage,
  whitelist: ['appUser'],
  blacklist: []
}

export default persistReducer(
  persistConfig,
  combineReducers({
    appUser
  })
)

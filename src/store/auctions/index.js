import {combineReducers} from 'redux'
import list              from './list/reducer'
import bid     from './bid/reducer'

export default combineReducers({
  list,
  bid
})

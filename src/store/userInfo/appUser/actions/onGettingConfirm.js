import {getIsConfirmed}                                from 'src/api/services/appUser'
import {onToggleIsHavingMembership, toggleIsConfirmed} from './index'

export const onGettingConfirm = () => (dispatch) => {
  getIsConfirmed()
    .then(res => {
      dispatch(toggleIsConfirmed(res.is_confirmed))
      dispatch(onToggleIsHavingMembership(res.is_having_membership))
    })
    .catch(console.error)
}

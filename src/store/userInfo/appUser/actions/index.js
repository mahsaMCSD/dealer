import {
  LOGIN,
  ADDLOGS,
  TOGGLE_IS_CONFIRMED,
  TOGGLE_IS_HAVING_MEMBERSHIP, RESET_STORE
} from './actionTypes'

export function LogIn (val) {
  return (dispatch) => {
    dispatch(SetUser(val))
  }
}

export function RefreshLogs (val) {
  return (dispatch) => {
    dispatch(AddLogs(val))
  }
}

export function AddLogs (val) {
  return {
    type: ADDLOGS,
    payload: val
  }
}

export function SetUser (value) {
  return {
    type: LOGIN,
    payload: value
  }
}


export const toggleIsConfirmed = isConfirmed => ({type: TOGGLE_IS_CONFIRMED, payload: isConfirmed})

export const onToggleIsHavingMembership = isHavingMembership => ({
  type: TOGGLE_IS_HAVING_MEMBERSHIP,
  payload: !!isHavingMembership
})
export const onResetAppUser = () => ({type: RESET_STORE})

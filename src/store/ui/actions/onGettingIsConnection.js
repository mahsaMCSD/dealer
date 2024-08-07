import {onChangeModalConnection} from './actionCreators'

export const onGettingIsConnection = () => (dispatch) => dispatch(onChangeModalConnection(!window.navigator.onLine))

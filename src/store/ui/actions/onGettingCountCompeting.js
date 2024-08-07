import {getCommonCount}         from 'src/api/services/cars'
import {onChangeCountCompeting} from './actionCreators'

export const onGettingCountCompeting =  () => async(dispatch) => {
 await getCommonCount()
    .then((res) => {
      dispatch(onChangeCountCompeting(res))
    })
}

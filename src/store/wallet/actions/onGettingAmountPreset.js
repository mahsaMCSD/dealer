import {getAmountPresets}     from 'src/api/services/payment'
import {onChangeAmountPreset} from './actionCreators'

export const gettingAmountPresets = () => (dispatch, getState) => {
  const amount_preset = getState().wallet.amount_preset
  if (amount_preset.length === 0) {
    getAmountPresets()
      .then((res) => dispatch(onChangeAmountPreset(res)))
  }
}

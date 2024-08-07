import {getAmountPresetsStep}     from 'src/api/services/payment'
import {onChangeAmountPresetStep} from './actionCreators'

export const gettingAmountPresetsStep = () => (dispatch, getState) => {
  const amount_preset_step = getState().wallet.amount_preset_step
  if (!amount_preset_step) {
    getAmountPresetsStep()
      .then((res) => dispatch(onChangeAmountPresetStep(res.step)))
  }
}

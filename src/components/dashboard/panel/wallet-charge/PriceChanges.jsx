import React, {useEffect} from 'react'
import {connect}          from 'react-redux'
import PropTypes          from 'prop-types'

import Icon                       from 'src/ui-kit/Icon'
import ui                         from 'src/assets/dictionaries/ui'
import Formatter                  from 'src/utility/Formatter'
import {gettingAmountPresetsStep} from 'src/store/wallet/actions/onGettingAmountPresetStep'
import {priceRangeChargeWallet}   from 'src/utility/consts'

const _Formatter = new Formatter()

const PriceChanges = ({price, onChangePrice, ...props}) => {

  const handlePrice = (type) => {

    const count = props.amount_preset_step
    let newPrice = type === 'high' ? price + count : price - count
    if ((type === 'low' && newPrice < priceRangeChargeWallet.minimumPrice)) {
      console.log(1111)
      return false
    } else if ((type === 'high' && newPrice >= priceRangeChargeWallet.maximumPrice)) {
      newPrice = priceRangeChargeWallet.maximumPrice
    }
    onChangePrice(newPrice)
  }

  useEffect(() => props.onGettingAmountPresetsStep(), [])

  return <div className="d-flex">
    <div
      className={`btn box-shadow disable-scroll-body wallet--charge--btn--changes d-flex align-items-center ${price === priceRangeChargeWallet.maximumPrice && 'bg-black-100 text-black-600'}`}
      onClick={() => handlePrice('high')}>
      <Icon type="plus"/>
    </div>

    <div
      className="border-gray-400 wallet--charge--btn--input disable-scroll-body text-gray-800 mx-2 w-100 d-flex align-items-center justify-content-center">
      {
        price ?
        <>
          <span className="text-14 ms-2">{ui.price_deposit} :</span>
          <span className="text-yellow-orange text-14">
                        {_Formatter.commaSeparateNumber(price)}
            <span className="text-currency me-1">{ui.toman}</span>

          </span>
        </>
              : ui.price_deposit
      }
    </div>
    <div
      className={`btn box-shadow disable-scroll-body wallet--charge--btn--changes d-flex align-items-center ${price <= priceRangeChargeWallet.minimumPrice && 'bg-black-100 text-black-600'}`}
      onClick={() => handlePrice('low')}>
      <Icon type="minus"/>
    </div>
  </div>
}


const mapStateToProps = state => ({
  amount_preset_step: state.wallet.amount_preset_step,
  amount_preset: state.wallet.amount_preset
})
const mapDispatchToProps = dispatch => ({
  onGettingAmountPresetsStep: () => dispatch(gettingAmountPresetsStep())
})
export default connect(mapStateToProps, mapDispatchToProps)(PriceChanges)

PriceChanges.defaultProps = {
  price: 0,
  onChangePrice: () => {}
}

PriceChanges.prototype = {
  price: PropTypes.number.isRequired,
  onChangePrice: PropTypes.func.isRequired
}

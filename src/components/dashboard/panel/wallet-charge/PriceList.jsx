import React, {useEffect}     from 'react'
import {connect}              from 'react-redux'
import PropTypes              from 'prop-types'
import ui                     from 'src/assets/dictionaries/ui'
import Formatter              from 'src/utility/Formatter'
import {gettingAmountPresets} from 'src/store/wallet/actions/onGettingAmountPreset'

const _Formatter = new Formatter()

const PriceList = ({onChangePrice, price, ...props}) => {

  useEffect(() => props.onGettingAmountPresets(), [])

  return <div className="d-flex justify-content-center">
    <div className="d-flex flex-wrap mb-2 justify-content-around">
      {
        props.amount_preset?.sort((a, b) => a.order - b.order)
          .map(prices_item => {
            return <button
              key={prices_item.amount}
              className={`btn disable-scroll-body disable-scroll-body ${price === prices_item.amount
                                ? 'wallet--charge--btn-price__active border-yellow-orange text-yellow-orange'
                                : 'btn-outline-gray-400  text-purple'}  wallet--charge--btn-price d-flex  justify-content-center text-14`}
              onClick={() => onChangePrice(prices_item.amount)}
            > {_Formatter.commaSeparateNumber(
              prices_item.amount)} {ui.toman}
            </button>
          })
      }
    </div>
  </div>
}

const mapStateToProps = state => ({
  amount_preset: state.wallet.amount_preset
})
const mapDispatchToProps = dispatch => ({
  onGettingAmountPresets: () => dispatch(gettingAmountPresets())
})
export default connect(mapStateToProps, mapDispatchToProps)(PriceList)

PriceList.defaultProps = {
  price: 0,
  onChangePrice: () => {}
}

PriceList.prototype = {
  price: PropTypes.number.isRequired,
  onChangePrice: PropTypes.func.isRequired
}

import React, {useState}        from 'react'
import ui                       from 'src/assets/dictionaries/ui'
import styled                   from 'styled-components'
import PriceList                from 'src/components/dashboard/panel/wallet-charge/PriceList'
import PriceChanges             from 'src/components/dashboard/panel/wallet-charge/PriceChanges'
import {chargeWalletServices}   from 'src/api/services/payment'
import BasicButton              from 'src/ui-kit/button/BasicButton'
import {priceRangeChargeWallet} from 'src/utility/consts'
import Formatter                from 'src/utility/Formatter'

const _Formatter = new Formatter()

const WalletChargeOnline = () => {
  const [price, onChangePrice] = useState(0)
  const [isLoading, onChangeIsLoading] = useState(false)

  const onSubmit = async () => {
    if (price && !isLoading) {
      onChangeIsLoading(true)

      const result = await chargeWalletServices({
        amount: price,
        route: 'dashboard/userPanel/wallet',
        platform: 11
      })
      onChangeIsLoading(false)
      if (result.url) {
        window.location.replace(result.url)
      }
    }
  }


  return <MainWalletCharge className="d-flex flex-column overflow-hidden w-desktop center-desktop p-xl-2">
    {!price &&
    <h6 className="text-18 text-center text-selected">
      {ui.select_the_desire_amount}
    </h6>
    }
    <PriceList price={price} onChangePrice={onChangePrice}/>
    <PriceChanges price={price} onChangePrice={onChangePrice}/>
    <h6 className="text-12 text-danger text-red pt-3">
      {price === priceRangeChargeWallet.minimumPrice &&
      ui.wallet_charge_page.message_min_price.format(_Formatter.commaSeparateNumber(price))}
    </h6>
    <BasicButton onClick={price && onSubmit}
                 isLoading={isLoading}
                 className={`btn wallet--charge--submit disable-scroll-body text-white ${
                   price ? 'bg-yellow-orange' : 'bg-black-600'
                 }`}>
      {ui.payment}
    </BasicButton>
  </MainWalletCharge>
}


export default WalletChargeOnline

const MainWalletCharge = styled.div`
  margin: 0 16px;
  position: fixed;
  bottom: 24px;
  right: 0;
  left: 0;
  
  .text-selected {
    margin-bottom: 48px;
  }

  .wallet--charge--btn-price {
    width: 107px;
    margin: 10px 0;
    padding: 8px;
    border-radius: 4px;

  }

  .wallet--charge--btn-price:focus {
    outline: none !important;
    box-shadow: none !important;
  }

  .wallet--charge--btn--changes {
    height: 40px;
    width: 40px;
    border-radius: 4px;

  }

  .wallet--charge--btn--input {
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    text-align: center;
  }

  .wallet--charge--btn-price__active {
    border-color: var(--orange);
  }

  .text-currency {
    font-size: 10px;
  }

  .wallet--charge--submit {
    border-radius: 4px;
    margin-top: 24px;
    height: 40px;
  }

  .opacity-50 {
    opacity: 0.5;
  }

  .text-error {
    height: 34px;
  }
`

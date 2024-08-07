import React         from 'react'
import {connect}     from 'react-redux'
import {useNavigate} from 'react-router-dom'
import styled        from 'styled-components'
import ui            from 'src/assets/dictionaries/ui'
import Icon          from 'src/ui-kit/Icon'
import Formatter     from 'src/utility/Formatter'
import {Link}        from 'react-router-dom'
import MellatCard    from 'src/assets/images/mellat_card.svg'
import KebabMenu     from 'src/ui-kit/kebab-menu/KebabMenu'

const _Formatter = new Formatter()


const CardWallet = (props) => {
  const history = useNavigate()

  return <div className='w-100 h-auto px-4 mb-4'>

    <MainCardWallet className="mt-3 radius-16 position-relative w-100 p-3" bg={MellatCard}>
      <div className='card-wallet-details position-absolute'>

        <h5 className="card-wallet--title text-14 mb-0 text-black-50 ">
          {ui.your_balance}
        </h5>
        <div className="d-flex flex-column ">
          <h6 className="font-weight-bold card-wallet--price text-white">
            {_Formatter.commaSeparateNumber(props.balance)} <span className="text-16">{ui.toman}</span>
          </h6>
        </div>
        <div className="d-flex justify-content-between full-width">

          <Link to={'wallet-charge-online'}
                className="bg-white radius-8 font-extra-bold card-wallet--button text-12 align-items-center d-flex justify-content-center text-charcoal-dark">
            <Icon className="card-wallet--btn--icon text-charcoal-dark" type="emptyWalletAdd1"/>
            {ui.add_balance}
          </Link>
          {<KebabMenu menuItems={[{title: ui.withdraw, onClick: () => history(`withdraw`)}]}
                      classes={{list: 'list-menu radius-8 bg-white', menuIcon: 'menu-icon'}}/>}

        </div>
      </div>

    </MainCardWallet>
  </div>
}

const mapStateToProps = (state) => ({
  balance: state.wallet.balance
})


export default connect(mapStateToProps, {})(CardWallet)

const MainCardWallet = styled.div`
  background: url(${state => state.bg});
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100vw / 2);
  @media (min-width: 1200px) {
    height: calc(350px / 2);
  }

  .card-wallet-details {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }

  .card-wallet--title {
    line-height: 24px;
  }

  .card-wallet--price {
    margin-bottom: 0;
    line-height: 36px;
  }

  .card-wallet--btn--icon {
    margin-left: 8px;
    font-size: 20px;
  }

  .card-wallet--button {
    padding: 6px 10px 6px 16px;
  }

  .full-width {
    width: 100%;
  }

  .list-menu {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
    line-height: 0;
  }

  .menu-icon {
    font-size: 20px;

    &:before {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
`

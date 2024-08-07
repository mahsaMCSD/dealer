import React     from 'react'
import styled    from 'styled-components'
import Icon      from 'src/ui-kit/Icon'
import ui        from 'src/assets/dictionaries/ui'
import {Link}    from 'react-router-dom'
import Formatter from 'src/utility/Formatter'

const _Formatter = new Formatter()


const ReceiptOfflineCharge = ({amount, showReceiptOffline}) => <MainReceiptOfflineCharge
  className="d-flex flex-column align-items-center">
  <Icon type={showReceiptOffline === 'success' ? 'checkCircle' : 'timesCircle'}
        className={`${showReceiptOffline
                      === 'success' ? 'text-success'
                                    : 'text-danger'} result--message--icon mb-4`}/>


  <div className="result--message--texts d-flex flex-column">
    {
      ui.wallet_charge_page[showReceiptOffline === 'success' ? 'result_message' : 'result_message_un_success'].map(
        (msg,index) => <h6
          key={`${msg.toString()}-index`}
          className="text-14 result--message--text text-purple text-center" key={msg.amount}>{msg.format(_Formatter.commaSeparateNumber(
          amount))}</h6>)
    }
  </div>
  <button className="btn btn-outline-orange result--message--cards--back_to_wallet">
    <Link to={'/dashboard/userPanel/wallet'}>
      {ui.wallet_charge_page.back_to_wallet}
    </Link>
  </button>

</MainReceiptOfflineCharge>


export default ReceiptOfflineCharge

const MainReceiptOfflineCharge = styled.div`
  .result--message--icon {
    margin-bottom: 16px;
    font-size: 64px;
  }

  header {
    margin-bottom: 32px;
  }

  .result--message--texts {
  }

  .result--message--text {
    margin: 12px 0;
  }

  .result--message--cards {
    border-radius: 4px;
    padding: 12px 0;
  }

  .result--message--cards--balance {
    font-size: 21px;
    margin: 8px 0;
  }

  .result--message--cards--button {
    width: 168px;
    margin-top: 4px;
  }

  .result--message--cards--icon {
    margin-left: 8px;
  }

  .result--message--cards--back_to_wallet {
    margin-top: 8px;

    &:hover, a:hover {
      color: white;
    }
  }
`

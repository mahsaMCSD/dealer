import React, {useCallback, useEffect, useState} from 'react'
import styled                                    from 'styled-components'
import MellatCardCharge                          from 'src/assets/images/mellat-card-charge.svg'
import UploadFile                                from 'src/components/dashboard/upload-file/UploadFile'
import {getListGatewayServices}                  from 'src/api/services/payment'


const WalletChargeOffline = () => {

  const [gateway, onChangeGateway] = useState([])
  const [cardInfo, onChangeCardInfo] = useState({})

  const getListGateway = useCallback(() => {
    getListGatewayServices()
      .then((res) => {
          onChangeGateway(res)
          onChangeCardInfo(res.find(get => get.slug.toLowerCase() === 'mellat-offline-deposit'))
        }
      )
  }, [])

  useEffect(() => getListGateway(), [])

  return <MainWalletChargeCash
    className="d-flex flex-column align-items-center"
    bg={MellatCardCharge}>
    {cardInfo && <div className="card-bank d-flex flex-column align-items-center">
      <h6 className="card-bank-number-id text-white text-18" dir="ltr">{cardInfo.card_number}</h6>
      <h6 className="card-bank-number-sheba text-white text-18" dir="ltr">{cardInfo.iban}</h6>
      <h6 className=" text-white text-14">{cardInfo.description}</h6>
    </div>}

    <UploadFile type="offline-charge" gateway={gateway} className={'card-bank--upload-file'}/>

  </MainWalletChargeCash>
}

export default WalletChargeOffline

const MainWalletChargeCash = styled.div`
  margin: 0 16px;
  padding-top: 30px;

  .card-bank {
    background: url(${state => state.bg});
    background-repeat: no-repeat;
    width: 327px;
    height: 212px;
    border-radius: 10px;
  }

  .card-bank-number-id {
    margin-top: 78px;
  }

  .card-bank-number-sheba {
    margin-top: 20px;
    margin-bottom: 12px;
  }

  .card-bank--upload-file {
    margin-top: 62px;
  }
`

import React, {useState} from 'react'
import styled            from 'styled-components'
import Icon              from 'src/ui-kit/Icon'
import PropTypes         from 'prop-types'
import BankAccountDelete from './BankAccountDelete'

const enumBankAccount = {
  0: {
    key: 'awaiting_approval',
    colored: {
      border: 'border-charcoal-200',
      background: 'bg-charcoal-50',
      text: 'text-black-800'
    }
  },
  1: {
    key: 'approved',
    colored: {
      border: 'border-green',
      background: 'bg-green-50',
      text: 'text-green'
    }
  },
  2: {
    key: 'disapproved',
    colored: {
      border: 'border-red-dark',
      background: 'bg-red-50',
      text: 'text-red-dark'
    }
  }
}

const CardAccount = ({
                       numberAccount,
                       detailAccount,
                       statusId,
                       statusMessage,
                       slug,
                       logo,
                       handleGettingData,
                       disapproval_reason,
                       showOnly
                     }) => {
  const {colored} = enumBankAccount[statusId]
  const [dataModal, onChangeDataModal] = useState()

  const closeModal = (is_getting_data) => {
    is_getting_data && handleGettingData()
    onChangeDataModal()
  }

  return <MainCardAccount className={`${colored.border} border overflow-hidden w-100 mb-2 radius-4 d-flex`}>
    <div className={`d-flex card-account--logo align-items-center radius-4 ${colored.border}`}>
      <img className="card-account--logo--image" src={logo}/>
    </div>
    <div className={`${colored.background} card-account--details d-flex flex-column w-100`}>
      <h6 className="text-black font-weight-700 text-14 mb-1">{numberAccount}</h6>
      <h6 className="text-12 mb-0 text-black-800">{detailAccount}</h6>
      {!showOnly && <div className="card-account--details--status d-flex justify-content-between align-items-center">
        <h6 className={`${colored.text} mb-0 text-12`}>{statusMessage} {disapproval_reason
                                                                        ? `- ${disapproval_reason}`
                                                                        : ''}</h6>
        <div onClick={() => onChangeDataModal({slug, numberAccount, detailAccount})} className="pointer">
          <Icon type={'trash'}/>
        </div>
      </div>}
    </div>
    <BankAccountDelete dataModal={dataModal} closeModal={closeModal}/>
  </MainCardAccount>
}

export default CardAccount


CardAccount.defaultProps = {
  numberAccount: '',
  statusId: 0,
  detailAccount: '',
  statusMessage: '',
  handleGettingData: () => { },
  showOnly: false
}

CardAccount.propTypes = {
  numberAccount: PropTypes.string,
  statusId: PropTypes.oneOf([0, 1, 2]),
  detailAccount: PropTypes.string,
  statusMessage: PropTypes.string,
  handleGettingData: PropTypes.func,
  showOnly: PropTypes.bool
}


const MainCardAccount = styled.div`
  .card-account--logo {
    padding: 0 10px;
    border-left: 1px solid;

    .card-account--logo--image {
      width: 44px;
      object-fit: contain;
    }
  }

  .card-account--details {
    padding: 8px 12px;
  }

  .card-account--details--status {
    margin-top: 40px;
  }
`

import React                   from 'react'
import styled                  from 'styled-components'
import ui                      from 'src/assets/dictionaries/ui'
import moment                  from 'moment-jalaali'
import {getHighAndLowTurnover} from 'src/utility/helpers'
import Formatter               from 'src/utility/Formatter'
import Icon                    from 'src/ui-kit/Icon'

const Price = ({price, operator, className}) => <h6
  className={`${className} text-16 font-weight-bold`} dir="ltr">
  {operator}{price}

</h6>


const schemaTransaction = {
  0: {
    text_color: 'text-red',
    icon: 'cardRemove'
  },
  1: {
    text_color: 'text-green',
    icon: 'emptyWalletAdd'
  }
}

const TransactionRow = ({transaction}) => {
  const _Formatter = new Formatter()

  return <MainTransactionRow className="border border-charcoal-200  radius-8">

    <div className="d-flex justify-content-between">
      <div className='d-flex align-items-center'>
        {transaction.turnover.value !== undefined && schemaTransaction[transaction.turnover.value]?.icon &&
        <Icon type={schemaTransaction[transaction.turnover.value].icon}
              className={`${transaction?.status.value !== 1
                            ? 'text-charcoal-800'
                            : schemaTransaction[transaction.turnover.value].text_color} transaction-row--icon`}/>}
        <h6
          className="text-14 text-right font-weight-700 text-gray-800 mb-0 text-ellipsis"> {transaction.turnover.title}</h6>
        <span
          className={'text-12 text-black-800 me-1'}>({transaction?.status.title})</span>
      </div>

      <div className="d-flex align-items-center">
        <Price price={_Formatter.commaSeparateNumber(transaction.amount)}
               className={`mb-0 text-16 ${transaction?.status.value !== 1
                                          ? 'text-black-600'
                                          : schemaTransaction[transaction.turnover.value].text_color}`}
               operator={getHighAndLowTurnover(transaction?.turnover.value)}/>
        <h6 className="text-black-600 me-1 mb-0 text-10">{ui.toman}</h6>
      </div>
    </div>
    <div className="d-flex justify-content-between align-items-center my-2">
      <h6 className="text-12 mb-0 text-black-800"> {transaction.details?.appointment ?

                                                    <>
                                                      <span>{ui.transaction_page.details_data.id} : </span>
                                                      <span>{transaction.details.appointment}</span>
                                                    </> :
                                                    transaction.tracking_code && <>
                                                        <span>{ui.tracking_code} : </span>
                                                        <span>{transaction.tracking_code}</span>
                                                      </>

      }
      </h6>
      <div className="d-flex align-items-center">
        <h6 className="text-black-600 mb-0 text-12" dir="ltr">{moment(transaction?.created_time)
          .format('jYYYY/jM/jD - HH:mm')}</h6>
      </div>
    </div>
    <h6 className="d-flex text-12 text-black-800 mb-0">
      {
        transaction?.details?.car_property ? <>
                                             <span>{transaction?.details.car_property?.brand}</span>
                                             <span className="mx-2">{transaction?.details.car_property?.model}</span>
                                             <span>{transaction?.details.car_property?.year}</span>
                                           </> :
        <span>
          {transaction?.details?.description}
        </span>
      }


    </h6>
  </MainTransactionRow>
}

export default TransactionRow

const MainTransactionRow = styled.div`
  padding: 12px;
  margin: 8px 16px;

  .text-right {
    max-width: 60%;
  }

  .transaction-row--icon {
    margin-left: 10px;
  }
`
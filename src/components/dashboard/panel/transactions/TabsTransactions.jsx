import React, {useCallback, useEffect, useState} from 'react'
import styled                                    from 'styled-components'
import ui                                        from 'src/assets/dictionaries/ui'
import {getPaymentsTransactionsServices}         from 'src/api/services/payment'
import TransactionRow                            from './TransactionRow'
import Loading                                   from 'src/components/loading/Loading'
import Icon                                      from 'src/ui-kit/Icon'
import TabBar                                    from '../../tab-bar/TabBar'

const tabList = {
  'all': {
    key: 'all',
    title: ui.all
  }, 'increase': {
    key: 'increase',
    title: ui.deposit
  }, 'decrease': {
    key: 'decrease',
    title: ui.withdraw
  }
}


const EmptyMessage = () => <div className="empty--message mb-10 d-flex align-items-center justify-content-center">
  <div className="d-flex flex-column align-items-center">
    <Icon className={'empty--message--icon'} type="upload"/>
    <h6 className="text-center text-18 empty--message--text">
      {ui.not_result_transaction}
    </h6>
  </div>
</div>

const TabsTransactions = () => {
  const [activeTab, onChangeActiveTab] = useState('all')
  const initialState = {list: [], next: null, page: 1}
  const [transactionData, onChangeTransactionData] = useState(initialState)
  const [isLoading, onChangeIsLoading] = useState(false)

  const checkTurnOver = () => {
    switch (activeTab) {
      case 'all':
        return ''
      case 'increase':
        return 1
      case 'decrease':
        return 0
    }
  }

  const observer = React.useRef(null)
  const showEnded = React.useCallback(node => {
    if (!node) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {

        if (transactionData.next) {
          getList(true)
        }
      }
    })
    if (node) observer.current.observe(node)
  })

  const getList = useCallback((next_page) => {
    let pageStart = 1
    if (!next_page) {
      onChangeIsLoading(true)
    }
    const page = next_page ? transactionData.page + 1 : pageStart
    getPaymentsTransactionsServices({
      page,
      turnover: checkTurnOver()
    })
      .then((res => {
        onChangeTransactionData(prevState => (
            {
              list: next_page ? [...prevState.list, ...res.results] : res.results,
              next: res.next,
              page
            }
          )
        )
        onChangeIsLoading(false)
      }))
  })

  useEffect(() => getList(), [activeTab])

  return <MainTabsTransactions>
    <TabBar list={tabList} classes="transactions--tab-bar" changeTab={onChangeActiveTab} activeTab={activeTab}/>
    {
      isLoading ? <div className="loading position-absolute left-0 right-0 mb-5"><Loading fullScreen/></div> :
      transactionData.list.length === 0 ?

      <EmptyMessage/>

                                        :
      transactionData.list.map(
        (transaction, i) =>
          <div className="my-2" key={transaction.tracking_code || transaction.appointment}>
            <TransactionRow
              transaction={transaction}/> {
            i === transactionData.list.length - 1 && transactionData.next && !isLoading && <div ref={showEnded}></div>
          }               </div>
      )
    }


  </MainTabsTransactions>
}


export default TabsTransactions

const MainTabsTransactions = styled.div`
  .loading {
    height: calc(75vh - 280px);
  }

  .transactions--tab-bar {
    position: relative !important;
  }

  .empty--message {
    height: calc(70vh - 130px);
  }

  .tabs--btn__active {
    border-bottom: 2px solid;
    border-bottom-color: var(--orange);
    border-radius: 0;
  }

  .empty--message--text {
    margin-top: 30px;
  }

  .empty--message--icon {
    font-size: 54px;
  }
`
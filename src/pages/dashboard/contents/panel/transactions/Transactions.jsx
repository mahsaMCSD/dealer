import React, {useEffect}        from 'react'
import CardWallet                from 'src/components/dashboard/panel/transactions/CardWallet'
import TabsTransactions          from 'src/components/dashboard/panel/transactions/TabsTransactions'
import CardWalletDetails         from 'src/components/dashboard/panel/transactions/CardWalletDetails'
import {onGettingWalletsBalance} from 'src/store/wallet/actions/onGettingWalletsBalance'
import {connect}                 from 'react-redux'


const Transactions = (props) => {
  useEffect(() => {
    props.onGettingWalletsBalance()
  }, [])

  return <>
    <CardWallet/>
    <CardWalletDetails/>
    <TabsTransactions/>
  </>

}
const mapDispatchToProps = (dispatch) => ({
  onGettingWalletsBalance: () => dispatch(onGettingWalletsBalance())
})


export default connect(null, mapDispatchToProps)(Transactions)

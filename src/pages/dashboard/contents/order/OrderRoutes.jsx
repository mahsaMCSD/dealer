import React from 'react'
import ui    from 'src/assets/dictionaries/ui'

export const thisPathnameOrderPage = '/dashboard/myOrders/'

export default [
  {
    key: 'ready-to-pay',
    path: `readyToPay`,
    isModal: false,
    exact: true
  }, {
    key: 'paid',
    path: `paid`,
    isModal: false,
    exact: true
  }, {
    key: 'negotiation',
    path: `negotiation`,
    isModal: false,
    exact: true
  }, {
    key: 'transfer-contract',
    path: `transfer-contract`,
    isModal: true,
    header: {
      title: ui.order_page.transfer.title,
      is_back: true
    },
    exact: true
  }
]

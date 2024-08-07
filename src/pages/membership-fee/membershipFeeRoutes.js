import React from 'react'
import ui    from 'src/assets/dictionaries/ui'


export default [
  {
    key: 'membership-on-boarding',
    path: `on-boarding`,
    exact: false,
    header: {
      title: ui.membership_fee.title,
      is_back: true
    }
  }, {
    key: 'settlement',
    path: `settlement`,
    exact: false,
    header: {
      title: ui.membership_fee.title,
      is_back: true,
      back_link: '/app/dashboard/userPanel'
    }
  }, {
    key: 'membership-fee-withdrawing',
    path: `withdrawing`,
    exact: false,
    header: {
      title: ui.membership_fee.withdrawing.page_title,
      is_back: true,
      back_link: '/app/dashboard/userPanel'
    }
  }, {
    key: 'use_wallet',
    path: `use-wallet`,
    exact: false,
    header: {
      title: ui.membership_fee.title,
      is_back: true,
      back_link: '/app/dashboard/userPanel'
    }
  }
]

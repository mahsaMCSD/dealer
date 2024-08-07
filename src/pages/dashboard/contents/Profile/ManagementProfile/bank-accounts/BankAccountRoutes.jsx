import React from 'react'
import ui    from 'src/assets/dictionaries/ui'

export default [
  {
    id: 113,
    path: `bank-accounts`,
    menu: {
      text: ui.profile.accounts_bank,
      icon: 'walletCard'
    },
    header: {
      title: ui.profile.accounts_bank,
      is_back: true
    },
    exact: true
  },
  {
    id: 1131,
    path: `bank-account-add`,
    header: {
      title: ui.bank_account.add_page.header,
      is_back: true
    },
    exact: true
  }
]

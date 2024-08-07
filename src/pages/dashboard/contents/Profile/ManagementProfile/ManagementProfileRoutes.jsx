import React             from 'react'
import ui                from 'src/assets/dictionaries/ui'
import BankAccountRoutes from './bank-accounts/BankAccountRoutes'

export const thisPathnameManagement = '/dashboard/userPanel/'

export default [
  {
    id: 111,
    path: `info`,
    header: {
      title: ui.profile.info_personal,
      is_back: true
    },
    menu: {
      text: ui.profile.info_personal,
      icon: 'userTag'
    },
    exact: true
  }, {
    id: 112,
    path: `upload-documents`,
    header: {
      title: ui.profile.document_send,
      is_back: true
    },
    menu: {
      text: ui.profile.document_send,
      icon: 'documentCloud'
    },
    exact: true

  }, {
    id: 114,
    path: `contract`,
    header: {
      title: ui.notary_and_contract.title_menu,
      is_back: true
    },
    menu: {
      text: ui.notary_and_contract.title_menu,
      icon: 'receiptEdit'
    },
    exact: true
  },
  ...BankAccountRoutes, {
    id: 116,
    path: null,
    menu: {
      text: ui.profile.report_violation,
      icon: 'warning'
    },
    exact: true
  }, {
    id: 117,
    path: null,
    menu: {
      text: ui.profile.change_password,
      icon: 'lock'
    },
    exact: true
  }, {
    id: 119,
    path: `create`,
    header: {
      title: ui.notary_and_contract.title_menu,
      is_back: true
    },
    exact: true
  }
]

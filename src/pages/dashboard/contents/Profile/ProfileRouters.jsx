import React                   from 'react'
import ui                      from 'src/assets/dictionaries/ui'
import ManagementProfileRoutes from './ManagementProfile/ManagementProfileRoutes'

export default [
  {
    id: 1,
    path: `dealer-info`,
    header: {
      title: ui.profile.management_Profile,
      is_back: true
    },
    menu: {
      text: ui.profile.management_Profile,
      icon: 'userEdit'
    },
    exact: false
  }
  , {
    id: 2,
    path: `wallet`,
    header: {
      title: ui.wallet,
      is_back: true,
      back_link: '/dashboard/userPanel'
    },
    menu: {
      text: ui.wallet,
      icon: 'emptyWallet'
    },
    exact: false
  }
  , {
    id: 3,
    path: 'https://khodro45.com/pricing/',
    menu: {
      text: ui.profile.price_daily_car,
      icon: 'coin',
      className: 'border-top-only border-charcoal-100',
      isExternal: true,

    },
    exact: false
  },
  {
    id: 4,
    path: `app-quide`,
    header: {
      title: ui.guide,
      is_back: true
    },
    menu: {
      text: ui.guide,
      icon: 'mobile1'
    },
    exact: false
  },
  {
    id: 5,
    path: `faq`,
    header: {
      title: ui.frequently_asked_questions,
      is_back: true
    },
    menu: {
      text: ui.frequently_asked_questions,
      icon: 'messageQuestion'
    },
    exact: false
  },
  {
    id: 6,
    path: `about-us`,
    header: {
      title: ui.about_us,
      is_back: true
    },
    menu: {
      text: ui.about_us,
      icon: 'kh45'
    },
    exact: false
  }, {
    id: 7,
    path: null,
    component: null,
    menu: {
      text: ui.profile.latest_changes,
      icon: 'noteText',
      className: 'border-top-only border-charcoal-100'
    },
    exact: false
  }, {
    id: 8,
    path: `wallet-charge-online`,
    header: {
      title: ui.wallet_charge,
      is_back: true
    },
    exact: false
  }, {
    id: 9,
    path: `wallet-charge-offline`,
    header: {
      title: ui.wallet_charge,
      is_back: true
    },
    exact: false
  }, {
    id: 12,
    path: `withdraw`,
    header: {
      title: ui.cash_withdraw,
      is_back: true
    },
    exact: false
  },
  ...ManagementProfileRoutes
]

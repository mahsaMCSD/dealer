export default {
  auctions: {
    _get: '/auctions/',
    bid: {
      _get: `/auctions/{0}/bid/`,
      _post: `/auctions/{0}/bid/`
    },
    bids: {
      _get: `/auctions/bids/`
    },
    mine: {
      _get: `/auctions/mine/`
    },
    winner: {
      _get: `/auctions/winner/?page={0}`
    },
    negotiation: {
      _get: `/auctions/negotiation/`
    },
    detail: {
      _get: `/auctions/{0}/`
    },
    wait_settlement: {
      _get: '/auctions/wait_settlement/'
    }
  },
  city: {
    _get: '/city/'
  },
  dealers: {
    _post: '/dealers/',
    create_dealer: {
      _post: '/dealers/create_dealer/'
    },
    info: {
      _get: '/dealers/info/'
    },
    login: {
      _post: '/dealers/login/'
    },
    logout: {
      _post: '/dealers/logout/'
    },
    login_sms: {
      _post: '/dealers/login_sms/'
    },
    login_token: {
      _post: '/dealers/login_token/'
    },
    register: {
      _post: '/dealers/'
    },
    is_confirmed: {
      _get: '/dealers/is_confirmed/'
    },
    rating_policy: {
      _get: '/dealers/rating-policy/'
    },
    register_dealers: {
      _post: '/dealers/register/'
    },
    identity: {
      _get: '/dealers/identity/'
    },
    upload_identity: {
      _patch: '/dealers/upload-identity/'
    },
    otp: {
      _post: '/dealers/otp/'
    }
  },
  branch: {
    center: {
      _get: '/branch/center/'
    }
  },
  images: {
    get_token: {
      _get: `/images/{0}/get_token/`
    },
    get_image: {
      _get: `/images/get_image/?token={0}`
    }
  },
  inspection_dealer: {
    _get: '/inspection_dealer/',
    inspection_id: {
      _get: `/inspection_dealer/{0}/`
    },
    segments: {
      _get: `/inspection_dealer/{0}/segments/{1}/`
    },
    positive_comments: {
      _get: `/inspection_dealer/{0}/positive_comments/`
    }
  },
  user: {
    login_sms: {
      _post: '/user/login_sms/'
    },
    login_token: {
      _post: '/user/login_token/'
    },
    dealer: {
      _get: '/user/dealer/'
    },
    register: {
      _post: '/user/register/'
    }
  },
  inventory: {
    _get: `/inventory/`,
    bid: {
      _post: `/inventory/{0}/bid/`,
      _get: `/inventory/{0}/bid/`
    },
    bids: {
      _get: `/inventory/bids/`
    },
    detail: {
      _get: `/inventory/{0}/`
    },
    mine: {
      _get: `/inventory/mine/`
    }
  },
  device: {
    _post: '/devices/'
  },
  common: {
    count: '/common/count/'
  },
  payments: {
    transactions: {
      _get: '/payments/transactions/',
      _delete: '/payments/transactions/{0}/'
    },
    wallets: {
      balance: {
        _get: '/payments/wallets/balance/'
      },
      charge: {
        _post: '/payments/wallets/charge/'
      },
      amount_presets: {
        _get: '/payments/wallets/amount-presets/'
      },
      amount_presets_step: {
        _get: '/payments/wallets/amount-preset-step/'
      },
      offline_charge: {
        _post: '/payments/wallets/offline-charge/'
      },
      refund_deposit: {
        _post: '/payments/wallets/refund-deposit/'
      },
      deposit_info: {
        _get: '/payments/wallets/deposit-info/'
      },
      cashable_balance: {
        _get: '/payments/wallets/cashable-balance/'
      },
      withdraw: {
        _post: '/payments/wallets/withdraw/'
      }
    },
    by_slug: {
      _get: '/payments/{0}/'
    },
    gateway: {
      pay: {
        _post: '/payments/gateway/pay/'
      },
      _get: '/payments/gateway/'
    },
    payment_info: {
      _get: '/payments/{0}/payment-info/'
    },
    payment: {
      _post: '/payments/payment/'
    },
    finalize_payment: {
      _post: '/payments/finalize-payment/'
    },
    auction_membership_info: {
      _get: '/payments/auction-membership-info/'
    },
    auction_deposit: {
      _get: '/payments/auction-deposit/'
    }
  },
  bank_account: {
    _post: '/bank_account/',
    _get: '/bank_account/',
    _delete: '/bank_account/{0}/',
    withdraw_accounts: {
      _get: '/bank_account/withdraw-accounts/'
    }
  },
  categories: {
    _get: '/pricing/dailycars/categories/'
  },
  models: {
    _get: '/models/'
  },
  brands: {
    _get: '/brands/'
  },
  dealer_profile: {
    dealer_images: {
      _post: '/dealer-images/'
    },
    dealer_images_id: {
      _patch: '/dealers/{0}/'
    }
  },
  map_ir: {
    reverse: {
      _get: '/reverse/no'
    }
  },
  dealer_notary: {
    _post: '/dealer-notary/',
    _get: '/dealer-notary/',
    _delete: '/dealer-notary/{0}/'
  },
  contract_template: {
    _post: '/contract-template/',
    _get: '/contract-template/',
    _get_by_id: '/contract-template/{0}/',
    _delete: '/contract-template/{0}/'
  },
  pre_contract: {
    select_transaction: {
      _post: '/pre-contract/select-transaction/'
    }
  },
  contracts: {
    transaction_selection: {
      _get: '/contracts/transaction-selection/'
    }
  }
}

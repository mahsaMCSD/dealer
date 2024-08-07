export const priceRangeChargeWallet = Object.freeze({
  maximumPrice: 49900000,
  minimumPrice: 500000,
  minimumPriceUploadReceipt: 1000
})

export const deductions = Object.freeze(({
  complications: 1,
  violation: 4,
  tehran_man: 2,
  switch: 6,
  dat: 3
}))

export const filterSchema = Object.freeze({
  year_from: {type: 'number', initialValue: {'jalali': 1380, 'gregorian': 2000}},
  year_to: {type: 'number', initialValue: {'jalali': 1401, 'gregorian': 2022}},
  price_from: {type: 'number', initialValue: 70000000},
  price_to: {type: 'number', initialValue: 2500000000},
  klm_from: {type: 'number', initialValue: 0},
  klm_to: {type: 'number', initialValue: 250000}
})

export const progressType = {
  secondPrepayment: -1,
  prepayment: 0,
  payment: 1
}

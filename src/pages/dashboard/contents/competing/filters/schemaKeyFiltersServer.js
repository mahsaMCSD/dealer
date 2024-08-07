const schemaKeyFiltersServer = Object.freeze({
  cities: 'city',
  year_from: 'year__gte',
  year_to: 'year__lte',
  price_from: 'price__gte',
  price_to: 'price__lte',
  klm_from: 'klm__gte',
  klm_to: 'klm__lte',
  brands: 'brand',
  models: 'model',
  best_condition: 'best_condition'
})

export default schemaKeyFiltersServer

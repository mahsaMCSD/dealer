import ui from 'src/assets/dictionaries/ui'

const schemaFilterChips = {
  cities: {
    type: 'list',
    data: 'cities'
  },
  year_from: {
    type: 'single'
  },
  year_to: {
    type: 'single'
  },
  price_from: {
    type: 'string_separator'
  },
  price_to: {
    type: 'string_separator'
  },
  klm_from: {
    type: 'string_separator'
  },
  klm_to: {
    type: 'string_separator'
  },
  brands: {
    type: 'list',
    data: 'brands'
  },
  best_condition: {
    type: 'boolean',
    valueChip: ui.filter.best
  }
}

export default schemaFilterChips

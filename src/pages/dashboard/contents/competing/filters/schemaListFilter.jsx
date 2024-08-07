import React          from 'react'
import ui             from 'src/assets/dictionaries/ui'
import SwitchYearMode from './SwitchYearMode'
import Icon           from 'src/ui-kit/Icon'

export const listChipsFilter = [
  {
    key: 'cities',
    label: ui.filter.city,
    icon: 'location',
    multiSelect: true
  }, {
    key: 'categories',
    label: ui.filter.categories,
    icon: 'map',
    multiSelect: true,
    disable: true
  }
]

export const listRangeFilter = [
  {
    key: 'price',
    icon: 'moneys',
    label: ui.filter.range_price,
    inputType: 'price',
    from: {
      label: ui.filter.from_price,
      keyFilter: 'price_from'
    },
    to: {
      label: ui.filter.to_price,
      keyFilter: 'price_to'
    }
  }, {
    key: 'year',
    icon: 'calendar',
    label: ui.filter.year_make,
    childrenHeader: <SwitchYearMode/>,
    inputType: 'string',
    from: {
      label: ui.filter.from_year,
      keyFilter: 'year_from'
    },
    to: {
      label: ui.filter.to_year,
      keyFilter: 'year_to'
    }
  }, {
    key: 'klm',
    icon: 'speedometer',
    label: ui.filter.klm,
    childrenHeader: <Icon className={'text-charcoal-600'} type={'arrowUp2'}/>,
    inputType: 'price',
    from: {
      label: ui.filter.from_klm,
      keyFilter: 'klm_from'
    },
    to: {
      label: ui.filter.to_klm,
      keyFilter: 'klm_to'
    }
  }
]

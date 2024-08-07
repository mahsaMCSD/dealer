import {
  onChangeFilterAuction
}                                 from 'src/store/auctions/list/actions/actionCreators'
import {
  onChangeFilterInventory
}                                 from 'src/store/inventory/list/actions/actionCreators'
import {onGettingBrandsAuction}   from 'src/store/auctions/list/actions/onGettingBrandsAuction'
import {onGettingBrandsInventory} from 'src/store/inventory/list/actions/onGettingBrandsInventory'
import {onGettingModelsAuction}   from 'src/store/auctions/list/actions/onGettingModelsAuction'
import {onGettingModelsInventory} from 'src/store/inventory/list/actions/onGettingModelsInventory'

const schemaStoreFilter = Object.freeze({
  auctions: {
    onChange: onChangeFilterAuction,
    state: 'auctions',
    onGettingBrands: onGettingBrandsAuction,
    onGettingModels: onGettingModelsAuction,
    initialStateFilter: {
      cities: [],
      brands: [],
      year_from: '',
      year_to: '',
      price_from: '',
      price_to: '',
      klm_from: '',
      klm_to: ''
    }
  },
  inventory: {
    onChange: onChangeFilterInventory,
    state: 'inventory',
    onGettingBrands: onGettingBrandsInventory,
    onGettingModels: onGettingModelsInventory,
    initialStateFilter: {
      cities: [],
      brands: [],
      year_from: '',
      year_to: '',
      price_from: '',
      price_to: '',
      klm_from: '',
      klm_to: '',
      best_condition: false
    }
  }
})

export default schemaStoreFilter

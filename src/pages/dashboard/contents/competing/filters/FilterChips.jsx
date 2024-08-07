import React, {useEffect, useState} from 'react'
import {connect}                    from 'react-redux'

import {findPath}        from 'src/utility/utils'
import Chips             from 'src/ui-kit/chips/Chips'
import Icon              from 'src/ui-kit/Icon'
import {onGettingCities} from 'src/store/ui/actions/onGettingCities'
import {withLocation}    from 'src/utility/routerHooks'
import schemaStoreFilter from './schemsStoreFilter'
import {
  deepEqual,
  generateCountFiltered,
  generateValuesChipsFilter
}                        from 'src/utility/helpers'

const schemaGetData = {
  cities: 'onGettingCities',
  brands: 'onGettingBrands'
}

const FilterChips = (props) => {
  const [filtersValue, onChangeFiltersValue] = useState({})
  const [isGettingAllData, onToggleIsGettingAllData] = useState(false)

  const genValueChips = () => {
    const promises = Object.keys(schemaGetData)
      .map((key) =>
        new Promise((resolve) => {
          if (props.filters[key].length !== 0) {
            resolve(props[schemaGetData[key]]())
          } else {
            resolve(null)
          }
        })
      )

    Promise.all(promises)
      .then(() => {
          if (props.filters.brands.length !== 0) {
            getDataModels()
          } else {
            onToggleIsGettingAllData(true)
          }
        }
      )
  }

  const getDataModels = () => {
    let promises2 = []
    if (props.filters.brands) {
      promises2 = props.filters.brands.map((item) => new Promise((resolve2) => {
          if (item.models.length !== 0) {
            resolve2(props.onGettingModels({
              brand_id: item.id
            }))
          } else {
            resolve2(null)
          }
        })
      )
    }

    Promise.all(promises2)
      .then(() => {
        onToggleIsGettingAllData(true)
      })
  }

  useEffect(() => {
    const total = generateCountFiltered(props.filters)
    const hasModels = props.filters.brands.find(brandItem => brandItem.models.length !== 0)
    if (isGettingAllData && total !== 0 &&
      !hasModels || Object.keys(props.models).length !== 0
    ) {
      onChangeFiltersValue(generateValuesChipsFilter({
        filters: props.filters,
        dataList: {
          cities: props.cities,
          brands: props.brands,
          models: props.models
        }
      }))
    }
  }, [isGettingAllData, props.filters, props.models])

  useEffect(() => {
    const total = generateCountFiltered(props.filters)
    if (total !== 0) {
      genValueChips()
    } else {
      onChangeFiltersValue({})
    }
  }, [props.filters])

  const deleteFilter = (key) => props.onChangeFilters({[key]: key === 'brands' || key === 'cities' ? [] : ''})

  return <>
    {
      Object.keys(filtersValue)
        .map(key =>
          <Chips
            className={'ms-2'}
            key={key}
            isActive={true}
            after={<div onClick={() => deleteFilter(key)} className="d-flex align-items-center"><Icon
              type={'closeCircle1'} className={'text-16'}/></div>}
            label={filtersValue[key]}/>
        )
    }
  </>
}

const mapStateToProps = (state, ownProps) => ({
  filters: state[schemaStoreFilter[findPath(ownProps.location.pathname)]?.state].list.filters,
  cities: state.ui.data.cities,
  brands: state[schemaStoreFilter[findPath(ownProps.location.pathname)]?.state].list.data.brands,
  models: state[schemaStoreFilter[findPath(ownProps.location.pathname)]?.state].list.data.models
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeFilters: (data) => dispatch(schemaStoreFilter[findPath(ownProps.location.pathname)]?.onChange(data)),
  onGettingBrands: (data) => dispatch(schemaStoreFilter[findPath(ownProps.location.pathname)]?.onGettingBrands(data)),
  onGettingCities: () => dispatch(onGettingCities()),
  onGettingModels: (data) => dispatch(schemaStoreFilter[findPath(ownProps.location.pathname)]?.onGettingModels(data))
})

const areEqual = (prevProps, nextProps) =>
  deepEqual(prevProps.filters, nextProps.filters) &&
  prevProps.cities === nextProps.cities &&
  prevProps.brands === nextProps.brands &&
  deepEqual(prevProps.models, nextProps.models)

export default withLocation(connect(mapStateToProps, mapDispatchToProps)(React.memo(FilterChips, areEqual)))

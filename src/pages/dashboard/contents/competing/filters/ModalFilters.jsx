import React, {useEffect, useState} from 'react'
import styled                       from 'styled-components'
import {connect}                    from 'react-redux'

import Modal                              from 'src/ui-kit/modal/Modal'
import ui                                 from 'src/assets/dictionaries/ui'
import {onGettingCities}                  from 'src/store/ui/actions/onGettingCities'
import {onGettingCategories}              from 'src/store/ui/actions/onGettingCategories'
import {findPath}                         from 'src/utility/utils'
import {withLocation}                     from 'src/utility/routerHooks'
import {generateCountFiltered}            from 'src/utility/helpers'
import {listChipsFilter, listRangeFilter} from './schemaListFilter'
import ChipsSelectedFilter                from './ChipsSelectedFilter'
import BrandModelFilter                   from './BrandModelFilter'
import SwitchFilter                       from './SwitchFilter'
import RangeFilter                        from './RangeFilter'
import schemaStoreFilter                  from './schemsStoreFilter'

const Break = () => <div className="mx-4 border border-charcoal-100"/>

const ModalFilters = ({isOpen, onCloseModal, ...props}) => {
  const [typeMode, onChangeTypeMode] = useState()
  const [filters, onChangeFilters] = useState(schemaStoreFilter[findPath(props.location.pathname)]?.initialStateFilter)
  const [totalFilter, onChangeTotalFilter] = useState()
  const [openModalModelBrand, onChangeOpenModalBrand] = useState(false)
  const [path, onChangePath] = useState(findPath(props.location.pathname)?.[0])
  const onChangeTypeModel = (key) => onChangeTypeMode(key)

  const onChangeSelectChip = (value, key, multiSelect) => {
    onChangeFilters(prevState => {
      const prevFilter = prevState[key]
      let newFilter
      const hasValue = prevFilter.find(item => item === value)
      if (hasValue) {
        newFilter = prevFilter.filter(item => item !== value)
      } else {
        newFilter = multiSelect ? [...prevFilter, value] : [value]
      }
      return ({...prevState, [key]: newFilter})
    })
  }

  const handleChangeFilters = (updateData) =>
    onChangeFilters(prevState => ({...prevState, ...updateData}))

  const onSubmitFilters = () => {
    props.onChangeFilters(filters)
    onCloseModal()
  }

  const resetFilters = () => {
    props.onChangeFilters(schemaStoreFilter[findPath(props.location.pathname)]?.initialStateFilter)
  }

  useEffect(() => {
    if (isOpen) {
      props.onGettingCities()
    }
  }, [isOpen])


  useEffect(() => onChangeTotalFilter(generateCountFiltered(filters))
    , [filters])

  useEffect(() => {
    if (isOpen) {
      onChangeFilters(props.filters)
    }
  }, [props.filters, isOpen])

  useEffect(() => {
    onChangePath(findPath(props.location.pathname)?.[0])
  }, [props.location.pathname])

  return <Modal openModal={isOpen}
                closeModal={onCloseModal}
                postion={'bottom'}
                forceStyleContent={{maxHeight: '85vh'}}
                title={ui.filter.modal.title}
  >
    <MainModalFilters className={`position-relative ${path === 'inventory'
                                                      ? 'modal-filter--inventory'
                                                      : ''}`}>
      {
        listChipsFilter.map(chips_filter_item => !chips_filter_item.disable && <div key={chips_filter_item.key}>

            <ChipsSelectedFilter
              label={chips_filter_item.label}
              icon={chips_filter_item.icon}
              list={props.data[chips_filter_item.key] || []}
              handleSelect={(e) => onChangeSelectChip(e, chips_filter_item.key, chips_filter_item.multiSelect)}
              active={filters[chips_filter_item.key]}
            />
            <Break/>
          </div>
        )
      }
      <div onClick={() => !openModalModelBrand && onChangeOpenModalBrand(true)}>
        <BrandModelFilter values={{
          brands: filters.brands,
          categories: filters.categories
        }} openModal={openModalModelBrand}
                          handleChangeModal={onChangeOpenModalBrand}
                          handleChangeFilters={handleChangeFilters}
        />
      </div>
      <Break/>
      {
        listRangeFilter.map(range_filter_item => !range_filter_item.disable && <div key={range_filter_item.key}>
            <RangeFilter
              typeRange={range_filter_item.key}
              label={range_filter_item.label}
              icon={range_filter_item.icon}
              list={range_filter_item.list}
              inputType={range_filter_item.inputType}
              from={{
                label: range_filter_item.from.label,
                value: filters[range_filter_item.from.keyFilter]
                       ? parseInt(filters[range_filter_item.from.keyFilter])
                       : ''
              }}
              to={{
                label: range_filter_item.to.label,
                value: filters[range_filter_item.to.keyFilter] ? parseInt(filters[range_filter_item.to.keyFilter]) : ''
              }}
              childrenHeader={
                range_filter_item.childrenHeader &&
                React.cloneElement(
                  range_filter_item.childrenHeader,
                  {handleChange: onChangeTypeModel, activeKey: typeMode}
                )
              }
              typeMode={typeMode}
              handleChange={handleChangeFilters}
            />
            <Break/>
          </div>
        )
      }


      {path === 'inventory' && <SwitchFilter icon={'crown'}
                                             label={ui.filter.best}
                                             name="best_condition"
                                             className="mx-4 py-3"
                                             isChecked={filters.best_condition}
                                             handleChange={(e) => handleChangeFilters({[e.name]: e.isChecked})}/>}
      <div className="bg-white action-bar d-flex w-desktop position-fixed left-0 right-0 bottom-0">
        <button className="btn bg-yellow-orange  text-16 text-white radius-4" onClick={onSubmitFilters}>
          {ui.filter.modal.submit_filter} {totalFilter ? `(${totalFilter})` : ''}
        </button>
        <button className="btn border border-charcoal-400 text-16 text-charcoal-600" onClick={resetFilters}>
          {ui.filter.modal.delete_filter}
        </button>
      </div>
    </MainModalFilters>

  </Modal>
}

const mapStateToProps = (state, ownProps) => ({
  filters: state[schemaStoreFilter[findPath(ownProps.location.pathname)]?.state].list.filters,
  data: state.ui.data
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeFilters: (data) => dispatch(schemaStoreFilter[findPath(ownProps.location.pathname)]?.onChange(data)),
  onGettingCities: () => dispatch(onGettingCities()),
  onGettingCategories: () => dispatch(onGettingCategories())
})

export default withLocation(connect(mapStateToProps, mapDispatchToProps)(ModalFilters))

ModalFilters.defaultProps = {
  isOpen: false,
  onCloseModal: () => {}
}

const MainModalFilters = styled.div`
  padding-bottom: 50px;

  &.modal-filter--inventory {
    padding-bottom: 100px;
  }

  .action-bar {
    padding: 12px 16px 24px 16px;
    gap: 8px;
    z-index: 10;

    .btn {
      padding: 10px 0;
      flex-grow: 1;
    }
  }
`

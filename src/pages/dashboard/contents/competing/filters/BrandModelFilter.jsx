import React, {useCallback, useEffect, useState} from 'react'
import styled                                    from 'styled-components'
import {connect}                                 from 'react-redux'

import Icon               from 'src/ui-kit/Icon'
import ui                 from 'src/assets/dictionaries/ui'
import {findPath}         from 'src/utility/utils'
import Loading            from 'src/components/loading/Loading'
import ModalPage          from 'src/ui-kit/modal-page/ModalPage'
import {deepEqual}        from 'src/utility/helpers'
import {withLocation}     from 'src/utility/routerHooks'
import schemaStoreFilter  from './schemsStoreFilter'
import LabelFilter        from './LabelFilter'
import {searchBrandModel} from './searchBrandModel'
import InputSearch        from './InputSearch'


const CountFilteredModel = ({count}) => count !== 0 &&
  <span className="text-yellow-orange text-12 me-2">({count})</span>

const updateBrands = (prevState, id) => {
  const prevBrand = prevState.brands
  let newBrands
  const hasValue = prevBrand.find(item => item.id === id)
  if (hasValue) {
    newBrands = prevBrand.filter(item => item.id !== id)
  } else {
    newBrands = prevBrand.concat({id, models: []})
  }
  return newBrands
}


const BrandModelFilter = ({openModal, handleChangeModal, handleChangeFilters, values, ...props}) => {

  const [isOpenAccordion, onToggleIsOpenAccordion] = useState()
  const [brands, onChangeBrands] = useState([])
  const [models, onChangeModels] = useState()
  const [searchType, onChangeSearchType] = useState('')
  const [newValues, onChangeNewValues] = useState(values)
  const getData = useCallback(() => {
    if (openModal && brands.length === 0) {
      props.onGettingBrands()
    }
  }, [openModal])

  useEffect(() => {
    if (!openModal) {
      onChangeNewValues(values)
      onToggleIsOpenAccordion()
    }
  }, [openModal])

  const handleOpenModel = (brand_url_slug) => {
    onToggleIsOpenAccordion(isOpenAccordion !== brand_url_slug && brand_url_slug)
    if (models && models[brand_url_slug]) return
    props.onGettingModels({brand_url_slug})
  }

  const onSelectBrand = (e, id) => {
    e.stopPropagation()
    onChangeNewValues(prevState => ({...prevState, brands: updateBrands(prevState, id)}
    ))
  }

  const onSelectModel = (e, model_id, brand_id, brand_url_slug) => {
    e.stopPropagation()
    const newBrands = updateModels({prevBrands: newValues.brands, model_id, brand_id, brand_url_slug})

    if (!deepEqual(newValues.brands, newBrands)) {
      onChangeNewValues(prevState => ({
          ...prevState,
          brands: newBrands
        })
      )
    }
  }

  const updateModels = useCallback(({prevBrands, model_id, brand_id, brand_url_slug}) => {
    let hasBrands = false
    let removeBrand
    let newValue = prevBrands.map((brandItem) => {
      if (brandItem.id === brand_id) {
        let newValueModel = []
        hasBrands = true
        const hasModel = brandItem.models.find(item => item === model_id)

        if (hasModel) {
          newValueModel = brandItem.models.filter(item => item !== model_id)
          if (newValueModel.length === 0) {
            removeBrand = brand_id
          }
        } else if (brandItem.models.length !== models[brand_url_slug]?.length) {

          if (brandItem.models.length === 0) {
            if (models[brand_url_slug]?.length === 1) {
              removeBrand = brand_id
            }
            models[brand_url_slug].forEach(item => {
              if (item.id !== model_id) {
                newValueModel.push(item.id)
              }
            })
          } else {
            newValueModel = [...brandItem?.models, model_id]
          }
        }

        if (!removeBrand) {
          return {id: brand_id, models: newValueModel.length === models[brand_url_slug]?.length ? [] : newValueModel}
        }
      } else {
        return brandItem
      }
    })

    if (removeBrand) {
      newValue = prevBrands.filter(item => item.id !== removeBrand)
    } else if
    (!hasBrands) {
      newValue = [...prevBrands].concat({
        id: brand_id,
        models: models[brand_url_slug]?.length === 1 ? [] : [model_id]
      })
    }
    return newValue
  }, [models])

  const onChangeSearch = (e) => onChangeSearchType(e.target.value)

  const onSubmitBrandModel = () => {
    handleChangeFilters(newValues)
    handleChangeModal(false)
  }

  useEffect(() => getData(), [openModal])

  useEffect(() => {
    const newData = searchBrandModel(props.brands || [], props.models || [], searchType)
    onChangeBrands(newData.brands)
    onChangeModels(newData.models)
  }, [searchType])

  useEffect(() => onChangeBrands(props.brands), [props.brands])

  useEffect(() => onChangeModels(props.models), [props.models])

  return <div
    className="d-flex px-4 pointer py-3 justify-content-between">
    <LabelFilter label={ui.filter.brandAndModel} icon="car2Selected"
    />
    <Icon className={'text-yellow-orange'}
          type={'arrowSquareLeft'}/>
    {openModal && <ModalPage header={{title: ui.filter.brandAndModel, close: () => handleChangeModal(false)}}>
      <MainModal className="py-4 position-relative h-100 overflow-hidden">
        <div className="search-box w-desktop px-4 position-fixed">
          <InputSearch placeholder={ui.filter.search}
                       onChange={onChangeSearch}
                       value={searchType}
          />
        </div>
        <ul className="main--brand-model-filter d-flex flex-column overflow-auto px-4 m-0">
          {
            !props.is_getting_brands ? brands?.length === 0 ?
                                       <li className="text-center text-charcoal-800 mt-3">
                                         {ui.filter.not_found_search}
                                       </li>
                                                            : brands.map(brandItem =>
                                         <li key={brandItem.id}

                                             className="main--brand-model-filter--item m-0 pointer border-bottom py-3 border-charcoal-100 ">
                                           <div className="d-flex align-items-center justify-content-between"
                                                onClick={() => handleOpenModel(brandItem.url_slug)}>
                                             <div className="d-flex  align-items-center">
                                               <div className="d-flex" onClick={(e) => onSelectBrand(e, brandItem.id, brandItem.url_slug)}>
                                                 <Icon type={
                                                   newValues.brands.find(item => item.id === brandItem.id)
                                                   ? 'tickSquare2' : 'checkBoxEmpty'}/>
                                               </div>
                                               <span className="text-14 font-weight-bold text-black me-2 pe-1">{brandItem.title}</span>
                                               <CountFilteredModel
                                                 count={newValues.brands.find(item => item.id === brandItem.id)?.models.length || 0}/>
                                             </div>

                                             <Icon type={'arrowUp2'}
                                                   className={`text-charcoal-600 arrow-icon ${isOpenAccordion === brandItem.url_slug
                                                                                              ? 'arrow-icon-open'
                                                                                              : ''}`}/>
                                           </div>

                                           {isOpenAccordion === brandItem.url_slug && models?.[brandItem.url_slug]?.length !== 0 &&
                                             <ul className="d-flex flex-column mt-2">
                                               {models?.[brandItem.url_slug] ?
                                                models?.[brandItem.url_slug].map(item =>
                                                  <li key={item.id}
                                                      className="my-2 main--brand-model-filter--tree--item d-flex align-items-center">
                                                    <div onClick={(e) => onSelectModel(e, item.id, brandItem.id, brandItem.url_slug)}>
                                                      <Icon type={
                                                        newValues.brands.find(item => item.id === brandItem.id)
                                                          ?.models
                                                          .find(modelItem => modelItem === item.id) || newValues.brands.find(item => item.id === brandItem.id)
                                                          ?.models.length === 0
                                                        ? 'checkBox3' : 'checkBoxEmpty'}/>
                                                    </div>

                                                    <span className="text-14 text-black me-2 pe-1">
                                                      {item.title}
                                                    </span>
                                                  </li>)
                                                                             :

                                                <Loading/>
                                               }
                                             </ul>}
                                         </li>)
                                     : <Loading fullScreen/>
          }
        </ul>
        <div className="btn-submit w-desktop position-fixed bg-white pt-2 px-4">
          <button
            className="btn w-100 radius-4 bg-yellow-orange text-white"
            onClick={onSubmitBrandModel}>{ui.filter.actions_car} {(newValues.brands?.length > 0) && `(${(newValues.brands.length)})`}</button>
        </div>
      </MainModal>

    </ModalPage>}
  </div>
}

BrandModelFilter.defaultProps = {
  isDisable: true
}


const mapStateToProps = (state, ownProps) => ({
  brands: state[schemaStoreFilter[findPath(ownProps.location.pathname)]?.state].list.data.brands,
  models: state[schemaStoreFilter[findPath(ownProps.location.pathname)]?.state].list.data.models,
  is_getting_brands: state[schemaStoreFilter[findPath(ownProps.location.pathname)]?.state].list.data.is_getting_brands
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onGettingBrands: (data) => dispatch(schemaStoreFilter[findPath(ownProps.location.pathname)]?.onGettingBrands(data)),
  onGettingModels: (data) => dispatch(schemaStoreFilter[findPath(ownProps.location.pathname)]?.onGettingModels(data))
})

export default withLocation(connect(mapStateToProps, mapDispatchToProps)(BrandModelFilter))

const MainModal = styled.div`
  .search-box {
    background: white;
    z-index: 2;
    width: 100%;
    margin-top: -1.5rem !important;
  }

  .btn-submit {
    bottom: 24px;
    width: 100%;
  }


  .main--brand-model-filter {
    padding-top: 72px;
    padding-bottom: 140px;
    height: 100vh;
    @media all and (display-mode: browser) {
      height: calc(100vh - 200px);
      padding-bottom: 30px;
    }

    display: block;

    .main--brand-model-filter--item {
      &:last-child {
        border-bottom: none !important;
      }

      .arrow-icon {
        font-size: 20px;
        transition: transform 0.2s;
        transform: rotate(180deg);

        &.arrow-icon-open {
          transform: rotate(0deg);
        }
      }

      .main--brand-model-filter--tree--item {
        &:last-child {
          margin-bottom: 0 !important;
        }
      }
    }
  }
`

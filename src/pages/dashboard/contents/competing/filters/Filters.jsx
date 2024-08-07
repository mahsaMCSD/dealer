import React, {useCallback, useEffect, useState} from 'react'
import styled                                    from 'styled-components'
import {useLocation, useNavigate}                from 'react-router-dom'
import {connect}                                 from 'react-redux'

import Chips                                                 from 'src/ui-kit/chips/Chips'
import ui                                                    from 'src/assets/dictionaries/ui'
import Icon                                                  from 'src/ui-kit/Icon'
import {convertFilterForUrL, convertUrlForFilter, deepEqual} from 'src/utility/helpers'
import {findPath}                                            from 'src/utility/utils'
import {withLocation}                                        from 'src/utility/routerHooks'
import ModalFilters                                          from './ModalFilters'
import FilterChips                                           from './FilterChips'
import schemaStoreFilter                                     from './schemsStoreFilter'

const Filters = (props) => {
  const history = useNavigate()
  const location = useLocation()

  const [isOpen, onToggleIsOpen] = useState(false)
  const updateUrl = useCallback(() => {
    const prevUrl = convertFilterForUrL(props.filters)
    const params = decodeURIComponent(new URLSearchParams(prevUrl).toString())
    const search = `?${params}`
    if (search !== location.search) {
      history({search})
    }
  }, [props.filters])


  useEffect(() => {
    const newFilter = convertUrlForFilter(location.search.split('?')[1])
    if (!deepEqual({...props.filters, ...newFilter}, props.filters)) {
      props.onChangeFilters(newFilter)
    }
  }, [])

  useEffect(() => {
    updateUrl()
  }, [props.filters])

  return <MainFilters>
    <div className="d-flex flex-nowrap align-items-center overflow-auto">
      <Chips onClick={() => onToggleIsOpen(true)}
             className={'ms-2'}
             before={<Icon type={'filter1'} className={'text-18'}/>}
             label={ui.filter.label}
             theme={'darker'}/>
      <FilterChips/>

    </div>

    <ModalFilters isOpen={isOpen} onCloseModal={() => onToggleIsOpen(false)}/>
  </MainFilters>
}
const mapStateToProps = (state, ownProps) => ({
  filters: state[schemaStoreFilter[findPath(ownProps.location.pathname)]?.state].list.filters
})
const mapDispatchToProps = (dispatch, ownProps) => ({
  onChangeFilters: (data) => dispatch(schemaStoreFilter[findPath(ownProps.location.pathname)]?.onChange(data))
})

const areEqual = (prevProps, nextProps) => deepEqual(prevProps.filters, nextProps.filters)


export default withLocation(connect(mapStateToProps, mapDispatchToProps)(React.memo(Filters, areEqual)))

const MainFilters = styled.div`
  margin: 12px 12px 12px 0;
`

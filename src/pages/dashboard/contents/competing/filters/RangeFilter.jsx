import React, {useCallback, useEffect, useState} from 'react'
import LabelFilter                               from './LabelFilter'
import styled                                    from 'styled-components'
import RangeSlider                               from 'src/ui-kit/range-slider/RangeSlider'
import {findValuesRange, generateValuesRange}    from 'src/utility/helpers'
import {filterSchema}                            from 'src/utility/consts'
import {schemaRangeFilter}                       from './schemaRangeFilter'
import MatInput                                  from 'src/ui-kit/mat-input/MatInput'


const RangeFilter = ({label, icon, from, to, typeRange, handleChange, typeMode, inputType, childrenHeader}) => {
  const [list, onChangeList] = useState([])
  const [valueRange, onChangeValueRange] = useState([-1, schemaRangeFilter[typeRange].length - 1])
  const [configRang, onChangeConfigRang] = useState()
  const createList = () => {
    switch (typeRange) {
      case 'year':
        const typeValue = typeMode || 'jalali'
        const min = filterSchema.year_from.initialValue[typeValue]
        const max = filterSchema.year_to.initialValue[typeValue]
        onChangeConfigRang({
          min,
          max,
          typeValue
        })
        handleChange({[`${typeRange}_from`]: from.value, [`${typeRange}_to`]: to.value})
        onChangeValueRange([from.value || min, to.value || max])
        break
      case 'price':
        onChangeConfigRang({
          min: 0,
          max: schemaRangeFilter[typeRange].length - 1
        })
        onChangeList(generateValuesRange(schemaRangeFilter[typeRange]))
        break
      case 'klm':
        onChangeConfigRang({
          min: 0,
          max: schemaRangeFilter[typeRange].length - 1
        })
        onChangeList(schemaRangeFilter[typeRange].list)
        break
      default:
        break
    }
  }

  const onChange = useCallback(() => {
    if (typeRange === 'price' || typeRange === 'klm') {
      const newValue = findValuesRange({
        value__from: from.value,
        value__to: to.value,
        length: schemaRangeFilter[typeRange]?.length,
        listValues: list
      })
      onChangeValueRange(newValue)
    } else {
      onChangeValueRange([from.value || configRang.min, to.value || configRang.max])
    }
  }, [typeRange, from, list, to, typeMode, configRang])


  const onChangeRange = useCallback((results) => {
      let value_to = ''
      let value_from = ''
      if (typeRange === 'price' || typeRange === 'klm') {
        if (list[results[1]] !== filterSchema[`${typeRange}_to`].initialValue) {
          value_to = list[results[1]]
        }
        if (list[results[0]] !== filterSchema[`${typeRange}_from`].initialValue) {
          value_from = list[results[0]]
        }
      } else {
        if (results[1] !== filterSchema[`${typeRange}_to`].initialValue[configRang.typeValue]) {
          value_to = results[1]
        }
        if (results[0] !== filterSchema[`${typeRange}_from`].initialValue[configRang.typeValue]) {
          value_from = results[0]
        }
      }
      handleChange({[`${typeRange}_from`]: value_from, [`${typeRange}_to`]: value_to})

    }, [typeRange, list, typeMode, configRang]
  )


  useEffect(() => {
    (list.length !== 0 || (typeRange === 'year' && configRang)) && onChange()
  }, [from.value, to.value, list])


  useEffect(() =>
      createList()
    , [typeMode])


  return <MainRangeFilter>
    <div className="d-flex justify-content-between align-items-center">
      <LabelFilter label={label} icon={icon}/>
      {childrenHeader}
    </div>

    {configRang && <RangeSlider allowCross={false}
                                reverse={true}
                                value={valueRange}
                                min={configRang.min}
                                max={configRang.max}
                                step={1}
                                onChange={onChangeRange}
    />}

    <div className={'d-flex inputs'}>

      <div className="w-100">
        <MatInput label={from.label}
                  type={inputType}
                  disabled
                  value={from.value}/>
      </div>

      <div className="w-100">
        <MatInput
          type={inputType}
          disabled
          value={to.value} label={to.label}
        />
      </div>

    </div>
  </MainRangeFilter>
}

RangeFilter.defaultProps = {
  label: '',
  icon: '',
  from: {
    label: ''
  },
  to: {
    label: ''
  },
  onChange: () => {},
  typeMode: ''
}

export default RangeFilter

const MainRangeFilter = styled.div`
  padding: 18px 24px;

  .inputs {
    gap: 8px;
  }
`

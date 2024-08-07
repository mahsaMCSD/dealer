import {useEffect, useState} from 'react'

import schemaKeyFiltersServer from '../pages/dashboard/contents/competing/filters/schemaKeyFiltersServer'
import schemaFilterChips      from '../pages/dashboard/contents/competing/filters/shemaFilterChips'
import Formatter              from './Formatter'
import {progressType}         from './consts'

export function getHighAndLowTurnover (type) {
  switch (type) {
    case 0:
      return '-'
    case 1:
      return '+'
  }

}

export function encodeQueryData (data) {
  const ret = []
  for (let d in data) {
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
  }
  return ret.join('&')
}

export function getPercentTwoNumber (start, end) {
  return (end * 100) / start
}

export function getBase64 (file, cb) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    cb(reader.result)
  }
  reader.onerror = function (error) {
    console.log('Error: ', error)
  }
}

export function bytesToSize (bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return '0 Byte'
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

export const defineSaywhoPrototype = () => {
  navigator.sayswho = (function () {
    var ua = navigator.userAgent
    var tem
    var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || []
      return 'IE ' + (tem[1] || '')
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
      if (tem != null) {
        return tem.slice(1)
          .join(' ')
          .replace('OPR', 'Opera')
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
    return [...M, navigator.vendor.split(' ')[0]].join(' ')
  })()
}

export function generateValuesRange ({step, minimum, length}) {
  let counter = 0
  const list = []
  let total = minimum
  for (let i = 0; i < length; i++) {
    counter = step[i] ? step[i] : counter
    total = total + counter
    list.push(total)
  }
  return list
}


export function findValuesRange ({value__from, value__to, listValues, length}) {
  let index__lte
  let index__gte
  if (value__to && listValues && listValues.includes(value__to)) {
    index__lte = listValues.findIndex((item) => item === value__to)
  }
  if (value__from && listValues && listValues.includes(value__from)) {
    index__gte = listValues.findIndex((item) => item === value__from)
  }
  return [index__gte !== undefined ? index__gte : -1, index__lte !== undefined ? index__lte : length]
}

export function convertParamsFilter (filters) {
  let newFilters = {}
  Object.keys(filters)
    .map((key) => {
      if ((
        typeof filters[key] === 'object' ? filters[key].length !== 0 : filters[key]
      ) && schemaKeyFiltersServer[key]) {

        let newValue = ''
        let models = []

        if (key === 'brands') {
          newValue = filters[key].map(brandItem => {
              models = [...models, ...brandItem.models]
              return brandItem.id
            })
            .join(',')

        } else if (typeof filters[key] === 'object') {
          newValue = filters[key].map(brandItem => brandItem)
            .join(',')
        } else {
          newValue = filters[key]
        }

        newFilters = {
          ...newFilters,
          [schemaKeyFiltersServer[key]]: newValue
        }

        if (models.length !== 0) {
          newFilters = {...newFilters, [schemaKeyFiltersServer.models]: models.join(',')}
        }

      }
    })
  return newFilters
}

export const showCardNumber = (number) => {
  return number.toString()
    .replace(/\B(?=(\d{4})+(?!\d))/g, '-')
}

export const showIban = (number) => {
  return number.toString()
    .replace(/\B(?=(\d{4})+(?!\d))/g, ' ')
}

function isObject (object) {
  return object != null && typeof object === 'object'
}

export function deepEqual (object1, object2) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)
  if (keys1.length !== keys2.length) {
    return false
  }
  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false
    }
  }
  return true
}

export function generateValuesChipsFilter ({filters, dataList}) {
  let newData = {}
  Object.keys(filters)
    .map(key => {
      const value = filters[key]
      if (filters[key] && schemaFilterChips[key]) {
        const {type, data, valueChip} = schemaFilterChips[key]

        if (key === 'brands') {
          let newValue = []
          dataList[data]?.forEach(dataItem =>
            value.forEach(valItem => {
              let valueModel = ''
              if (parseInt(valItem?.id) === dataItem.id || valItem === dataItem.id) {
                if (valItem?.models?.length !== 0) {
                  const findTitleEnBrand = dataList.brands.find(brandItem => brandItem.id === parseInt(valItem.id))?.title_en
                  valueModel = findTitleEnBrand &&
                    dataList.models[findTitleEnBrand.toLocaleLowerCase()]?.filter(dataItem =>
                        valItem.models.find(itemModel => itemModel === dataItem.id)
                      )
                      .map(item => item.title)
                      .join(' ,')
                }
                newValue = newValue.concat(`${dataItem.title} ${valueModel ? `(${valueModel})` : ''}`)
              }
            })
          )
          if (newValue.length !== 0) newData = {...newData, [key]: newValue.join(' ,')}
        } else {
          if (type === 'boolean') {
            newData = {...newData, [key]: valueChip}
          } else if (typeof value === 'object') {
            const newValue = dataList[data] && dataList[data].filter(dataItem =>
                value.find(valItem => parseInt(valItem) === dataItem.id)
              )
              .map(filterItem => filterItem.title)
              .join(', ')
            if (newValue) newData = {...newData, [key]: newValue}
          } else if (type === 'list') {
            const findData = dataList[data] && dataList[data].find(dataItem => dataItem.id === parseInt(value))?.title
            if (findData) newData = {...newData, [key]: findData}
          } else if (type === 'string_separator') {
            newData = {
              ...newData,
              [key]: new Formatter().commaSeparateNumber(value)
            }
          } else {
            newData = {...newData, [key]: value}
          }
        }
      }

    })
  return newData
}

export function convertFilterForUrL (filters) {
  let newFilters = {}
  Object.keys(filters)
    .forEach(key => {
      if (filters[key]) {
        if (key === 'brands' & filters[key].length !== 0) {
          newFilters = {...newFilters, [key]: JSON.stringify(filters[key])}
        } else if (typeof filters[key] === 'object') {
          if (filters[key].length !== 0) newFilters = {...newFilters, [key]: filters[key].join(',')}
        } else {
          newFilters = {...newFilters, [key]: filters[key]}
        }
      }
    })
  return newFilters
}

export function convertUrlForFilter (search) {
  let newFilters = {}
  const params = getQueryParamsObject(search)
  Object.keys(params)
    .forEach(key => {
      if (params[key]) {
        switch (key) {
          case 'brands':
            return newFilters = {...newFilters, [key]: JSON.parse(params[key])}
          case 'cities':
            return newFilters = {
              ...newFilters,
              [key]: params[key].split(',')
                .map(city => parseInt(city))
            }
          default:
            return newFilters = {...newFilters, [key]: params[key]}
        }
      }
    })

  return newFilters
}

export function getQueryParamsObject (search) {
  const urlParams = new URLSearchParams(search)
  return Object.fromEntries(urlParams.entries())
}


export function generateCountFiltered (filters) {
  return Object.values(filters)
    .reduce((previousValue, currentValue) => previousValue + (currentValue ? (typeof currentValue === 'object'
                                                                              ? currentValue.length
                                                                              : 1) : 0)

      , 0)
}

const getOrientation = () =>
  window.screen?.orientation?.type

export const useScreenOrientation = () => {
  const [orientation, setOrientation] =
    useState(getOrientation())

  const updateOrientation = event => {
    setOrientation(getOrientation())
  }

  useEffect(() => {
    window.addEventListener(
      'orientationchange',
      updateOrientation
    )
    return () => {
      window.removeEventListener(
        'orientationchange',
        updateOrientation
      )
    }
  }, [])

  return orientation
}

export const ios = () => {
  return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
}
export const checkType = (type) => {
  switch (type) {
    case progressType?.secondPrepayment :
      return 'bg-yellow'
      break
    case progressType?.prepayment:
      return 'bg-yellow-orange'
      break
    case progressType?.payment:
      return 'bg-green-dark'
    default:
      break
  }
}

import React     from 'react'
import PropTypes from 'prop-types'
import Ui        from 'src/assets/dictionaries/ui'

const InspectionItem = ({data}) => {
  return (<div className='box-shadow  p-3 pt-4'>
    <div className='d-flex justify-content-between mb-3'>
      <h6 className='text-purple text-16 font-weight-bold mb-0 text-right d-flex'>
        {data.car_properties.brand} | {data.car_properties.model} | <span className="me-1"> {data.car_properties.year} </span>
      </h6>
      <h6 className='text-black text-14 mb-0'>{data.car_properties.trim}</h6>
    </div>
    <div className='d-flex justify-content-between right-0 left-0 bottom-0 pt-2 pb-2'>
      <h6 className='text-black text-14 mb-0 text-right d-flex'>{Ui.center}: {data.branch.city} | {data.branch.branch}</h6>
      <h6 className='text-black text-14 mb-0'>{data.klm} {Ui.km}</h6>
    </div>
  </div>)
}

InspectionItem.prototype = {
  data: PropTypes.object.isRequired
}
export default InspectionItem

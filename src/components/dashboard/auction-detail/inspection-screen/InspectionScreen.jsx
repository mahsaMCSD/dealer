import React                     from 'react'
import PropTypes                 from 'prop-types'
import Ui                        from 'src/assets/dictionaries/ui'
import Icon                      from 'src/ui-kit/Icon'
import InspectionReportComponent from '../inspection-report-component/InspectionReportComponent.jsx'

import InspectionModal                                      from './InspectionModal'
import {inspectionReportCarBodyDotsPosition, parseRefsDots} from '../../../../utility/inspectionFormatters'
import Loading                                              from '../../../loading/Loading'
import {connect}                               from 'react-redux'
import onGettingInspectionComments
  from '../../../../store/car/actions/onGettingInspectionComments'

const styles = {
  card: {
    borderRadius: '2rem 2rem 0 0'
  },
  no_problem: {
    transform: 'translate(-50%, -50%)',
    background: 'rgba(255, 255, 255, 0.6)'
  }
}

const Dot = ({styles, backgroundColor, onClick}) =>
  <span className='inspection-point pointer'
        onClick={onClick}
        style={{...styles, backgroundColor: backgroundColor || '#000000'}}/>

const Comments = ({additional_images, onSelectDot, onChangeIndexSelected}) => {
  const onClickTitle = (images, index) => {
    onChangeIndexSelected(index)
    onSelectDot(images)
  }
  return Object.values(additional_images)
    .map((item, i) =>
      <div className='p-2' key={i}>
        <h5 className='text-purple text-16 font-weight-bold mb-2 pe-2'> {item.title}</h5>
        <div className='px-3'>
          {item.questions.map((item2, index) => {
            return (
              <h6 className='text-right m-1 lh-base small d-flex align-items-center w-100 pointer text-12' key={item2.id}
                  style={{color: '#' + item2.color}}
                  onClick={() => (item.title === 'بدنه + لاستیک' || item.title === 'سیستم برقی + داخلی' || item.title === 'موتور') && onClickTitle(
                    item.questions,
                    index
                  )}>
                <Icon type={'infoCircle'} className='h3 text-18 ps-1 mb-0' style={{color: '#' + item2.color}}/>
                <span className="d-inline-block w-100">
                  {item2.title}
              </span>

              </h6>
            )
          })}
        </div>
      </div>
    )
}
const handlePropertyOnCar = (is_problem, carImageInfo, onSelectDot) => {
  if (!is_problem) {
    return <div className="position-absolute border rounded p-2 top-50 left-50
                text-12 text-success border-2 border-success text-nowrap" style={styles.no_problem}>
      {Ui.this_car_has_not_problem}
    </div>
  }
  if (carImageInfo.carBody) {
    const carDotKeys = Object.keys(carImageInfo.carBody)
    if (carDotKeys.length > 0) {
      return <>
        {carDotKeys.map(key =>
          <Dot key={carImageInfo.carBody[key][0].id}
               backgroundColor={`#${carImageInfo.carBody[key][0].color}`}
               styles={inspectionReportCarBodyDotsPosition[key]}
               onClick={() => onSelectDot(carImageInfo.carBody[key])}/>
        )}
      </>
    } else {
      return <div className="position-absolute border rounded p-2 top-50 left-50
                text-12 text-blue border-2 border-blue text-nowrap" style={styles.no_problem}>
        {Ui.this_car_has_not_color}
      </div>
    }
  }
}

const InspectionScreen = React.memo(({inspectionId, carTitle, inspectionComments,onGettingInspections}) => {
  const [selectedDot, onSelectDot] = React.useState(null)
  const [indexSelected, onChangeIndexSelected] = React.useState(0)

  const onSelectedDotOfImage = (data) => {
    onChangeIndexSelected(0)
    onSelectDot(data)
  }
  React.useEffect(()=>{
    onGettingInspections()
  },[])
  return <div className='px-2 pb-2'>
    {inspectionComments ?

     <>
       < div className='col-12 border pb-2 my-3 border-gray bg-gray' style={styles.card}>
         <h6 className='font-weight-bold text-14 text-purple mb-0 text-right p-3'>{Ui.car_style_problem}</h6>
         <div className='car-details' style={{backgroundColor: 'white', alignItems: 'center'}}>
           <div className='car-image-box position-relative'>
             {handlePropertyOnCar(
               inspectionComments.is_problem,
               inspectionComments.parseRefsDots,
               onSelectedDotOfImage
             )}
             <InspectionModal carTitle={carTitle}
                              onSelectDot={onSelectDot}
                              startIndex={indexSelected}
                              selectedDot={selectedDot}/>
           </div>
         </div>
       </div>

       {inspectionComments.is_problem &&
       <div className='col-12 border mb-2 border-gray bg-gray' style={styles.card}>
         <h6 className='font-weight-bold text-14 text-purple mb-0 text-right p-3'>{Ui.more_shortcomings}</h6>
         <div className='bg-white'>
           <Comments additional_images={inspectionComments.additional_images} onSelectDot={onSelectDot}
                     onChangeIndexSelected={onChangeIndexSelected}/>
         </div>
       </div>}

       <div className='col-12 border mb-2 border-gray bg-gray' style={styles.card}>
         <h6 className='font-weight-bold mb-0 text-14 text-purple text-right p-2 pe-3'>{Ui.bachelor_details}</h6>
         <div className='bg-white'>
           <InspectionReportComponent inspection_details={inspectionComments.inspection_details}
                                      ratings={inspectionComments.ratings} id={inspectionId}/>
         </div>
       </div>
     </>
                        : <Loading fullScreen/>
    }
  </div>
})
const mapStateToProps = state => ({
  inspectionComments: state.car.inspectionComments
})
const mapDispatchToProps = (dispatch,ownProps) => ({
  onGettingInspections: () => dispatch(onGettingInspectionComments(ownProps.inspectionId))
})


export default connect(mapStateToProps,mapDispatchToProps)(InspectionScreen)
InspectionScreen.defaultProps = {
  additional_images: {},
  carImageInfo: {}
}
InspectionScreen.prototype = {
  segments: PropTypes.object,
  inspectionComments: PropTypes.shape({
    additional_images: PropTypes.object.isRequired,
    ratings: PropTypes.object.isRequired,
    positive_comments: PropTypes.object.isRequired,
    parseRefsDots: PropTypes.object.isRequired,
    inspection_details: PropTypes.object.isRequired,
    car_properties: PropTypes.object.isRequired,
    inspection_date: PropTypes.object.string,
    is_problem: PropTypes.bool.string
  })
}

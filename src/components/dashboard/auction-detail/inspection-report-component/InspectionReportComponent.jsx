import React, {useState, useEffect} from 'react'
import {useDispatch}                from 'react-redux'
import PropTypes                    from 'prop-types'
import ReactStars                   from 'react-rating-stars-component'

import Icon                     from 'src/ui-kit/Icon'
import Loading                  from 'src/components/loading/Loading'
import {changePreviewedDetails} from 'src/store/car/actions/actionCreators'

const styles = {
  segmentItem: {
    borderWidth: '0px 0px 1px'
  }
}
const secondExample = {
  size: 20,
  count: 5,
  a11y: true,
  rtl: false,
  isHalf: true,
  activeColor: '#f7b500',
  emptyIcon: <Icon type="star"/>,
  halfIcon: <Icon type="starHalfEmpty"/>,
  filledIcon: <Icon type="starEmpty" style={{color: '#6d7278'}}/>,
  edit: false
}
const InspectionReportComponent = ({inspection_details, ratings}) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    data: null
  })
  useEffect(() => {

    if (inspection_details) {
      const addProperty = Object.entries(inspection_details)
        .map(item => ({
          ...item[1],
          id: item[0],
          rating: ratings[item[0]],
          isOpen: false,
          data: []
        }))
      setState(prevState => ({...prevState, data: addProperty}))
    }
  }, [inspection_details])

  function renderAnswers (answers, show_icon, timesCircle) {
    if (!timesCircle) {
      if (answers === null && show_icon) {
        return <Icon type={'checkCircle'} className={'h4'}/>
      } else if (Array.isArray(answers)) {
        if (answers.length < 1) {
          return <Icon type={'timesCircle'} className={'h4 text-orange'}/>
        } else {
          return <div className={`${checkTypeArray(answers) === 'array object'
                                    ? 'border-bottom mb-3'
                                    : ''} `}>  {answers.map(item => typeof item === 'string' ? <span
            className="d-block text-red pe-2">{renderAnswers(item)}</span> : renderQuestion(item, 2))} </div>
        }
      } else {
        return answers
      }
    } else {
      return <Icon type={'timesCircle'} className={'h4 text-orange'}/>
    }
  }

  function checkTypeArray (val) {

    if (val.length > 0) {
      if (typeof val[0] === 'string') {
        return 'array string'
      } else if (typeof val[0] === 'object') {
        return 'array object'
      }
    }

  }

  function renderQuestion (question, level) {
    return question.title !== 'امتیاز' &&
      <div className={` ${level === 2 ? '' : 'border-gray-200 py-1 border-bottom'}`}>
        {question.title !== 'لاستیک' && <div className="row justify-content-between m-0">
          <div className={`${question.title === 'توضیحات' ? 'col-4' : 'col'}  `}>{renderTierTitle(question.title)}</div>
          <div className={`${question.title === 'توضیحات' ? 'col-8 text-purple' : 'col-auto'}  `}>
            {(!question.answers || question.answers.constructor.name === 'String'
              ? true
              : (question.answers.length < 1 || checkTypeArray(question.answers) === 'array string')) && renderAnswers(
              question.answers,
              question.title !== 'توضیحات' && level !== 2,
              question.answers && Array.isArray(question.answers) && checkTypeArray(question.answers) === 'array string'
            )}
          </div>
        </div>}
        {question.answers && Array.isArray(question.answers) && question.answers.length > 0 && renderAnswers(
          question.answers,
          true
        )}
      </div>

  }


  function renderTierTitle (val) {
    const title = 'لاستیک'
    switch (val) {
      case 'ز':
        return title + '(زاپاس)'

      case 'ج ش':
        return title + '(جلو شاگرد)'

      case 'ع ش':
        return title + '(عقب شاگرد)'

      case 'ع ر':
        return title + '(عقب راننده)'

      case 'ج ر':
        return title + '(جلو راننده)'
      default:
        return val
    }

  }

  const onClickSegment = (item) => {
    let obj = state.data.filter((i) => i.id === item.id)[0]
    obj.isOpen = !obj.isOpen
    setState(prevState => ({...prevState, data: state.data}))
    dispatch(changePreviewedDetails())
  }

  function renderSegment () {
    return state.data.filter((i) => i.id !== 12 && i.id !== 13)
      .map((item) =>
        <div key={item.id}>
          <div className="py-2 d-flex justify-content-between align-items-center pointer"
               style={styles.segmentItem}
               onClick={() => onClickSegment(item)}>
            <h6 className="text-purple text-14 mb-0 font-weight-bold">{item.title}</h6>
            <div className="d-flex text-left pointer">
              <span dir="rtl">
                 <ReactStars classNames="star-custom" value={5 - parseFloat(item.rating || 0)}
                             color={parseInt(item.rating) === 5 ? 'green' : '#f7b500'}  {...secondExample} />
              </span>
              <Icon type={item.isOpen ? 'angleDown' : 'angleLeft'} className={'h4'}/>
            </div>

          </div>
          {item.isOpen &&
            <div className="text-12 px-2" style={{margin: '0 -15px'}}>
              {item.questions.map((item) => renderQuestion(item))}
            </div>
          }
        </div>
      )
  }

  if (!state.data) {
    return (<div className="p-3"><Loading/></div>)
  } else {
    return (
      <div className="d-flex flex-column p-2">
        {renderSegment()}
      </div>
    )
  }
}
InspectionReportComponent.defaultProps = {
  id: '',
  ratings: {},
  inspection_details: {}
}
InspectionReportComponent.prototype = {
  id: PropTypes.string.isRequired,
  ratings: PropTypes.object.isRequired,
  inspection_details: PropTypes.object.isRequired
}

export default InspectionReportComponent


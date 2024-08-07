import React     from 'react'
import PropTypes from 'prop-types'
import pelakImg  from 'src/assets/images/est-pelak.png'
import Formatter from 'src/utility/Formatter'

const styles = {
  pelak: {
    position: 'relative',
    backgroundImage: `url(${pelakImg})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    maxWidth: '240px',
    height: '50px',
    display: 'inline-block'
  }
}

const AnswerTitle = ({title}) => <h6 className="text-right mb-0 text-purple text-14">{title}:</h6>

const RenderQuestion = ({question}) => {
  let _F = new Formatter()
  switch (question.title) {
    case 'گارانتی شرکتی':
      return (
        <div className="d-flex">

          <div className="col-6">
            <AnswerTitle title={question.title}/>
          </div>
          <div className="col-6">
            <h6 className="text-start mb-0 text-14 text-purple">
              {question.answers && question.answers.constructor.name === 'Array' && question.answers.length === 0
               ? 'بلی'
               : 'خیر'}
            </h6>
          </div>
        </div>
      )


    case 'پلاک':
      return (
        <div key={question.id} className="d-flex">
          <div className="col-4">
            <AnswerTitle title={question.title}/>

          </div>
          <div className="col-8 text-start">
            <div style={styles.pelak}>
                <span style={{left: '85%', top: '40%'}} className="app-text-default position-absolute text-14">
                  {
                    question.answers
                    ? <h6>{(question.answers.slice(0, 2) === ''
                            ? '**'
                            : _F.normalizeToFarsi(question.answers.slice(6, 8)))}</h6>
                    : '**'
                  }
                </span>

              <span style={{top: '25%', left: '53%'}} className="app-text-default text-14 position-absolute">
                                  ***
                                  </span>
              {
                question.answers
                ? <span style={{top: '25%', left: '40%'}} className="app-text-default text-14 position-absolute">
                                  {(question.answers.slice(0, 2) === ''
                                    ? '*'
                                    : _F.normalizeToFarsi(question.answers.slice(
                                      2,
                                      3
                                    )))}
                    </span>
                : <span style={{top: '25%', left: '40%'}}
                        className="app-text-default text-14 position-absolute">*</span>
              }
              <span style={{top: '25%', left: '20%'}} className="app-text-default text-14 position-absolute">
                                      **
                                   </span>
            </div>
          </div>

        </div>
      )
    default:
      return <div className="d-flex">

        <div className="col-6">
          <AnswerTitle title={question.title}/>
        </div>
        <div className="col-6">
          <h6 className="text-start mb-0 text-14 text-purple">
            {question.answers && question.answers.constructor.name === 'Array' && question.answers.length === 0
             ? 'خیر'
             : question.answers}
          </h6>
        </div>
      </div>
  }
}
RenderQuestion.defaultProps = {
  question: []
}
RenderQuestion.prototype = {
  question: PropTypes.arrayOf(
    PropTypes.shape({
      default: PropTypes.bool,
      id: PropTypes.number.isRequired,
      field_type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  )
}

export default RenderQuestion

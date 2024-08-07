import React, {useState} from 'react'
import ui                from 'src/assets/dictionaries/ui'
import './Faq.scss'

const Faq = () => {
  const [FAQActiveIndex, setFAQActiveIndex] = useState(-1)

  function openFAQ (index) {
    if (FAQActiveIndex === index) {
      setFAQActiveIndex(-1)
    } else {
      setFAQActiveIndex(index)
    }
  }

  return <div className="col-12 px-2">
    <div className="row pb-3 rounded justify-content-center align-items-center">
      <div>
        {ui.faq_section_questions.map((singleQuestion, index) =>
          <div className={`col-12 border border-gray shadow rounded ${index !== 0 && 'mt-2'} single-question-holder`} key={index}>
            <button className="row w-100 align-items-center p-3 justify-content-around
             question text-purple text-12 text-right font-weight-bold bg-white border-0"
                    onClick={() => openFAQ(index)}>
              <span className="col pe-0">{singleQuestion.question}</span>
              <div
                className={`col-auto p-0 position-relative`}>
                <div className={`plus-to-minus-sign d-flex align-items-center justify-content-center  bg-gray-300
                ${FAQActiveIndex === index ? 'active' : ''}`}>
                  <span className="sign sign-1"/>
                  <span className="sign sign-2 "/>
                </div>
              </div>
            </button>
            <div className={`answer ${FAQActiveIndex === index ? 'active' : ''}`}>
              <p className='text-10 text-purple-500'>{singleQuestion.answer}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
}

export default Faq

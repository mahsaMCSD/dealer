import React           from 'react'
import ui              from 'src/assets/dictionaries/ui'
import instruction1SVG from 'src/assets/images/dashboard/panel/introduction-section-1.svg'
import instruction2SVG from 'src/assets/images/dashboard/panel/introduction-section-2.svg'
import instruction3SVG from 'src/assets/images/dashboard/panel/introduction-section-3.svg'
import instruction4SVG from 'src/assets/images/dashboard/panel/introduction-section-4.svg'
import Inspection      from './Inspection'

const svgCollection = [instruction1SVG, instruction2SVG, instruction3SVG, instruction4SVG]

const headerSummaryStyle = {width: '100vw'}
const imageStyle = {width: '70px', height: '70px'}
const cardStyle = {border: '1px solid #dee2e6', borderTop: '8px solid #f05b27', borderRadius: '5px'}

const AboutUs = () => <>
  <div className="col-12 p-0">
    <div className="py-4 px-3 bg-purple" style={headerSummaryStyle}>
      <h2 className="mb-3 font-weight-bold text-14 ">
        <span className="text-orange">{ui.introduction_section.title.first_part}</span>
        <span className={'text-white'}>{ui.introduction_section.title.second_part}</span>
        <span className="text-orange">{ui.introduction_section.title.third_part}</span>
      </h2>
      <p className="text-white mb-0 text-14 line-height-20">
        {ui.introduction_section.text.first_part}
        {ui.introduction_section.text.second_part}
      </p>
    </div>
    <div className='row mt-5'>
      <div className="col-12">
        <div className="row justify-content-center mb-4 pe-3 ps-3">
          {
            ui.introduction_section.cards.map((card, index) =>
              <div className="col-12 d-flex flex-column align-items-center justify-content-center py-4 px-3 my-3 shadow"
                   style={cardStyle}
                   key={index}>
                <img className="p-4 bg-gray rounded" src={svgCollection[index]} style={imageStyle} alt=""/>
                <p className="text-center px-4 mt-4 text-18 line-height-30 text-purple font-weight-bold">{card.title}</p>
                <p className="text-center mt-5 text-15 mb-3 line-height-20 px-5">{card.description}</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  </div>
  <Inspection/>
</>
export default AboutUs

import React, {useEffect, useState} from 'react'
import styled                       from 'styled-components'

const ProgressBar = ({percentage}) => {

  const [deg, onChangeDeg] = useState({})

  useEffect(() => onChangeDeg({transform: `rotate(${parseInt(180 * percentage / 100)}deg)`}), [percentage])

  return <MainProgressBar className="position-relative custom-progress-bar">
    <div className="circle-out">
      <div className="circle-wrap">
        <div className="circle">
          <div className="mask full" style={deg}>
            <div className="fill" style={deg}></div>
          </div>
          <div className="mask half">
            <div className="fill" style={deg}></div>
          </div>
          <div className="inside-circle"></div>
        </div>
      </div>
    </div>
  </MainProgressBar>
}


export default ProgressBar

const MainProgressBar = styled.div`
  width: 12px;
  height: 12px;
  font-size: 16px !important;
  .circle-out {
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 7px;
    margin: 0 -4px;
    transform: scale(0.1);
  }
`

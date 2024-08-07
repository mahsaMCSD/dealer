import React, {useCallback, useEffect, useState} from 'react'
import styled                                    from 'styled-components'
import ui                                        from 'src/assets/dictionaries/ui'
import {checkType, getPercentTwoNumber}          from 'src/utility/helpers'
import PropTypes                                 from 'prop-types'
import useDownTime                               from 'src/utility/useDownTime'


const CountDownLine = ({valid_until, type}) => {
  const [timeForProgress, onChangeTimeForProgress] = useState()
  const timeCountDown = useDownTime(timeForProgress, true)

  const downTime = useCallback(() => {
    const timer = setInterval(
      () => onChangeTimeForProgress(prevState => prevState ? prevState - 1 : valid_until - 1),
      1000
    )
    if (valid_until === 0) {
      clearInterval(timer)
    }
  }, [valid_until])

  useEffect(() => {
    if (valid_until !== 0) {
      downTime()
    }
  }, [])
  return <CountDownProgress className="mt-2 pt-1 d-flex flex-column">
    {
      timeCountDown && timeCountDown !== '0:0' && <>
        <div className="d-flex justify-content-between">
          <h6 className="mb-1 text-black-600 text-12">
            {
              type === 1 ? ui.down_time_final_pay : ui.down_time
            }
          </h6>
          <h6 className="text-10 text-yellow-orange">
            {timeCountDown}
          </h6>
        </div>
        <div className="footer-order--progress d-flex justify-content-end bg-gray-300">
          <div className={`${checkType(type)} footer-order--progress--line d-flex position-relative`} style={{
            width: `${timeForProgress ? getPercentTwoNumber(600, timeForProgress) : 0}%`
          }}>
          </div>
        </div>
      </>
    }
  </CountDownProgress>
}


export default CountDownLine
CountDownLine.defaultProps = {
  valid_until: 0,
  timeCountDown: '',
  status: {}
}
CountDownLine.propTypes = {
  valid_until: PropTypes.number,
  timeCountDown: PropTypes.string,
  status: PropTypes.object

}
const CountDownProgress = styled.div`
  .footer-order--progress {
    border-radius: 2px;
    height: 3px;
    overflow: hidden;
  }

  .footer-order--progress--line {
    height: 100%;
  }

`

import {useEffect, useState} from 'react'
import moment                from 'moment'

export default function useDownTime (value, is_interval) {

  const [timeCountDown, onChangeTimeCountDown] = useState()

  useEffect(() => {

      let countdown = value


      const intervalCountDown = countdown && countdown >= 0 && setInterval(function () {

        --countdown
        onChangeTimeCountDown(`${moment.duration(countdown, 'seconds')
          // .hours()}:${moment.duration(count-down-time, 'seconds')
          .minutes()}:${moment.duration(countdown, 'seconds')
          .seconds()}`)

        if (!is_interval || countdown <= 0) {
          clearInterval(intervalCountDown)
        }

      }, 1000)


    }
    , [value])

  return timeCountDown
}
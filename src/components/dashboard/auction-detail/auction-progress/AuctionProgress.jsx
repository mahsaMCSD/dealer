import React       from 'react'
import moment      from 'moment-jalaali'
import PropTypes   from 'prop-types'
import ProgressBar from 'src/ui-kit/ProgressBar.'


const AuctionProgress = ({is_inventory, end, start}) => {

  function getPercent () {
    return dateDiff(end, start)
  }

  function size () {
    return  (dateDiffWithNow(end) * 100 / getPercent())
  }

  function sizeInventory () {
    return (end / start) * 100
  }

  function dateDiff (end, start) {
    return (
      (new Date(moment(new Date(end * 1000)) - moment(new Date(start * 1000))).getUTCSeconds()) +
      (new Date(moment(new Date(end * 1000)) - moment(new Date(start * 1000))).getUTCMinutes() * 60) +
      (new Date(moment(new Date(end * 1000)) - moment(new Date(start * 1000))).getUTCHours() * 3600))

  }

  function dateDiffWithNow (end) {
    return (
      (new Date(moment(new Date(end * 1000)) - moment(new Date(Date.now()))).getUTCSeconds()) +
      (new Date(moment(new Date(end * 1000)) - moment(new Date(Date.now()))).getUTCMinutes() * 60) +
      (new Date(moment(new Date(end * 1000)) - moment(new Date(Date.now()))).getUTCHours() * 3600))

  }

  return (
    <div>
      <ProgressBar percentage={is_inventory ? sizeInventory() : size()}/>
    </div>
  )
}
AuctionProgress.prototype = {
  end: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired
}

export default AuctionProgress
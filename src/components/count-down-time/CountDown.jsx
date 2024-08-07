import React, {Component} from 'react'

import moment     from 'moment-jalaali'
import ImgGallery from '../../ui-kit/ImgGallery'

class CountDownTimeComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dateTime: this.myFormatter(this.props.bidinfo.remaining_second
                                 ? this.props.bidinfo.remaining_second
                                 : this.props.bidinfo.times_left && this.props.bidinfo.times_left.counter),
      intervalId: null,
      isFinishedClient: false
    }
    this.updateDateTimeState = this.updateDateTimeState.bind(this)
  }

  componentDidMount () {
    var intervalId = setInterval(() => {
      var m = moment(`${this.state.dateTime}`, 'HH:mm:ss')
      if (m.format('HH:mm:ss') === '00:00:01' || m.format('HH:mm:ss') === '00:00:00') {
        this.setState({dateTime: '00:00:00'})
      } else {
        this.props.finished(false)
        this.setState({
          dateTime: m.subtract(1, 'seconds')
            .format('HH:mm:ss')
        })
      }
    }, 1000)
    this.setState({intervalId})
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId)
  }

  shouldComponentUpdate (nextProps) {
    if (JSON.stringify(nextProps.bidinfo) !== JSON.stringify(this.props.bidinfo)) {
      this.updateDateTimeState(nextProps.bidinfo)
    }
    return true
  }

  myFormatter (val) {
    let H = new Date(moment(new Date(val * 1000))).getUTCHours()
    let M = new Date(moment(new Date(val * 1000))).getUTCMinutes()
    let S = new Date(moment(new Date(val * 1000))).getUTCSeconds()

    let HH = H > 9 ? H : '0' + H
    let MM = M > 9 ? M : '0' + M
    let SS = S > 9 ? S : '0' + S

    return (HH + ':' + MM + ':' + SS)
  }

  updateDateTimeState (bidinfo) {
    const time = bidinfo.remaining_second ? bidinfo.remaining_second : bidinfo.times_left && bidinfo.times_left.counter
    if (time === 0) {
      clearInterval(this.state.intervalId)
    } else {
      this.setState({dateTime: this.myFormatter(time)})
    }
  }

  render () {
    const {days_left, counter} = this.props.bidinfo.times_left || {}
    return (
      this.props.bidinfo.remaining_second === 0 ? '' :
      <div style={this.props.style || {}} className={`app-text text-14 ${this.props.className}`}>
        {
          (this.props.is_inventory && !counter) ? `${days_left === 0 ? 'امروز' : `${days_left
                                                                                    ? days_left
                                                                                    : ''} روز `}   ` : moment(
            `${this.state.dateTime}`,
            'HH:mm:ss'
          )
            .format('HH:mm:ss')
        }
      </div>
    )
  }
}

export default CountDownTimeComponent

CountDownTimeComponent.defaultProps = {
  finished: () => {}
}

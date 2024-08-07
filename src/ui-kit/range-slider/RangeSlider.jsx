/**
 * Rc-slider is a library that is used for slider component.
 *
 * @external "rc-slider"
 * @see {@link https://github.com/react-component/slider/|rc-slider}
 */

/**
 * A Range slider, this component used slick library.
 *
 * @param {number} min - Min number of range slider.
 * @param {number} max - Max number of range slider.
 * @param {array} values - An array of values for range slider.
 * @param {function} onChangeValues - The function for toggle change event for slider.
 * @returns {object} A Range slider with desired value.
 */

import React     from 'react'
import Range     from 'rc-slider/lib/Slider'
import PropTypes from 'prop-types'
import styled    from 'styled-components'
import 'rc-slider/assets/index.css'

const RangeSlider = (props) =>
  <MainRange className={'range-slider'} range={true} {...props}/>

export default RangeSlider

RangeSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.array,
  onChangeValues: PropTypes.func
}

const MainRange = styled(Range)`
  margin-top: 26px;
  margin-right: 12px;
  margin-left: 12px;
  width: calc(100% - 24px);
  &.range-slider {
    .rc-slider-rail {
      height: 2px;
      background-color: var(--charcoal-200) !important;
    }

    .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
      box-shadow: none;
    }

    .rc-slider-track {
      height: 2px;
      background: var(--yellow-orange);
    }

    .rc-slider-handle {

      border-color: var(--yellow-orange);
      border-width: 2px;
      width: 24px;
      height: 24px;
      margin-top: -12px;
      display: flex;
      align-items: center;
      justify-content: center;

      :focus-visible, :hover {
        box-shadow: none;
        border-color: var(--yellow-orange);
      }
      
      :before {
        width: 12px;
        height: 12px;
        content: '';
        background: var(--yellow-orange);
        border-radius: 50%;
      }
    }
  }
`

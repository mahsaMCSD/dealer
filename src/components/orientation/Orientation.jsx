import React  from 'react'
import styled from 'styled-components'

import vertical                    from 'src/assets/images/vertical-phone.svg'
import {breakpointsPX}             from '../../assets/js/consts'
import {ios, useScreenOrientation} from '../../utility/helpers'

const Orientation = () => {
  const screenOrientation = useScreenOrientation()
  const isIos = ios()

  return <>
    {
      (screenOrientation === 'landscape-primary' || isIos) &&
      <Main>
        <div className="image"></div>
        <h6 className="text-white text-center mt-4">برای استفاده از برنامه گوشی خود را بچرخانید</h6>
      </Main>
    }
  </>
}

export default Orientation

const Main = styled.div`
  display: none;

  @media only screen and (max-width: ${breakpointsPX.lg}) and (orientation: landscape) {
    z-index: 1500;
    background-color: rgba(33, 37, 40, 1);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .image {
      background: url(${vertical}) center center;
      background-size: cover;
      margin: 0 auto;
      width: 190px;
      height: 160px;
    }
  }
`

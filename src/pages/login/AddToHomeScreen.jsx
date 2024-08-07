import React from 'react'
import img                from 'src/assets/images/k45-farsi.svg'
import Ui                 from 'src/assets/dictionaries/ui'
import Icon               from 'src/ui-kit/Icon'
import {Link}             from 'react-router-dom'
import styled             from 'styled-components'

const styles = {
  hr: {
    height: '2px',
    width: '96%',
    margin: '1rem 2%'
  },
  beforeText: {
    width: '36px'
  }
}
const list = [
  {
    id: 1,
    content: <>۱. در نوار پایین روی دکمه <span className="font-weight-bold">share</span> تپ کنید.</>
  },
  {
    id: 2,
    content: <>۲. در منوی باز شده ، در قسمت پایین، <br/> گزینه <span
      className="font-weight-bold"> add to home screen</span> را انتخاب کنید.</>
    ,
    before: <Icon className="text-purple-500 text-20" type="plusSquare"/>
  },
  {
    id: 3,
    content: <>۳. در مرحله بعد در قسمت بالا روی <span className="font-weight-bold"> add </span> تپ کنید.</>,
    before: <h6 className="text-orange text-16">Add</h6>

  }
]
const AddToHomeScreen = () => {

  return (
    <MainAddToHomeScreen className="d-flex justify-content-center align-items-center">
      <div className="d-flex align-items-center justify-content-center mt-5">
        <div className="flex-column d-flex align-items-center main">
          <img src={img} width={300} className="mb-4"/>
          <h4 className="text-center text-16 pe-4 ps-4 lh-base">{Ui.title_add_to_home_screen}</h4>
          <div style={styles.hr} className="bg-orange bg-orange"/>
          <div className="ms-3 me-3">
            {
              list.map(item =>
                <div key={item.id} className="d-flex">
                  <div style={styles.beforeText} className="ps-2">{item.before}</div>
                  <h6 className="lh-base text-black text-14 pb-2">{item.content}</h6>
                </div>
              )
            }
            <Link to={'/terms-condition'} id='terms-condition-button'>
              <div
                className="bg-orange pt-3 pb-3 rounded text-white text-14 font-weight-bold w-100 mt-5 text-center"> متوجه
                شدم
              </div>
            </Link>
          </div>
        </div>

      </div>
    </MainAddToHomeScreen>

  )
}
export default AddToHomeScreen

const MainAddToHomeScreen = styled.div`
  height: 100vh;

  .main {
    width: 300px;
  }
`
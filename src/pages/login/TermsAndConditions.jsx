import React, {useEffect, useState} from 'react'
import {useNavigate}                from 'react-router-dom'

import {sendAmplitudeData} from 'src/utility/amplitude'
import styled              from 'styled-components'
import {breakpointsPX}     from 'src/assets/js/consts'
import Logo                from 'src/assets/images/logo-terms.svg'
import Icon                from 'src/ui-kit/Icon'
import contents            from './terms-contents'

const TermsAndConditions = () => {
  const history = useNavigate()
  const [showSection, onChangeShowSection] = useState()

  useEffect(() => {document.body.style.overflowY = 'hidden'}, [])

  const goToMain = () => {
    sendAmplitudeData('Accepted-Rules')
    history('/dashboard/competing', {replace: true})
  }

  const handleShowSection = (idSelected) => onChangeShowSection(showSection !== idSelected && idSelected)

  sendAmplitudeData('Seen-Rules')

  return (
    <MainTermsAndConditions className="py-3">
      <div className="py-2 d-flex flex-column align-items-center">
        <img src={Logo} width="145" height="32"/>
        <h6
          className="text-14 terms-title font-weight-bold text-black m-3 border-bottom border-charcoal-100 pb-3 line-height-20 text-center">
          {contents.title}
        </h6>
        <div className=" text-white terms--body mx-3 px-2">
          {contents.sections.map(singleRule => {

              const first_text_short = `${
                singleRule.first_text.slice(0, 360)
              } ... <span class="read--more position-relative text-black"/>`
              return <div className="d-flex flex-column mb-3">
                <div className=" mb-1 d-flex align-items-center">
                  <Icon type={singleRule.icon}/>
                  <h3 className="text-14 text-black me-2 pe-1 mb-0 font-weight-bold">
                    {singleRule.title}
                  </h3>
                </div>

                <p className="text-12 mb-0 terms-description text-black-800"
                   dangerouslySetInnerHTML={{
                     __html: showSection === singleRule.id
                             ? singleRule.first_text
                             : first_text_short
                   }}/>

                {showSection === singleRule.id && singleRule.descriptions.map(text => <p
                  className="text-12 mb-0 terms-description text-black-800"
                  dangerouslySetInnerHTML={{__html: text}}/>
                )}
                <div className="w-100 d-flex flex-row-reverse">
                  <button onClick={() => handleShowSection(singleRule.id)}
                          className="btn btn--show-more p-0 text-orange-crayola ">
                    {showSection === singleRule.id ?
                     <>
                       <Icon className={'icon--more'} type="arrowUp"/>
                       <span className="text-10 text--more me-1">
                             {contents.btn_close}
                       </span>
                     </>
                                                   :
                     <>
                       <Icon className={'icon--more'} type="arrowDown"/>
                       <span className="text-10 text--more me-1">
                         {contents.btn_show}
                       </span>
                     </>
                    }
                  </button>
                </div>

              </div>
            }
          )}
        </div>

        <footer
          className="row d-flex bg-white flex-column border border-charcoal-200 radius-16 position-fixed bottom-0 right-0 p-3 w-100 justify-content-center w-desktop">
          {
            <button
              id='accept-conditions'
              className="border-0 btn-submit bg-orange-crayola text-white text-16 font-weight-bold col-12 my-2 radius-4"
              onClick={goToMain}>
              {contents.btn_submit}
            </button>
          }
        </footer>
      </div>
    </MainTermsAndConditions>
  )
}

export default TermsAndConditions

const MainTermsAndConditions = styled.div`

  height: 100%;
  @media (min-width: ${breakpointsPX.lg}) {
    min-height: 100vh;
  }

  .break-line {
    margin: 0 24px;
    height: 1px
  }

  .terms-title {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }


  .terms--body {
    font-size: 130%;
    height: calc(100vh - 130px);
    padding-bottom: 183px;
    overflow-y: auto;
    overflow-x: hidden;

    @media (display-mode: standalone) {
      height: calc(100vh - 70px);
    }

    .terms-description {
      text-align: justify;
      position: relative;
      line-height: 2;

      b {
        margin-top: 8px;
        display: inline-flex;
      }

      .read--more::before {
        position: absolute;
        content: '';
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 2.47%, rgba(255, 255, 255, 0.87) 31.3%);
        transform: rotate(180deg);
        width: 47px;
        height: 18px;
        right: -25px;
        font-size: 14px;
        text-align: center;
      }
    }

    .btn--show-more {
      display: flex;
      width: fit-content;

      .text--more {
        margin-top: 4px;
      }

      .icon--more:before {
        font-size: 8px !important;
        line-height: 0;
      }
    }
  }


  footer {
    border-bottom: 0;
    border-left: 0;
  }

  .btn-submit {
    height: 48px;
  }
`

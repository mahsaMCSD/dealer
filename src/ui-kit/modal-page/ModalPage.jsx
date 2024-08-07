import React, {useContext, useEffect, useState} from 'react'
import Modal                                    from 'react-modal'
import Icon                                     from '../Icon'
import {useNavigate}                            from 'react-router-dom'
import styled                                   from 'styled-components'
import ui                                       from 'src/assets/dictionaries/ui'
import {AuthContext, useAuth}                   from 'src/hooks/useAuth'

let customStyles = {
  content: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0',
    width: '100%',
    backgroundColor: '#FFFFFF',
    border: 'none',
    overflow: 'hidden',
    borderRadius: 0
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 99999,
    opacity: 1
  }
}

const BackIcon = ({is_white, iconType = 'arrowRight'}) =>
  <Icon type={iconType} className={`modal--header--icon d-flex ${is_white ? 'text-white' : 'text-black'} ms-3`}/>

const ModalPage = ({children, header, darkMode, isShowLogOut}) => {
  const history = useNavigate()
  const {is_back_navigate} = useContext(AuthContext)

  const [isReferrerGateways, onToggleIsReferrerGateways] = useState(!!document.referrer.includes('gateways'))

  useEffect(() => {
    onToggleIsReferrerGateways(!!document.referrer.includes('gateways'))
  }, [document.referrer])

  const {logout} = useAuth()
  return <Modal isOpen={true} style={customStyles}>
    <MainModal isHeader={header}>
      <div className="modal-content">
        {header && <header
          className={`modal--header w-desktop position-fixed left-0 right-0 top-0 ${
            header.transparent
            ? (darkMode ? 'text-white' : 'text-black bg-white')
            : 'bg-charcoal-600 text-white'
          } d-flex justify-content-between align-items-center`}>
          <div className="d-flex align-items-center">
            {
              isShowLogOut ?
              <>
                <div onClick={() => logout()}>
                  <BackIcon iconType={'logout1'} is_white={true}/>
                </div>
                <h6 className="text-16 mb-0 d-flex font-weight-bold">{ui.log_out}</h6>
              </> :
              <>
                {(header.is_back || header.back_link) &&
                <div className="pointer"
                     onClick={() => history(
                       ((isReferrerGateways || !is_back_navigate) && header.back_link) ? header.back_link : -1,
                       {replace: !!header.back_link}
                     )}>
                  <BackIcon {...header} is_white={!header.transparent}/>
                </div>
                }
                {header.close &&
                <div onClick={header.close}>
                  <BackIcon is_white={header.transparent || !darkMode}/>
                </div>
                }
                <h6 className="text-16 mb-0 d-flex font-weight-bold">{header.title}</h6>
              </>

            }
          </div>
          {header.children}
        </header>}
        <main className={`modal--body overflow-auto ${darkMode ? 'modal--body-dark text-white' : ''}`}>
          {children}
        </main>
      </div>
    </MainModal>
  </Modal>
}

ModalPage.defaultProps = {
  header: {
    back_link: false
  },
  isShowLogOut: false,
  darkMode: false,
  children: <></>
}

export default ModalPage

const MainModal = styled.div`
  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    border: none;
    width: 100%;
  }

  .modal--header {
    padding: 14px;
    height: 54px;
    width: 100%;
    z-index: 10;
  }

  .modal--header--icon {
    font-size: 24px;
  }

  .modal--body {
    padding-bottom: 24px;
    position: relative;
    overflow-y: auto;
    height: 100vh;
    ${(e) => e.isHeader && `
            height: calc(100vh - 54px);
            margin-top: 54px;            
              @supports (-webkit-touch-callout: none) {
                @media all and (display-mode: browser) {
                  height: calc(100vh - 100px);
                }
              }
          `};
  }

  .modal--body-dark {
    margin-top: 0 !important;
    height: 100vh !important;
    background-color: #333333;
  }
`

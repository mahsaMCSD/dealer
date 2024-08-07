import React, {useCallback} from 'react'
import PropTypes            from 'prop-types'
import styled               from 'styled-components'
import Icon                 from '../Icon'
import Modal                from '../modal/Modal'
import {Link}               from 'react-router-dom'

const classButton = 'border bottom-sheet-message--submit text-center text-16 line-height-30 radius-8 border-yellow-orange'

const BottomSheetMessage = ({
                              isOpen,
                              title,
                              isSuccess,
                              titleMessage,
                              submitButton,
                              children,
                              onClose,
                              isActiveOnClose
                            }) => {

  const actionButton = useCallback(
    () =>
      submitButton?.map(item => (
        item?.link ?
        <Link key={item.key} to={item.link || ''}
              className={`${classButton} ${item.classes}`}
        >
          {item.title}
        </Link>
                   :
        <button
          key={item?.key}
          onClick={() => !item?.link && item?.isOnClose && onClose()}
          className={`${classButton} ${item.classes}`}
        >
          {item.title}
        </button>
      ))
    , [submitButton]
  )

  return <Modal openModal={isOpen} closeModal={isActiveOnClose && onClose} title={title}>
    <StyleBottomSheetMessage
      className="d-flex flex-column px-3 pb-4">
      <div className="radius-8 border-black-100 border bg-black-50 pb-3 d-flex flex-column my-4 align-items-center">
        <Icon className={`bottom-sheet-message--icon ${isSuccess ? '' : 'text-red-800'}`}
              type={isSuccess ? 'checked' : 'times1'}/>
        <h6 className="text-14 font-weight-700 text-black">{titleMessage}</h6>
      </div>
      {children}
      {
        submitButton.length > 1 ? <div className="d-flex justify-content-between">
                                  {
                                    actionButton()
                                  }
                                </div> :
        actionButton()
      }

    </StyleBottomSheetMessage>
  </Modal>
}

export default BottomSheetMessage

BottomSheetMessage.defaultProps = {
  title: '',
  isOpen: false,
  isSuccess: true,
  isActiveOnClose: true,
  titleMessage: '',
  submitButton: [],
  children: <></>,
  onClose: () => {}
}

BottomSheetMessage.propTypes = {
  title: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  isActiveOnClose: PropTypes.bool.isRequired,
  titleMessage: PropTypes.string.isRequired,
  submitButton: [
    {
      key: PropTypes.string,
      link: PropTypes.string,
      title: PropTypes.string,
      isOnClose: PropTypes.bool,
      classes: PropTypes.string
    }
  ],
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onClose: PropTypes.func
}

const StyleBottomSheetMessage = styled.div`
  .bottom-sheet-message--icon {
    margin: 30px 0;
    font-size: 66px;
  }

  .bottom-sheet-message--submit {
    padding: 10px;

    &:hover {
      color: unset;
    }
  }
`

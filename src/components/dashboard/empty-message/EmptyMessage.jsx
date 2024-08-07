import React     from 'react'
import PropTypes from 'prop-types'
import styled    from 'styled-components'

const EmptyMessage = ({image, title, content, refresh, enableBtnRefresh}) =>
  <MainDiv className="d-flex justify-content-center py-5 flex-column align-items-center">
    <div className="d-flex flex-column justify-content-center align-items-center p-1">
      <img src={image} alt="empty message"/>
      <h5 className="font-weight-bold text-purple text-16 mt-4">{title}</h5>
      <h6 className="text-center text-gray-500 lh-base mt-3 text-14 lh-2">{content}</h6>
    </div>

    {enableBtnRefresh &&
      <button className='btn-gray rounded font-weight-bold btn text-purple text-16 box-shadow py-3 px-4 mt-5'
              onClick={refresh}> بروز رسانی صفحه</button>
    }
  </MainDiv>

EmptyMessage.defaultProps = {
  image: null,
  title: '',
  content: '',
  refresh: () => {},
  enableBtnRefresh: false
}
EmptyMessage.prototype = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  refresh: PropTypes.func,
  enableBtnRefresh: PropTypes.bool.isRequired
}
export default EmptyMessage

const MainDiv = styled.div`
  height: calc(100vh - (56px + 120px));
`

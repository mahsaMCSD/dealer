import React, {useEffect, useState} from 'react'
import PropTypes                             from 'prop-types'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import {connect}                             from 'react-redux'
import styled                       from 'styled-components'

import onGettingInspectionComments from 'src/store/car/actions/onGettingInspectionComments'
import ModalPage                   from 'src/ui-kit/modal-page/ModalPage'

const GalleryList = ({
                       title,
                       images,
                       onClickImage,
                       onCloseModal,
                       onGettingInspections,
                       inspectionComments,
                       index_active_image
                     }) => {
  const [refs, onChangeRefs] = useState({})
  const {inspectionId} = useParams()
  const [imagesModal, onChangeImagesModal] = useState([])
  const history = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (Object.keys(refs).length === imagesModal.length && refs[index_active_image]) {
      refs[index_active_image].current.scrollIntoView({inline: 'start', scrollBehavior: 'smooth'})
    }
  }, [refs])
  const pathId = location.search.split('id=')
    .pop()
    .split('&')[0]
  useEffect(() => {
    imagesModal.map((e, index) => {
      onChangeRefs((prevState) => ({...prevState, [index]: React.createRef()}))
    })
  }, [imagesModal])

  const parseImageInspection = () => {
    let imagesInspection = []

    inspectionComments && inspectionComments.additional_images && Object.values(inspectionComments.additional_images)
      .map((value) => {
          value.questions && value.questions.map((question) => {

            imagesInspection.push({
              id: question.id,
              original: question.file_high,
              color: question.color,
              title: question.title
            })
          })

        }
      )
    onChangeImagesModal([...images, ...imagesInspection])
  }
  useEffect(() => {
    onGettingInspections(inspectionId)
    if (pathId) {

    }
  }, [])
  useEffect(() => {
    if (index_active_image) {
      history(`toggle-gallery-List?id=${index_active_image}`, { replace: true })
    }
  }, [index_active_image])
  useEffect(() => {
    parseImageInspection()
  }, [inspectionComments])

  return (<ModalPage header={{title, close: onCloseModal}}
                     modalBodyCustomStyle={{padding: '0 0.25rem'}}>
    <Main className="px-2 pb-2">
      {imagesModal.map((image, index) =>

        <button key={image.original} ref={refs[index]} className={` p-0 mb-2 btn rounded  ${image.title
                                                                                            ? 'border border-gray-300  image-list-btn-desc '
                                                                                            : 'image-list-btn'}`}
                onClick={() => onClickImage(index)}>
          <img src={image.original} className="img-fluid rounded box-shadow gallery-image" alt="car gallery"/>
          {image.title && <h6 className="pt-2 mb-0 text-14" style={{color: '#' + image.color}}> {image.title}</h6>}
        </button>)}

    </Main>
  </ModalPage>)
}
const mapStateToProps = state => ({
  inspectionComments: state.car.inspectionComments,
  index_active_image: state.car.index_active_image
})
const mapDispatchToProps = (dispatch) => ({
  onGettingInspections: (inspectionId) => dispatch(onGettingInspectionComments(inspectionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(GalleryList)

GalleryList.defaultProps = {
  title: '',
  images: [],
  onClickImage: () => {},
  onCloseModal: () => {}
}
GalleryList.propTypes = {
  title: PropTypes.string,
  images: PropTypes.array,
  onClickImage: PropTypes.func,
  onCloseModal: PropTypes.func
}
const Main = styled.div`
  @media (display-mode: standalone) {
    margin-top: 54px
  }

  .gallery-image {
    --bs-aspect-ratio: 75%;
  }

  .image-list-btn {
    width: 100%;
  }

  .image-list-btn-desc {
    width: 100%;
  }


`

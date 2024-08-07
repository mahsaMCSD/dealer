import React, {useState, useEffect}           from 'react'
import PropTypes                              from 'prop-types'
import {useLocation, useNavigate}  from 'react-router-dom'
import ImgGallery                             from 'src/ui-kit/ImgGallery'
import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch'
import Icon                                   from 'src/ui-kit/Icon'
import GalleryBullet                          from './GalleryBullet'
import styled                                 from 'styled-components'
import ModalPage                              from 'src/ui-kit/modal-page/ModalPage'


const GalleryInModal = ({
                          title,
                          images,
                          onClickImage,
                          inspectionComments,
                          onCloseModal,
                          index_active_image
                        }) => {
  const history = useNavigate()
  const location = useLocation()

  const currentImage = location.search.split('id=')
    .pop()
    .split('&')[0]
  const [selectedImageID, onChangeSelectedImageID] = useState(images[0].id)
  const [imagesSlider, onChangeImagesSlider] = useState([])
  const [selectedImage, onChangeSelectedImage] = useState()

  const handelSlide = (index) => {
    if (index >= 0 && index <= imagesSlider.length - 1) {
      history(`toggle-gallery-modal?id=${index}`, {replace: true})

      onChangeSelectedImageID(imagesSlider[index].id)
    }
  }

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
    onChangeImagesSlider([...images, ...imagesInspection])
  }
  useEffect(() => {
    onChangeImagesSlider(images)
  }, [images])

  useEffect(() => {
    if (imagesSlider.length > 0 && currentImage !== '0') {
      onChangeSelectedImageID(imagesSlider[parseInt(currentImage)] && imagesSlider[parseInt(currentImage)].id)
    }
  }, [imagesSlider, currentImage])
  useEffect(() => {
    parseImageInspection()
  }, [inspectionComments])

  useEffect(() => {
    if (index_active_image) {
      history(`toggle-gallery-modal?id=${index_active_image}`, {replace: true})
    }
  }, [index_active_image])


  const [disablePan, onChangeDisablePan] = useState(true)

  React.useEffect(() => {
    onChangeDisablePan(true)
  }, [currentImage])

  function myImageGalleryRenderer (item) {
    return (
      <Image className="image-gallery-image">
        <TransformWrapper options={{minScale: 1}}
                          onZoomChange={(e) => onChangeDisablePan(e.scale === 1)}
                          pan={{disabled: disablePan}}>
          <TransformComponent>
            <img
              src={item.original}
              srcSet={item.srcSet}
              className={'image-zoom'}
            />

          </TransformComponent>
        </TransformWrapper>
      </Image>
    )
  }

  useEffect(() => {
    onChangeSelectedImage(imagesSlider.find(item => item.id === selectedImageID))
  }, [selectedImageID, imagesSlider])

  return <Main>
    <ModalPage header={{title, close: onCloseModal, transparent: true}} darkMode>
      <MainModal className="row modal-container position-relative flex align-items-center">

        <div className="col-12 d-flex align-items-center p-0 position-relative gallery-and-desc">

          <ImgGallery items={imagesSlider}
                      renderItem={myImageGalleryRenderer}
                      settings={{
                        showBullets: false,
                        showIndex: false,
                        showNav: !disablePan,
                        additionalClass: 'galleryModal',
                        onClick: onClickImage,
                        startIndex: currentImage ? parseInt(currentImage) : 0,
                        isRTL: true,
                        infinite: true,
                        lazyLoad: false,
                        onSlide: handelSlide
                      }}/>
          <TitleImage>
            <div className="image-text position-absolute w-100 left-0 right-0">
              {selectedImage && selectedImage.title &&
                <div
                  className="bg-white d-flex align-items-center justify-content-center    p-2"
                  style={{color: '#' + selectedImage.color}}>
                  <Icon type={'infoCircle'} className="h3 ps-2 mb-0"/>
                  <h6 className="mb-0 text-14">{selectedImage.title}</h6>
                </div>
              }
              <GalleryBullet classNameMain="gallery-bullet-main" count={imagesSlider.length}
                             active={parseInt(currentImage)} onClickBullet={handelSlide}/>
            </div>

          </TitleImage>

        </div>
        <div
          className="font-weight-bold text-16 text-1 text-center position-absolute modal-gallery-footer d-flex align-items-center justify-content-between pt-1">
          <div>
            {selectedImage && <a href={selectedImage.original}
                                 className=" w-100 text-14  text-orange py-3"
                                 target="_blank"
                                 download>
              <Icon type={'download'}/>
            </a>}
          </div>
          <h6 className="mb-0 text-16">
            {parseInt(currentImage) + 1}/{imagesSlider.length}
          </h6>

        </div>

      </MainModal>
    </ModalPage>
  </Main>
}

export default GalleryInModal

GalleryInModal.defaultProps = {
  title: '',
  children: '',
  onCloseModal: () => {}
}
GalleryInModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  onCloseModal: PropTypes.func
}
const TitleImage = styled.div`
  height: 50px;
  padding-top: 10px;
`

const Image = styled.div`
  .image-zoom {
    height: 100%;
    width: 100%;
  }
`
const Main = styled.div`
  overflow: hidden;
`

const MainModal = styled.div`
  height: calc(100vh - 56px);

  .image-gallery-bullets {
    bottom: -40px;
    width: 90%;
  }

  .modal-gallery-footer {
    bottom: -41px;
  }

  .image-text {
    bottom: -36px;
  }

  .gallery-and-desc {
    height: calc(75vw);
  }

  .gallery-bullet {
    bottom: -40px;
  }
`

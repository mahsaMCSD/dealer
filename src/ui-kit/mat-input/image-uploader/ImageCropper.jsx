import React, {useCallback, useState} from 'react'
import Cropper                        from 'react-easy-crop'
import styled                         from 'styled-components'
import PropTypes                      from 'prop-types'

import Modal           from 'src/ui-kit/modal/Modal'
import ui              from 'src/assets/dictionaries/ui'
import {getCroppedImg} from 'src/utility/canvasUtils'

const ImageCropper = ({openModal, closeModal, image, handleCroppedImage, sizeCropper}) => {

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((croppedArea, areaPixels) => {
    setCroppedAreaPixels(areaPixels)
  }, [])


  const showCroppedImage = useCallback(() => {
    if (image) {
      getCroppedImg(image, croppedAreaPixels)
        .then((res) => {
          handleCroppedImage(res)
        })
        .catch(console.log)
    }
  }, [image, croppedAreaPixels])


  return <Modal openModal={openModal} closeModal={closeModal} header={false} postion={'full'}
  >
    <MainModal>
      <Cropper
        image={image}
        crop={crop}
        aspect={sizeCropper}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        zoom={zoom}
        onZoomChange={setZoom}
      />

      <div onClick={showCroppedImage}
           className="bg-orange-crayola btn-submit text-white radius-4 position-absolute text-center">
        {ui.verify}
      </div>
    </MainModal>

  </Modal>
}

ImageCropper.defaultProps = {
  sizeCropper: 2.5 / 4
}

ImageCropper.propTypes = {
  sizeCropper: PropTypes.number
}

export default ImageCropper

const MainModal = styled.div`
  padding: 0 10%;

  .reactEasyCrop_Container {
    left: 10%;
    right: 10%;
    bottom: 150px;
  }

  .btn-submit {
    bottom: 90px;
    padding: 0.75rem 0;
    width: calc(73%);
  }
`

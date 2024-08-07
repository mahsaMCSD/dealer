import React, {useCallback, useState} from 'react'
import PropTypes                      from 'prop-types'
import Cropper                        from 'react-easy-crop'
import styled                         from 'styled-components'

import Modal           from 'src/ui-kit/modal/Modal'
import ui              from 'src/assets/dictionaries/ui'
import {getCroppedImg} from 'src/utility/canvasUtils'

const ModalCropperImage = ({openModal, closeModal, image, handleCroppedImage, aspectRatio}) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [crop, setCrop] = useState({x: 0, y: 0})
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])


  const showCroppedImage = useCallback(async () => {
    if (image) {
      try {
        const croppedImage = await getCroppedImg(
          image,
          croppedAreaPixels
        )
        handleCroppedImage(croppedImage)
      } catch (e) {
      }
    }

  }, [image, croppedAreaPixels])


  return <Modal openModal={openModal}
                closeModal={closeModal}
                header={false}
                postion={'full'}
  >
    <MainModal>
      <Cropper
        image={image}
        crop={crop}
        aspect={aspectRatio}
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

ModalCropperImage.defaultProps = {
  aspectRatio: 2.5 / 4
}
ModalCropperImage.propTypes = {
  aspectRatio: PropTypes.number
}
export default ModalCropperImage

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
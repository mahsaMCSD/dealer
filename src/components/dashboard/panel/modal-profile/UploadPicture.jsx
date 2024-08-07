import React, {useEffect, useRef, useState} from 'react'
import Compressor                           from 'compressorjs'
import {NotificationManager}                from 'src/ui-kit/notifications'

import {getBase64} from 'src/utility/helpers'

import ui              from 'src/assets/dictionaries/ui'
import validationFiles from 'src/utility/validationFiles'

import Icon              from 'src/ui-kit/Icon'
import ModalCropperImage from '../../upload-file/ModalCropperImage'

const configImage = {
  fileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
  fileSize: 5000000,
  width: 1500
}

const UploadPicture = ({className, handleChange, iconType, title}) => {

  const [openModal, onChangeOpenModal] = useState(false)
  const [openModalCropper, onChangeOpenModalCropper] = useState(false)
  const [image, onChangeImage] = useState()
  const [value, onChangeValue] = useState(null)
  const refInputFile = useRef()

  const openUpload = () => {
    refInputFile.current.click()
  }

  const imageCompressor = (files) => {
    onChangeValue('')

    new Compressor(files[0], {
      convertSize: 500000,
      width: configImage.width,

      success: (compressedResult) => {

        const validationSizeAndType = validationFiles([compressedResult], configImage.fileTypes, configImage.fileSize)
        if (validationSizeAndType.success) {
          if (validationSizeAndType.type === 'image/jpeg' ||
            validationSizeAndType.type === 'image/jpg' ||
            validationSizeAndType.type === 'image/png') {
            getBase64(compressedResult, value => {
              onChangeImage(value)
              onChangeOpenModalCropper(true)
            })
          }
        } else {
          NotificationManager.error(validationSizeAndType.error)
        }
      },
      error: (e) =>
        e.message === 'The first argument must be an image File or Blob object.' &&
        NotificationManager.error(ui.validation_format_image)
    })
  }

  const onChangeFile = (e, typeConvert) => {
    let files
    if (typeConvert === 'drop') {
      e.preventDefault()
      files = e.dataTransfer.files
    } else {
      files = e.target.files
    }
    imageCompressor(files)
  }

  const handleCroppedImage = (value) => {
    handleChange({target: {value}})
    onChangeOpenModalCropper(false)
    onChangeOpenModal(true)
  }

  useEffect(() => {
    if (!openModal) {
      onChangeImage(null)
    }
    return () => {
      onChangeValue(null)
    }
  }, [openModal])

  const closeModalCropper = () => onChangeOpenModalCropper(false)

  return <>
    <div className={className} onClick={openUpload}>
      <Icon type={iconType}/>
      <span className="text-14 text-black mx-3">{title}</span>
      <input type="file" ref={refInputFile} value={value} onChange={onChangeFile} className="d-none" step="100"/>
    </div>

    <ModalCropperImage openModal={openModalCropper} closeModal={closeModalCropper} image={image}
                       handleCroppedImage={handleCroppedImage} aspectRatio={2.5 / 2.5}/>
  </>
}

UploadPicture.defaultProps = {
  handleChange: () => {},
  className: ''
}

export default UploadPicture

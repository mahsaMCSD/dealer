import React, {useEffect, useRef, useState} from 'react'
import styled                               from 'styled-components'
import PropTypes                            from 'prop-types'

import InputLabel            from '../source/InputLabel'
import Compressor            from 'compressorjs'
import validationFiles       from 'src/utility/validationFiles'
import {getBase64}           from 'src/utility/helpers'
import {NotificationManager} from '../../notifications'
import ui                    from 'src/assets/dictionaries/ui'
import ImageCropper          from './ImageCropper'
import Icon                  from '../../Icon'
import SpinnerSvg            from 'src/components/SpinnerSvg'

const configImage = {
  fileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
  fileSize: 5000000,
  width: 1500
}

const ImageUploader = ({
                         label,
                         iconUpload,
                         iconRemove,
                         className,
                         handleChange,
                         name,
                         hasShowCropper,
                         convertSize,
                         sizeCropper,
                         getNameWhenRemoveUpload,
                         imageValue,
                         isEditable,
                         isRequired,
                         value,
                         isLoading
                       }) => {

  const [stateValue, onChangeStateValue] = useState(null)
  const [image, onChangeImage] = useState()
  const [isShowImage, toggleIsShowImage] = useState(false)
  const [openModalCropper, onChangeOpenModalCropper] = useState(false)
  const [imageCropped, onChangeImageCropped] = useState()
  const refInputFile = useRef()

  useEffect(() => {
    if (imageValue) {
      onChangeImage(imageValue)
      onChangeImageCropped(imageValue)
      toggleIsShowImage(true)
    }
  }, [imageValue])

  const openUpload = () => {
    refInputFile.current.click()
  }

  const imageCompressor = (files) => {
    onChangeStateValue('')

    new Compressor(files[0], {
      convertSize: convertSize,
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
              if (!hasShowCropper) {
                handleChange({target: {value, name}})
                toggleIsShowImage(true)
              }
            })
          }
        } else {
          NotificationManager.error(validationSizeAndType.error)
          toggleIsShowImage(false)
        }
      },
      error: (e) =>
        e.message === 'The first argument must be an image File or Blob object.' &&
        NotificationManager.error(ui.validation_format_image)
    })
  }

  const handleChangeInput = (e, typeConvert) => {
    let files
    if (typeConvert === 'drop') {
      e.preventDefault()
      files = e.dataTransfer.files
    } else {
      files = e.target.files
    }
    imageCompressor(files)
  }

  const handleCroppedImage = (new_image) => {
    onChangeImageCropped(new_image)
    onChangeOpenModalCropper(false)
    toggleIsShowImage(true)
    handleChange({target: {value: new_image, name: name}})
  }

  const handleRemoveUpload = () => {
    onChangeStateValue(null)
    onChangeImage(null)
    handleChange({target: {value: '', name}, error: isRequired})
    toggleIsShowImage(false)
    getNameWhenRemoveUpload(name)
  }

  const closeModalCropper = () => onChangeOpenModalCropper(false)

  useEffect(() => {
    if (value !== imageCropped && hasShowCropper) {
      onChangeImageCropped(value)
      onChangeImage(value)

    } else if (value !== image) {
      onChangeImage(value)
    }
    if (value) {
      toggleIsShowImage(true)
    }
  }, [value])

  return (
    <>
      <ImageUploaderStyled className={className} onClick={!image && openUpload}>
        <div
          className={`image-uploader-inner w-100 position-relative w-100 h-100 radius-8
        bg-transparent d-flex flex-wrap align-items-center justify-content-between`}>
          <input className="image-uploader-inner__input d-none" onChange={handleChangeInput} type="file"
                 ref={refInputFile}
                 value={stateValue}/>
          <InputLabel label={`${label} ${isRequired ? '*' : ''}`}
                      value={image}
                      className="right-0 mx-2 text-black-600 text-16"/>
          {
            !isEditable ?
            <img width="100%" height={192} src={hasShowCropper ? imageCropped : image} className="my-2"/> :
            !(isShowImage && image && isEditable) ?
            <>
              <Icon className="text-24" type={iconUpload}/>
            </> :
            <>
              {
                isLoading ? <div className='spinner-image'><SpinnerSvg/></div> : <>
                  <img width="100%" height={192} src={hasShowCropper ? imageCropped : image} className="my-2"/>
                  <div className="w-100 d-flex align-items-center justify-content-end mt-1">
                    <div className="mx-2 text-24" onClick={handleRemoveUpload}><Icon type={iconRemove}/></div>
                    <div className="text-24" onClick={image && openUpload}><Icon type={iconUpload}/></div>
                  </div>
                </>
              }

            </>
          }
        </div>
      </ImageUploaderStyled>
      {
        hasShowCropper && <ImageCropper openModal={openModalCropper} closeModal={closeModalCropper} image={image}
                                        handleCroppedImage={handleCroppedImage} sizeCropper={sizeCropper}/>
      }
    </>
  )
}

ImageUploader.defaultProps = {
  label: '',
  placeholder: '',
  handleChange: () => {},
  iconUpload: 'documentUpload',
  iconRemove: 'trash',
  className: 'my-4',
  name: '',
  hasShowCropper: true,
  convertSize: 500000,
  isRequired: false,
  sizeCropper: 2.5 / 4,
  value: '',
  isEditable: true,
  isLoading: false
}

ImageUploader.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  iconUpload: PropTypes.string,
  iconRemove: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  hasShowCropper: PropTypes.bool,
  convertSize: PropTypes.number,
  isRequired: PropTypes.bool,
  sizeCropper: PropTypes.number,
  value: PropTypes.string,
  isEditable: PropTypes.bool,
  isLoading: PropTypes.bool
}

export default ImageUploader

const ImageUploaderStyled = styled.div`
  .image-uploader-inner {
    min-height: 48px;
    border: 1px solid var(--charcoal-600);
    padding: 18px;

    .disabled-transform {
      transform: inherit;
    }

    .icon-document-upload:before, .icon-trash:before {
      color: var(--charcoal-400);
      cursor: pointer;
    }
  }
  .spinner-image {
    width: 13%;
    display: block;
    margin: 1rem auto;
    * {
      fill: var(--yellow-orange) !important;
    }
  }
`

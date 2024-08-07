import React, {useEffect, useRef, useState} from 'react'
import styled                               from 'styled-components'
import Compressor                           from 'compressorjs'
import {NotificationManager}                from 'src/ui-kit/notifications'

import Icon                     from 'src/ui-kit/Icon'
import {getBase64}              from 'src/utility/helpers'
import Modal                    from 'src/ui-kit/modal/Modal'
import ReceiptOfflineCharge     from './ReceiptOfflineCharge'
import ui                       from 'src/assets/dictionaries/ui'
import validationFiles          from 'src/utility/validationFiles'
import FormPreviewOfflineCharge from './FormPreviewOfflineCharge'
import FormPreviewFinalPay      from './FormPreviewFinalPay'
import ModalCropperImage        from './ModalCropperImage'


const titleModal = (type) => {
  switch (type) {
    case 'success':
      return ui.wallet_charge_page.upload_success
    case 'un_success':
      return ui.wallet_charge_page.upload_un_success
    case 'offline-charge':
      return ui.upload_receipt
    case 'final-pay':
      return ui.final_pay.upload_receipt
    default:
      return
  }
}

const ModalPreviewImageFile = ({openModal, closeModal, image, type, gateway}) => {

  const [showReceiptOffline, onChangeShowReceiptOffline] = useState('')
  const [amount, onChangeAmount] = useState(false)

  useEffect(()=>{
    if(!openModal) {
      onChangeShowReceiptOffline('')
    }
    return ()=> {
      onChangeShowReceiptOffline('')
    }
  },[openModal])
  return <Modal
    openModal={openModal}
    classes={'modal-out'}
    closeModal={closeModal}
    title={ titleModal(showReceiptOffline || type)}
    style={{
      content: {borderRadius: '8px', padding: '16px'}
    }}
    postion={type !== 'final-pay' ? 'center' : 'bottom'}>
    <MainUploadFileModal className={'p-3'}>
      {
        showReceiptOffline ? <ReceiptOfflineCharge
                             showReceiptOffline={showReceiptOffline}
                             amount={amount}
                           />
                           :
        type !== 'final-pay'
        ? <FormPreviewOfflineCharge gateway={gateway}
                                    image={image}
                                    handleAmount={onChangeAmount}
                                    handleShowReceiptOfflineCharge={onChangeShowReceiptOffline}/>
        : <FormPreviewFinalPay image={image}
                               closeModal={closeModal}
        />
      }
    </MainUploadFileModal>

  </Modal>
}

const configImage = {
  fileTypes: ['image/jpeg', 'image/jpg', 'image/png'],
  fileSize: 5000000
}


const UploadFile = (
  {
    className,
    handleChange,
    name,
    type,
    gateway
  }
) => {
  const refInputFile = useRef()

  const [openModal, onChangeOpenModal] = useState(false)
  const [openModalCropper, onChangeOpenModalCropper] = useState(false)
  const [image, onChangeImage] = useState()
  const [imageCropped, onChangeImageCropped] = useState()
  const [value, onChangeValue] = useState()

  const openUpload = () => {
    refInputFile.current.click()
  }

  const onChangeFile = (e, typeConvert) => {
    let files
    if (typeConvert === 'drop') {
      e.preventDefault()
      files = e.dataTransfer.files
    } else {
      files = e.target.files
    }

    onChangeValue('')

    new Compressor(files[0], {
      convertSize: 500000,
      width: 1500,

      success: (compressedResult) => {

        const validationSizeAndType = validationFiles([compressedResult], configImage.fileTypes, configImage.fileSize)
        if (validationSizeAndType.success) {
          if (validationSizeAndType.type === 'image/jpeg' ||
            validationSizeAndType.type === 'image/jpg' ||
            validationSizeAndType.type === 'image/png') {
            getBase64(compressedResult, value => {
              handleChange({target: {value, name}})
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

  const handleCroppedImage = (new_image) => {
    onChangeImageCropped(new_image)
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
    <MainUploadFile
      className={`border border-dashed border-gray-300 radius-8 d-flex pointer flex-column justify-content-between position-relative align-items-center  ${className}`}
      onClick={openUpload}
    >

      <Icon type={'addUpload'} className={'upload-file--icon text-orange-crayola'}/>
      <h6 className="text-black-600 text-14">{ui.upload_receipt}</h6>
      <input type="file" ref={refInputFile} value={value} onChange={onChangeFile} className={'d-none'} step="100"/>

    </MainUploadFile>
    <ModalPreviewImageFile openModal={openModal}
                           closeModal={() => onChangeOpenModal(false)}
                           image={imageCropped}
                           type={type}
                           gateway={gateway}
    />

    <ModalCropperImage openModal={openModalCropper} closeModal={closeModalCropper} image={image}
                       handleCroppedImage={handleCroppedImage}/>

  </>
}

UploadFile.defaultProps = {
  handleChange: () => {},
  name: '',
  className: ''
}

export default UploadFile

const MainUploadFile = styled.div`
  border-width: 2px;
  min-width: 156px;
  height: 156px;
  padding-top: 24px;
  padding-bottom: 18px;


  .price {
    height: 32px;
    line-height: 32px;
    height: 62px;
    padding-top: 30px;
    background: linear-gradient(180deg, rgba(82, 87, 92, 0) 15.1%, #52575C 100%);
  }
`

const MainUploadFileModal = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 100px);

  .upload-file--image-receipt {
    margin-top: 24px;
    margin-bottom: 16px;
    border-radius: 8px;
    max-height: 128px;
    aspect-ratio: 2.5 / 4;
  }

  .chip-days {
    margin: 6px 0 16px 0;
  }

  .chip-day {
    border-radius: 16px;
  }

  .chip-day__active {
    color: var(--yellow-orange) !important;
  }
`

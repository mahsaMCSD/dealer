import React, {useEffect, useState} from 'react'
import styled                       from 'styled-components'

import {createDealerImage, getUserImageDocuments, uploadUserImageDocuments} from 'src/api/services/appUser'

import NotificationManager from 'src/ui-kit/notifications/NotificationManager'
import ImageUploader       from 'src/ui-kit/mat-input/image-uploader/ImageUploader'
import ui                  from 'src/assets/dictionaries/ui'

const UploadDocuments = () => {

  const [uploadDocuments, onChangeUploadDocuments] = useState(null)
  const [imagesDocument, onChangeImagesDocument] = useState(null)
  const [itemsIsEditable, onChangeItemsIsEditable] = useState(null)

  const handleChangeUploadDocuments = (file) => {
    if (file) {
      const typeImage = file.target.name === 'identity_photo' ? 1 : 2
      createDealerImage({type: typeImage, file: file.target.value})
        .then(res => {
          onChangeUploadDocuments(prevState => ({
            ...prevState,
            [file.target.name]: res.id
          }))
        })
        .catch(console.log)
    }
  }

  const handleRemoveItemUploadDocuments = (name) => {
    const newListUploadDocuments = {...uploadDocuments}
    delete newListUploadDocuments[name]
    onChangeUploadDocuments(newListUploadDocuments)
  }

  const handleSubmitFormData = () => {
    if (uploadDocuments && Object.keys(uploadDocuments).length > 0) {
      uploadUserImageDocuments(uploadDocuments)
        .then((res) => {
          NotificationManager.success(ui.wallet_charge_page.upload_success)
          onChangeItemsIsEditable(res)
        })
        .catch(() => {
          NotificationManager.error(ui.wallet_charge_page.upload_un_success)
        })
        .finally(() => onChangeUploadDocuments(null))
    }
  }

  useEffect(() => {
    getUserImageDocuments()
      .then(res => {
        onChangeImagesDocument(res)
        onChangeItemsIsEditable(res)
      })
      .catch(console.log)
  }, [])

  return (
    <div className="col-12 px-3">

      <TextStyled className="text-12 text-black text-right text-black-800 mt-3 mb-0">
        همکار گرامی بعد از بارگذاری مدارک امکان تغییر یا به روزرسانی نیست؛ لذا دربارگذاری دقت فرمایید.
      </TextStyled>

      <ImageUploader name="national_code_photo_front" label={ui.img_national_code_front}
                     handleChange={(file) => handleChangeUploadDocuments(file)} hasShowCropper={true}
                     getNameWhenRemoveUpload={(name) => handleRemoveItemUploadDocuments(name)} sizeCropper={4 / 2.5}
                     imageValue={imagesDocument?.national_code_photo_front}
                     isEditable={!itemsIsEditable?.national_code_photo_front}/>

      <ImageUploader name="national_code_photo_back" label={ui.img_national_code_back}
                     handleChange={(file) => handleChangeUploadDocuments(file)} hasShowCropper={true}
                     getNameWhenRemoveUpload={(name) => handleRemoveItemUploadDocuments(name)} sizeCropper={4 / 2.5}
                     imageValue={imagesDocument?.national_code_photo_back}
                     isEditable={!itemsIsEditable?.national_code_photo_back}/>

      <ImageUploader name="identity_photo" label={ui.img_identity_code_page_one}
                     handleChange={(file) => handleChangeUploadDocuments(file)} hasShowCropper={true}
                     getNameWhenRemoveUpload={(name) => handleRemoveItemUploadDocuments(name)} sizeCropper={4 / 2.5}
                     imageValue={imagesDocument?.identity_photo}
                     isEditable={!itemsIsEditable?.identity_photo}/>
      {
        uploadDocuments && Object.keys(uploadDocuments).length > 0 ?
        <button className="btn bg-yellow-orange radius-8 text-white d-block text-16 w-100"
                style={{padding: '0.80rem'}} onClick={handleSubmitFormData}>
          {ui.save}
        </button> :
        <button className="btn bg-charcoal-200 radius-8 text-white d-block text-16 w-100"
                style={{padding: '0.80rem'}} disabled>
          {ui.save}
        </button>
      }

    </div>
  )
}

export default UploadDocuments

const TextStyled = styled.h4`
  line-height: 20px;
`

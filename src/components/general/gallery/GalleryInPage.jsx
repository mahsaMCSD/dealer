import React      from 'react'
import PropTypes  from 'prop-types'
import ImgGallery from 'src/ui-kit/ImgGallery'

const sliderContainer = {
  width: '100%'
}

const GalleryInPage = ({images,galleryClass,galleryStyle, ...props}) =>
  <div style={{...sliderContainer, ...galleryStyle}} className={galleryClass}>
    <ImgGallery items={images} {...props}/>
  </div>

export default GalleryInPage
GalleryInPage.defutlProps = {
  images: [],
  galleryClass: '',
  galleryStyle:{},
}
GalleryInPage.propTypes = {
  images: PropTypes.array,
  galleryClass: PropTypes.string,
  galleryStyle: PropTypes.object
}

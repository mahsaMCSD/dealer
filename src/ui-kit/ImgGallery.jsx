import React        from 'react'
import PropTypes    from 'prop-types'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const defaultSettings = {
  showBullets: false,
  infinite: false,
  lazyLoad: true,
  showPlayButton: false,
  showFullscreenButton: false,
  showNav: false,
  showThumbnails: false,
  useTranslate3D: false,
  disableArrowKeys: false,
  slideDuration: 500
}

const ImgGallery = ({items, settings, ...props}) =>
  <ImageGallery items={items} {...props} {...defaultSettings} {...settings}/>

export default ImgGallery
ImgGallery.defaultProps = {
  items: [],
  settings: {}
}
ImgGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      fullscreen: PropTypes.string,
      originalClass: PropTypes.string,
      thumbnailClass: PropTypes.string,
      renderItem: PropTypes.func,
      renderThumbInner: PropTypes.func,
      originalAlt: PropTypes.string,
      thumbnailAlt: PropTypes.string,
      originalTitle: PropTypes.string,
      thumbnailTitle: PropTypes.string,
      thumbnailLabel: PropTypes.string,
      description: PropTypes.string,
      imageSet: PropTypes.array,
      srcSet: PropTypes.string,
      sizes: PropTypes.string,
      bulletClass: PropTypes.string,
      bulletOnClick: PropTypes.func
    })
  ),
  settings: PropTypes.shape({
    infinite: PropTypes.bool,
    lazyLoad: PropTypes.bool,
    showNav: PropTypes.bool,
    showThumbnails: PropTypes.bool,
    showFullscreenButton: PropTypes.bool,
    useBrowserFullscreen: PropTypes.bool,
    useTranslate3D: PropTypes.bool,
    showPlayButton: PropTypes.bool,
    isRTL: PropTypes.bool,
    showBullets: PropTypes.bool,
    showIndex: PropTypes.bool,
    autoPlay: PropTypes.bool,
    disableThumbnailScroll: PropTypes.bool,
    disableKeyDown: PropTypes.bool,
    disableSwipe: PropTypes.bool,
    slideOnThumbnailOver: PropTypes.bool,
    stopPropagation: PropTypes.bool,
    preventDefaultTouchmoveEvent: PropTypes.bool,

    slideDuration: PropTypes.number,
    swipingTransitionDuration: PropTypes.number,
    slideInterval: PropTypes.number,
    flickThreshold: PropTypes.number,
    swipeThreshold: PropTypes.number,
    startIndex: PropTypes.number,

    thumbnailPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    onErrorImageURL: PropTypes.string,
    indexSeparator: PropTypes.string,
    additionalClass: PropTypes.string,

    onImageError: PropTypes.func,
    onThumbnailError: PropTypes.func,
    onThumbnailClick: PropTypes.func,
    onImageLoad: PropTypes.func,
    onSlide: PropTypes.func,
    onBeforeSlide: PropTypes.func,
    onScreenChange: PropTypes.func,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    onClick: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchStart: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,

    renderCustomControls: PropTypes.func,
    renderItem: PropTypes.func,
    renderThumbInner: PropTypes.func,
    renderLeftNav: PropTypes.func,
    renderRightNav: PropTypes.func,
    renderPlayPauseButton: PropTypes.func,
    renderFullscreenButton: PropTypes.func
  })
}

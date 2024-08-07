import React         from 'react'
import ImgGallery    from 'src/ui-kit/ImgGallery'
import Icon          from 'src/ui-kit/Icon'
import Modal         from 'src/ui-kit/modal/Modal'
import styled        from 'styled-components'
import GalleryBullet from '../../../general/gallery/GalleryBullet'

const InspectionModal = ({carTitle, startIndex = 0, selectedDot, onSelectDot}) => {
  const [selectedIndex, onSelectedIndex] = React.useState(0)
  const items = selectedDot ? selectedDot.map(item => ({original: item.file})) : []

  React.useEffect(() => {
    onSelectedIndex(startIndex)
  }, [startIndex])

  const onCloseModal = () => {
    onSelectedIndex(0)
    onSelectDot(null)
  }

  const handleSlide = (index) => {
    if (index >= 0 && index <= items.length - 1) {
      onSelectedIndex(index)
    }
  }
  return <Modal
    fullWidth={true}
    openModal={!!selectedDot}
    closeModal={onCloseModal}
    style={{content: {paddingBottom: '40px'}}}
    title={carTitle}>
    {selectedDot &&
    <MainModal className={'px-3'}>
      <ImgGallery items={items} settings={{
        startIndex: selectedIndex,
        additionalClass: 'SliderInspection',
        onBeforeSlide: (i) => onSelectedIndex(i),
        isRTL: true,
        infinite: true,
      }}/>

      <div className="d-flex text-14 align-items-center justify-content-center bg-black-50 py-2"
           style={{color: '#' + selectedDot[selectedIndex].color}}>
        <Icon type={'infoCircle'} className="d-inline-block h4 ps-1 mb-0"/>
        {selectedDot[selectedIndex].title}
      </div>
      <div>
        {items.length > 1 &&
        <div className="image-text position-absolute w-100 left-0 right-0">
          <GalleryBullet classNameMain="gallery-bullet-main"
                         count={items.length}
                         active={selectedIndex} onClickBullet={handleSlide}/>
        </div>

        }
      </div>
    </MainModal>
    }
  </Modal>
}

export default InspectionModal

const MainModal = styled.div`
  .gallery-bullet-main {
    padding-bottom: 10px;
  }
`

import React, {useState} from 'react'
import ui                from 'src/assets/dictionaries/ui'
import appImage1PNG      from 'src/assets/images/dashboard/panel/image-app-1.png'
import appImage2PNG      from 'src/assets/images/dashboard/panel/image-app-2.png'
import appImage3PNG      from 'src/assets/images/dashboard/panel/image-app-3.png'
import appImage4PNG      from 'src/assets/images/dashboard/panel/image-app-4.png'
import appImage5PNG      from 'src/assets/images/dashboard/panel/image-app-5.png'
import GalleryInPage     from 'src/components/general/gallery/GalleryInPage'
import Icon              from 'src/ui-kit/Icon'
import './AppGuide.scss'

const styles = {
  navBar: {
    height: 2,
    top: 100
  },
  navBarIn: {
    height: 2,
    width: '20%'
  }
}

function Header (item) {
  return <>
    <h6 className=" my-1 pb-3 text-center text-purple text-14 font-weight-bold">{item.title}</h6>
    <p className="text-center text-purple text-14 my-1">{item.text}</p>
  </>
}

const contents = [
  {
    description: Header(ui.app_guide_list[0]),
    original: appImage1PNG
  }, {
    description: Header(ui.app_guide_list[1]),
    original: appImage2PNG
  }, {
    description: Header(ui.app_guide_list[2]),
    original: appImage3PNG
  }, {
    description: Header(ui.app_guide_list[3]),
    original: appImage4PNG
  }, {
    description: Header(ui.app_guide_list[4]),
    original: appImage5PNG
  }

]
const AppGuide = () => {
  const [slide, setSlide] = useState(0)

  const handleSlide = (e) => {
    setSlide(e)
  }
  return <div className="pt-2 pb-4 ">
    <div className=" justify-content-center m-0">

      <div className='w-100 pe-2 ps-2  position-absolute d-flex flex-row-reverse' style={styles.navBar}>
        {
          ui.app_guide_list.map((item) => {
            const active = item.value === slide
            return <div key={item.value}
                        className={`d-flex justify-content-center ${active ? 'bg-gray-700' : 'bg-gray'} `}
                        style={styles.navBarIn}>
              {active && <Icon className={'pt-1'} type='caretUp'/>}
            </div>
          })
        }

      </div>
      <GalleryInPage
        settings={{
          additionalClass: 'SliderAppGuide',
          showThumbnails: false,
          showNav: true,
          autoPlay: false,
          showPlayButton: false,
          showFullscreenButton: false,
          onSlide: handleSlide
        }}
        items={contents}
      />

    </div>

  </div>
}

export default AppGuide

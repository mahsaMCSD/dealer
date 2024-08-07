import React      from 'react'
import background from 'src/assets/images/dashboard/panel/about-us/dealer-page-inspection-background-image.png'
import backgroundImg
                  from 'src/assets/images/dashboard/panel/about-us/dealer-page-inspection-detail-background-image.png'
import img1   from 'src/assets/images/dashboard/panel/about-us/dealer-page-inspection-section-1st-icon.svg'
import img2   from 'src/assets/images/dashboard/panel/about-us/dealer-page-inspection-section-2st-icon.svg'
import img3   from 'src/assets/images/dashboard/panel/about-us/dealer-page-inspection-section-3st-icon.svg'
import img4   from 'src/assets/images/dashboard/panel/about-us/dealer-page-inspection-section-4st-icon.svg'
import img5   from 'src/assets/images/dashboard/panel/about-us/dealer-page-inspection-section-5st-icon.svg'
import img6   from 'src/assets/images/dashboard/panel/about-us/dealer-page-inspection-section-6st-icon.svg'
import img7   from 'src/assets/images/dashboard/panel/about-us/dealer-page-inspection-section-7st-icon.svg'

const content = {
  'heading-section': {
    'title': {
      'colored-first-part': 'نحوه ',
      'second-part': 'دقیق کارشناسی خودرو',
      'colored-third-part': '۴۵'
    },
    'text': 'طی یک فرآیند کارشناسی تخصصی ۱۴۵ بخش‌ خودرو مورد برسی قرار می‌گیرد.'
  },
  'cards': [
    {
      'id': 1,
      'title': 'موتور',
      svg_url: img1
    },
    {
      'id': 2,
      'title': 'سیستم برق',
      svg_url: img2

    },
    {
      'id': 3,
      'title': 'سلامت لاستیک‌ها',
      svg_url: img3

    },
    {
      'id': 4,
      'title': 'سیستم تعلیق',
      svg_url: img4


    },
    {
      'id': 5,
      'title': 'رنگ و خوردگی',
      svg_url: img5

    },
    {
      'id': 6,
      'title': 'گیربکس',
      svg_url: img6


    },
    {
      'id': 7,
      'title': 'آپشن‌ها',
      svg_url: img7

    }
  ],
  'background-image': backgroundImg
}
const styles = {
  root: {
    background: 'url(' + background + ') center no-repeat',
    backgroundSize: 'cover'
  },
  imageCar: {
    top: '-80px',
    objectFit: 'contain',
    width: '160px',
    transform: 'rotate(32deg)'
  },
  detail:{
    borderRight:'10px solid',
  },
  detailList:{
    marginTop:'-50px',
    display: 'flex',
    flexWrap: 'wrap',
  }
}

const Inspection = () => {
  return <div style={styles.root} className='position-absolute pt-5 pb-5 pe-5'>
    <div className="d-flex flex-column pb-5">
      <h2 className="text-white text-right"><span
        className="text-orange">{content['heading-section']['title']['colored-first-part']}</span>{content['heading-section']['title']['second-part']}<span
        className="text-orange">{content['heading-section']['title']['colored-third-part']}</span>
      </h2>
      <p className="text-white text-center w-75 mt-5 lh-base">{content['heading-section']['text']}</p>
    </div>
    <div style={styles.detail} className='position-relative mt-5 pb-4 bg-white border-orange'>
      <img className="position-relative d-block m-auto right-0" style={styles.imageCar}
           src={content['background-image']} alt=""/>

      <div  style={styles.detailList}>
        {content['cards'].map((singleDescription) =>
          <div className="col-6" key={singleDescription.id}>
            <div className="d-flex align-items-center p-2">
              <div className='bg-gray rounded p-1 ms-2'>
                <img src={singleDescription.svg_url}/>
              </div>
              <p className="inspection-title">{singleDescription['title']}</p>
            </div>
          </div>
        )}
      </div>


    </div>
  </div>

}
export default Inspection



import React, {useState, useEffect} from 'react'
import {Link, Navigate}             from 'react-router-dom'
import img1                         from 'src/assets/images/onboarding1.png'
import img2                         from 'src/assets/images/onboarding2.png'
import img3                         from 'src/assets/images/onboarding3.png'
import GalleryInPage                from 'src/components/general/gallery/GalleryInPage'
import Ui                           from 'src/assets/dictionaries/ui'
import styled                       from 'styled-components'
import {useAuth}                    from 'src/hooks/useAuth'

const styles = {
  gallery: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'

  },
  text: {
    width: '190px',
    height: '75px'
  },
  bullet: {
    height: 14,
    width: 14,
    borderRadius: 7,
    border: '1px solid #f05b27',
    transition: 'all 0.3s ease'
  },
  bulletActive: {
    width: '30px',
    backgroundColor: '#f05b27'
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.17)'
  },
  footerBtn: {
    width: '120px',
    padding: '12px 0'
  },
  footerBtnLogin: {
    backgroundColor: 'rgba(240,91,39, 0.15)'
  }
}
const images = [
  {
    original: img1
  },
  {
    original: img2
  },
  {
    original: img3
  }
]


const OnBoarding = () => {
  const [slide, setSlide] = useState(0)
  const {user} = useAuth()
  const [seen, setSeen] = useState([])
  const handleSlide = (e) => {
    setSlide(e)

  }

  useEffect(() => {
    const has_id = seen.find(x => x === slide)
    if (has_id === undefined) {
      setSeen((prevState) => [...prevState, slide])
    }
  }, [slide])


  return user?.info ? <Navigate to={{
    pathname: '/dashboard/competing',
    state: {index: 0}
  }}/> : <MainOnBoarding className="w-desktop bg-purple" style={styles.root}>
           <div className=" d-flex pt-4 justify-content-center flex-column align-items-center" style={styles.main}>
             <GalleryInPage galleryStyle={styles.gallery}

                            settings={{
                              additionalClass: 'SliderOnBoarding',
                              showThumbnails: false,
                              showNav: false,
                              showPlayButton: false,
                              showFullscreenButton: false,
                              onSlide: handleSlide
                            }}
                            items={images}
             />
             <div className="d-flex mt-3 mb-4">
               {
                 [0, 1, 2].reverse()
                   .map(item =>
                     <div className={`m-1 ${seen.find(x => x === item) !== undefined ? 'bg-orange' : ''}`}
                          style={item === slide ? {...styles.bullet, ...styles.bulletActive} : {...styles.bullet}}/>
                   )
               }
             </div>
             <div>
               <h4 className="text-white text-center mb-4 text-18 font-weight-bold">
                 {Ui.on_boarding.description[slide].title}
               </h4>
               <h5 className="text-white text-center lh-base mx-auto text-15"
                   style={styles.text}>{Ui.on_boarding.description[slide].text}</h5>
             </div>
           </div>

           <footer className="d-flex position-fixed justify-content-center bottom-0  w-100 p-3 w-desktop"
                   style={styles.footer}>
             <Link to={'/register'} id='register'>
               <button className="btn btn-orange text-white ms-5 rounded text-16"
                       style={styles.footerBtn}>{Ui.register}</button>
             </Link>
             <Link to={'/login'} id='login'>
               <button className="btn text-white border-orange rounded text-16"
                       style={{...styles.footerBtn, ...styles.footerBtnLogin}}>{Ui.login}
               </button>
             </Link>
           </footer>
         </MainOnBoarding>
}

export default OnBoarding

const MainOnBoarding = styled.div`
  height: 100vh;
  overflow: hidden;
  position: fixed;
  width: 100%;
`
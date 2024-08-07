import React, {useState, useEffect} from 'react'
import PropTypes                    from 'prop-types'
import styled                       from 'styled-components'

const GalleryBullet = ({count, active, onClickBullet, classNameMain}) => {
  const [refs, onChangeRefs] = useState({})
  useEffect(() => {
    [...Array(count)].map((category, index) => {
      onChangeRefs((prevState) => ({...prevState, [index]: React.createRef()}))
    })
  }, [count])


  useEffect(() => {
    if (Object.keys(refs).length === count) {
      changePositionScroll(active)
    }
  }, [refs])
  useEffect(() => {
    changePositionScroll(active)
  }, [active])
  const changePositionScroll = (id) => {
    if (refs[id] && refs[id].current) {
      refs[id].current.scrollIntoView({inline: 'center', scrollBehavior: 'smooth'})
    }
  }

  return (<Main>
    <div className={`scroll-bullet ${classNameMain}`}
    >
      {[...Array(count)]
        .map((e, i) => <div key={i} ref={refs[i]} onClick={() => onClickBullet(i)}
                            className={`bullet ${active === i
                                                 ? 'bullet-active bg-orange-crayola'
                                                 : 'bg-black-400'} ${i + 1 === count
                                                                     ? 'ms-3'
                                                                     : ''}`}></div>
        )
      }


    </div>
  </Main>)
}

GalleryBullet.defaultProps = {
  count: 0,
  active: 1,
  onClickBullet: () => {}
}

GalleryBullet.propTypes = {
  count: PropTypes.number,
  active: PropTypes.number,
  onClickBullet: PropTypes.func
}

export default GalleryBullet

const Main = styled.div`
  display: flex;
  margin: 10px auto;
  overflow: hidden;
  width: 118px;

  .scroll-bullet {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .bullet {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 2px;
  }

  .bullet-active {
    width: 16px;
    border-radius: 8px;
    animation-name: example;
    animation-duration: 0.5s;
  }

  @keyframes example {
    from {
      width: 8px
    }
    to {
      width: 16px
    }
  }
`
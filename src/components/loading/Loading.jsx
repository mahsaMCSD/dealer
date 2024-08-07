import React      from 'react'
import LoadingGif from 'src/assets/images/loading-new.svg'

const styles = {
  loading: {
    backgroundImage: `url(${LoadingGif})`,
    backgroundSize: 'cover',
    height: '100px',
    width: '100px'
  },
  small:{
    height: '75px',
    width: '75px'
  }
}
const Loading = ({fullScreen}) => <div className={ fullScreen ?'position-absolute right-0 left-0 bottom-0 top-0 m-auto': 'position-relative me-auto ms-auto'} style={fullScreen ?styles.loading:{...styles.loading,...styles.small}}></div>
export default Loading
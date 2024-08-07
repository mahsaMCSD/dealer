import React     from 'react'
import Header    from 'src/components/dashboard/Header'
import PropTypes from 'prop-types'

const styles = {
  root: {
    zIndex: 2
  },
  children: {
    zIndex: -1
  }
}

const prevPage = (titleKey) => {
  switch (titleKey) {
    case 10:
    case 11:
      return '/dashboard/userPanel/wallet'
    default:
      return '/dashboard/userPanel'
  }
}

const Single = ({children, titleKey, onChangePage}) => {
  return <div className="position-absolute top-0 w-100" style={styles.root}>
    <div className="position-fixed bg-white w-100">
      <Header prevPage={prevPage(titleKey)} onChangePage={onChangePage} selectedIndex={titleKey}/>
    </div>
    <div className="mt-5 pt-1 w-100 mb-5 pb-5 position-relative" style={styles.children}>
      {children}
    </div>
  </div>
}

export default Single
Single.defaultProps = {
  children: '',
  titleKey: 5
}
Single.prototype = {
  children: PropTypes.any.isRequired,
  titleKey: PropTypes.number.isRequired
}

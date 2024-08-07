import React             from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Link,useParams}            from 'react-router-dom'
import PropTypes         from 'prop-types'
import Icon              from 'src/ui-kit/Icon'



const Header = ({title, onClickShare, shareText}) => {
  const {type} = useParams();
  const generateLink = ()=>{
      switch (type) {
        case "myOrders":
         return '/dashboard/myOrders/paid'
        case "myOffers":
          return '/dashboard/myOffers'
        case "inventory":
          return '/dashboard/competing/inventory/'
        default :
          return '/dashboard/competing/auctions'
      }
  }
 return <div>
    <div className='d-flex pe-4 ps-4'>
      <div className='col-2 text-right p-0'>
        <CopyToClipboard text={shareText} onCopy={onClickShare}>
          <span><Icon type='share' className='text-purple h3'/></span>
        </CopyToClipboard>
      </div>
      <div className='col-8'>
        <h5 className="font-weight-bold d-flex justify-content-center">{title}</h5>
      </div>
      <div className='col-2 text-left p-0'>
        <Link to={generateLink()}>
          <Icon type='angleLeft' className='text-purple h3 pointer font-weight-bold'/>
        </Link>
      </div>
    </div>
  </div>
}
Header.prototype = {
  title: PropTypes.string.isRequired
}

export default Header
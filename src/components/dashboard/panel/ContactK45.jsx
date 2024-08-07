import React, {useCallback, useEffect, useState} from 'react'
import Icon                                      from 'src/ui-kit/Icon'
import {getBranchCenter}                         from 'src/api/services/appUser'
import PropTypes                                 from 'prop-types'
import {connect}                                 from 'react-redux'
import styled                                    from 'styled-components'
import ui                                        from 'src/assets/dictionaries/ui'


const schemaContactCard = [
  {
    id: 1,
    label: ui.profile_page.contact_k45.your_agent,
    key: 'full_name'
  }, {
    id: 2,
    label: ui.profile_page.contact_k45.contact_us,
    key: 'contact_us'
  }
]

const ContactCard = ({label, number, value, full_width}) =>
  number ?
  <a href={'tel:' + number}
     className={`contact-card d-flex  ${full_width
                                        ? 'w-100 justify-content-center'
                                        : 'w-50'} radius-4 border border-yellow-orange`}>
    <Icon type="call" className="ms-1 text-yellow-orange"/>
    <h6 className={'mb-0 text-charcoal-800 d-flex align-items-center'}>
      {label}: <span className="font-weight-bold me-1 text-charcoal"> {value}</span>
    </h6>

  </a> : ''


const ContactK45 = (props) => {
  const [branch, setBranch] = useState(null)
  const [loading, toggleLoading] = useState(true)

  const getBranch = useCallback(() => {
    toggleLoading(true)
    getBranchCenter()
      .then(res => setBranch(res))
      .catch(console.log)
      .finally(() => {
        toggleLoading(false)
      })
  })

  useEffect(() => {
    getBranch()
  }, [])


  return <MainContactK45 className={'d-flex mt-1 pt-2'}>
    {schemaContactCard.map(contact =>
      <ContactCard label={contact.label}
                   full_width={!(props?.agentInfo?.mobile)}
                   number={contact.key === 'full_name'
                           ? props?.agentInfo?.mobile
                           : branch?.phone_without_dash}
                   value={contact.key === 'full_name'
                          ? props?.agentInfo?.fullname
                          : branch?.title}
                   key={contact.id}/>
    )}
  </MainContactK45>
}

ContactK45.defaultProps = {
  agentInfo: null
}
ContactK45.propTypes = {
  agentInfo: PropTypes.object
}
const mapStateToProps = state => ({
  agentInfo: state.userInfo.appUser.info.agent_info
})

export default connect(mapStateToProps)(ContactK45)

const MainContactK45 = styled.div`
  .contact-card {
    padding: 8px 10px;

    h6 {
      font-size: 9px;

      span {
        font-size: 11px;
      }
    }
  }

  .contact-card:last-child {
    margin-right: 4px;
  }
`
import React, {useEffect} from 'react'
import styled             from 'styled-components'
import {connect}          from 'react-redux'

import Modal                   from '../../ui-kit/modal/Modal'
import ui                      from '../../assets/dictionaries/ui'
import {onGettingIsConnection} from '../../store/ui/actions/onGettingIsConnection'

const ModalConnection = (props) => {

  useEffect(() => {
    document.addEventListener('click', () => props.gettingIsConnection())
    return () => document.removeEventListener('click', () => props.gettingIsConnection())
  }, [])

  return (
    <Modal postion="center" openModal={props.openModal} header={false}>
      <InnerModal>
        <i>
          <svg width="65" height="65" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.0591 10.1404C20.6191 10.6004 21.4391 10.5604 21.9491 10.0504C22.5391 9.46035 22.4991 8.48035 21.8491 7.95035C18.2591 5.01035 13.6491 3.92035 9.29906 4.69035L11.8891 7.28035C14.7791 7.25035 17.6891 8.20035 20.0591 10.1404ZM17.7891 11.9704C17.0091 11.4004 16.1591 10.9704 15.2691 10.6704L18.2191 13.6204C18.4591 13.0404 18.3191 12.3504 17.7891 11.9704ZM13.9491 16.2304C12.7291 15.6004 11.2691 15.6004 10.0391 16.2304C9.44906 16.5404 9.33906 17.3504 9.80906 17.8204L11.2791 19.2904C11.6691 19.6804 12.2991 19.6804 12.6891 19.2904L14.1591 17.8204C14.6491 17.3504 14.5491 16.5404 13.9491 16.2304ZM19.6791 17.9004L4.11906 2.34035C3.72906 1.95035 3.09906 1.95035 2.70906 2.34035C2.31906 2.73035 2.31906 3.36035 2.70906 3.75035L5.04906 6.10035C4.03906 6.60035 3.05906 7.21035 2.15906 7.95035C1.50906 8.48035 1.46906 9.46035 2.05906 10.0504C2.56906 10.5604 3.37906 10.6104 3.92906 10.1504C4.92906 9.33035 6.02906 8.69035 7.17906 8.22035L9.40906 10.4504C8.27906 10.7504 7.19906 11.2504 6.21906 11.9604C5.52906 12.4604 5.48906 13.4704 6.08906 14.0704L6.09906 14.0804C6.58906 14.5704 7.35906 14.6204 7.92906 14.2104C9.11906 13.3704 10.5091 12.9504 11.8991 12.9204L18.2691 19.2904C18.6591 19.6804 19.2891 19.6804 19.6791 19.2904C20.0691 18.9204 20.0691 18.2904 19.6791 17.9004Z"
              fill="#424653"/>
          </svg>
        </i>
        <div className="text-charcoal text-center text-16 my-4 font-weight-bold">
          {ui.text_without_network}
        </div>
      </InnerModal>
    </Modal>
  )
}

const mapStateToProps = state => ({
  openModal: state.ui.modal_connection
})

const mapDispatchToProps = dispatch => ({
  gettingIsConnection: () => dispatch(onGettingIsConnection())
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalConnection)

const InnerModal = styled.div`
  text-align: center;
  padding: 20px 0;
`

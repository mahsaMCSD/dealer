import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled                                            from 'styled-components'
import Icon                                              from 'src/ui-kit/Icon'
import ui                                                from 'src/assets/dictionaries/ui'
import {Link, useLocation}                               from 'react-router-dom'
import {getContractService}                              from 'src/api/services/notary'
import Loading                                           from 'src/components/loading/Loading'
import ModalContractDelete                               from './ModalContractDelete'
import ButtonCreate                                      from 'src/ui-kit/button-create/ButtonCreate'
import {getQueryParamsObject}                            from 'src/utility/helpers'
import {breakpointsPX}                                   from 'src/assets/js/consts'


const ContractCard = ({participation_type, attorney_type, first_name, last_name, selected, id, getData}) => {
  const [isOpenModalDelete, onToggleIsOpenModalDelete] = useState(false)

  const handleCloseModal = useCallback(() => onToggleIsOpenModalDelete(false), [isOpenModalDelete])
  const handleOpenModal = useCallback(() => onToggleIsOpenModalDelete(true), [isOpenModalDelete])

  return <div
    className={`contract-card overflow-hidden w-100 d-flex flex-column  radius-4 border  ${selected
                                                                                           ? 'border-yellow-orange'
                                                                                           : 'border-charcoal-600'}`}>
    <div className="d-flex justify-content-between align-items-center">
      <h6 className="text-black text-14 mb-0 line-height-24">
        {ui.notary_and_contract.contract.type_contract}:<span
        className='font-weight-700 me-1'>{participation_type.value}</span>
      </h6>
      {participation_type.id === 0 &&
      <div onClick={handleOpenModal} className="d-flex align-items-center"><Icon
        className={'text-24 pointer text-charcoal-800'}
        type={'trash1'}/></div>}
    </div>

    {participation_type.id !== 0 && <><h6 className="text-black line-height-24 text-14 my-2">
      {ui.notary_and_contract.contract.type_advocacy}:<span className='font-weight-700 me-1'>{attorney_type}</span>
    </h6>
      <div className="d-flex w-100 justify-content-between ">
        <h6 className="text-black text-14 mb-0 line-height-24 text-ellipsis ms-2">
          {ui.notary_and_contract.contract.colleague}: <span
          className='font-weight-700 me-1'>{first_name} {last_name}</span></h6>
        <div onClick={handleOpenModal} className="d-flex align-items-center"><Icon
          className={'text-24 pointer text-charcoal-800'} type={'trash1'}/></div>
      </div>
    </>
    }
    {
      isOpenModalDelete &&
      <ModalContractDelete dataModal={{
        participation_type: participation_type.value,
        full_name: first_name && last_name && `${first_name} ${last_name}`,
        attorney_type,
        id
      }}
                           closeModal={handleCloseModal}
                           getData={getData}/>

    }
  </div>
}


const ContractEmpty = () => <div
  className="d-flex contract-empty align-items-center flex-column justify-content-center">
  <Icon className={'contract-empty-icon text-charcoal mb-4'} type={'receiptEdit'}/>
  <h6 className="text-black-800 font-weight-700 text-16">{ui.notary_and_contract.contract.empty_title}</h6>
  <h6 className="text-black-800 font-weight-700 text-16">{ui.notary_and_contract.contract.empty_title_2}</h6>
  <p
    className="text-black-800 mt-3 text-center text-16">{ui.notary_and_contract.contract.empty_description}</p>
</div>

const Contract = ({selectable}) => {
  const [select, onChangeSelect] = useState()
  const location = useLocation()
  const [slug, onChangeSlug] = useState(getQueryParamsObject(location.search)?.slug)
  const [dataContract, onChangeDataContract] = useState({
    list: [],
    isNext: false,
    page: 1
  })
  const [isGettingData, onToggleIsGettingData] = useState(true)

  const getDataContract = useCallback((isMore) => {
    onToggleIsGettingData(true)
    onChangeSelect(null)
    const page = isMore ? dataContract.page + 1 : 1
    getContractService({page})
      .then((res) => {
        onChangeDataContract(prevState => ({
          ...prevState,
          page,
          count: res.count,
          list: isMore ? [...prevState.list, ...res.results] : res.results,
          isNext: !!res.next
        }))
      })
      .finally(() => onToggleIsGettingData(false))
  }, [location, dataContract])


  useEffect(() => {
    getDataContract()
  }, [])

  useEffect(() => {
    onChangeSlug(getQueryParamsObject(location.search)?.slug)
  }, [location])


  const observer = useRef(null)
  const showEnded = useCallback(node => {
    if (!node) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (dataContract.isNext && !isGettingData) {
          getDataContract('is_more')
        }
      }
    })
    if (node) observer.current.observe(node)
  })


  return <StyledContract
    className={'d-flex  mx-3 mt-3 flex-column align-items-center justify-content-center'}>

    {
      isGettingData && dataContract.list.length === 0 ?
      <div className="contract-loading align-items-center d-flex justify-content-center">
        <Loading fullScreen/>
      </div> :

      <>

        {
          dataContract.list.length === 0 ? <ContractEmpty/> : <div
            className={`contract-list overflow-auto flex-column w-100 align-items-center justify-content-center ${selectable
                                                                                                                  ? 'contract-list_selectable'
                                                                                                                  : ''}`}>
            {
              dataContract.list.map((contract_item, index) => <div key={contract_item}
                                                                   className="d-flex mb-3 align-items-center w-100"
                >
                  {selectable &&
                  <div onClick={() => selectable && onChangeSelect(contract_item.id)}>
                    <Icon
                      className={`${select === contract_item.id
                                    ? 'text-yellow-orange'
                                    : 'text-charcoal-600'} ms-2 pointer`}
                      type={`${select === contract_item.id ? 'tickSquare1' : 'tickSquareEmpty'}`}/>
                  </div>
                  }
                  <ContractCard key={contract_item.id}
                                {...contract_item}
                                getData={getDataContract}
                                selected={selectable && select === contract_item.id}/>
                  {dataContract.list.length < dataContract.count && index === dataContract.list.length - 2 &&
                  <div ref={showEnded}/>
                  }
                </div>
              )
            }
          </div>
        }

      </>
    }


    <div className="w-desktop position-relative">
      <footer className="me-3 bg-white pt-2 bottom-0 position-fixed">

        <ButtonCreate link={'/dashboard/userPanel/dealer-info/contract/create'}
                      label={ui.notary_and_contract.contract.contract_btn_add} icon={'addUpload'}/>
        {selectable && dataContract.list.length > 0 &&
        <Link
          to={select
              ? `/dashboard/myOrders/readyToPay?status=notary-and-contract&transferPreview=${select}&slug=${slug} ` : ''}
          className={`btn mt-3 w-100 radius-8 ${select
                                                ? 'bg-yellow-orange text-white'
                                                : 'bg-charcoal-200'}  text-16 font-weight-bold`}>{ui.verify}</Link>
        }
      </footer>


    </div>
  </StyledContract>
}

Contract.defaultProps =
  {
    selectable: false
  }


export default Contract

const StyledContract = styled.div`
  .contract-empty-icon {
    font-size: 64px;
  }


  .contract-empty {
    height: calc(100vh - 165px);
    @media all and (display-mode: standalone) {
      height: calc(100vh - 140px);
    }
  }


  .contract-list {
    height: calc(100vh - 170px);

    &.contract-list_selectable {
      height: calc(100vh - 210px);
    }

    @media (max-width: ${breakpointsPX.md}) {
      height: calc(100vh - 230px);
      &.contract-list_selectable {
        height: calc(100vh - 270px);
      }

      @supports (-webkit-touch-callout: none) {
        @media all and (display-mode: standalone) {
          height: calc(100vh - 160px);
          &.contract-list_selectable {
            height: calc(100vh - 220px);
          }
        }
      }
    }
  }

}

.contract-loading {
  height: 80vh;
}

footer {
  right: 0;
  width: calc(100% - 32px);
  padding-bottom: 2rem;
  @media (min-width: ${breakpointsPX.lg}) {
    width: calc(var(--max-dekstop) - 32px);
    right: auto;
  }

  .btn {
    padding: 10px 0;
  }
}

.contract-card {
  padding: 16px 12px;
}
`

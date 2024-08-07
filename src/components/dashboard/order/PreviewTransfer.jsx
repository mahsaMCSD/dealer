import React, {useCallback, useEffect, useState}              from 'react'
import ui                                                     from 'src/assets/dictionaries/ui'
import Modal                                                  from 'src/ui-kit/modal/Modal'
import {getContractByIdService, postSelectTransactionService} from 'src/api/services/notary'
import Loading                                                from '../../loading/Loading'
import BasicButton                                            from 'src/ui-kit/button/BasicButton'
import styled                                                 from 'styled-components'
import {getQueryParamsObject}                                 from 'src/utility/helpers'
import {useLocation}                              from 'react-router-dom'

const fields = [
  {
    key: 'participation_type',
    title: ui.notary_and_contract.contract.type_contract,
    value: 'participation_type_title'
  }, {
    key: 'attorney_type',
    title: ui.notary_and_contract.contract.type_advocacy,
    value: 'attorney_type'
  }, {
    key: 'third_person',
    title: ui.notary_and_contract.contract.name_colleague,
    value: 'third_person'
  }
]


const PreviewTransfer = ({
                           selectedPreview, onCloseModal, getDataList, data, typeModal, ...props
                         }) => {
  const [stateData, onChangeStateData] = useState()
  const [isLoading, onToggleIsLoading] = useState(false)
  const location = useLocation()

  const getData = useCallback(() => {
    selectedPreview && getContractByIdService(selectedPreview)
      .then((res) => onChangeStateData({
        ...res,
        third_person: res.first_name && res.last_name && `${res.first_name} ${res.last_name}`,
        participation_type_title: res.participation_type.value
      }))
  }, [selectedPreview])


  const onSubmit = useCallback(() => {
    if (typeModal === 'selectablePreviewPreContract') {
      onToggleIsLoading(true)
      const contract_slug = getQueryParamsObject(location.search)?.slug
      postSelectTransactionService({
        contract_slug,
        contract_template: selectedPreview
      })
        .then(() => getDataList())
        .finally(() => {
          onCloseModal()
          onToggleIsLoading()
        })
    } else {
      onCloseModal()
    }

  }, [selectedPreview])

  useEffect(() => {
    if (typeModal === 'selectablePreviewPreContract') {
      getData()
    }
    return () => {
      onChangeStateData(undefined)
    }
  }, [selectedPreview])
  useEffect(() => onChangeStateData(data), [data])

  return <Modal openModal={!!selectedPreview}
                closeModal={onCloseModal}
                title={ui.order_page.preview.title}>
    <StyledPreviewTransfer className="my-3">
      {stateData ? <div className="mx-3">

        <div className="bg-black-50 border-black-100 border d-flex flex-column radius-8 py-1 px-2">
          {
            fields.map(field => stateData[field.value] &&
              <h6
                className="px-1 text-12 my-1 overflow-hidden line-height-20 text-black text-center">{field.title} :<span
                className="font-weight-700 me-2">{stateData[field.value]}</span></h6>)
          }
        </div>
        <BasicButton isLoading={isLoading}
                     onClick={onSubmit}
                     className="radius-8 bg-yellow-orange text-16 d-block mt-4 w-100 bg-submit text-white">
          {
            typeModal === 'selectablePreviewPreContract' ? ui.order_page.preview.submit : ui.order_page.preview.close
          }
        </BasicButton>

      </div> : <div className="h-50 py-5"><Loading/></div>}
    </StyledPreviewTransfer>

  </Modal>
}

PreviewTransfer.defaultProps = {
  getDataList: () => {},
  onCloseModal: () => {},
  data: undefined,
  typeModal: 'selectablePreviewPreContract',
  selectedPreview: false
}

export default PreviewTransfer

const StyledPreviewTransfer = styled.div`
  .bg-submit {
    padding: 10px 0;
  }
`

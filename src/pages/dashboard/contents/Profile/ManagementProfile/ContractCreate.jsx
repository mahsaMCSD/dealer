import React, {useCallback, useState}        from 'react'
import SelectBox                             from 'src/ui-kit/SelectBox'
import ui                                    from 'src/assets/dictionaries/ui'
import styled                                from 'styled-components'
import {fieldsCreateContract, typesContract} from './SchemaContract'
import MatInput                              from 'src/ui-kit/mat-input/MatInput'
import ImageUploader                         from 'src/ui-kit/mat-input/image-uploader/ImageUploader'
import {createContractService}               from 'src/api/services/notary'
import BasicButton                           from 'src/ui-kit/button/BasicButton'
import NotificationManager                   from 'src/ui-kit/notifications/NotificationManager'
import {createDealerImage}                   from 'src/api/services/appUser'
import {useNavigate}                         from 'react-router-dom'


const Inputs = ({fieldItem, values, isLoadingImage, onChange}) => {
  switch (fieldItem.type) {
    case 'input':
      return <MatInput label={fieldItem.label}
                       list={fieldItem.list}
                       name={fieldItem.name}
                       key={fieldItem.name}
                       value={values[fieldItem.name]}
                       required={fieldItem.isRequired}
                       onChange={onChange}
                       type={fieldItem.type_input}/>
    case 'file':
      return <ImageUploader label={fieldItem.label}
                            list={fieldItem.list}
                            name={fieldItem.name}
                            key={fieldItem.name}
                            isLoading={isLoadingImage}
                            handleChange={(e) => onChange({...e, type: 'file'})}
                            sizeCropper={8.5 / 5.4}
                            isRequired={fieldItem.isRequired}
                            value={values[`${fieldItem.name}_file`]}
      />
    case 'select':
      return <SelectBox tBox label={fieldItem.label}
                        list={fieldItem.list}
                        name={fieldItem.name}
                        key={fieldItem.name}
                        isRequired={fieldItem.isRequired}
                        onChange={onChange}
                        value={(fieldItem.list ? fieldItem.list : typesContract).find(types => types.id === parseInt(
                          values[fieldItem.name]))}
      />
    default:
      break
  }
}

const Form = ({values, isLoadingImage, onChange}) => <>
  {
    fieldsCreateContract.map((fieldItem) => <>
        {
          fieldItem.key === 'full_name' && <h5
            className="text-16 mt-4 pt-3 font-weight-700 text-black-800">{ui.notary_and_contract.contract.info_my_colleague}</h5>
        }
        <Inputs fieldItem={fieldItem} values={values} isLoadingImage={isLoadingImage} onChange={onChange}/>
      </>
    )
  }
</>

const addErrorRequired = () => {
  const required = fieldsCreateContract
    .reduce((result, current) => {
      if (current.isRequired) {
        result.push(current.name)
      }
      return result
    }, [])
  return required
}


const ContractCreate = () => {
  const [values, onChangeValues] = useState({})
  const [errors, onChangeErrors] = useState(addErrorRequired)
  const [isLoading, onChangeIsLoading] = useState(false)
  const [isLoadingImage, onChangeIsLoadingImage] = useState(false)
  const history = useNavigate()
  const removeError = useCallback((field_name) => {
      const removeError = errors.filter(er => er !== field_name)
      onChangeErrors(removeError)
    }
    , [errors])

  const handleError = useCallback((name, isError) => {
    const hasFieldError = errors.find(er => er === name)
    if (hasFieldError && !isError) {
      removeError(name)
    } else if (isError) {
      onChangeErrors(prevState => [...prevState, name])
    }

  }, [errors])

  const onChange = useCallback((e) => {
    let value
    const name = e.select ? e.select.name : e.target.name
    if (e.type === 'file') {
      if (e.target.value) {
        const typeImage = 2
        onChangeIsLoadingImage(true)
        createDealerImage({type: typeImage, file: e.target.value})
          .then(res => {
            onChangeValues(prevState => ({
              ...prevState,
              [name]: res.id,
              [`${name}_file`]: res.file
            }))
            handleError(name, e.error)

          })
          .finally(() => { onChangeIsLoadingImage(false)})
      } else {
        onChangeValues(prevState => ({
          ...prevState,
          [name]: null,
          [`${name}_file`]: null
        }))
        handleError(name, e.error)
      }

    } else {
      if (e.select) {
        value = e.select.item.id
      } else {
        value = e.target.value
      }

      onChangeValues(prevState => ({...prevState, [name]: value}))
      if (!(name === 'participation_type' && value === 0)) {
        handleError(name, e.error)
      }
    }

  }, [errors])
  const onSubmitContract = () => {
    if (!isLoading) {
      if (values.participation_type !== 0 && errors.length !== 0) return false
      onChangeIsLoading(true)
      const body = values.participation_type === 0 ? {participation_type: 0} : values
      createContractService(body)
        .then(() => {
            history(-1)
            NotificationManager.success(ui.notary_and_contract.contract.success_submit)
          }
        )
        .catch((e) => {
          if (e.data.result?.message) {
            NotificationManager.error(e.data.result?.message)

          } else if (typeof e.data === 'object') {
            Object.keys(e.data)
              .map(keyField => NotificationManager.error(e.data[keyField]))
          }
        })
        .finally(() => onChangeIsLoading(false))
    }
  }


  return <StyledContractCreate className="px-3 overflow-auto">
    <SelectBox name="participation_type" isRequired={true} onChange={onChange}
               value={typesContract.find(types => types.id === parseInt(values.participation_type))}
               label={ui.notary_and_contract.type_contract} list={typesContract}/>
    {values.participation_type ?
     <Form onChange={onChange} isLoadingImage={isLoadingImage} values={values}/>
                               : ''}
    <footer className="position-fixed bottom-0 pt-3 pb-4 bg-white w-desktop">
      <BasicButton
        isLoading={isLoading}
        onClick={onSubmitContract}
        className={`radius-8  notary-submit ${errors.length === 0 || values.participation_type === 0
                                              ? 'bg-yellow-orange'
                                              : 'bg-charcoal-200'} border-0 text-16 text-white `}>{ui.notary_and_contract.contract.save_contract}</BasicButton>
    </footer>

  </StyledContractCreate>
}

export default ContractCreate

const StyledContractCreate = styled.div`
  padding-bottom: 64px !important;
  height: 100vh;
  @media all and (display-mode: standalone) {
    height: calc(100vh - env(safe-area-inset-bottom));
  }

  footer {
    z-index: 1000;
    width: 100%;

    .notary-submit {
      width: 100%;
    }

    &.w-desktop .notary-submit {
      padding: 10px 0;
      width: calc(100% - 32px);
    }
  }
`

import React, {useCallback, useRef} from 'react'
import styled                       from 'styled-components'
import PropTypes                    from 'prop-types'
import Icon                         from 'src/ui-kit/Icon'


const InputSearch = ({value, onChange, ...props}) => {
  const refInput = useRef()

  const onFocus = useCallback(() =>
      refInput?.current.focus()
    , [refInput])

  return <StyledInputSearch
    className={'text-right radius-8 w-100 border text-field text-16  w-100 border-charcoal-200 justify-content-between border-1 w-100 align-items-center d-flex'}
    onClick={onFocus}>
    <div className='d-flex align-items-center w-100'>
      <Icon type={'searchNormal'} className={'text-charcoal-400 search-icon text-20'}/>
      <input {...props} ref={refInput} value={value} onChange={onChange} className='text-black-800 w-100 text-14'/>
    </div>
    {value &&
    <div className='d-flex align-items-center pointer'
         onClick={() =>
           onChange({
             target: {
               value: ''
             }
           })
         }
    ><Icon type={'closeCircle1'} className={'text-charcoal-800 text-20'}/></div>}
  </StyledInputSearch>
}

InputSearch.defaultProps = {
  placeholder: '',
  label: '',
  name: '',
  onChange: () => {}
}
InputSearch.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
}

const areEqual = (prevProps, nextProps) => prevProps.value === nextProps.value

export default React.memo(InputSearch, areEqual)

const StyledInputSearch = styled.div`
  margin: 24px 0 10px 0;
  padding: 0 16px;


  input {
    all: unset;
    margin-right: 12px;
    padding: 11px 0;
  }

  .search-icon {
    margin: 11px 0;
  }

  input::placeholder {
    color: var(--black-600);
  }

`

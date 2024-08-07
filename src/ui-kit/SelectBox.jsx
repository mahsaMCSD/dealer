import React, {useEffect, useState} from 'react'
import PropTypes                    from 'prop-types'
import styled                       from 'styled-components'

import Icon from '../ui-kit/Icon'
import ui   from '../assets/dictionaries/ui'

const SelectBox = ({className, label, list, onChange, value, name, isRequired}) => {

  const [isShowList, toggleIsShowList] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleOpenList = () => {
    toggleIsShowList(!isShowList)
  }

  const handleSelected = (item) => {
    setSelected(item)
    toggleIsShowList(false)
    onChange({select: {item, name}})
  }

  useEffect(() => {
    if (value !== selected) {
      setSelected(value)
    }
  }, [value])

  return (
    <SelectBoxStyled className={className}>
      <div className={`select-box-inner radius-8 position-relative bg-transparent d-flex align-items-center justify-content-between 
      ${isShowList ? 'border-yellow-orange' : ''}`} onClick={handleOpenList}>
        <div className={`label-select-box text-16 ${isShowList && !selected
                                                    ? 'text-black-400'
                                                    : 'text-black-800'}`}>{selected
                                                                           ? selected.title
                                                                           : `${label} ${isShowList
                                                                                         ? ui.selected
                                                                                         : ''}`} {isRequired && !selected && '*'}</div>
        {isShowList ? <Icon type="arrowUp"/> : <Icon type="arrowDown"/>}
      </div>
      {
        isShowList &&
        <div className="modal-select-box position-absolute left-0 right-0 radius-8 bg-white">
          {list.length &&
          <ul className="d-flex flex-column text-black-800" name={name}>
            {list.map(item => <li className="d-flex item-select-box text-15" key={item.id}
                                  onClick={() => handleSelected(item)}>
              {item.title}
            </li>)}
          </ul>
          }
        </div>
      }
      {
        isShowList && <div className="bg-overlay position-fixed h-100 w-100 top-0 left-0 bottom-0 right-0"
                           onClick={() => toggleIsShowList(false)}></div>
      }
    </SelectBoxStyled>
  )
}
SelectBox.defaultProps = {
  list: [],
  className: 'my-4',
  label: '',
  onChange: () => {},
  isRequired: false
}
SelectBox.propType = {
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool
}

export default SelectBox

const SelectBoxStyled = styled.div`
  position: relative;

  .select-box-inner {
    height: 54px;
    cursor: pointer;
    border: 1px solid var(--charcoal-800);
    padding: 8px 20px;

    .label-select-box {
      font-weight: 400;
      right: 18px;
      color: var(--black-800);
    }
  }

  .modal-select-box {
    border: 1px solid var(--yellow-orange);
    padding: 8px 16px;
    z-index: 20;
    margin-top: 3px;

    ul {
      .item-select-box {
        border-bottom: 1px solid var(--charcoal-200);
        font-weight: 400;
        padding: 8px 4px;
        cursor: pointer;
      }

      .item-select-box:last-child {
        border-bottom: none;
      }
    }
  }

  .bg-overlay {
    z-index: 15;
  }

  .icon-arrow-down:before {
    color: var(--black-800);
  }

`

import React, {useState} from 'react'
import PropTypes         from 'prop-types'
import Modal             from 'src/ui-kit/modal/Modal'
import Icon              from '../Icon'

const styles = {

  input: {
    height: '3.5rem',
    backgroundColor: '#fcfcfc',
    borderRadius: '0.35rem',
    ':placeholder': {
      color: '#000'
    }
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    minHeight: '50vh'
  },
  overlay: {
    backgroundColor: 'transparent'

  },
  checkCircle: {
    top: -2,
    fontSize: '17px'
  }
}
const Select = ({input, className, error, list}) => {
  const [showModal, setShowModal] = useState(false)
  const handelModal = () => {
    setShowModal(!showModal)
  }
  const selected = (key) => {
    input.onChange(key)
    handelModal()
  }
  return <>
    <div
      className={`d-flex ${error ? 'border-danger border border-2' : ''} ${className ? className : ''}`}
      style={styles.input}
      onClick={handelModal}
    >

      <div className={`p-0 d-flex align-items-center h-100 w-100`}  id={input.id}>
        <h6 className="w-100 text-gray-700 border-0 mx-3 mb-0 text-16">
          {input.value.toString() ? list.find(item => item.id === input.value).title : input.placeholder}
        </h6>
        <Icon type="chevronDown" className="ms-3"/>
      </div>
    </div>
    <Modal openModal={showModal} style={{content: styles.content, overlay: styles.overlay}} header={false}
           closeModal={handelModal}>
      {list &&
      <ul className="d-flex flex-column p-1">
        {list.map(item => <li className="m-2 d-flex" key={item.id} onClick={(e) => selected(item.id)}>
          <h6 className="text-white pe-4 text-16 mb-0 d-flex font-weight-bold align-items-center position-relative">
            {input.value === item.id ?
             <Icon style={styles.checkCircle} className="ms-1 h4 text-orange position-absolute right-0"
                   type="checkCircle"/>
                                     :
             <span className="ms-1 h4 mb-0 position-absolute right-0 pe-2">-</span>}{item.title}</h6>
        </li>)}
      </ul>
      }

    </Modal>
  </>
}
Select.defaultProps = {
  list: [],
  error: false,
  className: '',
  input: {
    value: null,
    placeholder: ''
  }
}
Select.propType = {
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  className: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.any,
    placeholder: PropTypes.string
  })
}

export default Select

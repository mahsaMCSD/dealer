import ui from 'src/assets/dictionaries/ui'

const typesAdvocacy = [
  {
    id: 1,
    title: ui.notary_and_contract.contract.advocacy_work
  }, {
    id: 0,
    title: ui.notary_and_contract.contract.advocacy_sale
  }
]

export const fieldsCreateContract = [
  {
    key: 'attorney_type',
    name: 'attorney_type',
    label: ui.notary_and_contract.contract.type_advocacy,
    type: 'select',
    isRequired: true,
    list: typesAdvocacy
  }, {
    key: 'first_name',
    name: 'first_name',
    label: ui.notary_and_contract.contract.first_name,
    type: 'input',
    isRequired: true,
    type_input: 'string'
  }, {
    key: 'last_name',
    name: 'last_name',
    label: ui.notary_and_contract.contract.last_name,
    type: 'input',
    isRequired: true,
    type_input: 'string'
  }, {
    key: 'mobile',
    name: 'mobile',
    label: ui.notary_and_contract.contract.mobile_number,
    type: 'input',
    isRequired: true,
    type_input: 'mobile'
  }, {
    key: 'national_code',
    name: 'national_code',
    label: ui.notary_and_contract.contract.national_card,
    type: 'input',
    isRequired: true,
    type_input: 'national_code'
  }, {
    key: 'national_card_photo',
    name: 'national_card_photo',
    isRequired: true,
    label: ui.notary_and_contract.contract.image_national_card,
    type: 'file'
  }
]

export const typesContract = [
  {
    id: 0,
    title: ui.notary_and_contract.contract.monfreda
  }, {
    id: 1,
    title: ui.notary_and_contract.contract.motafegha
  }, {
    id: 2,
    title: `${ui.notary_and_contract.contract.monfreda} ${ui.notary_and_contract.contract.motafegha}`
  }
]

import React, {useEffect, useState} from 'react'
import moment                       from 'moment-jalaali'
import Input                        from 'src/ui-kit/input/Input'
import ui                           from 'src/assets/dictionaries/ui'
import InputNumber                  from 'src/ui-kit/input/InputNumber'
import DatePicker                   from 'src/ui-kit/input/DatePicker'
import BasicButton                  from 'src/ui-kit/button/BasicButton'
import {priceRangeChargeWallet}     from 'src/utility/consts'
import {postOfflineChargeServices}  from 'src/api/services/payment'
import Formatter                    from 'src/utility/Formatter'

const _Formatter = new Formatter()

const listDate = [
  {
    id: 0,
    title: ui.wallet_charge_page.today
  }, {
    id: 1,
    title: ui.wallet_charge_page.yesterday
  }, {
    id: 2,
    title: ui.wallet_charge_page.the_day_before_yesterday
  }
]


const formatJallai = 'jYYYYjMMjDD'

const FormPreviewOfflineCharge = ({handleAmount, image, handleShowReceiptOfflineCharge, gateway}) => {
  const [data, onChangeData] = useState({
    amount: '',
    gateway: '',
    reference_number: '',
    payment_time: moment(new Date())
      .format(formatJallai),
    days: 0
  })

  const [isLoading, onChangeIsLoading] = useState(false)
  const [errors, onChangeError] = useState({})
  const [isValidDate, onChangeIsValidDate] = useState(true)


  const onSubmit = (e) => {
    e.preventDefault()
    onSubmitOfflineCharge()
  }

  const checkValidForm = () => {
    if ((data.amount && data.amount >= priceRangeChargeWallet.minimumPrice) && data.reference_number && isValidDate) {
      return true
    } else {
      const errors = {}
      if (data.amount < priceRangeChargeWallet.minimumPrice) {
        errors.amount = ui.minimum_amount.format(_Formatter.commaSeparateNumber(
          priceRangeChargeWallet.minimumPrice))
      }

      if (!data.reference_number) {
        errors.reference_number = ui.isRequired
      }
      if (!isValidDate) {
        errors.payment_time = ui.format_data
      }
      onChangeError(errors)
      return false
    }
  }

  const onSubmitOfflineCharge = () => {
    handleAmount(data.amount)
    const isValid = checkValidForm()
    if (isValid && !isLoading) {
      onChangeIsLoading(true)
      const body = {
        ...data,
        gateway: data.gateway.slug,
        image,
        payment_time: moment(data.payment_time, formatJallai)
          .format('YYYY-MM-DDTHH:mm:ssZ')
      }
      delete body['days']
      postOfflineChargeServices(body)
        .then(() => handleShowReceiptOfflineCharge('success'))
        .catch(() => handleShowReceiptOfflineCharge('un_success'))
        .finally(() => onChangeIsLoading(false))
    }
  }

  const findDateBeforeDay = (before) => {
    const nowDate = new Date()
    nowDate.setDate(nowDate.getDate() - before)
    return nowDate
  }

  const checkDayValue = (val) => {
    switch (val) {
      case  moment(new Date())
        .utc()
        .format(formatJallai):
        return 0
      case  moment(findDateBeforeDay(1))
        .utc()
        .format(formatJallai):
        return 1
      case  moment(findDateBeforeDay(2))
        .format(formatJallai):
        return 2
      default :
        return null
    }
  }


  const onChangeInput = (e) => {

    if (e.name === 'payment_time' && !e.isValid) {
      onChangeIsValidDate(false)
    } else {
      const newErrors = errors
      delete newErrors[e.name]
      onChangeError(newErrors)
      onChangeIsValidDate(true)
    }

    if (e.name === 'payment_time') {
      onChangeData(prevState => ({
        ...prevState, [e.name]: e.value, days:
          checkDayValue(e.value)
      }))
    } else {
      onChangeData(prevState => ({...prevState, [e.name]: e.value}))

    }
  }

  const onChangeDays = (val) =>
    onChangeData(prevState => ({
      ...prevState,
      days: val,
      payment_time: moment()
        .subtract(val, 'day')
        .format(formatJallai)
    }))


  useEffect(() => {
    gateway?.length > 0 && onChangeData(prevState => ({
      ...prevState,
      gateway: gateway?.find(get => get.slug.toLowerCase() === 'mellat-offline-deposit')
    }))
  }, [gateway])


  return <form onSubmit={onSubmit}>
    <div className="d-flex flex-column align-items-center">
      <img src={image} className="upload-file--image-receipt" />
      <div className="w-100">
        <Input label={ui.wallet_charge_page.select_account} readOnly value={data.gateway?.bank}/>
        <InputNumber label={ui.price_deposit}
                     type="price"
                     name="amount"
                     value={data.amount}
                     error={errors.amount}
                     isRequired
                     handleChange={onChangeInput}
        />
        <Input label={ui.wallet_charge_page.reference_number}
               name="reference_number"
               value={data.reference_number}
               error={errors.reference_number}
               isRequired
               handleChange={onChangeInput}/>
        <DatePicker label={ui.wallet_charge_page.payment_time}
                    value={data.payment_time}
                    name="payment_time"
                    error={errors.payment_time}
                    placeholder={ui.placeholder_date}
                    isRequired
                    handleChange={onChangeInput}
        />
      </div>

      <div className="d-flex justify-content-between w-100 chip-days">
        {
          listDate.map(date => <div onClick={() => onChangeDays(date.id)}
                                    className={`btn chip-day bg-charcoal-50 text-black-600 ${date.id === data.days ? 'chips-day__active border-yellow-orange text-yellow-orange' : ''}`}
                                    id={date.id}>{date.title}</div>)
        }
      </div>

      <BasicButton type="submit"
                   isLoading={isLoading}
                   className="btn-orange btn text-white w-100">{ui.upload_receipt}</BasicButton>
    </div>
  </form>

}

export default FormPreviewOfflineCharge
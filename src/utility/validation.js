import moment from 'moment-jalaali'

export const validationDataPickerJallali = (date, maxDateNowDate) => {
  const isFormatValid = date.match(
    /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|([1-2][0-9])|(0[1-9]))))$/)

  if (!isFormatValid || !maxDateNowDate) return false
  const newDateMoment = moment(date, 'jYYYY/jMM/jDDT00:00')
  return newDateMoment._d && newDateMoment._d.getTime() < new Date().getTime()
}
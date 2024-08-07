export const regex = {
  email: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
  postal_code: '^$|(?!(\\d)\\1{3})[13-9]{4}[1346-9][013-9]{5}$',
  mobile: '^0?9[0-9]{9}$',
  string: '^[\u0600-\u06FF\\s]+$',
  identity_code: '^[0-9]{10}$',
  number: '^[0-9]*$',
  price: '^([1-9][0-9,]*)?$',
  phone: '^$|^0\\d{2,3}\\d{8}$'
}

const validation_list = {
  string: {
    type: 'text',
    pattern: regex.string,
    message: 'متن باید با حروف فارسی وارد شود.',
    maxLength: 70
  }, price: {
    type: 'tel',
    pattern: regex.price,
    message: 'مبلغ ورودی، صحیح نیست.',
    maxLength: 20
  },
  email: {
    type: 'email',
    pattern: regex.email,
    message: 'ایمیل وارد شده اشتباه است .'
  },
  mobile: {
    type: 'tel',
    pattern: regex.mobile,
    message: 'شماره موبایل وارد شده اشتباه است .',
    maxLength: 11
  },
  phone: {
    type: 'tel',
    pattern: regex.phone,
    message: 'شماره تلفن وارد شده اشتباه است .',
    maxLength: 11
  },
  number: {
    type: 'number',
    pattern: regex.number,
    message: 'شماره  وارد شده اشتباه است .'
  },
  national_code: {
    type: 'tel',
    message: 'کد ملی وارد شده اشتباه است .',
    comparator: (v1) => checkNationalCode(v1),
    maxLength: 10
  },
  postal_code: {
    type: 'tel',
    pattern: regex.postal_code,
    message: 'کد پستی وارد شده اشتباه است .',
    maxLength: 10
  },
  identity_code: {
    type: 'tel',
    pattern: regex.identity_code,
    message: 'شماره شناسنامه 10 رقم می‌باشد .',
    maxLength: 10
  }
}

export function checkNationalCode (code) {
  var L = code.length
  if (L === 0) return true
  if (L < 8 || parseInt(code, 10) == 0 || new RegExp(`^[${code.substr(0,1)}\s]+$`).test(code)) return false
  code = ('0000' + code).substr(L + 4 - 10)
  if (parseInt(code.substr(3, 6), 10) == 0) return false
  var c = parseInt(code.substr(9, 1), 10)
  var s = 0
  for (var i = 0; i < 9; i++) {
    s += parseInt(code.substr(i, 1), 10) * (10 - i)
  }
  s = s % 11
  return (s < 2 && c == s) || (s >= 2 && c == (11 - s))
  return true
}

export const typeValidation = (type) => {
  let list_valid = validation_list
  switch (type) {
    case 'string':
      return list_valid.string
      break
    case 'price':
      return list_valid.price
      break
    case 'email':
      return list_valid.email
      break
    case 'mobile':
      return list_valid.mobile
      break
    case 'national_code':
      return list_valid.national_code
      break
    case 'identity_code':
      return list_valid.identity_code
      break
    case 'postal_code':
      return list_valid.postal_code
      break
    case 'number':
      return list_valid.number
      break
    case 'phone':
      return list_valid.phone
      break
    default:
      break
  }
}

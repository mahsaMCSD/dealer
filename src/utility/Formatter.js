export default class Formatter {
  commaSeparateNumber (x) {
    if (!x) x = 0
    return this.normalizeToFarsi(x.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ','))
  }

  normalizeReplace (table, val) {
    let string = val
    for (let bad in table) {
      if (!table.hasOwnProperty(bad)) continue
      string = string.replace(new RegExp(bad, 'g'), table[bad])
    }
    return string
  }

  normalizeToFarsi (val) {
    let table = {'0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴', '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹'}
    return this.normalizeReplace(table, val)
  }

  normalizeToEnglish (val) {
    let table = {'۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'}
    return this.normalizeReplace(table, val)
  }

  docCount (val) {
    switch (val) {
      case '1252':
        return this.normalizeToFarsi('1')
      case '1253':
        return this.normalizeToFarsi('2')
      case '1254':
        return this.normalizeToFarsi('2+')
      default:
        return '?'
    }
  }
}

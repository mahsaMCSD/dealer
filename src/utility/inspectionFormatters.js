export function refsSegmentsToSlug (refsSegment) {
  switch (refsSegment) {
    case 'مشخصات خودرو':
      return 'carDetails'
    case 'ریز مستندات':
      return 'documentations'
    case 'بدنه + لاستیک':
      return 'carBody'
    case 'موتور':
      return 'engine'
    case 'سیستم برقی + داخلی':
      return 'electricalSystem'
    case 'سیستم تعلیق':
      return 'carSuspension'
    case 'تهویه مطبوع':
      return 'airConditioning'
    default:
      return ''
  }
}

export function inspectionReportCarBodyDotsTitlesToSlug (title) {
  switch (title) {
    case 'قاب رکاب شاگرد':
      return 1
    case 'رکاب شاگرد':
      return 2
    case 'گلگیر شاگرد جلو':
      return 3
    case 'درب شاگرد جلو':
    case 'زه درب شاگرد جلو':
      return 4
    case 'درب شاگرد عقب':
    case 'زه درب شاگرد عقب':
      return 5
    case 'گلگیر شاگرد عقب':
      return 6
    case 'ستون شاگرد جلو':
      return 7
    case 'شیشه کناری شاگرد جلو':
      return 8
    case 'ستون شاگرد وسط':
      return 9
    case 'شیشه کناری شاگرد عقب':
      return 10
    case 'ستون شاگرد عقب':
      return 11
    case 'ناودانی شاگرد':
      return 12
    case 'اینه شاگرد':
      return 13
    case 'سپر جلو':
      return 14
    case 'درب موتور':
    case 'شاسی راننده جلو':
    case 'شاسی شاگرد جلو':
    case 'سینی جلو':
      return 15
    case 'سقف':
    case 'رنگ کامل سقف':
      return 16
    case 'درب صندوق':
    case 'شاسی راننده عقب':
    case 'شاسی شاگرد عقب':
    case 'سینی عقب':
    case 'رنگ کامل عقب':
      return 17
    case 'چراغ شاگرد عقب':
    case 'چراغ شاگرد دنده عقب':
    case 'چراغ شاگرد ترمز':
      return 18
    case 'سپر عقب':
    case 'فلاپ عقب':
      return 19
    case 'جلوپنجره':
      return 20
    case 'چراغ راننده دنده عقب':
    case 'چراغ راننده ترمز':
    case 'چراغ راننده عقب':
      return 21
    case 'اینه راننده':
      return 22
    case 'ناودانی راننده':
      return 23
    case 'ستون راننده جلو':
      return 24
    case 'شیشه کناری راننده جلو':
      return 25
    case 'ستون راننده وسط':
      return 26
    case 'شیشه کناری راننده عقب':
      return 27
    case 'ستون راننده عقب':
      return 28
    case 'گلگیر راننده جلو':
      return 29
    case 'درب راننده جلو':
    case 'زه درب راننده جلو':
      return 30
    case 'درب راننده عقب':
    case 'زه درب راننده عقب':
      return 31
    case 'گلگیر راننده عقب':
      return 32
    case 'قاب رکاب راننده':
      return 33
    case 'رکاب راننده':
      return 34
    case 'شیشه جلو':
      return 35
    case 'شیشه عقب':
      return 36
    case 'چراغ راننده جلو':
      return 37
    case 'چراغ شاگرد جلو':
      return 38
    case 'رنگ کامل جلو':
      return [3, 15, 29]
    case 'رنگ کامل سمت راننده':
      return [29, 30, 31, 32]
    case 'رنگ کامل سمت شاگرد':
      return [3, 4, 5, 6]
    case 'کف صندوق':
      return 39
    case 'رینگ جلو راننده':
      return 40
    case 'رینگ جلو شاگرد' :
      return 41
    case 'رینگ عقب راننده':
      return 42
    case 'رینگ عقب شاگرد':
      return 43
    default:
      return 0
  }
}

export const inspectionReportCarBodyDotsPosition = {
  0: {
    // display: 'none',
    // opacity: 0
  },
  1: {
    top: '3%', left: '40%'
  },
  2: {
    top: '3%', left: '46%'
  },
  3: {
    top: '12%', left: '27%'
  },
  4: {
    top: '12%', right: '52%'
  },
  5: {
    top: '12%', right: '41%'
  },
  6: {
    top: '12%', right: '25%'
  },
  7: {
    top: '18%', left: '36%'
  },
  8: {
    top: '19%', left: '44%'
  },
  9: {
    top: '17%', left: '48%'
  },
  10: {
    top: '19%', right: '40%'
  },
  11: {
    top: '18%', right: '32%'
  },
  12: {
    top: '23%', left: '40%'
  },
  13: {
    top: '27%', left: '37%'
  },
  14: {
    bottom: '50%', left: '7%'
  },
  15: {
    bottom: '50%', left: '26%'
  },
  16: {
    bottom: '50%', left: '50%'
  },
  17: {
    bottom: '50%', right: '26%'
  },
  18: {
    top: '33%', right: '15%'
  },
  19: {
    bottom: '50%', right: '10%'
  },
  20: {
    bottom: '42%', left: '12%'
  },
  21: {
    bottom: '33%', right: '15%'
  },
  22: {
    bottom: '27%', left: '37%'
  },
  23: {
    bottom: '23%', left: '40%'
  },
  24: {
    bottom: '18%', left: '36%'
  },
  25: {
    bottom: '19%', left: '44%'
  },
  26: {
    bottom: '17%', left: '48%'
  },
  27: {
    bottom: '19%', right: '40%'
  },
  28: {
    bottom: '18%', right: '32%'
  },
  29: {
    bottom: '12%', left: '27%'
  },
  30: {
    bottom: '12%', right: '52%'
  },
  31: {
    bottom: '12%', right: '41%'
  },
  32: {
    bottom: '12%', right: '25%'
  },
  33: {
    bottom: '3%', left: '40%'
  },
  34: {
    bottom: '3%', left: '46%'
  },
  35: {
    bottom: '46%', left: '36%'
  },
  36: {
    bottom: '46%', right: '32%'
  },
  37: {
    bottom: '34%', left: '11%'
  },
  38: {
    bottom: '57%', left: '11%'
  },
  39: {
    bottom: '47%', left: '87%'
  },
  40: {
    bottom: '5%', left: '31%'
  },
  41: {
    bottom: '90%', left: '31%'
  },
  42:{
    bottom: '5%', left: '64%'
  },
  43: {
    bottom: '90%', left: '64%'
  }
}

export function parseRefsDots (additional_images) {
  let parsedSegments = {}
  for (let singleSegment of Object.values(additional_images)) {
    parsedSegments[refsSegmentsToSlug(singleSegment.title)] = {}
    for (let singleImage of singleSegment.questions) {
      if (inspectionColorsPriority(singleImage.color).visibility) {
        const inspectionSlug = inspectionReportCarBodyDotsTitlesToSlug(singleImage.title.split(':')[0].trim())

        if (typeof inspectionSlug === 'number') {
          if (!parsedSegments[refsSegmentsToSlug(singleSegment.title)][inspectionSlug]) {
            parsedSegments[refsSegmentsToSlug(singleSegment.title)][inspectionSlug] = []
          }
          parsedSegments[refsSegmentsToSlug(singleSegment.title)][inspectionSlug].push(singleImage)
        } else {
          for (let singleDot of inspectionSlug) {
            if (!parsedSegments[refsSegmentsToSlug(singleSegment.title)][singleDot]) {
              parsedSegments[refsSegmentsToSlug(singleSegment.title)][singleDot] = []
            }
            parsedSegments[refsSegmentsToSlug(singleSegment.title)][singleDot].push(singleImage)
          }
        }
      }
    }
  }
  return parsedSegments
}

export function inspectionColorsPriority (colorString) {
  switch (colorString) {
    case '404344':
      return {
        priority: 1,
        visibility: false
      }
    case '001ef1':
      return {
        priority: 2,
        visibility: false
      }
    case '470a68':
      return {
        priority: 3,
        visibility: false
      }
    case 'e40000':
      return {
        priority: 4,
        visibility: true
      }
    default:
      return {
        priority: 0,
        visibility: false
      }
  }
}

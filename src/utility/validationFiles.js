import {bytesToSize} from './helpers'
import ui            from 'src/assets/dictionaries/ui'

export default (files, fileTypes, fileSize) => {
  const {length} = files

  let error
  if (length === 0) {
    error = 'length error'
  }
  if (files[0]) {
    const {size, type} = files[0]
    if (!fileTypes.includes(type)) {
      error = `${ui.format_allowed} :
      ${fileTypes.map((type, index) => `${type} ${!index > fileTypes.length - 1 ? ' ,' : ''}`)}`
    }

    if (size > fileSize) {
      error = ui.max_file_upload_message.format(bytesToSize(fileSize))
    }
    if (error) {
      return {success: false, error}
    } else {
      return {success: true, type, size}
    }
  } else {
    return {success: false, error: ui.try_again}
  }
}
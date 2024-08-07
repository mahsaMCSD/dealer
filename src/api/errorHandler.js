import {NotificationManager} from 'src/ui-kit/notifications'
import Ui                    from 'src/assets/dictionaries/ui'
import {PWASubDomain}        from 'src/router/routerConfig'

const ErrorHandler = (type) => {
  function message () {
    switch (type) {
      case 503:
        NotificationManager.error(Ui.message_status_error['503'])
        break
      case 500:
      case 'Failed to fetch':
        NotificationManager.error(Ui.message_status_error['500'])
        break
      case 401:
        localStorage.clear()
        window.location.href = PWASubDomain + 'on-boarding'
        break

      default :
        // NotificationManager.error(Ui.message_status_error['default'])
        break
    }
  }

  return message()
}

export default ErrorHandler


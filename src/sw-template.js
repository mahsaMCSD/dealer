if (typeof importScripts === 'function') {
  importScripts('./workbox.js')
  importScripts('./workbox-core.dev.js')
  importScripts('./workbox-precaching.dev.js')

  /* global workbox */
  if (workbox) {
    workbox.core.skipWaiting()

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

  } else {
    console.log('Workbox could not be loaded. No Offline support')
  }
}

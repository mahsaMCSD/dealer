const apiConfig = Object.freeze({
  api_root: process.env.REACT_APP_BASE_URL,
  content_type: 'application/json; charset=utf-8',
  cache_control: 'no-cache, no-store, must-revalidate',
  pragma: 'no-cache'
})

export default apiConfig

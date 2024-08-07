export default (userAgent) => {
  return (/(iPhone|iPad)/i).test(userAgent) ? 'ios' : 'android'
}

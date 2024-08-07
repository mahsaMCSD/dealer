import searchRouteKeyword from 'src/router/searchRouteKeyword'

export function findPath (url) {
  const splittedPath = url.split('/')
    .reverse()
    .filter(item => item)
  return splittedPath.filter(path => Object.keys(searchRouteKeyword)
    .includes(path) && path)
}

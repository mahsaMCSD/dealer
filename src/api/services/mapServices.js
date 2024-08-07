import apiUrls               from '../apiUrls'
import httpGetawayMapService from '../getaway/getawayMap'

export const getReverseService = (params) =>
  httpGetawayMapService({
    url: apiUrls.map_ir.reverse._get,
    isProtected: true,
    params,
})

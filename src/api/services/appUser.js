import restAPI from '../httpClient'
import apiUrls from '../apiUrls'

export const logInSMSService = (mobile) =>
  restAPI({url: apiUrls.dealers.login_sms._post, body: {mobile: mobile}, method: 'POST'})

export const smsVerificationService = (code, mobile) =>
  restAPI({url: apiUrls.dealers.login_token._post, body: {token: code, mobile: mobile}, method: 'POST'})

export const inspectionsDealerSegmentService = () =>
  restAPI({url: apiUrls.dealers.info._get, isProtected: true})

export const getBranchCenter = () =>
  restAPI({url: apiUrls.branch.center._get})

export const getIsConfirmed = () =>
  restAPI({url: apiUrls.dealers.is_confirmed._get, isProtected: true})

export const cityService = () =>
  restAPI({url: apiUrls.city._get})

export const createDealerService = obj =>
  restAPI({url: apiUrls.dealers._post, body: obj, method: 'POST'})

export const addDealerByAgentService = obj =>
  restAPI({url: apiUrls.dealers.register_dealers._post, body: obj, method: 'POST', isProtected: true})

export const createDealerServiceByAgent = obj =>
  restAPI({url: apiUrls.dealers.register._post, body: obj, method: 'POST', version: 'v2'})

export const getSharedImage = (token) =>
  restAPI({url: apiUrls.images.get_image._get.format(token)})

export const postInfoDevice = (token, build_number, udid, device, os) =>
  restAPI({
    url: apiUrls.device._post,
    body: {token: token, build_number: build_number, udid: udid, device: device, os: os},
    isProtected: true,
    method: 'POST'
  })

export const getTipsRateStarService = () =>
  restAPI({url: apiUrls.dealers.rating_policy._get, isProtected: true})

export const createDealerImage = (body) =>
  restAPI({
    url: apiUrls.dealer_profile.dealer_images._post,
    body: body,
    isProtected: true,
    method: 'POST'
  })

export const editByIdDealerImageProfile = (id, obj) =>
  restAPI({
    url: apiUrls.dealer_profile.dealer_images_id._patch.format(id),
    body: obj,
    isProtected: true,
    method: 'PATCH'
  })

export const getUserImageDocuments = () =>
  restAPI({url: apiUrls.dealers.identity._get, isProtected: true, method: 'GET'})

export const uploadUserImageDocuments = (obj) =>
  restAPI({url: apiUrls.dealers.upload_identity._patch, body: obj, method: 'PATCH'})

export const getCategoriesService = () =>
  restAPI({url: apiUrls.categories._get, isProtected: true})

export const getBrandsService = (params) =>
  restAPI({url: apiUrls.brands._get, params, isProtected: true, version: 'v2'})

export const getModelsService = (params) =>
  restAPI({url: apiUrls.models._get, params, isProtected: true})

export const postOTPRegisterService = (body) =>
  restAPI({url: apiUrls.dealers.otp._post, body, isProtected: true, version: 'v2', method: 'POST'})

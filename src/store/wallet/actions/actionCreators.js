import * as types       from './actionTypes'

export const onChangeAmountPreset = (count) => ({type: types.AMOUNT_PRESET, data: count}),
  onChangeAmountPresetStep = (count) => ({type: types.AMOUNT_PRESET_STEP, data: count}),
  onChangeBalance = (data) => ({type: types.CHANGE_BALANCE, data}),
  onChangeAuctionMembership = (data) => ({type: types.CHANGE_AUCTION_MEMBERSHIP, data}),
  onChangeAuctionMembershipInfo = (data) => ({type: types.CHANGE_AUCTION_MEMBERSHIP_INFO, data}),
  onresetAuctionsMembershipInfo = () => ({type: types.RESET_STORE})

/**
 * An Icon set.
 *
 * @param {object} type - Define an icon.
 * @param {object} style - Used to set styles for icons.
 * @param {string} className - The desired class Name for icons.
 * @returns {object} An Icon set.
 */
import React     from 'react'
import PropTypes from 'prop-types'
import 'src/assets/fonts/icomoon/style.css'

const iconPretext = 'icon-'
const IconWrapper = {
  angleLeft: <span className={`${iconPretext}angle-left`}/>,
  chevronDown: <span className={`${iconPretext}chevron-down`}/>,
  checkCircle: <span className={`${iconPretext}check-circle`}/>,
  phone: <span className={`${iconPretext}phone-alt`}/>,
  user: <span className={`${iconPretext}user`}/>,
  userAccountInfo: <span className={`${iconPretext}id-badge`}/>,
  filter: <span className={`${iconPretext}filter`}/>,
  info: <span className={`${iconPretext}info-circle`}/>,
  question: <span className={`${iconPretext}question-circle`}/>,
  mobile: <span className={`${iconPretext}mobile`}/>,
  close: <span className={`${iconPretext}times`}/>,
  plusCircle: <span className={`${iconPretext}plus-circle`}/>,
  eye: <span className={`${iconPretext}eye`} style={{fontSize: '12px'}}/>,
  clock: <span className={`${iconPretext}clock-o`}/>,
  infoCircle: <span className={`${iconPretext}info-circle`}/>,
  carSelected: <span className={`${iconPretext}car-selected`}/>,
  carDeselected: <span className={`${iconPretext}car-deselected`}/>,
  userSelected: <span className={`${iconPretext}user-selected`}/>,
  userDeselected: <span className={`${iconPretext}user-deselected`}/>,
  shoppingCartSelected: <span className={`${iconPretext}shopping-cart`}/>,
  shoppingCartDeselected: <span className={`${iconPretext}shopping-cart1`}/>,
  judgeSelected: <span className={`${iconPretext}judge`}/>,
  judgeDeselected: <span className={`${iconPretext}judge1`}/>,
  smartCarSelected: <span className={`${iconPretext}smart-car`}/>,
  smartCarDeselected: <span className={`${iconPretext}smart-car1`}/>,
  hamSelected: <span className={`${iconPretext}ham-selected`}/>,
  hamDeselected: <span className={`${iconPretext}ham-deselected`}/>,
  shopSelected: <span className={`${iconPretext}shop-selected`} style={{fontSize: '13px'}}/>,
  shopDeselected: <span className={`${iconPretext}shop-deselected`} style={{fontSize: '13px'}}/>,
  settingSelected: <span className={`${iconPretext}setting-selected`}/>,
  settingDeselected: <span className={`${iconPretext}setting-deselected`}/>,
  shareSquare: <span className={`${iconPretext}share-square`}/>,
  plus: <span className={`${iconPretext}plus`}/>,
  minus: <span className={`${iconPretext}minus`}/>,
  tachometer: <span className={`${iconPretext}tachometer`}/>,
  spinner: <span className={`${iconPretext}spinner`}/>,
  angleDown: <span className={`${iconPretext}angle-down`}/>,
  angleLeft2: <span className={`${iconPretext}angle-left-2`}/>,
  timesCircle: <span className={`${iconPretext}times-circle`}/>,
  plusSquare: <span className={`${iconPretext}plus-square`}/>,
  signOut: <span className={`${iconPretext}sign-out`}/>,
  caretLeft: <span className={`${iconPretext}caret-left`}/>,
  caretRight: <span className={`${iconPretext}caret-right`}/>,
  caretUp: <span className={`${iconPretext}caret-up`}/>,
  check: <span className={`${iconPretext}check`}/>,
  expand: <span className={`${iconPretext}expand`}/>,
  copy: <span className={`${iconPretext}content-copy`}/>,
  star: <span className={`${iconPretext}star`}/>,
  starHalfEmpty: <span className={`${iconPretext}star-half-empty`}/>,
  starEmpty: <span className={`${iconPretext}star-o`}/>,
  outOfTime: <span className={`${iconPretext}out-of-time`}/>,
  writing: <span className={`${iconPretext}writing`}/>,
  addWallet: <span className={`${iconPretext}add-wallet`}/>,
  upload: <span className={`${iconPretext}upload`}/>,
  watch: <span className={`${iconPretext}Watch`}/>,
  card: <span className={`${iconPretext}card`}/>,
  bag: <span className={`${iconPretext}bag`}/>,
  closeModal: <span className={`${iconPretext}close-modal`}/>,
  emptyWalletAdd: <span className={`${iconPretext}empty-wallet-add`}/>,
  cardRemove: <span className={`${iconPretext}card-remove`}/>,
  points: <span className={`${iconPretext}Points`}/>,
  pointsMinus: <span className={`${iconPretext}points-minus`}/>,
  closeNotification: <span className={`${iconPretext}close-notification`}/>,
  wallet: <span className="icon-wallet">
    <span className="path1"></span>
    <span className="path2"></span>
    <span className="path3"></span>
    <span className="path4"></span>
    <span className="path5"></span>
    <span className="path6"></span>
    <span className="path7"></span>
    <span className="path8"></span>
    <span className="path9"></span>
  </span>,
  userSquare: <span className={`${iconPretext}user-square`}/>,
  starHalf: <span className={`${iconPretext}star-half`} style={{fontSize: '22px'}}>
    <span className="path1"></span>
    <span className="path2"></span>
    </span>
  ,
  starFull: <span className={`${iconPretext}star-full`} style={{fontSize: '22px'}}/>,
  starEmpty2: <span className={`${iconPretext}star-empty`} style={{fontSize: '22px'}}/>,
  userEdit: <span className={`${iconPretext}user-edit`} style={{fontSize: '24px'}}/>,
  emptyWallet: <span className={`${iconPretext}empty-wallet`} style={{fontSize: '24px'}}/>,
  cards: <span className={`${iconPretext}cards`} style={{fontSize: '24px'}}/>,
  filter1: <span className={`${iconPretext}filter1`} style={{fontSize: '24px'}}/>,
  coin: <span className={`${iconPretext}coin`} style={{fontSize: '24px'}}/>,
  messageQuestion: <span className={`${iconPretext}message-question`} style={{fontSize: '24px'}}/>,
  logout: <span className={`${iconPretext}logout`} style={{fontSize: '24px'}}/>,
  mobile1: <span className={`${iconPretext}mobile1`} style={{fontSize: '24px'}}/>,
  call: <span className={`${iconPretext}call`} style={{fontSize: '18px'}}/>,
  addUpload: <span className={`${iconPretext}plus-upload`} style={{fontSize: '64px'}}/>,
  infoCircle2: <span className={`${iconPretext}info-circle-2`} style={{fontSize: '20px'}}/>,
  timer: <span className={`${iconPretext}timer`}/>,
  noteText: <span className={`${iconPretext}note-text`}/>,
  messageSearch: <span className={`${iconPretext}message-search`}/>,
  arrowRight: <span className={`${iconPretext}arrow-right`}/>,
  lock: <span className={`${iconPretext}lock`}/>,
  warning: <span className={`${iconPretext}warning`}/>,
  walletCard: <span className={`${iconPretext}wallet-card`}/>,
  documentCloud: <span className={`${iconPretext}document-cloud`}/>,
  userTag: <span className={`${iconPretext}user-tag`}/>,
  document: <span className={`${iconPretext}documnet`}/>,
  plus1: <span className={`${iconPretext}plus1`} style={{fontSize: '8px'}}/>,
  closeCircle: <span className={`${iconPretext}close-circle text-charcoal-600`} style={{fontSize: '20px'}}/>,
  warning1: <span className={`${iconPretext}warning1`} style={{fontSize: '20px'}}/>,
  share: <span className={`${iconPretext}share`} style={{fontSize: '20px'}}/>,
  download: <span className={`${iconPretext}download`} style={{fontSize: '20px'}}/>,
  plus2: <span className={`${iconPretext}plus-1`} style={{fontSize: '18px'}}/>,
  minus1: <span className={`${iconPretext}minus1`} style={{fontSize: '2px'}}/>,
  documentCopy: <span className={`${iconPretext}document-copy text-black-600`} style={{fontSize: '15px'}}/>,
  documentText: <span className={`${iconPretext}document-text`} style={{fontSize: '13px'}}/>,
  addCircle: <span className={`${iconPretext}add-circle`} style={{fontSize: '13px'}}/>,
  eye1: <span className={`${iconPretext}eye1`} style={{fontSize: '13px'}}/>,
  share1: <span className={`${iconPretext}share1`} style={{fontSize: '24px'}}/>,
  addSquare: <span className={`${iconPretext}add-square`} style={{fontSize: '48px'}}/>,
  minusSquare: <span className={`${iconPretext}minus-square`} style={{fontSize: '48px'}}/>,
  checked: <span className={`${iconPretext}checked text-black-600`}/>,
  trash: <span className={`${iconPretext}trash`}/>,
  trash2: <span className="icon-trash-2" style={{fontSize: '48px'}}><span className="path1"></span><span
    className="path2"></span><span
    className="path3"></span><span className="path4"></span><span className="path5"></span></span>,
  times1: <span className={`${iconPretext}times1`}/>,
  receipt: <span className={`${iconPretext}receipt text-charcoal-600`}/>,
  success: <span className="icon-success-account" style={{fontSize: '64px'}}><span className="path1"></span><span
    className="path2"></span><span
    className="path3"></span><span className="path4"></span><span className="path5"></span></span>,
  accountsEmpty: <span className="icon-accounts-empty" style={{fontSize: '64px'}}><span className="path1"></span><span
    className="path2"></span><span className="path3"></span><span className="path4"></span><span
    className="path5"></span><span className="path6"></span><span className="path7"></span><span
    className="path8"></span><span className="path9"></span></span>,
  cardAdd: <span className={`${iconPretext}card-add text-charcoal`} style={{fontSize: '16px'}}/>,
  terms1: <span className={`${iconPretext}terms-1`}/>,
  terms2: <span className={`${iconPretext}terms-2`}/>,
  terms3: <span className={`${iconPretext}terms-3`}/>,
  arrowDown: <span className={`${iconPretext}arrow-down`}/>,
  arrowUp: <span className={`${iconPretext}arrow-up`}/>,
  bag2Deselected: <span className={`${iconPretext}bag-2`}/>,
  bag2Selected: <span className={`${iconPretext}bag-2-selected`}/>,
  car2Deselected: <span className={`${iconPretext}car-2`}/>,
  car2Selected: <span className={`${iconPretext}car-2-selected`}/>,
  location: <span className={`${iconPretext}location`}/>,
  searchNormal: <span className={`${iconPretext}search-normal`}/>,
  arrowUp2: <span className={`${iconPretext}arrow-up2`}/>,
  arrowSquareLeft: <span className={`${iconPretext}arrow-square-down`}/>,
  checkBoxEmpty: <span className={`${iconPretext}tick-square-empty`}/>,
  tickSquare2: <span className={`${iconPretext}tick-square1 text-yellow-orange`}/>,
  moneys: <span className={`${iconPretext}moneys`}/>,
  calendar: <span className={`${iconPretext}calendar-2`}/>,
  trash1: <span className={`${iconPretext}trash1`}/>,
  checkBox3: <span className="icon-checkBox3">
    <span className="path1"></span>
    <span className="path2"></span>
    <span className="path3"></span>
    </span>,
  speedometer: <span className={`${iconPretext}speedometer`}/>,
  kh45: <span className={`${iconPretext}Kh45`}>
    <span className="path1"></span>
    <span className="path2"></span>
    <span className="path3"></span>
    <span className="path4"></span>
    <span className="path5"></span>
    <span className="path6"></span>
    <span className="path7"></span>
    <span className="path8"></span>
    <span className="path9"></span>
    <span className="path10"></span>
    <span className="path11"></span>
    <span className="path12"></span>
  </span>,
  closeCircle1: <span className={`${iconPretext}close-circle1`}/>,
  card2: <span className={`${iconPretext}card-2`}/>,
  calendar2: <span className={`${iconPretext}calendar-2`}/>,
  receiptEdit: <span className={`${iconPretext}receipt-edit`}/>,
  building2: <span className={`${iconPretext}buliding-2`}/>,
  tickSquareEmpty: <span className={`${iconPretext}tick-square-empty`}/>,
  tickSquare1: <span className={`${iconPretext}tick-square1 text-yellow-orange`}/>,
  map: <span className={`${iconPretext}map`}/>,
  logout1: <span className={`${iconPretext}logout1`}/>,
  crown: <span className={`${iconPretext}crown`}/>,
  circleChecked: <span className={`${iconPretext}circle-checked`}>
    <span className="path1"></span>
    <span className="path2"></span>
  </span>,
  ready: <span className={`${iconPretext}ready`}>
          <span className="path1"></span>
          <span className="path2"></span>
          <span className="path3"></span>
          <span className="path4"></span>
  </span>,
  notaryEdit: <span className="icon-notary-edit">
    <span className="path1"></span>
    <span className="path2"></span>
    <span className="path3"></span>
    <span className="path4"></span>
    <span className="path5"></span>
  </span>,
  building: <span className="icon-buliding">
    <span className="path1"></span>
    <span className="path2"></span>
    <span className="path3"></span>
    <span className="path4"></span>
    <span className="path5"></span>
    <span className="path6"></span>
    <span className="path7"></span>
    <span className="path8"></span>
  </span>,
  documentUpload: <span className={`${iconPretext}document-upload`}/>,
  circleChecked1: <span className={`${iconPretext}circle-checked1`}/>,
  callCalling: <span className={`${iconPretext}call-calling`}/>,
  defaultAvatar: <span className={`${iconPretext}default-avatar`}/>,
  cardChecked: <span className={`${iconPretext}card-checked`}>
    <span className="path1"></span>
    <span className="path2"></span>
    <span className="path3"></span>
    <span className="path4"></span>
    <span className="path5"></span>
    <span className="path6"></span>
    <span className="path7"></span>
    <span className="path8"></span>
  </span>
  ,
  galleryEdit: <span className={`${iconPretext}gallery-edit`}>
    <span className="path1"></span>
    <span className="path2"></span>
    <span className="path3"></span>
    <span className="path4"></span>
    <span className="path5"></span>
  </span>,
  iconCreditCard1: <span className="icon-credit-card-1"><span className="path1"></span><span
    className="path2"></span></span>
  ,
  galleryAdd: <span className={`${iconPretext}gallery-add`}/>,
  verticalEllipsis: <span className={`${iconPretext}vertical-ellipsis`}/>,
  multiplication: <span className={`${iconPretext}multiplication`}/>,
  emptyWalletAdd1: <span className={`${iconPretext}empty-wallet-add-1`}/>
}

/** @function
 * @name Icon
 * @returns Requirment class name and style for icon is added.
 */
const Icon = (props) => {
  let result = IconWrapper[props.type]
  let finalProps = {...props}
  if (props.className) {
    finalProps = {
      ...finalProps,
      className: `${result.props.className} ${props.className}`
    }
  }
  if (props.style) {
    const style = props.style
    finalProps = {
      ...finalProps,
      style
    }
  }
  result = React.cloneElement(result, finalProps)
  return result
}
export default Icon
Icon.propType = {
  type: PropTypes.oneOf(Object.keys(IconWrapper)).isRequired
}

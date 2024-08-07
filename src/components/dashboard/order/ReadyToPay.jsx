import React, {useCallback, useEffect, useState}                    from 'react'
import Pullable                                                     from 'src/ui-kit/pullable/Pullable'
import EmptyMessage
                                                                    from 'src/components/dashboard/empty-message/EmptyMessage'
import {getContractsTransactionSelectionService, getWaitSettlement} from 'src/api/services/cars'
import debtSvg                                                      from 'src/assets/images/dashboard/debt.svg'
import Loading                                                      from 'src/components/loading/Loading'
import ReadyToPayCard                                               from './ReadyToPayCard'
import {Link, useLocation, useNavigate, useSearchParams}            from 'react-router-dom'
import styled                                                       from 'styled-components'
import ui                                                           from 'src/assets/dictionaries/ui'
import PreviewTransfer                                              from './PreviewTransfer'
import {getQueryParamsObject}                                       from 'src/utility/helpers'
import BottomSheetMessage
                                                                    from 'src/ui-kit/bottom-sheet-message/BottomSheetMessage'
import Formatter                                                    from 'src/utility/Formatter'
import {getDataPaymentBySlug}                                       from 'src/api/services/payment'
import Icon                                                         from 'src/ui-kit/Icon'

const emptyMessage = {
  image: debtSvg,
  title: 'خودرویی برای تسویه قیمت وجود ندارد!',
  content: 'برای ثبت سفارش و خرید خودرو، به بخش خودروها مراجعه کنید.'
}
const _Formatter = new Formatter()

const readyToPayStatuses = {
  'notary-and-contract': {
    title: ui.notary_and_contract.verify,
    getListService: getContractsTransactionSelectionService
  },
  'wait-settlement-and-settlement': {
    title: ui.wait_settlement_and_settlement,
    getListService: getWaitSettlement
  }
}


const initialPrepayment = {
  amount: 0,
  paid_amount_with_wallet: 0,
  remaining: 0,
  paid_amount: 0
}
const ReadyToPay = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [prepayment, setPrepayment] = useState(initialPrepayment)
  const schemaResultSuccessOnlineMultiStep = {
    titleMessage: ui.prepayment_page.result.success_message_partly,
    isSuccess: true,
    isActiveOnClose: true,
    submitButton:
      [
        {
          key: 'enter-prepayment-page',
          link: `/dashboard/myOrders/readyToPay/PrePayment/${searchParams.get('slug')}`,
          isOnClose: true,
          title: ui.prepayment_page.result.continuePayment,
          classes: 'text-white bg-yellow-orange w-100 ms-3'
        },
        {
          key: 'enter-readyToPay-page',
          link: '',
          isOnClose: true,
          title: ui.prepayment_page.result.back,
          classes: 'text-yellow-orange bg-white w-100'
        }
      ]
  }
  const schemaResultUnSuccessOnlineMultiStep = {
    titleMessage: ui.prepayment_page.result.unSuccess_message_partly,
    isSuccess: false,
    isActiveOnClose: true,
    submitButton:
      [
        {
          key: 'enter-prepayment-page',
          link: `/dashboard/myOrders/readyToPay/PrePayment/${searchParams.get('slug')}`,
          isOnClose: true,
          title: ui.prepayment_page.result.continuePayment,
          classes: 'text-white bg-yellow-orange w-100 ms-3'
        },
        {
          key: 'enter-readyToPay-page',
          link: '',
          isOnClose: true,
          title: ui.prepayment_page.result.back,
          classes: 'text-yellow-orange bg-white w-100'
        }
      ]
  }

  const schemaResultUnSuccessOnlineWallet = {
    isSuccess: false,
    isActiveOnClose: true,
    submitButton:
      [
        {
          key: 'enter-prepayment-page',
          link: `/dashboard/myOrders/readyToPay/PrePayment/${searchParams.get('slug')}`,
          isOnClose: true,
          title: ui.prepayment_page.result.continuePayment,
          classes: 'text-white bg-yellow-orange w-100 ms-3'
        },
        {
          key: 'enter-readyToPay-page',
          link: '',
          isOnClose: true,
          title: ui.prepayment_page.result.back,
          classes: 'text-yellow-orange bg-white w-100'
        }
      ]
  }
  const schemaResultUnSuccess = {
    isSuccess: false,
    isActiveOnClose: true,
    submitButton:
      [
        {
          key: 'enter-readyToPay-page',
          link: '',
          isOnClose: true,
          title: ui.prepayment_page.result.title_submit_un_success,
          classes: 'text-yellow-orange bg-white'
        }
      ]
  }
  const schemaResultSuccess = {
    isSuccess: true,
    isActiveOnClose: true,
    submitButton: [
      {
        key: 'enter-prepayment-page',
        link: `/dashboard/myOrders/negotiation`,
        isOnClose: true,
        title: ui.prepayment_page.result.title_submit_success,
        classes: 'text-yellow-orange bg-white'
      }
    ]
  }
  const schemaResult = {
    'online': {
      '1': {
        titleMessage: ui.prepayment_page.result.success_message,
        ...schemaResultSuccess
      },

      '0': {
        titleMessage: ui.prepayment_page.result.un_success_message,
        ...schemaResultUnSuccess
      }
    },
    'use_wallet': {
      '1': {
        titleMessage: ui.prepayment_page.result.success_message_use_wallet,
        ...schemaResultSuccess
      },
      '0': {
        titleMessage: ui.prepayment_page.result.un_success_message_use_wallet,
        ...schemaResultUnSuccess
      }
    },
    'onlineWallet': {
      '1': {
        titleMessage: ui.prepayment_page.result.success_message,
        ...schemaResultSuccess
      },
      '0': {
        titleMessage: ui.prepayment_page.result.un_success_message_bank_online_payment,
        ...schemaResultUnSuccessOnlineWallet
      }
    }
  }
  const [data, onChangeData] = useState({
    list: [],
    isLoading: true,
    isLoadMore: false
  })
  const location = useLocation()
  const history = useNavigate()

  const [status, onChangeStatus] = useState(Object.keys(readyToPayStatuses)
    .find(key => location.search.includes(key))
  )

  const [selectedPreview, onChangeSelectedPreview] = useState(getQueryParamsObject(location.search).transferPreview)
  const [isOpenBottomSheetMessage, onToggleIsOpenBottomSheetMessage] = useState(!!searchParams.get('bottom-sheet'))
  const [dataBottomSheet, onChangeDataBottomSheet] = useState(searchParams.get('bottom-sheet'))

  useEffect(() => {
    if (searchParams.get('bottom-sheet') && searchParams.get('type')) {
      if (schemaResult[searchParams.get('type')][searchParams.get('bottom-sheet')]) {
        onToggleIsOpenBottomSheetMessage(!!searchParams.get('bottom-sheet'))
        onChangeDataBottomSheet(schemaResult[searchParams.get('type')][searchParams.get('bottom-sheet')])
      }

    }
    if (prepayment?.remaining) {
      onChangeDataBottomSheet(searchParams.get('bottom-sheet') === '1' ?
                              schemaResultSuccessOnlineMultiStep :
                              schemaResultUnSuccessOnlineMultiStep
      )
    }

  }, [searchParams, prepayment?.remaining])
  const dataSlug = () => {
    getDataPaymentBySlug(searchParams.get('slug'))
      .then((res) => {
        res?.amount && setPrepayment({
          amount: res.amount,
          paid_amount_with_wallet: res.paid_amount_with_wallet,
          remaining: res.remaining,
          paid_amount: res.paid_amount
        })

      })
      .catch(() => setPrepayment(initialPrepayment)
      )
  }

  const getData = useCallback(() => {

      if (status) {
        onChangeData(prevState => ({...prevState, isLoading: true}))

        readyToPayStatuses[status]?.getListService()
          .then((res) =>
            onChangeData({
              list: res,
              isLoading: false,
              isLoadMore: false
            })
          )
          .catch(() => onChangeData({
            list: [],
            isLoading: false,
            isLoadMore: false
          }))
      }

    }
    , [status]
  )

  useEffect(() => {
    searchParams.get('slug') && dataSlug()
    setPrepayment(initialPrepayment)
  }, [searchParams.get('slug')])
  useEffect(() => {
    status && getData()
  }, [status])

  const handleParams = useCallback(() => {
    if (location.search) {
      const findStatus = Object.keys(readyToPayStatuses)
        .find(key => location.search.includes(key))
      findStatus && onChangeStatus(findStatus)
      onChangeSelectedPreview(getQueryParamsObject(location.search).transferPreview)
    } else {
      history(`${location.pathname}?status=wait-settlement-and-settlement`)
    }
  }, [location.search])

  useEffect(() => {
    handleParams()
  }, [location.search])

  const onCloseModalPreview = useCallback(() => {
    history(`${location.pathname}?status=notary-and-contract`)
    onChangeSelectedPreview(false)
  }, [location.search])

  const onCloseBottomSheetMessage = useCallback(() => {
    onToggleIsOpenBottomSheetMessage(false)
    setSearchParams({status: 'wait-settlement-and-settlement'})
  }, [])
  return <StyledReadyToPay>
    <Pullable disabled={data.isLoading} onRefresh={getData}>
      <div className="mx-3">

        {
          data.isLoading ? <Loading fullScreen/> :
          data.list?.length === 0
          ? <EmptyMessage heightDifference={14} enableBtnRefresh={true} refresh={getData} {...emptyMessage} />
          : data.list.map((item, i) =>
            <div key={i}>
              <ReadyToPayCard getData={getData} data={item}/>
            </div>
          )
        }
      </div>
    </Pullable>
    <PreviewTransfer selectedPreview={selectedPreview} getDataList={getData} onCloseModal={onCloseModalPreview}/>
    {isOpenBottomSheetMessage &&
      <BottomSheetMessage title={ui.on_boarding_payment.title}
                          isOpen={isOpenBottomSheetMessage}
                          onClose={onCloseBottomSheetMessage}
                          {...dataBottomSheet}
      >
        <div className="text-center mb-4">
          {searchParams.get('type') === 'onlineWallet' && searchParams.get(
            'bottom-sheet') ?
           <div className="d-flex justify-content-center">
             <Icon className={`text-green ms-1`}
                   type={'check'}/>
             <p
               className="text-14 text-black-800">{ui.prepayment_page.result.success_message_get_money_use_wallet}</p>
           </div> : ''
          }
          {
            searchParams.get('type') === 'onlineWallet' && searchParams.get(
              'bottom-sheet') === '0' ?
            <>
              <p
                className="text-14 text-black-800">{ui.prepayment_page.result.total_reduced_from_wallet}</p>
              <span
                className="font-weight-700 text-16">{_Formatter.commaSeparateNumber(prepayment.paid_amount_with_wallet)}
                </span>
            </>
                                      :
            <>
              <p className="text-14 mb-0">{prepayment?.remaining > 0
                                           ? ui.prepayment_page.paid_amount_prepayment
                                           : ui.transaction_page.details_data.prepayment_price}</p>
              <span
                className="font-weight-700 text-16">{_Formatter.commaSeparateNumber(prepayment?.remaining > 0
                                                                                    ? prepayment.paid_amount
                                                                                    : prepayment?.amount)}
                </span>
            </>
          }
          <span className="text-10 me-1">{ui.toman}</span>

        </div>
      </BottomSheetMessage>
    }
  </StyledReadyToPay>

}

export default ReadyToPay

const StyledReadyToPay = styled.div`
  .status-bar__active {
    &:before {
      position: absolute;
      right: -20px;
      margin: auto;
      top: 0;
      bottom: 0;
      content: '';
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: var(--yellow-orange);
    }
  }
`

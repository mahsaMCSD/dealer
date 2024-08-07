import React              from 'react'
import {Outlet, Navigate} from 'react-router-dom'

import InspectionReport         from 'src/pages/inspection-report/InspectionReport'
import Register                 from 'src/pages/register/Register'
import LogIn                    from 'src/pages/login/Login'
import TermsAndConditions       from 'src/pages/login/TermsAndConditions'
import AddToHomeScreen          from 'src/pages/login/AddToHomeScreen'
import Dashboard                from 'src/pages/dashboard/Dashboard'
import OnBoarding               from 'src/pages/on-boarding/OnBoarding'
import VerifiedUserRegistration from 'src/pages/verified-user-registration/VerifiedUserRegistration'

import ShareImage          from 'src/pages/share-image/ShareImage'
import Competing           from 'src/pages/dashboard/contents/Competing'
import Inspections         from 'src/pages/dashboard/contents/competing/Inspections'
import Auctions            from 'src/pages/dashboard/contents/competing/Aucions'
import AuctionDetail       from 'src/pages/dashboard/contents/AuctionDetail'
import Inventory           from 'src/pages/dashboard/contents/competing/Inventory'
import Offers              from 'src/pages/dashboard/contents/offer/Offer'
import FinalPay            from 'src/pages/dashboard/contents/order/final-pay/FinalPay'
import Orders              from 'src/pages/dashboard/contents/order/Order'
import Profile             from 'src/pages/dashboard/contents/Profile/Profile'
import ReadyToPay          from 'src/components/dashboard/order/ReadyToPay'
import Paid                from 'src/components/dashboard/order/Paid'
import Negotiation         from 'src/components/dashboard/order/Negotiation'
import ManagementProfile   from 'src/pages/dashboard/contents/Profile/ManagementProfile/ManagementProfile'
import Transactions        from 'src/pages/dashboard/contents/panel/transactions/Transactions'
import AppGuide            from 'src/pages/dashboard/contents/panel/app-guide/AppGuide'
import Faq                 from 'src/pages/dashboard/contents/panel/faq/Faq'
import AboutUs             from 'src/pages/dashboard/contents/panel/about-us/AboutUs'
import WalletCharge        from 'src/pages/dashboard/contents/panel/wallet-charge/WalletCharge'
import WalletChargeOnline  from 'src/pages/dashboard/contents/panel/wallet-charge/WalletChargeOnline'
import WalletChargeOffline from 'src/pages/dashboard/contents/panel/wallet-charge/WalletChargeOffline'
import Withdraw            from 'src/pages/dashboard/contents/panel/withdraw/Withdraw'

import UserAccount
                                from
                                  'src/pages/dashboard/contents/panel/UserAccount'
import UploadDocuments          from 'src/pages/dashboard/contents/panel/upload-documents/UploadDocuments'
import BankAccounts             from 'src/pages/dashboard/contents/Profile/ManagementProfile/bank-accounts/BankAccounts'
import BankAccountAdd
                                from 'src/pages/dashboard/contents/Profile/ManagementProfile/bank-accounts/BankAccountAdd'
import Contract                 from 'src/pages/dashboard/contents/Profile/ManagementProfile/Contract'
import {ProtectedRoute}         from './ProtectedRoute'
import ContractCreate           from 'src/pages/dashboard/contents/Profile/ManagementProfile/ContractCreate'
import ModalPage                from 'src/ui-kit/modal-page/ModalPage'
import ui                       from 'src/assets/dictionaries/ui'
import MemberShipFeeOnBoarding  from 'src/pages/membership-fee/MemberShipFeeOnBoarding'
import MembershipFeeSettlement  from 'src/pages/membership-fee/MembershipFeeSettlement'
import MembershipFeeWithdrawing from 'src/pages/membership-fee/membership-fee-withdrawing/MembershipFeeWithdrawing'
import MembershipFeeTabs        from 'src/pages/membership-fee/MembershipFeeTabs'
import MembershipFeeUseWallet   from 'src/pages/membership-fee/MembershipFeeUseWallet'
import OutletMembershipFee      from 'src/pages/membership-fee/OutletMembershipFee'
import MembershipFeeMessage     from 'src/pages/membership-fee/MembershipFeeMessage'
import OtpMessage               from 'src/pages/otp/OtpMessage'
import Otp                      from 'src/pages/otp/Otp'
import PrePayment               from 'src/pages/dashboard/contents/order/PrePayment'

export const PWASubDomain = '/app/'

export const routes = [
  {key: 'on_boarding', path: '/', element: <OnBoarding/>},
  {key: 'login', path: '/login', element: <LogIn/>},
  {key: 'register', path: '/register', element: <Register/>},
  {key: 'verified_user_registration', path: '/verified-user-registration', element: <VerifiedUserRegistration/>},
  {key: 'otp', path: '/otp', element: <Otp/>},
  {path: 'add-to-on-boarding-screen', element: <ProtectedRoute> <AddToHomeScreen/></ProtectedRoute>},

  {key: 'inspectionreport', path: '/inspectionreport/:id', element: <InspectionReport/>},
  {key: 'image', path: '/image/:token', element: <ShareImage/>},
  {key: 'terms-condition', path: '/terms-condition', element: <ProtectedRoute> <TermsAndConditions/> </ProtectedRoute>},
  {key: 'otp-message', path: '/otp-message', element: <ProtectedRoute> <OtpMessage/></ProtectedRoute>},
  {
    key: 'DASHBOARD',
    path: '/dashboard',
    element: <ProtectedRoute> <Dashboard/> </ProtectedRoute>,
    children: [
      {
        key: 'DASHBOARD_COMPETING',
        path: 'competing',
        element: <Competing/>,
        children: [
          {path: `auctions`, element: <Auctions/>},
          {path: `auctions/details/:inspectionId/:auctionId/*`, element: <AuctionDetail/>},
          {path: `inspections`, element: <Inspections/>},
          {path: `inventory`, element: <Inventory/>},
          {path: `inventory/details/:inspectionId/:auctionId/*`, element: <AuctionDetail/>},
          {path: '*', element: <Navigate to="auctions" replace={true}/>},
          {path: '', element: <Navigate to="auctions" replace={true}/>}
        ]
      },

      {
        path: `myOffers`,
        element: <Outlet/>,
        children: [
          {path: '', element: <Offers/>},
          {path: 'details/:inspectionId/:auctionId/*', element: <AuctionDetail/>},
          {path: 'inventory', element: <Offers/>},
          {path: 'inventory/details/:inspectionId/:auctionId/*', element: <AuctionDetail/>},
          {path: '*', element: <Navigate to="" replace={true}/>}
        ]
      },
      {
        path: `myOrders`,
        element: <Orders/>,
        children: [
          {path: `readyToPay`, element: <ReadyToPay/>},
          {path: `readyToPay/PrePayment/:paymentSlug`, element: <PrePayment/>},
          {path: `paid`, element: <Paid/>},
          {path: `negotiation`, element: <Negotiation/>},
          {path: 'details/:inspectionId/:auctionId/*', element: <AuctionDetail/>},
          {
            path: `transfer-contract`,
            element: <ModalPage header={{title: ui.order_page.transfer.title, is_back: true}}> <Contract selectable/>
            </ModalPage>
          },
          {path: `finalPay/:paymentSlug`, element: <FinalPay/>},
          {path: '*', element: <Navigate to="" replace={true}/>},
          {path: '', element: <Navigate to="readyToPay" replace={true}/>}
        ]
      },
      {
        path: `userPanel`,
        element: <Profile/>,
        children: [
          {
            path: `dealer-info`,
            element: <Outlet/>,
            children: [
              {
                path: ``,
                element: <ManagementProfile/>
              },
              {
                path: `info`,
                element: <UserAccount/>
              },
              {
                path: `upload-documents`,
                element: <UploadDocuments/>
              },
              {
                path: `contract`,
                element: <Contract/>
              },
              {
                path: `contract/create`,
                element: <ContractCreate/>
              }
              ,
              {
                path: `bank-accounts`,
                element: <Outlet/>,
                children: [
                  {
                    path: ``,
                    element: <BankAccounts/>
                  },
                  {
                    path: `bank-account-add`,
                    element: <BankAccountAdd/>
                  },
                  {path: '*', element: <Navigate to="" replace={true}/>}
                ]
              },
              {path: '*', element: <Navigate to="" replace={true}/>}
            ]
          },

          {
            path: `wallet`,
            element: <Outlet/>,
            children: [
              {
                path: ``,
                element: <Transactions/>
              },
              {
                path: `wallet-charge-online`,
                element: <WalletCharge><WalletChargeOnline/></WalletCharge>
              },
              {
                path: `wallet-charge-offline`,
                element: <WalletCharge><WalletChargeOffline/></WalletCharge>
              },
              {
                path: `withdraw`,
                element: <Withdraw/>
              },
              {path: '*', element: <Navigate to="" replace={true}/>}
            ]
          },

          {
            path: `app-quide`,
            element: <AppGuide/>
          },
          {
            path: `faq`,
            element: <Faq/>
          },
          {
            path: `about-us`,
            element: <AboutUs/>
          },
          {path: '*', element: <Navigate to="" replace={true}/>}
        ]
      },

      {path: '*', element: <Navigate to="competing/auctions" replace={true}/>},
      {path: '', element: <Navigate to="competing/auctions" replace={true}/>}
    ]
  },
  {
    key: 'MEMBERSHIP_FEE',
    element: <ProtectedRoute> <OutletMembershipFee/> </ProtectedRoute>,
    path: 'membership-fee',
    children: [
      {path: `on-boarding`, element: <MemberShipFeeOnBoarding/>},
      {
        path: 'settlement',
        element: <MembershipFeeTabs><MembershipFeeSettlement/></MembershipFeeTabs>
      },
      {
        path: 'withdrawing',
        element: <MembershipFeeWithdrawing/>
      },
      {
        path: 'use-wallet',
        element: <MembershipFeeTabs><MembershipFeeUseWallet/></MembershipFeeTabs>
      },
      {path: '*', element: <Navigate to="/membership-fee/on-boarding" replace={true}/>},
      {path: '', element: <Navigate to="/membership-fee/on-boarding" replace={true}/>}
    ]
  },
  {
    key: 'MEMBERSHIP_FEE_MESSAGE',
    path: 'membership-fee-message',
    element: <MembershipFeeMessage/>
  },
  {
    key: 'root',
    path: '*',
    element: <Navigate to="/" replace={true}/>
  }
]

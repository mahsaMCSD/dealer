import React                          from 'react'
import styled                         from 'styled-components'
import AuctionInspectionSkeletonImage from 'src/assets/images/auction-skeleton.jpg'

const AuctionInspectionSkeleton = () => <StyledAuctionSkeleton className='w-desktop'/>

export default AuctionInspectionSkeleton

const StyledAuctionSkeleton = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${AuctionInspectionSkeletonImage});
  background-size: contain;
  margin-bottom: 50px;
`

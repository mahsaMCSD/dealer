import React, {useCallback, useRef} from 'react'
import PropTypes                    from 'prop-types'
import OfferAndOrderItem            from 'src/components/dashboard/offer-and-order-item/OfferAndOrderItem'
import EmptyMessage                 from 'src/components/dashboard/empty-message/EmptyMessage'
import Pullable                     from 'src/ui-kit/pullable/Pullable'

const OffersAndOrdersSubTab = props => {
  const observer = useRef(null)
  const showEnded = useCallback(node => {
    if (!node) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {

        if (props.next) {
          props.nextPage()
        }
      }
    })
    if (node) observer.current.observe(node)
  })

  return <Pullable disabled={props.loading} onRefresh={props.refresh}>
    {
      props.results.length === 0
      ? <EmptyMessage heightDifference={14} enableBtnRefresh
                      refresh={props.refresh} {...props.dataEmptyMessage[props.tabIndex]} />
      : props.results.map((item, i) =>
        <div key={parseInt(`${item.inspection}${item.id}`)}>
          <OfferAndOrderItem data={item}/>
          {props.results.length < props.count && i === props.results.length - 2 && !props.isLoadMore &&
          <div ref={showEnded}/>
          }
        </div>
      )
    }
  </Pullable>
}

export default OffersAndOrdersSubTab
OffersAndOrdersSubTab.defaultProps = {
  count: 0,
  results: [],
  loading: false,
  dataEmptyMessage: {}
}
OffersAndOrdersSubTab.propTypes = {
  count: PropTypes.number,
  results: PropTypes.array,
  loading: PropTypes.bool,
  refresh: PropTypes.func,
  nextPage: PropTypes.func,
  dataEmptyMessage: PropTypes.object
}

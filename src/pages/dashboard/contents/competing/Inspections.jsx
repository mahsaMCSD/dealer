import React                   from 'react'
import {connect}               from 'react-redux'
import Pullable                from 'src/ui-kit/pullable/Pullable'
import InspectionSvg           from 'src/assets/images/dashboard/inspection.svg'
import EmptyMessage            from 'src/components/dashboard/empty-message/EmptyMessage'
import InspectionItem          from 'src/components/dashboard/inspection-item/InspectionItem'
import Loading                 from 'src/components/loading/Loading'
import onGettingInspectionList from 'src/store/inspections/list/actions/onGettingInspectionList'

const emptyMessageData = {
  image: InspectionSvg,
  title: 'در حال حاضر کارشناسی ای در حال انجام نیست!',
  content: 'برای مشاهده خودروهای در حال کارشناسی، صفحه را بروزرسانی کنید.'
}

const Inspections = props => {
  React.useEffect(() => {
    getDataInspection()
  }, [])


  function getDataInspection () {
    props.onGettingInspections()
  }


  return (
    props.isGettingData ?
    <Loading fullScreen/> :
    <Pullable onRefresh={getDataInspection}>
      {props.inspectionList.length > 0 ?
       <>
         {props.inspectionList.map((item) => <InspectionItem key={item.id} data={item}/>)}
       </> :
       <EmptyMessage heightDifference={13} {...emptyMessageData} />}
    </Pullable>
  )
}

const mapStateToProps = state => ({
  inspectionList: state.inspections.list.inspection_list,
  isGettingData: state.inspections.list.is_getting_data
})
const mapDispatchToProps = dispatch => ({
  onGettingInspections: () => dispatch(onGettingInspectionList())
})
export default connect(mapStateToProps, mapDispatchToProps)(Inspections)

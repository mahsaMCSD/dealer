import React         from 'react'
import {connect}     from 'react-redux'
import {Navigate}    from 'react-router-dom'
import BaseComponent from 'src/components/base-component/BaseComponent.jsx'
import Header        from 'src/components/header/Header.jsx'
import {
  inspectionDealerService,
  segmentsDataService
}                    from 'src/api/services/cars'
import Icon          from 'src/ui-kit/Icon'
import {withParams}  from 'src/utility/routerHooks'

class InspectionReport extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      nav: ''
    }
    this.InspectionId = this.props.params.id
  }

  componentDidMount () {
    inspectionDealerService(this.InspectionId)
      .then((res) => {
        // res.segments.forEach(item => {
        //   item.isOpen = false
        //   item.data = []
        // })
        //  this.setState({data: res.segments})
      })

  }

  renderQuestion (question) {
    switch (question.field_type) {
      case '1':
        return (
          <div key={question.id} className="row">
            <div className="col-6">{question.value}</div>
            <div className="col-6">:{question.title}</div>
          </div>
        )
      case '2':
        return (

          <div key={question.id}>
            <div className="row">
              <div className="col-3">{question.answers.filter(a => a.default === true)[0].title}</div>
              <div className="col-9">:{question.title}</div>
            </div>

            <div className="row">
              {question.answers.filter(a => a.default === true)[0].questions.map((d) => {
                return (<div className="col-12">
                  <span style={{color: '#' + d.color}}> {d.title}</span>
                </div>)
              })}
            </div>

          </div>

        )
      case '10':
        return (
          <div key={question.id}>
            {question.questions.map((q) => {
              return (<div key={q.id} className="row">
                <div className="col-4">{q.answers.filter((p) => p.default === true)[0].title}</div>
                <div className="col-8">:{`لاستیک(${this.renderTierTitle(q.title)})`}</div>
              </div>)
            })}

          </div>
        )
      case '13':
        return (
          <div key={question.id} className="row">
            <div className="col-8">{question.value}</div>
            <div className="col-4">:توضیحات</div>
          </div>
        )
      default:
        return (null)

    }
  }


  renderTierTitle (val) {
    switch (val) {
      case 'ز':
        return 'زاپاس'

      case 'ج ش':
        return 'جلو شاگرد'

      case 'ع ش':
        return 'عقب شاگرد'

      case 'ع ر':
        return 'عقب راننده'

      case 'ج ر':
        return 'جلو راننده'
      default:
        return ''
    }

  }

  renderSegment () {
    return this.state.data.map((item) => {
      return (
        <div key={item.id}>
          <div className="row segment-item" onClick={() => {
            let obj = this.state.data.filter((i) => i.id === item.id)[0]
            obj.isOpen = !obj.isOpen
            if (item.data.length === 0) {
              segmentsDataService(this.InspectionId, item.id)
                .then((res) => {
                  obj.data = res.questions
                  this.setState({data: this.state.data})
                })
                .catch((er) => console.log(er))

            }
            this.setState({data: this.state.data})
          }}>


            <div className="col-3">
              <div className="headerIcon">
                <Icon type={item.isOpen === true ? 'angleDown' : 'angleLeft2'} style={{fontSize: 20}}/>
              </div>
            </div>

            <div className="col-9">
              {item.title}
            </div>

          </div>
          {item.isOpen === true &&
            item.data.map((item) => {
              return (
                this.renderQuestion(item)
              )
            })
          }
        </div>
      )
    })
  }


  render () {
    if (this.state.nav !== '') {
      return <Navigate to={{pathname: this.state.nav}}/>
    }
    if (this.state.data === null) {
      return (<p>Loading</p>)
    } else {
      return (
        <div className="dashboard appPage col-xs-12 col-sm-4 offset-sm-4 col-md-4 offset-md-4 flex-column">
          <Header title="گزارش کارشناسی" onPress={() => {this.setState({nav: '/dashboard'})}}/>
          <div>
            {this.renderSegment()}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userInfo.appUser.info
  }
}

export default connect(mapStateToProps)(withParams(InspectionReport))

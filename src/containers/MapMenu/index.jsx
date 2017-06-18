import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import actions from '../../actions/point'
import {postPoint} from '../../fetch/postpoints/point'
import {postIcon} from '../../fetch/posticon/icon'
 class MapMenu extends React.Component{
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
    this.state={
      points:[],
      icons:[]
    }
  }

handlePoint(){
  const url='api/addpoints'
  const params=this.state.points
postPoint(url,params).then(res=>{
 return  res.json()
}).then(json=>{
  if(json.stateCode===1){
    console.log('success')
  }
})


}
handleIcon(){
    const url='api/addicons'
  const params=this.state.icons
postPoint(url,params).then(res=>{
 return  res.json()
}).then(json=>{
  if(json.stateCode===1){
    console.log('success')
  }
})
}
handleSave(){
  this.handlePoint()
  this.handleIcon()
}
  componentDidUpdate(){
    console.log(111,this.props)
this.state.points.push(this.props.point)
this.state.icons.push(this.props.icon)

  }
  render(){
    return(
 <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
          <ul className="nav navbar-nav">
             <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">文件 <span className="caret"></span></a>
              <ul style={{zIndex:9999}} className="dropdown-menu" role="menu">
                 <li><a href="#">新建</a></li>
                <li><a href="#" onClick={this.handleSave.bind(this)}>保存</a></li>
                <li><a href="#">后退</a></li>
                <li><a href="#">前进</a></li>
                <li><a href="#">退出</a></li>
              </ul>
            </li>
            <li className="active"><a href="#">全屏<span className="sr-only"></span></a></li>
            <li><a href="#">识别</a></li>
           
          </ul>
          <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
              <input type="text" className="form-control" id="navbar-search-input" placeholder="搜索地点"/><i style={{marginLeft:'-1.4em'}} className="glyphicon glyphicon-search"></i>
            </div>
          </form>
        
        </div>
    )
  }
} 
function mapStateToProps(state){
return{
point:state.point,
icon:state.icon
}
}

function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(actions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MapMenu)

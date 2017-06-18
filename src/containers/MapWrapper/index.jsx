
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MapPane from '../MapPane'
import MapMenu from '../MapMenu'
import MapTitle from '../../components/MapTitle'
export default class MapWrapper extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
  }

  componentDidMount(){
  }
  render(){
    //console.log(this)
    return(
  <div className="content-wrapper">
<MapTitle  title="我的旅行状况图" desc="2017年旅游目标计划图-ajaxyz" />
<MapMenu/>
  <MapPane iconSettings={this.props.iconSettings} pointSettings={this.props.pointSettings} editType={this.props.editType}/>
  </div>
 
    )
  }
} 
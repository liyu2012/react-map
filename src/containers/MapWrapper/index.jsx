
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MapPane from '../MapPane'
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
    return(
  <div className="content-wrapper">
   <MapTitle title="我的旅行状况图" desc="2017年旅游目标计划图-ajaxyz" />
  <MapPane/>
  </div>
 
    )
  }
} 
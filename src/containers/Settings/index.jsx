import './style.less'
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class Settings extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
  }
  render(){
    return(
 <li><a href="#" data-toggle="control-sidebar"><i className="fa fa-cog"></i>&nbsp;设置</a></li>
    )
  }
} 
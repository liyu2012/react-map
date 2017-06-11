
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class MapTitle extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
 
  }
  render(){
    return(
<section className="content-header">
  <h1>{this.props.title}<small>{this.props.desc}</small></h1>
</section>
    )
  }
} 
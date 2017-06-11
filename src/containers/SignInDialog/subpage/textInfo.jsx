import React from 'react'
import './style.less'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class SignIn extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
  
  }
  render(){
    return(
 <span className="text-info">{this.props.text}</span>
          
    )
  }
} 
 

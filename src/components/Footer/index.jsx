import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class Footer extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
 
  }
  render(){
    return(
   <footer className="main-footer">
    <div className="pull-right hidden-xs">
      <address>E-mail:lllyyy2012@icloud.com</address>
    </div>
    <strong>Copyright © 2017 <a href="http://182.61.25.35:8888">personnal website@Ajaxyz</a></strong> All rights reserved.
  </footer>
    )
  }
} 
import React from 'react'
import NavMenu from '../NavMenu'
import Logo from './subpage/Logo'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
export default class Header extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
  }

  componentDidMount(){
  }
  render(){
    return(
 <header className="main-header">
  <Logo/>
  <NavMenu/>
  </header>
    )
  }
} 
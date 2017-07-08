import React from 'react'
import UserInfoMenu from '../UserInfoMenu'
import SignMenu from '../SignMenu'
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
 {this.props.isLogined?<UserInfoMenu userInfo={this.props.userInfo}/>:<SignMenu/>}
  </header>
    )
  }
} 
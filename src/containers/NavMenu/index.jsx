import React from 'react'
import ToggleButton from './subpage/ToggleButton'

import SignIn from '../SignIn'
import UserInfo from './subpage/UserInfo'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class NavMenu extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
    this.state={
      userId:''
    }
  }

  componentDidMount(){
    this.setState({
      userId:null
    })
  }

  render(){
    return(
      <nav className="navbar navbar-static-top" role="navigation">
     <ToggleButton/>
   <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
     {
         this.state.userId==null?<SignIn/>:<UserInfo/>     
     }
        </ul>
      </div> 
    </nav>
    )
  }
} 
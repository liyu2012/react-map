import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SignDialog from '../SignInDialog'
export default class SignIn extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
    this.state={
      isVisable:false
    }
  }

  componentDidMount(){
  }
  handleClick(){
    this.setState({
      isVisable:!this.state.isVisable
    })
    console.log(this.state.isVisable)
  }
cancel(){
  this.setState({
    isVisable:false
  })
}
  render(){
    return(   
        <li>
   <a href="#" data-toggle="modal" data-target="#signup"><i className="glyphicon glyphicon-pencil"></i>&nbsp;登录/注册</a>
 
 </li>
 
     
 
 
    )
  }
} 
 
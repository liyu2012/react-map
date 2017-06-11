
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class Logo extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
    this.state={
      userName:''
    }
  }
  componentDidMount(){
    this.setState({
      userName:'Ajaxyz'
    })
  }
  render(){
    return(
    <a href="#" className="logo">
        <img src="dist/static/img/logo.png" className="img-circle" alt="Logo Image"/>
      <span className="logo-lg"><b>MyMap-</b>{this.state.userName}</span>
    </a>

    )
  }
} 
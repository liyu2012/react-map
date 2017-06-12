
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
     <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span className="sr-only">Toggle navigation</span>
      </a>

    )
  }
} 
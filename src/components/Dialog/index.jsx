import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class Dialog extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
 
  }
  render(){
   // console.log(this)
    return(
  <div className="modal fade" tabIndex="-1" id={this.props.id} role="dialog" aria-labelledby="my-dialog" aria-hidden="true">
        <div className="modal-dialog" style={{zIndex:'1041'}}>
          {this.props.children}
        </div>
    </div>
    )
  }
} 
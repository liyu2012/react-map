import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {get}from '../../fetch/get'
import './style.less'
export default class IconSelector extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
    this.state={
      icons:null,
      active:null,

    }
  }
  componentWillMount(){
    get('api/icons').then(res=>{
      return res.json()
    }).then(json=>{
      const icons=json
     // console.log(json)
      if(icons.statusCode===1){
   this.setState({
        icons:JSON.parse(icons.data)
      })
    return json
      }
   
    })
  }

  handleClick(item){
   this.state.active=item
   
  }
  handleOk(){
this.props.handleIconSettings(this.state.active)
  }
  render(){
    return(
        <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">自定义图标</h4>
                </div>
                <div className="modal-body">
                  <ul className="bs-glyphicons">
               { this.state.icons?this.state.icons.map((item,index)=>{
                  return (
                     <li ref={index} onClick={this.handleClick.bind(this,item)} key={index}>
                    <span className="glyphicon"><img src={item.src} alt="icon"/></span>
                    <span className="glyphicon-class">{item.alias}</span>
                  </li>
                  )
                }):''}
                </ul>
                </div>
                <div className="modal-footer">
                    <button data-dismiss="modal" className="btn btn-danger">关闭</button><button data-dismiss="modal" onClick={this.handleOk.bind(this)} className="btn btn-success">确定</button>
                </div>
            </div>
                      

    )
  }
} 
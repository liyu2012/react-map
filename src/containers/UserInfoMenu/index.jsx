import React from 'react'
import ToggleButton from './subpage/ToggleButton'
import Settings from '../Settings'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import './style.less'
 class NavMenu extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
    this.state={
     isLogined:this.props.isLogined,
     userInfo:null
    }
  }
  componentWillUpdate(nextProps,nextStates){
    console.log(222,nextProps)
    const user=this.props.user
    console.log(11,user)
  }
  render(){
    // console.log(11,this.props.userInfo)
     const userInfo=this.props.userInfo
    return(
<nav className="navbar navbar-static-top" role="navigation">
  <ToggleButton/>
  <div className="navbar-custom-menu">
  <ul className="nav navbar-nav">
  <li className="dropdown messages-menu">
  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
  <i className="fa fa-envelope-o"></i>
              <span className="label label-success">{userInfo.message.length}</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">你有{userInfo.message.length}条消息</li>
              <li>
                <ul className="menu">
                  {userInfo.message.map((item,index)=>{
                    if(index<=3)  {
                   return (
                  <li key={index}>
                    <a href="#">
                      <div className="pull-left">
                        <img src={item.avadar} className="img-circle" alt="User Image"/>
                      </div>
                      <h4>
                       {item.title}
                        <small><i className="fa fa-clock-o"></i> {item.time} </small>
                      </h4>
                  
                      <p>{item.content}</p>
                    </a>
                  </li>
                    
                   
                    )
                    }
                     
                  })}
                 
              
                </ul>
           
              </li>
              <li className="footer"><a href="#">查看全部</a></li>
            </ul>
          </li>
          <li className="dropdown notifications-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-bell-o"></i>
              <span className="label label-warning">10</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">You have 10 notifications</li>
              <li>
            
                <ul className="menu">
                  <li>
                    <a href="#">
                      <i className="fa fa-users text-aqua"></i> 5 new members joined today
                    </a>
                  </li>
              
                </ul>
              </li>
              <li className="footer"><a href="#">View all</a></li>
            </ul>
          </li>
          <li className="dropdown tasks-menu">
    
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-flag-o"></i>
              <span className="label label-danger">9</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">You have 9 tasks</li>
              <li>
            
                <ul className="menu">
                  <li>
                    <a href="#">
           
                      <h3>
                   
                        <small className="pull-right">20%</small>
                      </h3>
                 
                      <div className="progress xs">
                   
                        <div className="progress-bar progress-bar-aqua" style={{width: '20%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span className="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
 
                </ul>
              </li>
              <li className="footer">
                <a href="#">View all tasks</a>
              </li>
            </ul>
          </li>
    
          <li className="dropdown user user-menu">
      
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
       
              <img src={userInfo.avadar} className="user-image" alt="User Image"/>
           
              <span className="hidden-xs">{userInfo.alias}</span>
            </a>
            <ul className="dropdown-menu">
           
              <li className="user-header">
                <img src={userInfo.avadar} className="img-circle" alt="User Image"/>

                <p>
                {userInfo.alias}
                  <small>{userInfo.state}</small>
                </p>
              </li>
          
              <li className="user-body">
                <div className="row">
                  <div className="col-xs-4 text-center">
                    <a href="#">粉丝</a>
                  </div>
                  <div className="col-xs-4 text-center">
                    <a href="#">推荐</a>
                  </div>
                  <div className="col-xs-4 text-center">
                    <a href="#">关注</a>
                  </div>
                </div>
              </li>
              <li className="user-footer">
                <div className="pull-left">
                  <a href="#" className="btn btn-default btn-flat">个人信息</a>
                </div>
                <div className="pull-right">
                  <a href="#" className="btn btn-default btn-flat">退出登录</a>
                </div>
              </li>
            </ul>
          </li>
     <Settings/>  
        </ul>
      </div> 
    </nav>
    )
  }
} 
function mapStateToProps(state){
return{
user:state.user
}
}
function mapDispatchToProps(dispatch){
  return {
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavMenu)
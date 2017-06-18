import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Dialog from '../../components/Dialog' 
export default class Header extends React.Component{
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate

  }
handleClick(i){
  
this.props.setEditType(i)
}
  render(){
    return(
 <aside className="main-sidebar">
    {/*<!-- sidebar: style can be found in sidebar.less -->*/}
    <section className="sidebar">
      {/*<!-- Sidebar user panel (optional) -->*/}
      <div className="user-panel">
        <div className="pull-left image">
          <img src="dist/static/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
        </div>
        <div className="pull-left info">
          <p>Alexander Pierce</p>
          {/*<!-- Status -->*/}
          <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>

     {/* <!-- search form (Optional) -->*/}
      <form action="#" method="get" className="sidebar-form">
        <div className="input-group">
          <input type="text" name="q" className="form-control" placeholder="Search..."/>
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <ul className="sidebar-menu">
        <li className="header">工作台</li>
       <li ><a href="#"><i className="fa fa-link"></i> <span>热门推荐</span></a></li>
        <li className="active"><a href="#"><i className="fa fa-link"></i> <span>我的地图</span></a></li>
        <li><a href="#"><i className="fa fa-link"></i> <span>底图选择</span></a></li>
        <li className="treeview">
          <a href="#"><i className="fa fa-link"></i> <span>地图编辑</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a data-toggle="modal" data-target="#point" onClick={this.handleClick.bind(this,1)}>普通圆点</a></li>
            <li><a data-toggle="modal" data-target="#icon" onClick={this.handleClick.bind(this,2)} href="#">自定义图标</a></li>
            <li><a href="#">线符号</a></li>
          </ul>
        </li>
      </ul>
     
    </section>
  </aside>
    )
  }
} 
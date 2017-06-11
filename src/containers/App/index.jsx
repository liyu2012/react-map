import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Footer from '../../components/Footer'
import MapWrapper from '../MapWrapper'
import Header from '../Header'
import ControlAside from '../ControlAside'
export default class App extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
 
  }
  render(){
    return(
     <div className="wrapper">
 <Header/>
 {/* <!-- Left side column. contains the logo and sidebar -->*/}
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
     {/* <!-- /.search form -->

      <!-- Sidebar Menu -->*/}
      <ul className="sidebar-menu">
        <li className="header">工作台</li>
      {/*  <!-- Optionally, you can add icons to the links -->*/}
        <li className="active"><a href="#"><i className="fa fa-link"></i> <span>我的地图</span></a></li>
        <li><a href="#"><i className="fa fa-link"></i> <span>地图编辑</span></a></li>
        <li className="treeview">
          <a href="#"><i className="fa fa-link"></i> <span>Multilevel</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li><a href="#">Link in level 2</a></li>
            <li><a href="#">Link in level 2</a></li>
          </ul>
        </li>
      </ul>
     {/* <!-- /.sidebar-menu -->*/}
    </section>
   {/* <!-- /.sidebar -->*/}
  </aside>
<MapWrapper/>
 <Footer/>
 <ControlAside/>
  
</div>   
    )
  }
} 
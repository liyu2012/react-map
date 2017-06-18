import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Footer from '../../components/Footer'
import MapWrapper from '../MapWrapper'
import Header from '../Header'
import LeftAside from '../LeftAside'
import ControlAside from '../ControlAside'
import {getCookie} from '../../cookie/get'
import {handleLog} from '../../fetch/login/login'
import Dialog from '../../components/Dialog'
import PointEditor from '../PointEditor'
import SignUp from '../SignInDialog'
import IconSelector from '../IconSelector'
import {Provider,connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../../actions/point'
 class App extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
 this.state={
   isLogined:false,
   pointSettings:{},
   iconSettings:{},
   editType:0
 }
  }
  componentDidMount(){
const email=getCookie('email')
const pass=getCookie('pass')
if(!!email){
handleLog({
  email,
  pass
},7).then(json=>{
  if(json.statusCode==1){
this.setState({
  isLogined:true
})
  }
})
}

  }
  handlePointSetting(obj){
   this.setState({pointSettings:obj})
  }

 handleIconSettings(obj){
   this.setState({iconSettings:obj})
  }

  handleLoginandSignUp(data){

  }
  setEditType(i){
 this.setState({
   editType:i
  })
 
  }
  render(){
    return(
<div className="wrapper">
 <Header isLogined={this.state.isLogined}/>
 <LeftAside setEditType={this.setEditType.bind(this)}/>
<MapWrapper iconSettings={this.state.iconSettings} pointSettings={this.state.pointSettings} editType={this.state.editType}/>
 <Footer/>
 <ControlAside/>
  <Dialog  id="point" content="point">
<PointEditor title="点要素选项卡" handleOk={this.handlePointSetting.bind(this)}/>
  </Dialog>
    <Dialog id="signup" content="signup">
<SignUp  title="用户登陆/注册" handleOk={this.handleLoginandSignUp.bind(this)}/>
  </Dialog>
  {/*设置自定义图标的选择对话框*/}
<Dialog id="icon" content="icon">
<IconSelector handleIconSettings={this.handleIconSettings.bind(this)} title="选择图标样式"/>
  </Dialog>
</div>   
    )
  }
} 
function mapStateToProps(state){
return{
point:state.point
}
}
function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(actions,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
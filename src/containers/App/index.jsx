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
 export default class App extends React.Component{
  constructor(...args){
  super(...args)
  this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
  this.state={
  isLogined:false,
  pointSettings:{},
  iconSettings:{},
  editType:0,
  userInfo:null,
             }
  }
  componentWillMount(){
const email=getCookie('email')
const pass=getCookie('pass')
if(!!email){
handleLog({
  email,
  pass
},7).then(json=>{
  if(json.statusCode===1){
   
    console.log(1000,json.data)
     const userInfo=json.data
    this.setState({
         isLogined:true,
         userInfo,
})
  }
})
}

  }
  handlePointSettings(obj){
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
 <Header userInfo={this.state.userInfo} isLogined={this.state.isLogined}/>
 <LeftAside setEditType={this.setEditType.bind(this)}/>
<MapWrapper iconSettings={this.state.iconSettings} pointSettings={this.state.pointSettings} editType={this.state.editType}/>
 <Footer/>
 <ControlAside/>
  <Dialog  id="point" content="point">
<PointEditor title="点要素选项卡" handleOk={this.handlePointSettings.bind(this)}/>
  </Dialog>
    <Dialog id="signup" content="signup">
<SignUp  title="用户登陆/注册" handleOk={this.handleLoginandSignUp.bind(this)}/>
  </Dialog>
  {/*设置自定义图标的选择对话框*/}
<Dialog id="icon" content="icon">
<IconSelector title="选择图标样式" handleIconSettings={this.handleIconSettings.bind(this)} />
  </Dialog>
</div>   
    )
  }
} 

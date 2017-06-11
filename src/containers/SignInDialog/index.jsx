import React from 'react'
import './style.less'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {post} from '../../fetch/post'
import TextInfo from './subpage/textInfo'
export default class SignIn extends React.Component{
  //constructor function that assign the properties
   constructor(...args){
    super(...args)
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate
    this.state={
      regEmail:'',
      regPass:'',
      text:''
    }
  }

  componentDidMount(){
  }
  handleRegEmail(){
    const value=this.refs['reg-email'].value
    this.setState({
      regEmail:value
    })
  }

  handleRegFirstPass(){
  const value=this.refs['reg-pass'].value
    this.setState({
      regPass:value
    })
  }

handleLog(){
  this.props.cancel()
//login

}
handleRegSecondPass(){

}
  handleReg(){
    const url="api/register"
  post(url,{
    email:this.state.regEmail,
    pass:this.state.regPass
  }).then(res=>{
   return  res.json()
  }).then(json=>{
      if(json.statusCode===1){
          this.setState({
          text:json.text
        })
        this.handleLog()
      }
       
       else{
        this.setState({
          text:json.text
        })
       }
    }).catch(e=>{
      console.log(e)
    })

  }
  render(){
    return(
 <div className="box box-info">
   
            <div className="box-header with-border">
             <div className="nav-tabs-custom">
        <ul className="nav nav-tabs">
            <li><a href="#tab_1" data-toggle="tab" aria-expanded="false">注册</a></li>
            <li className="active"><a href="#tab_2" data-toggle="tab" aria-expanded="true">登陆</a></li>
        </ul>
        <div className="tab-content">
            <div className="tab-pane" id="tab_1">
                <form className="form-horizontal">
                    <div className="box-body">
                        <div className="form-group">
                            <label htmlFor="inputEmail3" className="col-sm-3 control-label">电子邮件：</label>
                            <div className="col-sm-8 ">
                                <input type="email" ref="reg-email" onChange={this.handleRegEmail.bind(this)} className="form-control" id="inputEmail3" placeholder="输入您的电子邮件" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword3" className="col-sm-3 control-label">用户密码：</label>

                            <div className="col-sm-8 ">
                                <input type="password" ref="reg-pass" onChange={this.handleRegFirstPass.bind(this)} className="form-control" id="inputPassword3" placeholder="输入大于六位密码" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword4"  className="col-sm-3 control-label">确认密码：</label>

                            <div className="col-sm-8 ">
                                <input type="password" onChange={this.handleRegSecondPass.bind(this)} className="form-control" id="inputPassword4" placeholder="确认密码" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <div className="checkbox">
                                    <label>
                        <input type="checkbox"/> 记住密码
                      </label>
                                </div>
                            </div>
                        </div>
                        <TextInfo text={this.state.text}/>
                    </div>

                    <div className="box-footer">

                        <button  onClick={this.handleReg.bind(this)} className="btn btn-success pull-right">注册</button>&nbsp;
                        <button  onClick={this.props.cancel} className="btn btn-danger pull-right">取消</button>
                    </div>
                </form>
            </div>
           
            <div className="tab-pane active" id="tab_2">
                <form className="form-horizontal">
                    <div className="box-body">
                        <div className="form-group">
                            <label htmlFor="inputEmail3" className="col-sm-3 control-label">电子邮件：</label>
                            <div className="col-sm-8 ">
                                <input type="email" className="form-control" id="inputEmail3" placeholder="输入您的电子邮件" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword3" className="col-sm-3 control-label">用户密码：</label>

                            <div className="col-sm-8 ">
                                <input type="password" className="form-control" id="inputPassword3" placeholder="输入大于六位密码" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <div className="checkbox">
                                    <label>
                        <input type="checkbox"/>记住密码
                      </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box-footer">

                        <button type="submit" className="btn btn-success pull-right">登陆</button>&nbsp;
                        <button type="submit" onClick={this.props.cancel} className="btn btn-danger pull-right">取消</button>
                    </div>
                </form>
            </div>
        

        </div>
 
    </div>
              </div>
         
           
          </div>
          
    )
  }
} 
 

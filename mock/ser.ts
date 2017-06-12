import * as express from 'express'
import * as bodyParser from 'body-parser'
import {ad} from './ad'
import  Productdetail from './detail'
import homelistData from './list'
import comments from './comments'
import * as fs from 'fs'
const app=express()
 let users
app.use(bodyParser.urlencoded({ extended: false }))
 app.get('/api/search/:city/:type/:keyword?',(req,res)=>{
  const params=req.params
  const city =params.city
  const type =params.type||'all'
  const keyword =params.keyword==null?'*':params.keyword
  console.log('搜索列表','城市:',city,'分类：',type,'关键字:',keyword,'\n***************')
  const data=homelistData
  res.send(data)
})

app.get('/api/detail/:id',(req,res)=>{
  const id=req.params.id
  console.log('商户详情查询：',`商户ID:${id}`,'\n***************')
  const data=Productdetail[1]
/*  const data=Productdetail.find(item=>{
    return item.id==id
    
  })
  */
  res.send(data)
})
//const  comments=require('./comments.js')
app.get('/api/comments/:id/:page',(req,res)=>{
  const id=req.params.id
  const page=req.params.page
  console.log('评论查询','商户号码：',id,'评论页码：',page,'\n***************')
  const comment=comments.data[0].comments
/*  const data=comments.data.find((item)=>{
    return item.id==id
    
  })*/
  res.send(comment)
})

app.post('/api/login',(req,res)=>{
   console.log('\n-----------------\n')
  console.log('登录验证',req.body,'\n***************')
const email=req.body.email
const pass=req.body.pass
  if(fs.existsSync('./mock/user.json')){
let readStream=fs.createReadStream('./mock/user.json',{
    encoding:'utf8',
    flags:'r'
  })
  readStream.on('error',e=>{
    console.log('文件读取失败')
  })
  readStream.on('close',e=>{
    console.log('文件被关闭')
    console.log('\n-----------------\n')
  })
  readStream.on('open',chunk=>{
    console.log('文件被打开')
  })
  readStream.on('data',chunk=>{
    users=chunk
    console.log('读取到数据') 
})

readStream.on('end',chunk=>{
 users=JSON.parse(users)
   const isAccessful=users.some(item=>{
return item.email===email&&item.pass===pass

  })
  if(isAccessful){
    const resp={
    statusCode:1,
    text:'登陆成功！'
  }
  res.send(resp)
 
  }
  else{
    const resp={
    statusCode:0,
    text:'用户名或密码错误'
  }
  res.send(resp)
}

})
  }
   
})

app.post('/api/register',(req,res)=>{
  console.log('-----------------\n','注册用户',req.body,'\n***************')
  const regUser=req.body
  const email=regUser.email
  const pass=regUser.pass
 
  //检测文件是否存在
  if(fs.existsSync('./mock/user.json')){
    let readStream=fs.createReadStream('./mock/user.json',{
    encoding:'utf8',
    flags:'r'
  })
 
  readStream.on('error',e=>{
    console.log('文件读取失败')
  })
  readStream.on('close',e=>{
    console.log('文件被关闭')
    console.log('\n-----------------\n')
  })
  readStream.on('open',chunk=>{
    console.log('文件被打开')
  })
  readStream.on('data',chunk=>{
    users=chunk
    console.log('读取到数据') 
})
readStream.on('end',chunk=>{
 users=JSON.parse(users)
   const isAccessful=users.every(item=>{
if(item.email!==regUser.email){
  return true
}
else{
return false
}
  })
  if(isAccessful){
    //添加新注册用户到user数组中
    users.push({
      email,
      pass
    })
    //如果用户邮箱没有注册，写入数据到user.json
    let rstream=fs.createWriteStream('./mock/user.json')
 rstream.write(JSON.stringify(users))
    //异步添加用户到数据库后，返回状态码给客户端
    const resp={
    statusCode:1,
    text:'注册成功！'
  }
  res.send(resp)
  }
  else{
    const resp={
    statusCode:0,
    text:'该邮箱已经被注册！'
  }
  res.send(resp)
}

})

  }
  
 
 
 
})
app.listen(8888,"localhost",()=>{
  console.log('ser is running at 8888','\n***************')
})
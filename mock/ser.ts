import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as fs from 'fs'
const app=express()

//获取自定义图标的json
 app.get('/api/icons',(req,res)=>{
    console.log('\n******get icons********\n')
    let icons
if(fs.existsSync('./mock/icons.json')){
let readStream=fs.createReadStream('./mock/icons.json',{
    encoding:'utf8',
    flags:'r'
  })
  readStream.on('error',e=>{
    console.log('文件读取失败')
  })
  readStream.on('close',e=>{
    console.log('文件被关闭')
    console.log('\n******get icons********\n')
  })
  readStream.on('open',chunk=>{
    console.log('文件被打开')
  })
  readStream.on('data',chunk=>{
    icons=chunk
    console.log('读取到数据') 
})
readStream.on('end',chunk=>{
    const resp={
    statusCode:1,
    data:icons
  }
  res.send(resp)
})
}
    
 })
 //获取用户设置的点坐标
app.get('/api/points/:type?',(req,res)=>{
   console.log('\n******get points********\n')
   let points
   console.log(req.params)
if(req.params.type==1){
   if(fs.existsSync('./mock/points.json')){
let readStream=fs.createReadStream('./mock/points.json',{
    encoding:'utf8',
    flags:'r'
  })
  readStream.on('error',e=>{
    console.log('文件读取失败')
  })
  readStream.on('close',e=>{
    console.log('文件被关闭')
    console.log('\n******get points********\n')
  })
  readStream.on('open',chunk=>{
    console.log('文件被打开')
  })
  readStream.on('data',chunk=>{
    points=chunk
    console.log('读取到数据') 
})

readStream.on('end',chunk=>{
    const resp={
    statusCode:1,
    data:points
  }
  res.send(resp)
})
}}}
)

//获取用户地图编辑的marker
app.get('/api/markers',(req,res)=>{
   console.log('\n******get markers********\n')
   let markers
   
   if(fs.existsSync('./mock/marker.json')){
let readStream=fs.createReadStream('./mock/marker.json',{
    encoding:'utf8',
    flags:'r'
  })
  readStream.on('error',e=>{
    console.log('文件读取失败')
  })
  readStream.on('close',e=>{
    console.log('文件被关闭')
    console.log('\n******get markers********\n')
  })
  readStream.on('open',chunk=>{
    console.log('文件被打开')
  })
  readStream.on('data',chunk=>{
    markers=chunk
    console.log('读取到数据') 
})

readStream.on('end',chunk=>{
    const resp={
    statusCode:1,
    data:markers
  }
  res.send(resp)
})
}}
)

app.post('/api/login', bodyParser.urlencoded({ extended: false }),(req,res)=>{
  console.log('\n******user login********\n')
let users
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
   console.log('\n******user login********\n')
  })
  readStream.on('open',chunk=>{
    console.log('文件被打开')
  })
  readStream.on('data',chunk=>{
    users=chunk
    console.log('读取到数据') 
})

readStream.on('end',chunk=>{
  if(users[0]!==null){
 users=JSON.parse(users)
  }
  else{
    users=[]
  }
  
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

//添加地图marker
app.post('/api/addicons', bodyParser.json(),(req,res)=>{
   console.log('\n****** add icons ********\n')
  let pointsJSON
  const icons=req.body
  if(fs.existsSync('./mock/icons.json')){
     let readStream=fs.createReadStream('./mock/marker.json',{
    encoding:'utf8',
    flags:'r'
  })
 
 readStream.on('data',chunk=>{
pointsJSON=chunk
 })
  readStream.on('close',e=>{
    console.log('\n****** add icons ********\n')
   
  })
 readStream.on('end',chunk=>{
   let pointsData
   if(pointsJSON!=null){
    pointsData=JSON.parse(pointsJSON).concat(icons)
   }
   else{
     pointsData=icons
   }
  let rstream=fs.createWriteStream('./mock/marker.json')
    rstream.write(JSON.stringify(pointsData))
    //异步添加points到数据库后，返回状态码给客户端
    const resp={
    statusCode:1,
    text:'add marker successfully！'
  }
  res.send(resp)
 })
  
  }
   console.log('\n******add marker********\n')
 
})

app.post('/api/addpoints', bodyParser.json(),(req,res)=>{
   console.log('\n******add points********\n')
 
  const points=req.body
  
  if(fs.existsSync('./mock/points.json')){
     let readStream=fs.createReadStream('./mock/points.json',{
    encoding:'utf8',
    flags:'r'
  })
 let pointsJSON
 readStream.on('data',chunk=>{
pointsJSON=chunk
 })
 readStream.on('end',chunk=>{
   let pointsData
   console.log(2222,pointsJSON)
    if(pointsJSON!=null){
    pointsData=JSON.parse(pointsJSON).concat(points)
   }
   else{
     pointsData=points
   }
  let rstream=fs.createWriteStream('./mock/points.json')
    rstream.write(JSON.stringify(pointsData))
    //异步添加points到数据库后，返回状态码给客户端
    const resp={
    statusCode:1,
    text:'点编辑成功！'
  }
  res.send(resp)
 })
  
  }
   console.log('\n******add points********\n')
 
})

app.post('/api/register', bodyParser.urlencoded({ extended: false }),(req,res)=>{
console.log('\n******user register********\n')
  const regUser=req.body
  const email=regUser.email
  const pass=regUser.pass
  let users
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
  console.log('\n******user register********\n')
  })
  readStream.on('open',chunk=>{
    console.log('文件被打开')
  })
  readStream.on('data',chunk=>{
    users=chunk
    console.log('读取到数据') 
})
readStream.on('end',chunk=>{
  if(users[0]!==null){
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
  }
  else{
users=[].push({
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
})

  }
  
 
 
 
})
app.listen(8888,"localhost",()=>{
  console.log('ser is running at 8888','\n***************')
})
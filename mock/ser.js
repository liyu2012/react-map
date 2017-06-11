"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var ad_1 = require("./ad");
var detail_1 = require("./detail");
var list_1 = require("./list");
var comments_1 = require("./comments");
var fs = require("fs");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/api/ad', function (req, res) {
    console.log('首页-超级特惠-请求', '\n***************');
    res.send(ad_1.ad);
});
app.get('/api/list/:city/:page', function (req, res) {
    var params = req.params;
    var city = params.city;
    var page = params.page;
    console.log('首页列表', city, page, '\n***************');
    res.send(list_1["default"]);
});
app.get('/api/search/:city/:type/:keyword?', function (req, res) {
    var params = req.params;
    var city = params.city;
    var type = params.type || 'all';
    var keyword = params.keyword == null ? '*' : params.keyword;
    console.log('搜索列表', '城市:', city, '分类：', type, '关键字:', keyword, '\n***************');
    var data = list_1["default"];
    res.send(data);
});
app.get('/api/detail/:id', function (req, res) {
    var id = req.params.id;
    console.log('商户详情查询：', "\u5546\u6237ID:" + id, '\n***************');
    var data = detail_1["default"][1];
    /*  const data=Productdetail.find(item=>{
        return item.id==id
        
      })
      */
    res.send(data);
});
//const  comments=require('./comments.js')
app.get('/api/comments/:id/:page', function (req, res) {
    var id = req.params.id;
    var page = req.params.page;
    console.log('评论查询', '商户号码：', id, '评论页码：', page, '\n***************');
    var comment = comments_1["default"].data[0].comments;
    /*  const data=comments.data.find((item)=>{
        return item.id==id
        
      })*/
    res.send(comment);
});
var orderlist = require('./orderlist.js');
app.get('/api/orderlist/:user/:page', function (req, res) {
    var user = req.params.user;
    var page = req.params.page;
    console.log('订单查询', '用户标识：', user, '订单页码：', page, '\n***************');
    var data = orderlist.find(function (item) {
        return item.id == user;
    });
    res.send(data.list);
});
app.post('/api/login', function (req, res) {
    console.log('登录验证', req.body, '\n***************');
    var resp = {
        status: 'success',
        statusCode: 200
    };
    res.send(resp);
});
app.post('/api/register', function (req, res) {
    console.log('-----------------\n', '注册用户', req.body, '\n***************');
    var regUser = req.body;
    var email = regUser.email;
    var pass = regUser.pass;
    var users;
    //检测文件是否存在
    if (fs.existsSync('./mock/user.json')) {
        var readStream = fs.createReadStream('./mock/user.json', {
            encoding: 'utf8',
            flags: 'r'
        });
        readStream.on('error', function (e) {
            console.log('文件读取失败');
        });
        readStream.on('close', function (e) {
            console.log('文件被关闭');
            console.log('\n-----------------\n');
        });
        readStream.on('open', function (chunk) {
            console.log('文件被打开');
        });
        readStream.on('data', function (chunk) {
            users = chunk;
            console.log('读取到数据');
        });
        readStream.on('end', function (chunk) {
            users = JSON.parse(users);
            var isAccessful = users.every(function (item) {
                if (item.email !== regUser.email) {
                    return true;
                }
                else {
                    return false;
                }
            });
            if (isAccessful) {
                //添加新注册用户到user数组中
                users.push({
                    email: email,
                    pass: pass
                });
                //如果用户邮箱没有注册，写入数据到user.json
                var rstream = fs.createWriteStream('./mock/user.json');
                rstream.write(JSON.stringify(users));
                //异步添加用户到数据库后，返回状态码给客户端
                var resp = {
                    statusCode: 1,
                    text: '注册成功！'
                };
                res.send(resp);
            }
            else {
                var resp = {
                    statusCode: 0,
                    text: '该邮箱已经被注册！'
                };
                res.send(resp);
            }
        });
    }
});
app.listen(8888, "localhost", function () {
    console.log('ser is running at 8888', '\n***************');
});

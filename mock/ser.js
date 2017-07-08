"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
//import * as userInfo from './userinfo.json'
var app = express();
//获取自定义图标的json
app.get('/api/icons', function (req, res) {
    console.log('\n******get icons********\n');
    var icons;
    if (fs.existsSync('./mock/icons.json')) {
        var readStream = fs.createReadStream('./mock/icons.json', {
            encoding: 'utf8',
            flags: 'r'
        });
        readStream.on('error', function (e) {
            console.log('文件读取失败');
        });
        readStream.on('close', function (e) {
            console.log('文件被关闭');
            console.log('\n******get icons********\n');
        });
        readStream.on('open', function (chunk) {
            console.log('文件被打开');
        });
        readStream.on('data', function (chunk) {
            icons = chunk;
            console.log('读取到数据');
        });
        readStream.on('end', function (chunk) {
            var resp = {
                statusCode: 1,
                data: icons
            };
            res.send(resp);
        });
    }
});
//获取用户设置的点坐标
app.get('/api/points/:type?', function (req, res) {
    console.log('\n******get points********\n');
    var points;
    console.log(req.params);
    if (req.params.type == 1) {
        if (fs.existsSync('./mock/points.json')) {
            var readStream = fs.createReadStream('./mock/points.json', {
                encoding: 'utf8',
                flags: 'r'
            });
            readStream.on('error', function (e) {
                console.log('文件读取失败');
            });
            readStream.on('close', function (e) {
                console.log('文件被关闭');
                console.log('\n******get points********\n');
            });
            readStream.on('open', function (chunk) {
                console.log('文件被打开');
            });
            readStream.on('data', function (chunk) {
                points = chunk;
                console.log('读取到数据');
            });
            readStream.on('end', function (chunk) {
                var resp = {
                    statusCode: 1,
                    data: points
                };
                res.send(resp);
            });
        }
    }
});
//获取用户地图编辑的marker
app.get('/api/markers', function (req, res) {
    console.log('\n******get markers********\n');
    var markers;
    if (fs.existsSync('./mock/marker.json')) {
        var readStream = fs.createReadStream('./mock/marker.json', {
            encoding: 'utf8',
            flags: 'r'
        });
        readStream.on('error', function (e) {
            console.log('文件读取失败');
        });
        readStream.on('close', function (e) {
            console.log('文件被关闭');
            console.log('\n******get markers********\n');
        });
        readStream.on('open', function (chunk) {
            console.log('文件被打开');
        });
        readStream.on('data', function (chunk) {
            markers = chunk;
            console.log('读取到数据');
        });
        readStream.on('end', function (chunk) {
            var resp = {
                statusCode: 1,
                data: markers
            };
            res.send(resp);
        });
    }
});
app.post('/api/login', bodyParser.urlencoded({ extended: false }), function (req, res) {
    console.log('\n******user login********\n');
    var users;
    var email = req.body.email;
    var pass = req.body.pass;
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
            console.log('\n******user login********\n');
        });
        readStream.on('open', function (chunk) {
            console.log('文件被打开');
        });
        readStream.on('data', function (chunk) {
            users = chunk;
            console.log('读取到数据');
        });
        readStream.on('end', function (chunk) {
            if (users[0] !== null) {
                users = JSON.parse(users);
            }
            else {
                users = [];
            }
            var isAccessful = users.some(function (item) {
                return item.email === email && item.pass === pass;
            });
            if (isAccessful) {
                var readStream_1 = fs.createReadStream('./mock/userinfo.json', {
                    encoding: 'utf8',
                    flags: 'r'
                });
                var userInfo_1;
                readStream_1.on('data', function (chunk) {
                    userInfo_1 = chunk;
                });
                readStream_1.on('end', function (chunk) {
                    var data = JSON.parse(userInfo_1);
                    data.some(function (item) {
                        if (item.email === email) {
                            var resp = {
                                statusCode: 1,
                                data: item
                            };
                            res.send(resp);
                            return true;
                        }
                    });
                });
            }
            else {
                var resp = {
                    statusCode: 0,
                    text: '用户名或密码错误'
                };
                res.send(resp);
            }
        });
    }
});
//添加地图marker
app.post('/api/addicons', bodyParser.json(), function (req, res) {
    console.log('\n****** add icons ********\n');
    var pointsJSON;
    var icons = req.body;
    if (fs.existsSync('./mock/icons.json')) {
        var readStream = fs.createReadStream('./mock/marker.json', {
            encoding: 'utf8',
            flags: 'r'
        });
        readStream.on('data', function (chunk) {
            pointsJSON = chunk;
        });
        readStream.on('close', function (e) {
            console.log('\n****** add icons ********\n');
        });
        readStream.on('end', function (chunk) {
            var pointsData;
            if (pointsJSON != null) {
                pointsData = JSON.parse(pointsJSON).concat(icons);
            }
            else {
                pointsData = icons;
            }
            var rstream = fs.createWriteStream('./mock/marker.json');
            rstream.write(JSON.stringify(pointsData));
            //异步添加points到数据库后，返回状态码给客户端
            var resp = {
                statusCode: 1,
                text: 'add marker successfully！'
            };
            res.send(resp);
        });
    }
    console.log('\n******add marker********\n');
});
app.post('/api/addpoints', bodyParser.json(), function (req, res) {
    console.log('\n******add points********\n');
    var points = req.body;
    if (fs.existsSync('./mock/points.json')) {
        var readStream = fs.createReadStream('./mock/points.json', {
            encoding: 'utf8',
            flags: 'r'
        });
        var pointsJSON_1;
        readStream.on('data', function (chunk) {
            pointsJSON_1 = chunk;
        });
        readStream.on('end', function (chunk) {
            var pointsData;
            console.log(2222, pointsJSON_1);
            if (pointsJSON_1 != null) {
                pointsData = JSON.parse(pointsJSON_1).concat(points);
            }
            else {
                pointsData = points;
            }
            var rstream = fs.createWriteStream('./mock/points.json');
            rstream.write(JSON.stringify(pointsData));
            //异步添加points到数据库后，返回状态码给客户端
            var resp = {
                statusCode: 1,
                text: '点编辑成功！'
            };
            res.send(resp);
        });
    }
    console.log('\n******add points********\n');
});
app.post('/api/register', bodyParser.urlencoded({ extended: false }), function (req, res) {
    console.log('\n******user register********\n');
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
            console.log('\n******user register********\n');
        });
        readStream.on('open', function (chunk) {
            console.log('文件被打开');
        });
        readStream.on('data', function (chunk) {
            users = chunk;
            console.log('读取到数据');
        });
        readStream.on('end', function (chunk) {
            if (users[0] !== null) {
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
            }
            else {
                users = [].push({
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
        });
    }
});
app.listen(8888, "localhost", function () {
    console.log('ser is running at 8888', '\n***************');
});

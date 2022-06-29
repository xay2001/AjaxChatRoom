//创建服务器
const express = require('express');
//引入路由器
const userRouter = require('./router/router.js');
//监听端口
const app = express();
const port = 5050;
app.listen(port, function() {
        console.log("服务器已启动,端口号为:", port);
    })
    //托管静态资源
app.use('/public', express.static('public'));
//引入body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//express解决跨域问题
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*') //当前服务器允许来自任何客户端的跨域访问
    res.set("Access-Control-Allow-Headers", "X-Requested-With");
    res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.set("X-Powered-By", ' 3.2.1');
    res.set("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Credentials", true);
    next() //放行，让后续的请求处理方法继续处理
});
//挂载路由器
app.use('', userRouter);
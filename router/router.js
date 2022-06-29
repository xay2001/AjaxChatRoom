const express = require('express');
const pool = require('../pool.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = express.Router();
router.use(cookieParser());
//配置express-session
router.use(session({
    name: 'shoesmall', //返回客户端key的名称，默认是connect.sid
    secret: '123456', //服务器端生成session的签名
    cookie: { maxAge: 600000 }, //设置返回给前端的key的属性
    resave: false, //不强制保存session即使它没有变化
    saveUninitialized: true //强制将(新建时)未初始化的session存储
}));

//============================ 用户注册相关接口 ===================================
/* 2.1
 * 用户注册
 * 接口地址:http://localhost:5050/user/reg
 * */
router.post('/user/reg', (req, res) => {
        let name = req.body.uname;
        let pwd = req.body.upwd;
        let email = req.body.uemail;
        console.log(req.body);
        //姓名为空
        if (!name) {
            res.json({ code: 211, msg: '请输入用户名!' });
            return;
        }
        //密码为空
        if (!pwd) {
            res.json({ code: 212, msg: '请输入密码!' });
            return;
        }
        //邮箱为空
        if (!email) {
            res.json({ code: 213, msg: '请输入邮箱!' });
            return;
        }
        //密码长度小于3
        if (pwd.length < 3) {
            res.json({ code: 214, msg: '密码长度小于3!' });
            return;
        }
        //邮箱格式验证
        var reg1 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        //验证用户名:只能输入字母、数字、“_”、“.”
        var reg2 = /^[a-z][a-zA-Z0-9\-]{2,15}$/;
        if (!reg1.test(email)) {
            res.json({ code: 215, msg: '邮箱不符合格式!' });
            return;
        }
        // //如果用户名不符合格式
        // if(!reg2.test(name)){
        //     res.json({code:216,msg:'用户名格式不正确，小写字母开头+数字/字母/减号，最少3位，最长16位!'});
        //     return ;
        // }
        //检查用户名是否存在
        let sql1 = "SELECT * FROM user WHERE username='" + name + "'";
        pool.query(sql1, (err, res1) => {
            if (err) throw err;
            if (res1.length > 0) {
                res.json({ code: 217, msg: '用户名已存在!' });
                return;
            }
        });
        //检查邮箱是否存在
        let sql2 = "SELECT * FROM user where email='" + email + "'";
        pool.query(sql2, (err, res2) => {
            if (err) throw err;
            if (res2.length > 0) {
                res.json({ code: 218, msg: '邮箱已存在!' });
                return;
            }
        });
        //通过验证后可以注册
        let sql3 = "INSERT INTO user values(null,'" + name + "','" + pwd + "','" + email + "'," + 0 + ")";
        pool.query(sql3, (err, res3) => {
            if (err) throw err;
            console.log(res3);
            res.json({ code: name, msg: '注册成功!' });
            // return;
        })
    })
    /* 2.2
     * 用户名单独验证
     * 接口地址:http://localhost:5050/user/valiname
     * */
router.get('/user/valiname', (req, res) => {
        let name = req.query.uname;
        //姓名为空
        if (!name) {
            res.json({ code: 221, msg: '请输入用户名!' });
            return;
        }
        //验证用户名:只能输入字母、数字、“_”、“.”
        var reg2 = /^[a-z][a-zA-Z0-9\-]{2,15}$/;
        //如果用户名不符合格式
        if (!reg2.test(name)) {
            res.json({ code: 222, msg: '用户名格式不正确，小写字母开头+数字/字母/减号，最少3位，最长16位!' });
            return;
        }
        //检查用户名是否存在
        let sql1 = "SELECT * FROM user WHERE username='" + name + "'";
        pool.query(sql1, (err, res1) => {
            if (err) throw err;
            if (res1.length > 0) {
                res.json({ code: 223, msg: '用户名已存在!' });
                return;
            } else {
                res.json({ code: 224, msg: '用户名可以使用!' });
                return;
            }
        });
    })
    /* 2.3
     * 邮箱单独验证
     * 接口地址:http://localhost:5050/user/valiemail
     * */
router.get('/user/valiemail', (req, res) => {
        let email = req.query.uemail;
        //邮箱为空
        if (!email) {
            res.json({ code: 231, msg: '请输入邮箱!' });
            return;
        }
        //邮箱格式验证
        var reg1 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!reg1.test(email)) {
            res.json({ code: 232, msg: '邮箱不符合格式!' });
            return;
        }
        //检查邮箱是否存在
        let sql2 = "SELECT * FROM user where email='" + email + "'";
        pool.query(sql2, (err, res2) => {
            if (err) throw err;
            if (res2.length > 0) {
                res.json({ code: 233, msg: '邮箱已存在!' });
                return;
            } else {
                res.json({ code: 234, msg: '邮箱可以使用!' });
                return;
            }
        });
    })
    /* 2.4
     * 密码单独验证
     * 接口地址:http://localhost:5050/user/valipwd
     * */
router.get('/user/valipwd', (req, res) => {
        let pwd = req.query.upwd;
        //密码为空
        if (!pwd) {
            res.json({ code: 241, msg: '请输入密码!' });
            return;
        }
        //密码长度小于3
        let len = pwd.length;
        if (len < 3) {
            res.json({ code: 242, msg: '密码长度小于3!' });
            return;
        } else {
            res.json({ code: 243, msg: '密码可以使用!' });
            return;
        }
    })
    //============================ 用户登录相关接口 ===================================
    /* 3.1
     * 用户登录验证
     * 接口地址:http://localhost:5050/user/login
     * */
router.post('/user/login', (req, res) => {
        let uname = req.body.uname;
        let upwd = req.body.upwd;
        //用户名为空
        if (!uname) {
            res.json({ code: 311, msg: '用户名为空!' });
            return;
        }
        //密码为空
        if (!upwd) {
            res.json({ code: 312, msg: '密码为空!' });
            return;
        }
        let sql = "SELECT * FROM user WHERE username='" + uname + "' and userpwd='" + upwd + "'";
        pool.query(sql, (err, result) => {
            if (err) throw err;
            //如果用户或密码不对
            if (result.length == 0) {
                res.json({ code: 313, msg: '信息不正确!' });
                return;
            } //如果用户名和密码正确
            else {
                //保存session
                req.session.uname = uname;
                req.session.islog = true;
                res.json({ code: 314, msg: uname });
                return;
            }
        });
    })
    /* 3.2
     * 登录时用户名单独验证
     * 接口地址:http://localhost:5050/user/justiname
     * */
router.get('/user/justiname', (req, res) => {
        let uname = req.query.username;
        if (!uname) {
            res.json({ code: 321, msg: '用户名为空!' });
            return;
        }
    })
    /* 3.3
     * 登录时密码单独验证
     * 接口地址:http://localhost:5050/user/justipwd
     * */
router.get('/user/justipwd', (req, res) => {
        let upwd = req.query.userpwd;
        if (!upwd) {
            res.json({ code: 331, msg: '密码为空!' });
            return;
        }
    })
    /* 3.4
     * 检验是否在线
     * 接口地址:http://localhost:5050/user/wholog
     * */
router.get('/user/wholog', (req, res) => {
        let uname = req.session.od;
        let islog = req.session.islog;
        console.log(req.session);
        if (!islog) {
            res.json({ code: 341, msg: '没有用户登录!' });
            return;
        } else {
            res.json({ code: 342, msg: uname });
            return;
        }
    })
    /* 3.5
     * 退出登录
     * 接口地址:http://localhost:5050/user/logout
     * */
router.get('/user/logout', (req, res) => {
        req.session.uname = '';
        req.session.islog = false;
        res.json({ code: 351, msg: '退出成功!' })
    })
    /* 3.6
     * 用户是否登录
     * 接口地址:http://localhost:5050/user/islog
     * */
router.get('/user/islog', (req, res) => {
        let name = req.query.username;
        let uname = req.session.uname;
        let islog = req.session.islog;
        if (uname == name) {
            res.json({ code: 361, msg: '用户在登录状态' });
            return;
        } else {
            res.json({ code: 362, msg: '用户不在登录状态' });
            return;
        }
    })
    /* 3.7
     * 登录身份是否是管理员
     * 接口地址:http://localhost:5050/user/isadmin
     * */
router.get('/user/isadmin', (req, res) => {
    let name = req.session.uname;
    if (name == '' || !name) {
        res.json({ code: 371, msg: '请先登录!' });
        return;
    }
    let sql = "SELECT * FROM user WHERE username='" + name + "'";
    pool.query(sql, (err, result) => {
        console.log(result);
        if (parseInt(result[0].authority) == 1) {
            res.json({ code: 372, msg: '登录用户为管理员身份!' });
            return;
        } else {
            res.json({ code: 373, msg: '登录用户不是管理员身份!' });
            return;
        }
    })
})

router.get('/liaotian', function(req, res) {
        let uname = req.url.split('=')[1];
        let exec = "SELECT * FROM user1 WHERE username='" + uname + "'";
        pool.query(exec, (err3, res3) => {
            console.log(exec)
            console.log(res3)
            if (err3) throw err3;
            if (res3.length > 0) {
                let sql3 = "UPDATE user1 SET au=" + 1 + " WHERE username='" + uname + "'";
                pool.query(sql3, (err5, res5) => {
                    console.log(sql3)
                    console.log(res5)
                    if (err5) throw err5;
                    res.json({ code: 412, msg: "更新成功!" });
                    return;
                })
            } else {
                let sql4 = "INSERT INTO user1 VALUES('" + uname + "',1)";
                pool.query(sql4, (err4, res4) => {
                    console.log(sql4)
                    console.log(res4)
                    if (err4) throw err4;
                    res.json({ code: 412, msg: "添加成功!" });
                    console.log(10)
                    return;
                })
            }
        })
    })
    //http://localhost:5050/zaixian
router.get('/zaixian', function(req, res) {
    let sql = "SELECT * FROM user1 WHERE au=1";
    pool.query(sql, (err, result) => {
        console.log(sql)
        if (err) throw err
        if (result.length > 0) {
            res.json(result)
            console.log(1)
            return;
        }
    })
})
router.get('/tuichu', function(req, res) {
    let uname = req.url.split('=')[1];
    let sql = "UPDATE user1 SET au=" + 0 + " WHERE username='" + uname + "'";
    pool.query(sql, (err, result) => {
        console.log(sql)
        if (err) throw err;
        res.json({ code: 200, msg: "更新成功！" });
        return;
    })
})
router.get('/chat', function(req, res) {
    let uname = req.url.split('=')[1];
    let yu = req.url.split('=')[3];
    let sql = "INSERT INTO chat VALUES('" + uname + "','" + yu + "')";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.json({ code: 210, msg: "发送成功！" });
        console.log(yu);
        return;
    })
})
router.get('/chat1', function(req, res) {
    let sql = "SELECT * FROM chat";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
        return;
    })
})
router.get('/chat2', function(req, res) {
    let sql = "SELECT * FROM chat1";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
        return;
    })
})
router.get('/chat3', function(req, res) {
    let uname = req.url.split('=')[1];
    let yu = req.url.split('=')[3];
    let sql = "INSERT INTO chat1 VALUE('" + uname + "',0,'" + yu + "')";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
        return;
    })
})

module.exports = router;
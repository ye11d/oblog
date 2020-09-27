const express = require('express')
const routes = require('./routes')
const path = require('path')
const moment = require('moment')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
const formidableMiddleware = require('express-formidable')
const ejs = require('ejs')

var app = express()

//设模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//设置中间件
//处理路由静态资源
app.use('/static', express.static(path.join(__dirname, 'public')))

//session中间件
app.use(session({
    secret: 'dududu',
    resave: true,
    saveUninitalized: true,
    // store: new MongoStore({
    //     url: 'mongodb://localhost:27017/oblog'
    // })
}))

// 处理表单及文件上传的中间件
app.use(formidableMiddleware({
    uploadDir: path.join(__dirname, 'public/img/headimg'), // 上传文件目录
    keepExtensions: true, // 保留后缀
}))

// 添加模板必需的三个变量
app.use(function (req, res, next) {
    res.locals.user = req.session.user
    // res.locals.success = req.flash('success').toString()
    // res.locals.error = req.flash('error').toString()
    next()
})

//注册路由
routes(app)

const port = 80
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
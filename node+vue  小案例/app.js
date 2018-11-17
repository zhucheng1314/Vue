const express = require('express')
const app = express()
// 注册body-parser中间件
const bodyParser = require('body-parser')
const mysql = require('mysql')
// 创建连接

const conn = mysql.createConnection({

    host: 'localhost',

    user: 'root',

    password: 'root',

    database: 'wuchan'

});

// 注册body-parser中间件  注册以后才可以在req中使用body对象获取客户端post提交过来的数据
app.use(bodyParser.urlencoded({
    extended: false
}))
app.set('view engine', 'ejs')
app.set('views', './views')
// 静态资源托管
app.use('/lib', express.static('./lib'))
app.use('/node_modules', express.static('./node_modules'))
app.get('/', (req, res) => {
     res.render('./02.列表案例.ejs', {})
})

//获取数据渲染到页面
app.get('/get', (req, res) => {
    const seleltSql = 'select * from users'
    conn.query(seleltSql, (err, result) => {
        if (err) return res.send({
            status: 500,
            msg: '获取数据失败'
        })
        res.send({
            status: 200,
           msg: '获取数据成功',
           data:result
        })
       

    })
})

app.post('/get', (req, res) => {
    const data = req.body
    console.log(data);
    
    const seleltSql = 'insert into users set ?'
    conn.query(seleltSql, data,(err, result) => {
        if (err) return res.send({
            status: 500,
            msg: '插入数据失败'
        })
        res.send({
            status: 200,
            msg: '插入数据成功',
            data: result
        })
       

    })
})

app.get('/del/:id', (req, res) => {
    const id=req.params.id
    
    const delSql = 'delete from users where id=?'
    conn.query(delSql,id,(err, result) => {
        if (err) return res.send({
            status: 500,
            msg: '删除数据失败'
        })
        res.send({
            status: 200,
            msg: '删除数据成功',
            data: result
        })
       

    })
})

app.listen(3003, () => {
    console.log('http://127.0.0.1:3003');
})
     
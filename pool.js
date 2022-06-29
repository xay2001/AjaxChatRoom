//导入驱动
const mysql = require('mysql');
const pool = mysql.createPool({
    host: '127.0.0.1',
    // host:'47.100.51.186',
    port: '3306',
    user: 'root',
    password: 'Xay20017522',
    // password:'12345678',
    database: 'ChatRoom',
    connectionLimit: 30
});
//导出连接池对象
module.exports = pool;
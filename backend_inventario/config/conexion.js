const mysql = require('mysql');

const db = {
    connectionLimit: 100,
    host: '127.0.0.1',
    user: 'root',
    password: 'password.01',
    database: 'inventario_almacen',
    port: 3306,
    acquireTimeOut: 5000
}

const dbConnect = mysql.createPool(db);




module.exports = dbConnect;
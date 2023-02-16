const conexion = require("../config/conexion");

module.exports = {

    addProducto: function (
        nombre, valor, fecha_vencimiento, cantidad, proveedor, callback) {
        const sql = `INSERT INTO producto (nombre, valor, fecha_vencimiento, cantidad, proveedor) VALUES ('${nombre}','${valor}','${fecha_vencimiento}','${cantidad}','${proveedor}')`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            else {
                return callback(rows);
            }
        });
    },



    editProducto: function (
        id, nombre, valor, fecha_vencimiento, cantidad, proveedor, callback) {
        const sql = `UPDATE producto SET
                        nombre = '${nombre}',
                        valor = '${valor}',
                        fecha_vencimiento = '${fecha_vencimiento}',
                        cantidad = '${cantidad}',                
                        proveedor = '${proveedor}'                                       
                         WHERE id = '${id}'`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            return callback(rows);
        });
    },



    buscarProducto: function (nombre, callback) {
        conexion.query(
            "SELECT nombre FROM producto WHERE nombre =?",
            [nombre],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            }
        );
    },

    buscarId: function (nombre, callback) {
        conexion.query(
            "SELECT id FROM producto WHERE id =?",
            [nombre],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            }
        );
    },

    listProductos: function (callback) {
        const sql = "SELECT * FROM producto";
        conexion.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        })
    },

    deleteProducto: function (id, callback) {
        const sql = "DELETE FROM producto WHERE id =?";
        conexion.query(sql, id, function (err, rows) {
            if (err) throw err;
            else {
                return callback(rows[0]);
            }
        })
    },

}
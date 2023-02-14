const conexion = require("../config/conexion");

module.exports = {

    addProveedor: function (
        nombre, sucursal, contacto, callback) {
        const sql = `INSERT INTO proveedor (nombre, sucursal, contacto) VALUES ('${nombre}','${sucursal}','${contacto}')`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            else {
                return callback(rows);
            }
        });
    },



    editProveedor: function (
        id,  nombre, sucursal, contacto, callback) {
        const sql = `UPDATE proveedor SET
                        nombre = '${nombre}',
                        sucursal = '${sucursal}',
                        contacto = '${contacto}'                                                          
                         WHERE id = '${id}'`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            return callback(rows);
        });
    },



    buscarProveedor: function (nombre, callback) {
        conexion.query(
            "SELECT nombre FROM proveedor WHERE nombre =?",
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
            "SELECT id FROM proveedor WHERE id =?",
            [nombre],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            }
        );
    },

    listProveedor: function (callback) {
        const sql = "SELECT * FROM proveedor";
        conexion.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        })
    },

    deleteProveedor: function (id, callback) {
        const sql = "DELETE FROM proveedor WHERE id =?";
        conexion.query(sql, id, function (err, rows) {
            if (err) throw err;
            else {
                return callback(rows[0]);
            }
        })
    },

}
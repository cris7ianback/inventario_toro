const conexion = require("../config/conexion");

module.exports = {
    deleteUser: function (id_user, callback) {
        const sql = "DELETE FROM user WHERE id_user =?";
        conexion.query(sql, id_user, function (err, rows) {
            if (err) throw err;
            else {
                return callback(rows[0]);
            }
        });
    },

    modifyUser: function (
        id_user, nombre, apellido, email, rol, callback) {
        const sql = `UPDATE usuarios SET
                    nombre = '${nombre}',
                    apellido = '${apellido}',
                    email = '${email}',                
                    rol = '${rol}'
                    WHERE id_user = '${id_user}'`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            return callback(rows);
        });
    },

    modifyPass: function (email, password, callback) {
        const sql = `UPDATE usuarios SET
            password = '${password}'
            WHERE email = '${email}'`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            return callback(rows);
        });
    },

    modifyPassUser: function (id_user, password, callback) {
        const sql = `UPDATE usuarios SET
            password = '${password}'
            WHERE id_user = '${id_user}'`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            return callback(rows);
        });
    },

    listUser: function (callback) {
        const sql = "SELECT * FROM usuarios";
        conexion.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    listUserId: function (id_user, callback) {
        const sql = "SELECT * FROM usuarios WHERE id_user= ?";
        conexion.query(sql, id_user, function (err, data) {
            if (err) throw err;
            return callback(data[0]);
        });
    },

    registerUser: function (
        nombre, apellido, email, password, rol, callback) {
        const sql = `INSERT INTO usuarios (nombre, apellido, email, password, rol) VALUES ('${nombre}','${apellido}','${email}','${password}','${rol}')`;
        conexion.query(sql, function (err, rows, fields) {
            if (err) throw err;
            else {
                return callback(rows);
            }
        });
    },

    seaerchUser: function (email, callback) {
        conexion.query(
            "SELECT email FROM usuarios WHERE email =?",
            [email],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            }
        );
    },

    searchId: function (id, callback) {
        conexion.query(
            "SELECT id FROM usuarios WHERE id =?",
            [id],
            (err, rows, fields) => {
                if (err) throw err;
                else {
                    return callback(rows[0]);
                }
            }
        );
    },


}
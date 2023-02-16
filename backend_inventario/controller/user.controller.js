const userModule = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const conexion = require("../config/conexion");

module.exports = {

    deleteUser: function (req, res) {
        const id = req.params.id;
        userModule.deleteUser(id, function (data) {
          res.send(data);
        });
      },

    modifyUser: async (req, res) => {
        const id_user = req.params.id_user;
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const email = req.body.email;
        const rol = req.body.rol;

        userModule.searchId(id_user, function (data) {
            if (data == undefined) {
                return res.status(501).send("Usuario No existe")
            } else {
                userModule.modifyUser(
                    id_user, nombre, apellido, email, rol, function (data) {
                        res.send(data);
                    }
                );

            }
        })
    },
    // MODIFICA PASSWORD USUARIO
    modifyPass: async (req, res) => {
        try {
            const email = req.body.email;
            const oldPassword = req.body.oldPassword;
            const password = req.body.password;
            const passHash = await bcryptjs.hash(password, 8);

            conexion.query(
                "SELECT email , password FROM user WHERE email =? ",
                [email],
                async (error, results) => {
                    if (
                        results.length == 0 ||
                        !(await bcryptjs.compare(oldPassword, results[0].password))
                    ) {
                        res.status(401).send("Email o Contraseña Incorrecta");
                    } else {
                        userModule.modifyPass(email, passHash, function (data) {
                            res.send(data);
                        });
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    },

    modifyPassUser: async (req, res) => {
        const id_user = req.params.id_user;
        const password = req.body.password;
        const passHash = await bcryptjs.hash(password, 8);

        userModule.searchId(id_user, function (data){
            if (data == undefined){
                return res.status(501).send("Error al Actualizar")
            }else{
                userModule.modifyPassUser(id_user, passHash, function (data) {
                  res.send(data);
                });
            }
        })
      },

    listUser: function (req, res) {
        userModule.listUser(function (data) {
            res.send(data);
        });
    },

    listarUserId: function (req, res) {
        const id_user = req.params.id_user;

        userModule.searchId(id_user, function (data) {
            if (data == undefined) {
                return res.status(501).send("id Usuario no existe")
            } else {
                userModule.listUserId(id_user, function (data) {
                    return res.send(data);
                })
            }
        })
    },

    registerUser: async (req, res) => {
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const email = req.body.email;
        const password = req.body.password;
        const rol = req.body.rol;
        const passHash = await bcryptjs.hash(password, 8);

        //buscar si usuario o email Existe
        userModule.seaerchUser(email, function (data) {
            // si  existe usuario o email envia mensaje
            if (data != undefined) {
                return res.status(501).send("Usuario y/o Email ya Registrado");
            } else {
                // si  no existe usuario o email, lo registra
                userModule.registerUser(nombre, apellido, email, passHash, rol, function (data) {
                    return res.status(200).send("Usuario ingresado con exito");
                }
                );
            }
        });
    },

}

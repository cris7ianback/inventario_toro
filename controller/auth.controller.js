const auth = require("../models/auth.model");
const bcryptjs = require("bcryptjs");
const conexion = require("../config/conexion");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.EXP_SESSION_CRYPTO);
const jwt = require("jsonwebtoken");

module.exports = {
  //INICIO DE SESIÓN
  login: async (req, res) => {
    try {
      //limpiar Cookie & Token.
      res.clearCookie("jwt");
      res.clearCookie("connect.sid");

      const email = req.body.email;
      const password = req.body.password;

      //Consulta si el usuario existe
      conexion.query("SELECT * FROM usuarios WHERE email =?",
        [email],
        async (error, results) => {
          if (
            // compara la pass con la passhasheada
            results.length == 0 ||
            !(await bcryptjs.compare(password, results[0].password))
          ) {
            res.status(401).send("No Autorizado");
          } else {
            req.session.id_user = results[0].id_user;
            req.session.nombre = results[0].nombre;
            req.session.apellido = results[0].apellido;
            req.session.email = results[0].email;
            req.session.id_rol = results[0].rol;

            const rid_ss0 = cryptr.encrypt(req.session.id);
            const token = jwt.sign(
              {
                idr: rid_ss0,
                email: email,

              },
              process.env.JWT_SECRETO,
              {
                expiresIn: process.env.JWT_TIEMPO_EXPIRA,
              }
            );

            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                process.env.JWT_COOKIES_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            return res.status(200).json({
              token,
              email,
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  //Cierre de sesión, eliminando token y sesion.
  LogOut: async (req, res) => {
    const session_id = await jwt.verify(
      req.headers.authorization.substr(7),
      process.env.JWT_SECRETO
    ).idr;
    const decryptedString = cryptr.decrypt(session_id);
    await auth.eliminarSession(decryptedString, function () {
      return res.status(200).send("Sesión Terminada");
    });
  },

  //verifica que token se haya generado.
  authenticateToeken(req, res, next) {
    const autHeader = req.headers["authorization"];
    const token = autHeader && autHeader.split("")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRETO, (err, response) => {
      if (err) return res.sendStatus(403);
      res.locals = response;
      next();
    });
  },
};
